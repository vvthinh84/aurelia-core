import { inject } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';
import { NotificationService } from 'Services/Notification/NotificationService';

import * as toastr from "toastr";

@inject(NotificationService)
export class CauHinhNotification2 {

    ListDevices = [];
    AppDevice = {};
    PushProgress = {};
    InitPushProgress = [];

    nIntervId;

    constructor(notificationService) {
        this.notificationService = notificationService;
        this.AppDevice.DeviceOs = "All";

        //Init push progress
        this.PushProgress.IsSending = false;
        this.PushProgress.CurrentStatus = "Chưa gửi";
        this.PushProgress.TotalDevice = 0;
        this.PushProgress.TotalAndroidDeviceProcessed = 0;
        this.PushProgress.TotalIosDeviceProcessed = 0;
        this.PushProgress.TotalFailedDevices = 0;
        this.PushProgress.Progess = 0;
        this.PushProgress.LastSuccessPush = "N/A";

    }

    activate() {
        return Promise.all([this.notificationService.GetPushProgressInfo()]).then((rs) => {
            this.InitPushProgress = rs[0].Data;

            if (rs[0].Data.CurrentStatus === "Processing") {
                this.PushProgress.IsSending = true;
                this.PushProgress = rs[0].Data;
            }
        })
    }

    async SendNotification() {

        if (!this.ValidateInfoBeforeSubmit()) {
            return false;
        }

        this.PushProgress.IsSending = true;

        var jsonToPost = {}
        jsonToPost.PushType = this.AppDevice.DeviceOs;
        jsonToPost.MessageType = this.AppDevice.MessageType;
        jsonToPost.MessageValue = this.AppDevice.MessageValue;
        jsonToPost.Alert = this.AppDevice.Alert;
        jsonToPost.UserPushed = Lockr.get('UserInfo').Fullname;

        let response = await (this.notificationService.SendNotification2(jsonToPost));
        if (response != null) {
            if (response.Result == true) {
                toastr.success(response.Data, "Thành công");
                this.nIntervId = window.setInterval(this.GetPushProgressInfo.bind(this), 5000);
                console.log("SendNotification", this.nIntervId);

            } else {
                toastr.error(response.Data, "Lỗi");
            }
        }
    }

    GetPushProgressInfo() {
        this.notificationService.GetPushProgressInfo().then((data) => {
            this.PushProgress = data.Data;
            console.log("CurrentStatus", this.PushProgress.CurrentStatus);
            if (this.PushProgress.CurrentStatus === "Success") {
                clearInterval(this.nIntervId);
                this.PushProgress.IsSending = false;
                this.PushProgress.Progess = 100;
            }
            this.nIntervId = null;
            console.log("GetPushProgressInfo", this.nIntervId);

        });
    }

    ValidateInfoBeforeSubmit() {
        var strErrorMsg = "";
        if (this.AppDevice.DeviceOs == "" || this.AppDevice.DeviceOs === "undefined")
            strErrorMsg += "• Device OS phải nhập. <br/>";

        if (this.AppDevice.Alert == "" || typeof this.AppDevice.Alert === "undefined")
            strErrorMsg += "• Alert phải nhập. <br/>";

        if (strErrorMsg !== "") {
            toastr.error(strErrorMsg, "Lỗi dữ liệu nhập!");
            return false;
        }
        return true;
    }
}
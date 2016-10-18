import { inject } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';
import { NotificationService } from 'Services/Notification/NotificationService';
import * as toastr from "toastr";

@inject(NotificationService)
export class CauHinhNotification {

    ListDevices = [];
    AppDevice = {};

    //Use for each OS only
    DeviceTokens = [];

    //Use for All type
    DeviceTokensAllAndroid = [];
    DeviceTokensAllIos = [];

    constructor(notificationService) {
        this.notificationService = notificationService;
        this.AppDevice.DeviceOs = "All";
    }

    activate() {
        return Promise.all([this.notificationService.GetListAppDevice()]).then((rs) => {
            this.ListDevices = rs[0].Data;
            this.GetDeviceTokens();
        })
    }

    GetDeviceTokens() {

        //this.ListDevices = [];
        // this.notificationService.GetListAppDevice().then((data) => {
        //     if (data.Result == true) {
        //         this.ListDevices = data.Data;
        //         console.log("LSTDeviceAfterCall: ", this.ListDevices);
        //     }
        // });

        this.DeviceTokens = [];

        if (this.AppDevice.DeviceOs != "") {
            var listDevicesByOs = [];
            if (this.AppDevice.DeviceOs !== "All") {
                //console.log("Filter by: ", this.AppDevice.DeviceOs);
                listDevicesByOs = this.ListDevices.filter(x => x.DeviceOs === this.AppDevice.DeviceOs);
                if (listDevicesByOs != null && listDevicesByOs.length > 0) {
                    for (var i in listDevicesByOs) {
                        this.DeviceTokens.push(listDevicesByOs[i].DeviceToken);
                    }
                    //console.log("List Device: ", this.DeviceTokens);
                }
            } else {
                listDevicesByOs = this.ListDevices;
                //console.log("listDevicesByOs: ", listDevicesByOs);
                if (listDevicesByOs != null && listDevicesByOs.length > 0) {
                    for (var i in listDevicesByOs) {
                        if (listDevicesByOs[i].DeviceOs == "Android") {
                            this.DeviceTokensAllAndroid.push(listDevicesByOs[i].DeviceToken);
                        } else {
                            this.DeviceTokensAllIos.push(listDevicesByOs[i].DeviceToken);
                        }
                    }

                    //console.log("DeviceAndroid: ", this.DeviceTokensAllAndroid);
                    //console.log("DeviceIOS: ", this.DeviceTokensAllIos);
                }
            }
        }
    }

    async SendNotification() {


        if (!this.ValidateInfoBeforeSubmit()) {
            return false;
        }

        var errorMessage = "";

        var jsonLogToPost = {}
        jsonLogToPost.PushType = this.AppDevice.DeviceOs;
        jsonLogToPost.Alert = this.AppDevice.Alert;
        jsonLogToPost.MessageType = this.AppDevice.MessageType;
        jsonLogToPost.MessageValue = this.AppDevice.MessageValue;
        jsonLogToPost.ListNotificationLogInfo = [];

        var initListNotificationStatus = [];

        var jsonToPost = {};

        jsonToPost.Alert = this.AppDevice.Alert;
        jsonToPost.MessageType = this.AppDevice.MessageType;
        jsonToPost.MessageValue = this.AppDevice.MessageValue;

        if (this.AppDevice.DeviceOs !== "All") {
            if (this.DeviceTokens != null && this.DeviceTokens.length > 0) {
                for (var i in this.DeviceTokens) {

                    jsonToPost.DeviceToken = this.DeviceTokens[i];

                    var logInfoObj = {};
                    logInfoObj.DeviceOs = this.AppDevice.DeviceOs;
                    logInfoObj.DeviceToken = this.DeviceTokens[i];

                    //console.log("jsonToPost from js", jsonToPost);
                    let response = await (this.notificationService.SendNotification(this.AppDevice.DeviceOs, jsonToPost));
                    if (response != null) {
                        if (response.Result == true) {
                            logInfoObj.PushStatus = "True";
                        } else {
                            logInfoObj.PushStatus = "False";
                            errorMessage = response.Message;
                        }
                        initListNotificationStatus.push(logInfoObj);
                    }
                }
                if (errorMessage !== "") {
                    toastr.error(errorMessage, "Error!");
                } else {
                    toastr.success("Gửi notification cho các device " + this.AppDevice.DeviceOs + " thành công!", "Success!");
                }
            } else {
                toastr.error("Không tồn tại token nào trong hệ thống", "Error!");
            }
        } else {
            if (this.DeviceTokensAllAndroid != null && this.DeviceTokensAllAndroid.length > 0) {
                for (var i = 0; i < this.DeviceTokensAllAndroid.length; i++) {

                    jsonToPost.DeviceToken = this.DeviceTokensAllAndroid[i];

                    var logInfoObj = {};
                    logInfoObj.DeviceOs = "Android";
                    logInfoObj.DeviceToken = this.DeviceTokensAllAndroid[i];

                    var response = await (this.notificationService.SendNotification("Android", jsonToPost));
                    if (response != null) {
                        if (response.Result == true) {
                            logInfoObj.PushStatus = "True";
                        } else {
                            logInfoObj.PushStatus = "False";
                            errorMessage = response.Message;
                        }
                        initListNotificationStatus.push(logInfoObj);
                    }
                }
                if (errorMessage !== "") {
                    toastr.error(errorMessage, "Error!");
                } else {
                    toastr.success("Gửi notification cho các device Android thành công!", "Success!");
                }
            }

            if (this.DeviceTokensAllIos != null && this.DeviceTokensAllIos.length > 0) {
                for (var i = 0; i < this.DeviceTokensAllIos.length; i++) {

                    jsonToPost.DeviceToken = this.DeviceTokensAllIos[i];

                    var logInfoObj = {};
                    logInfoObj.DeviceOs = "iOS";
                    logInfoObj.DeviceToken = this.DeviceTokensAllIos[i];

                    let response = await (this.notificationService.SendNotification("iOS", jsonToPost));
                    if (response != null) {
                        if (response.Result == true) {
                            logInfoObj.PushStatus = "True";
                        } else {
                            logInfoObj.PushStatus = "False";
                            errorMessage = response.Message;
                        }
                        initListNotificationStatus.push(logInfoObj);
                    }
                }
                if (errorMessage !== "") {
                    toastr.error(errorMessage, "Error!");
                } else {
                    toastr.success("Gửi notification cho các device Ios thành công!", "Success!");
                }
            }
        }

        for (var i in initListNotificationStatus) {
            jsonLogToPost.ListNotificationLogInfo.push(initListNotificationStatus[i]);
        }

        this.InsertNotification(jsonLogToPost);
    }

    InsertNotification(jsonLogToPost) {
        this.notificationService.InsertNotificationLog(jsonLogToPost).then((data) => {
            if (data.Result == true) {
                console.log("Ghi log thành công");
            } else {
                console.log(data.Data);
            }
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

    ChangeDeviceOs() {
        this.GetDeviceTokens();
    }
}
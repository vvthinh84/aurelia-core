import { inject } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';

import { QuaySoService } from 'Services/QuaySo/QuaySoService';
import { QuaySoPermission } from 'Configuration/PermissionSettings/QuaySoPermission';

import * as toastr from "toastr";

@inject(QuaySoService, QuaySoPermission)
export class Gift {

    ListGifts = [];
    ListCampaigns = [];

    isViewOnly = false;
    isNoAccess = false;

    constructor(quaySoService, quaySoPermission) {
        this.quaySoService = quaySoService;
        this.quaySoPermission = quaySoPermission;

        //Pagination
        this.current = 1;
        this.itemperpage = 10;
        this.pagesize = 10;
    }

    activate() {
        return Promise.all([this.quaySoService.GetListQuaySoGift(),
            this.quaySoService.GetListQuaySoCampaign()
        ]).then((rs) => {
            this.ListGifts = rs[0].Data;
            this.ListCampaigns = rs[1].Data;

            var username = Lockr.get('UserInfo').Username;
            this.isViewOnly = this.quaySoPermission.IsViewOnly(username, "gift");
            this.isNoAccess = this.quaySoPermission.IsNoAccess(username, "gift");
        })
    }

    bind(ct, ovr) {
        ovr.bindingContext.total = this.ListGifts.length;
    }

    AddGift() {
        this.isEdit = false;
        this.InitGiftInfo();
    }

    EditGift(currentGift) {
        this.isEdit = true;
        this.currentGift = currentGift;
    }

    ChangeGiftStatus(gift) {
        this.isEdit = true;
        this.currentGift = gift;
        if (gift.Status === "D") {
            this.currentGift.Status = "A";
        } else {
            this.currentGift.Status = "D";
        }
        this.SubmitGift();
    }

    SubmitGift() {
        if (!this.ValidateGiftBeforeSubmit()) {
            return false;
        }

        var jsonToPost = {};
        jsonToPost = this.currentGift;
        this.quaySoService.InsertOrUpdateQuaySoGift(jsonToPost).then((data) => {
            if (data.Result == true) {
                this.quaySoService.GetListQuaySoGift().then((data) => {
                    this.ListGifts = data.Data;
                });
                $('#addEditGift').modal('hide');
                toastr.success(this.isEdit === false ? 'Tạo mới gift thành công!' : 'Cập nhật gift thành công!', "Gifts");
                return true;
            } else {
                toastr.error("Lỗi! Xin thử lại!");
                return false;
            }
        });
    }

    ValidateGiftBeforeSubmit() {
        var strErrorMsg = "";
        if (this.currentGift.Name == "" || typeof this.currentGift.Name === "undefined")
            strErrorMsg += "• Tên quà tặng phải nhập. <br/>";

        if (this.currentGift.Code == "" || typeof this.currentGift.Code === "undefined")
            strErrorMsg += "• Mã quà tặng phải nhập. <br/>";

        if (this.currentGift.Price == "" || typeof this.currentGift.Price === "undefined")
            strErrorMsg += "• Giá phải nhập. <br/>";

        if (this.currentGift.TotalQuantity == "" || typeof this.currentGift.TotalQuantity === "undefined")
            strErrorMsg += "• Số lượng tổng phải nhập. <br/>";

        if (this.isEdit === false && (this.currentGift.UsedQuantity == "" || typeof this.currentGift.UsedQuantity === "undefined"))
            strErrorMsg += "• Số lượng đã SD phải nhập. <br/>";

        if (parseInt(this.currentGift.TotalQuantity) < parseInt(this.currentGift.UsedQuantity))
            strErrorMsg += "• Số lượng đã SD phải nhỏ hơn Số lượng tổng. <br/>";

        if (this.currentGift.Type == "" || typeof this.currentGift.Type === "undefined")
            strErrorMsg += "• Loại quà tặng phải nhập. <br/>";

        if (strErrorMsg !== "") {
            toastr.error(strErrorMsg, "Lỗi dữ liệu nhập!");
            return false;
        }
        return true;
    }

    InitGiftInfo() {
        this.currentGift = {};
        this.currentGift.Status = "D";
        this.currentGift.Code = "";
        this.currentGift.Name = "";
        this.currentGift.ImageUrl = "";
        this.currentGift.Price = "";
        this.currentGift.TotalQuantity = "";
        this.currentGift.UsedQuantity = "";
        this.currentGift.Type = "";
        this.currentGift.Ratio = "0";
        this.currentGift.CampaignId = "";
    }

}

export class FilterByStatusValueConverter {
    toView(array, status) {
        if (status) {
            return array.filter(x => x.Status != null && x.Status == status);
        }
        return array;
    }
}

export class FilterByNameValueConverter {
    toView(array, obj) {
        if (obj) {
            return array
                .filter(x => ((x.Name != null) && (x.Name.indexOf(obj) != -1)));
        }
        return array;
    }
}

export class FilterByCodeValueConverter {
    toView(array, obj) {
        if (obj) {
            return array
                .filter(x => ((x.Code != null) && (x.Code.indexOf(obj) != -1)));
        }
        return array;
    }
}

export class FilterByCampaignValueConverter {
    toView(array, obj) {
        //console.log(obj);
        if (obj) {
            return array
                .filter(x => ((x.CampaignId != null) && (x.CampaignId == obj)));
        }
        return array;
    }
}
import { inject } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';
import { QuaySoService } from 'Services/QuaySo/QuaySoService';
import { QuaySoPermission } from 'Configuration/PermissionSettings/QuaySoPermission';
import * as toastr from "toastr";

@inject(QuaySoService, QuaySoPermission)
export class Result {

    ListResults = [];
    ListBranchs = [];
    ListGifts = [];

    isViewOnly = false;
    isNoAccess = false;

    constructor(quaySoService, quaySoPermission) {
        this.quaySoService = quaySoService;
        this.quaySoPermission = quaySoPermission;
    }

    activate() {
        return Promise.all([
            this.quaySoService.GetListQuaySoBranch(),
            this.quaySoService.GetListQuaySoGift()
        ]).then((rs) => {
            this.ListBranchs = rs[0].Data.ListBranchs;
            this.ListGifts = rs[1].Data;

            var username = Lockr.get('UserInfo').Username;
            this.isViewOnly = this.quaySoPermission.IsViewOnly(username, "result");
            this.isNoAccess = this.quaySoPermission.IsNoAccess(username, "result");
        })
    }

    SearchByOrderCode() {
        this.quaySoService.SearchResultByOrderCode(this.refOrderCodeSearch.value).then((data) => {
            this.ListResults = data.Data;
        });
    }

    SetReplay(result) {
        var jsonToPost = {};
        jsonToPost = result;
        //console.log(result.OrderCode.indexOf("-replay"));
        if (result.OrderCode.indexOf("-replay") !== -1) {
            toastr.success('Kết quả đã được cập nhật replay!', "Kết quả quay");
        } else {
            jsonToPost.OrderCode = result.OrderCode + "-replay";
            this.quaySoService.UpdateQuaySoResult(jsonToPost).then((data) => {
                if (data.Result == true) {
                    toastr.success('Cập nhật Kết quả quay thành công!', "Kết quả quay");
                    return true;
                } else {
                    toastr.error("Lỗi! Xin thử lại!");
                    return false;
                }
            });
        }
    }
}

export class BranchNameValueConverter {
    toView(branchCode, ListBranchs) {
        if (branchCode !== "") {
            var branch = ListBranchs.filter(x => x.BranchsCodePos != null && x.BranchsCodePos == branchCode);
            if (branch.length > 0)
                return branch[0].BranchsAdd;
        }
        return "Tất cả chi nhánh";
    }
}

export class GiftNameValueConverter {
    toView(Id, ListGifts) {
        if (Id !== "") {
            var gift = ListGifts.filter(x => x.Id != null && x.Id == Id);
            if (gift != null)
                return gift[0].Name;
        }
        return "N/A";
    }
}
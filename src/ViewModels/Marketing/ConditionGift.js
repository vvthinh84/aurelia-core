import { inject } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';

import { QuaySoService } from 'Services/QuaySo/QuaySoService';
import { QuaySoPermission } from 'Configuration/PermissionSettings/QuaySoPermission';

import * as toastr from 'toastr';
import moment from 'moment';
import 'select2';
import 'eonasdan-bootstrap-datetimepicker';

@inject(QuaySoService, QuaySoPermission)
export class ConditionGift {
    ListGifts = [];
    ListConditions = [];
    ListConditionGifts = [];
    ListBranchs = [];

    isViewOnly = false;
    isNoAccess = false;

    constructor(quaySoService, quaySoPermission) {
        this.quaySoService = quaySoService;
        this.quaySoPermission = quaySoPermission;

        this.filterBranch = "";

        this.current = 1;
        this.itemperpage = 10;
        this.pagesize = 10;
    }

    activate() {
        return Promise.all([this.quaySoService.GetListQuaySoGift(),
            this.quaySoService.GetListQuaySoCondition(),
            this.quaySoService.GetListQuaySoConditionGift(),
            this.quaySoService.GetListQuaySoBranch()
        ]).then((rs) => {
            this.ListGifts = rs[0].Data;
            this.ListConditions = rs[1].Data;
            this.ListConditionGifts = rs[2].Data;
            this.ListBranchs = rs[3].Data.ListBranchs;

            var username = Lockr.get('UserInfo').Username;
            this.isViewOnly = this.quaySoPermission.IsViewOnly(username, "conditiongift");
            this.isNoAccess = this.quaySoPermission.IsNoAccess(username, "conditiongift");

        })
    }

    attached() {
        $('#filterByBranch').select2().val(this.filterBranch);
        $('#filterByBranch').select2({
            placeholder: "- Chọn Chi nhánh -",
            allowClear: true
        }).on('change', () => {
            this.filterBranch = $('#filterByBranch').val();
        });
    }

    bind(ct, ovr) {
        ovr.bindingContext.total = this.ListConditions.length;
    }

    AddConditionGift() {
        this.isEdit = false;
        this.InitConditionGiftInfo();
        this.LoadDDLAddEditDieuKienQuay();
    }

    EditConditionGift(conditiongift) {
        this.isEdit = true;
        this.currentConditionGift = conditiongift;
        this.LoadDDLAddEditDieuKienQuay();
    }

    ChangeConditionGiftStatus(conditiongift) {
        this.isEdit = true;
        this.currentConditionGift = conditiongift;
        if (conditiongift.Status === "D") {
            this.currentConditionGift.Status = "A";
        } else {
            this.currentConditionGift.Status = "D";
        }
        this.SubmitConditionGift();
    }

    SubmitConditionGift() {
        if (!this.ValidateConditionGiftBeforeSubmit()) {
            return false;
        }

        var jsonToPost = {};
        jsonToPost = this.currentConditionGift;
        this.quaySoService.InsertOrUpdateQuaySoConditionGift(jsonToPost).then((data) => {
            if (data.Result == true) {
                this.quaySoService.GetListQuaySoConditionGift().then((data) => {
                    this.ListConditionGifts = data.Data;
                });
                $('#addEditConditionGift').modal('hide');
                toastr.success(this.isEdit === false ? 'Tạo mới Quà tặng tương ứng Điều kiện quay thành công!' : 'Cập nhật Quà tặng tương ứng Điều kiện quay thành công!', "Quà tặng tương ứng Điều kiện quay");
                return true;
            } else {
                toastr.error("Lỗi! Xin thử lại!");
                return false;
            }
        });
    }

    LoadDDLAddEditDieuKienQuay() {
        $('#ddlAddEditDieuKienQuay').select2().val(this.currentConditionGift.ConditionId);
        $('#ddlAddEditDieuKienQuay').select2({
            placeholder: "- Chọn Điều kiện quay -",
            allowClear: true
        }).on('change', () => {
            this.currentConditionGift.ConditionId = $('#ddlAddEditDieuKienQuay').val();
        });
    }

    ValidateConditionGiftBeforeSubmit() {
        var strErrorMsg = "";
        if (this.currentConditionGift.ConditionId == "" || typeof this.currentConditionGift.ConditionId === "undefined")
            strErrorMsg += "• Điều kiện quay phải chọn. <br/>";

        if (this.currentConditionGift.GiftId == "" || typeof this.currentConditionGift.GiftId === "undefined")
            strErrorMsg += "• Quà tặng phải chọn. <br/>";

        if (this.currentConditionGift.TotalQuantity == "" || typeof this.currentConditionGift.TotalQuantity === "undefined")
            strErrorMsg += "• Số lượng tổng phải nhập. <br/>";

        if (this.isEdit === false && (this.currentConditionGift.UsedQuantity == "" || typeof this.currentConditionGift.UsedQuantity === "undefined"))
            strErrorMsg += "• Số lượng đã SD phải nhập. <br/>";

        if (parseInt(this.currentConditionGift.TotalQuantity) < parseInt(this.currentConditionGift.UsedQuantity))
            strErrorMsg += "• Số lượng đã SD phải nhỏ hơn Số lượng tổng. <br/>";

        if (this.currentConditionGift.Status == "" || typeof this.currentConditionGift.Status === "undefined")
            strErrorMsg += "• Tình trạng phải nhập. <br/>";

        if (strErrorMsg !== "") {
            toastr.error(strErrorMsg, "Lỗi dữ liệu nhập!");
            return false;
        }
        return true;
    }

    InitConditionGiftInfo() {
        this.currentConditionGift = {};
        this.currentConditionGift.Status = "D";
        this.currentConditionGift.ConditionId = "";
        this.currentConditionGift.GiftId = "";
        this.currentConditionGift.TotalQuantity = "";
        this.currentConditionGift.UsedQuantity = "";
    }
}

export class MergeBrachAndConditionValueConverter {
    toView(condition, ListBranchs) {
        if (condition != null) {
            var branch = ListBranchs.filter(x => x.BranchsCodePos != null && x.BranchsCodePos == condition.BrandCode);
            if (branch.length > 0)
                return "[" + branch[0].BranchsShortAdd + "] - Từ " + moment(condition.DateFrom).format('DD/MM/YYYY') + " đến " + moment(condition.DateTo).format('DD/MM/YYYY');
        }
        return "[Tất cả chi nhánh" + "] - Từ " + moment(condition.DateFrom).format('DD/MM/YYYY') + " đến " + moment(condition.DateTo).format('DD/MM/YYYY');
    }
}

export class BranchNameValueConverter {
    toView(Id, ListConditions, ListBranchs) {
        if (Id !== "") {
            var condition = ListConditions.filter(x => x.Id != null && x.Id == Id);
            if (condition.length > 0) {
                var branch = ListBranchs.filter(x => x.BranchsCodePos != null && x.BranchsCodePos == condition[0].BrandCode);
                if (branch.length > 0)
                    return branch[0].BranchsAdd;
            }
        }
        return "Tất cả chi nhánh";
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

export class FilterByGiftValueConverter {
    toView(array, giftId) {
        if (giftId) {
            return array.filter(x => x.GiftId != null && x.GiftId == giftId);
        }
        return array;
    }
}

export class FilterByConditionValueConverter {
    toView(array, conditionId) {
        if (conditionId) {
            return array.filter(x => x.ConditionId != null && x.ConditionId == conditionId);
        }
        return array;
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

export class CampaignNameValueConverter {
    toView(Id, ListGifts) {
        if (Id !== "") {
            var gift = ListGifts.filter(x => x.Id != null && x.Id == Id);
            if (gift != null)
                return gift[0].CampaignName;
        }
        return "N/A";
    }
}

export class ConditionNameValueConverter {
    toView(Id, ListConditions) {
        if (Id !== "") {
            var condition = ListConditions.filter(x => x.Id != null && x.Id == Id);
            //console.log(condition);
            if (condition != null)
                return "Từ " + moment(condition[0].DateFrom).format('DD/MM/YYYY') + " đến " + moment(condition[0].DateTo).format('DD/MM/YYYY');
        }
        return "N/A";
    }
}

export class FilterByBranchValueConverter {
    toView(array, branchsCodePos, ListConditions) {
        //debugger;
        //branchsCodePos = 'CS_0000389';
        //console.log(branchsCodePos);
        if (branchsCodePos != "" && branchsCodePos != null && typeof branchsCodePos !== "undefined") {
            var condition = ListConditions.filter(x => x.BrandCode != null && x.BrandCode === branchsCodePos);
            //console.log(condition);
            var returnedArr = []
            if (condition.length > 0) {
                //console.log(condition.length);
                for (var i = 0; i < condition.length; i++) {
                    //console.log(i);
                    //console.log(condition[i].Id);
                    var arrFilter = array.filter(x => x.ConditionId != null && x.ConditionId === condition[i].Id);
                    if (arrFilter != null) {
                        for (var t in arrFilter)
                            returnedArr.push(arrFilter[t]);
                    }
                }
            }
            //console.log(returnedArr);
            return returnedArr;
        }
        return array;
    }
}
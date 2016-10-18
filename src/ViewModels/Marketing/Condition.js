import { inject } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';

import { QuaySoService } from 'Services/QuaySo/QuaySoService';
import { QuaySoPermission } from 'Configuration/PermissionSettings/QuaySoPermission';

import * as toastr from 'toastr';
import 'select2';
import 'eonasdan-bootstrap-datetimepicker';

@inject(QuaySoService, QuaySoPermission)
export class Condition {
    ListConditions = [];
    ListBranchs = [];
    ListCampaigns = [];
    isViewOnly = false;
    isNoAccess = false;
    constructor(quaySoService, quaySoPermission) {
        this.quaySoService = quaySoService;
        this.quaySoPermission = quaySoPermission;

        this.filterBranch = "";
        //Pagination
        this.current = 1;
        this.itemperpage = 10;
        this.pagesize = 10;
    }

    activate() {
        return Promise.all([this.quaySoService.GetListQuaySoCondition(),
            this.quaySoService.GetListQuaySoBranch(),
            this.quaySoService.GetListQuaySoCampaign()
        ]).then((rs) => {
            this.ListConditions = rs[0].Data;
            this.ListBranchs = rs[1].Data.ListBranchs;
            this.ListCampaigns = rs[2].Data;

            var username = Lockr.get('UserInfo').Username;
            this.isViewOnly = this.quaySoPermission.IsViewOnly(username, "condition");
            this.isNoAccess = this.quaySoPermission.IsNoAccess(username, "condition");

        })
    }

    bind(ct, ovr) {
        ovr.bindingContext.total = this.ListConditions.length;
    }

    attached() {
        $('#filterByBranch').select2().val(this.filterBranch);
        $('#filterByBranch').select2({
            placeholder: "- Chọn Chi nhánh -",
            allowClear: true
        }).on('change', () => {
            this.filterBranch = $('#filterByBranch').val();
            //console.log(this.filterBranch);
        });

        $('.dtDatePlay').datetimepicker();
        $(".dtDatePlay").on("dp.change", () => {
            this.currentCondition.DatePlay = $('#dtDatePlay').val();
        });

        $('.dtDateFrom').datetimepicker();
        $(".dtDateFrom").on("dp.change", () => {
            this.currentCondition.DateFrom = $('#dtDateFrom').val();
        });

        $('.dtDateTo').datetimepicker();
        $(".dtDateTo").on("dp.change", () => {
            this.currentCondition.DateTo = $('#dtDateTo').val();
        });
    }
    AddCondition() {
        this.isEdit = false;
        this.InitConditionInfo();
        this.LoadDDLAddEditConditionBranch(this.currentCondition.BrandCode);
    }

    EditCondition(currentCondition) {
        this.isEdit = true;
        this.currentCondition = currentCondition;
        this.LoadDDLAddEditConditionBranch(this.currentCondition.BrandCode);
    }

    LoadDDLAddEditConditionBranch(brandCode) {
        $('#ddlAddEditConditionBranch').select2().val(this.currentCondition.BrandCode);
        $('#ddlAddEditConditionBranch').select2({
            placeholder: "- Chọn Chi nhánh -",
            allowClear: true
        }).on('change', () => {
            this.currentCondition.BrandCode = $('#ddlAddEditConditionBranch').val();
        });
    }


    ChangeConditionStatus(condition) {
        this.isEdit = true;
        this.currentCondition = condition;
        if (condition.Status === "D") {
            this.currentCondition.Status = "A";
        } else {
            this.currentCondition.Status = "D";
        }
        this.SubmitCondition();
    }

    SubmitCondition() {
        if (!this.ValidateConditionBeforeSubmit()) {
            return false;
        }

        var jsonToPost = {};
        jsonToPost = this.currentCondition;
        this.quaySoService.InsertOrUpdateQuaySoCondition(jsonToPost).then((data) => {
            if (data.Result == true) {
                //Reload data
                this.quaySoService.GetListQuaySoCondition().then((data) => {
                    this.ListConditions = data.Data;
                });
                $('#addEditCondition').modal('hide');
                toastr.success(this.isEdit === false ? 'Tạo mới Điều kiện quay thành công!' : 'Cập nhật Điều kiện quay thành công!', "Điều kiện quay");
                return true;
            } else {
                toastr.error("Lỗi! Xin thử lại!");
                return false;
            }
        });
    }

    ValidateConditionBeforeSubmit() {
        var strErrorMsg = "";
        if (this.currentCondition.DateFrom == "" || typeof this.currentCondition.DateFrom === "undefined")
            strErrorMsg += "• Từ ngày phải nhập. <br/>";

        if (this.currentCondition.DateTo == "" || typeof this.currentCondition.DateTo === "undefined")
            strErrorMsg += "• Đến ngày phải nhập. <br/>";

        if (this.currentCondition.Status == "" || typeof this.currentCondition.Status === "undefined")
            strErrorMsg += "• Tình trạng phải nhập. <br/>";

        if (strErrorMsg !== "") {
            toastr.error(strErrorMsg, "Lỗi dữ liệu nhập!");
            return false;
        }
        return true;
    }

    InitConditionInfo() {
        this.currentCondition = {};
        this.currentCondition.Status = "D";
        this.currentCondition.BrandCode = "";
        this.currentCondition.DatePlay = null;
        this.currentCondition.OrderCode = "";
        this.currentCondition.ApplyProductCode = "";
        this.currentCondition.DateFrom = null;
        this.currentCondition.DateTo = null;
        this.currentCondition.CreatedDate = null;
        this.currentCondition.CampaignId = null;
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

export class FilterByOrderCodeValueConverter {
    toView(array, obj) {
        if (obj) {
            return array
                .filter(x => ((x.OrderCode != null) && (x.OrderCode.indexOf(obj) != -1)));
        }
        return array;
    }
}

export class BranchNameValueConverter {
    toView(branchCode, ListBranchs) {
        if (branchCode !== "") {
            var branch = ListBranchs.filter(x => x.BranchsCodePos != null && x.BranchsCodePos == branchCode);
            //console.log(branch);
            if (branch.length > 0)
                return branch[0].BranchsAdd;
        }
        return "Tất cả chi nhánh";
    }
}

export class FilterByBranchValueConverter {
    toView(array, branch) {
        if (branch != "" && branch != null && typeof branch !== "undefined") {
            return array.filter(x => x.BrandCode != null && x.BrandCode == branch);
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
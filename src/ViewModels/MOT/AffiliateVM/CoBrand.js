import { inject } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';
import { CoBrandService } from 'Services/MOT/CoBrandService';
import * as toastr from 'toastr';

@inject(CoBrandService)
export class CoBrand {

    ListResults = [];
    CoBrandItem = {};

    ListLastFailed = [];
    strLastFailed = "";
    IsSuccess = "";
    TotalSuccess = 0;

    constructor(coBrandService) {
        this.coBrandService = coBrandService;
    }

    activate(params) {
        if (params.result === "success") {
            this.IsSuccess = "true";
            this.TotalSuccess = params.resultCount;
        }

        if (params.result === "failed") {
            this.IsSuccess = "failed";
        }

        if (params.fail != null) {
            var values = params.fail.split(".");
            for (var i = 0; i < values.length; i++) {
                this.ListLastFailed.push(values[i]);
                this.strLastFailed += (i == 0 ? values[i] : (", " + values[i]));
            }
        }
    }

    attached() {
        if (this.IsSuccess === "true") {
            var thongBao = "Import " + this.TotalSuccess + " số điện thoại từ Excel thành công!";
            toastr.success(thongBao, "Success");
        }

        if (this.IsSuccess === "failed") {
            toastr.error("Import Số điện thoại từ Excel thất bại! Xin kiểm tra lại dữ liệu trong file Excel và thử lại", "Failed");
        }
    }

    SearchByKeyword() {
        this.coBrandService.SearchCoBrandItem(this.refKeywordSearch.value).then((data) => {
            this.ListResults = data.Data;
        });
    }

    async InsertCoBrandItem() {
        if (!this.ValidateInfoBeforeSubmit()) {
            return false;
        }

        var jsonToPost = this.CoBrandItem;
        let response = await this.coBrandService.InsertCoBrandItem(jsonToPost);
        if (response != null) {
            if (response.Result == true) {
                this.ClearForm();
                toastr.success("Thêm mới Số điện thoại thành công!", "Success");
            } else {
                toastr.error("Thêm mới Số điện thoại thất bại! Xin thử lại.", "Error");
            }
        }
    }

    ClearForm() {
        this.CoBrandItem.Phone = "";
    }

    ValidateInfoBeforeSubmit() {

        var phoneReg = /^[0-9]{6,11}$/;

        var strErrorMsg = "";
        if (this.CoBrandItem.Phone == "" || typeof this.CoBrandItem.Phone === "undefined") {
            strErrorMsg += "• Số Điện thoại phải nhập. <br/>";
        } else if (!phoneReg.test(this.CoBrandItem.Phone)) {
            strErrorMsg += "• Số Điện thoại không hợp lệ. <br/>";
        }


        if (this.CoBrandItem.Type == "" || typeof this.CoBrandItem.Type === "undefined")
            strErrorMsg += "• Type phải nhập. <br/>";

        if (this.CoBrandItem.Code == "" || typeof this.CoBrandItem.Code === "undefined")
            strErrorMsg += "• Code phải nhập. <br/>";

        if (strErrorMsg !== "") {
            toastr.error(strErrorMsg, "Lỗi dữ liệu nhập!");
            return false;
        }
        return true;
    }
}

export class StatusNameValueConverter {
    toView(status) {
        if (status === "A") {
            return "Chưa sử dụng";
        }

        if (status === "D") {
            return "Đã sử dụng";
        }
        return status;
    }
}
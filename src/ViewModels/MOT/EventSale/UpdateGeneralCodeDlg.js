import { DialogController } from 'aurelia-dialog';
import { inject } from 'aurelia-dependency-injection';
import 'eonasdan-bootstrap-datetimepicker';

import { Validation } from 'aurelia-validation';
import * as toastr from "toastr";

@inject(DialogController, Validation)
export class UpdateGeneralCodeDlg {
    dialogController: DialogController;


    entity: {};
    check: boolean;
    constructor(dialogController, validation) {

        this.dialogController = dialogController;
        this.check = true;

        this.validation = validation.on(this)
            .ensure('entity.Name').isNotEmpty().withMessage("Vui lòng nhập tên")
            .ensure('entity.Code').isNotEmpty().withMessage("Vui lòng mã Code")
            .ensure('entity.PosCode').isNotEmpty().withMessage("Vui lòng mã Pos")






    }

    activate(data) {
        if (data == undefined) {
            this.entity = {};
            this.entity.FromPrice = 0;
            this.entity.ToPrice = 0;
            this.entity.DiscountValue = 0;
            this.entity.TotalNumber = 0;
            this.check = false;

        } else {
            this.entity = data;
            this.check = true;
        }


    }

    submit(entity) {


        if (entity.TotalNumber >= 1 && entity.Name != "" && entity.Code != "" && entity.PosCode && entity.StartDate && entity.EndDate && (new Date(this.entity.EndDate) >= new Date(this.entity.StartDate))) {

            this.dialogController.ok(entity);
        } else {
            if (this.entity.StartDate == "" || this.entity.StartDate === 'Invalid date') {
                toastr.warning('Xin vui lòng nhập Từ ngày', "EventSale");
            } else if (this.entity.EndDate == "" || this.entity.EndDate === 'Invalid date') {
                toastr.warning('Xin vui lòng nhập đến ngày', "EventSale");
            } else if (new Date(this.entity.EndDate) < new Date(this.entity.StartDate)) {
                toastr.warning('Xin vui lòng nhập đến ngày lớn hơn bằng từ ngày', "EventSale");
            } else if (entity.TotalNumber <= 0) {
                toastr.warning('Xin vui lòng nhập Số lượng áp dụng', "EventSale");
            } else {
                toastr.warning('Xin vui lòng nhập đúng thông tin', "EventSale");


            }


        }

    }
    attached() {

        $('#txtFilterDateStart').datetimepicker({
            format: "YYYY-MM-DD HH:mm:ss "
        });
        $("#txtFilterDateStart").on("dp.change", () => {
            this.entity.StartDate = $('#txtFilterDateStart').val();
        });


        $('#txtFilterDateEnd').datetimepicker({
            format: "YYYY-MM-DD HH:mm:ss "
        });
        $("#txtFilterDateEnd").on("dp.change", () => {
            this.entity.EndDate = $('#txtFilterDateEnd').val();
        });


    }

}
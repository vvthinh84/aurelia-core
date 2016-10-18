import { inject } from 'aurelia-framework';
import 'eonasdan-bootstrap-datetimepicker';

import { DialogService } from 'aurelia-dialog';
import { UpdateGeneralCodeDlg } from './UpdateGeneralCodeDlg';
import { DeleteGeneralCodeDlg } from './DeleteGeneralCodeDlg';
import { EventSaleService } from 'Services/MOT/EventSaleService';
import { ExcelService } from 'Helpers/ExcelHelper';
import { DateFormat } from 'Helpers/datetime-format';
import * as toastr from "toastr";

@inject(DialogService, EventSaleService, ExcelService, DateFormat)
export class GeneralCode {
    listEvent;
    entity;
    testTypes = {
        "Name": "String",
        "Code": "String",
        "StartDate": "String",
        "EndDate": "String",
        "FromPrice": "String",
        "ToPrice": "String",
        "DiscountValue": "String",
        "TotalNumber": "String",
        "UsedNumber": "String",
        "PosCode": "String",
        "Status": "String"
    };
    headerTable = [
        "Tên",
        "Mã Code",
        "Áp dụng Từ ngày",
        "Áp dụng Đến ngày",
        "Từ giá",
        "Đến giá",
        "Giá trị giảm",
        "Số lượng áp dụng",
        "Đã sử dụng",
        "Mã pos",
        "Trạng thái"
    ];
    constructor(dialogService, eventSaleService, excelService, dateFormat) {
        this.dialogService = dialogService;
        this.eventSaleService = eventSaleService;
        this.current = 1;
        this.itemperpage = 10;
        this.pagesize = 8;
        this.excelService = excelService;
        this.dateFormat = dateFormat;
    }
    activate() {
        return Promise.all([this.eventSaleService.GetListEventSale()]).then(rs => {
            this.listEvent = rs[0].Data;
            this.total = rs[0].ItemsCount;

        });

    }

    attached() {
        $('[data-toggle="tooltip"]').tooltip()
    }

    CreateGeneralCode(item) {
        this.dialogService.open({
            viewModel: UpdateGeneralCodeDlg,
            model: item
        }).then((result) => {

            if (!result.wasCancelled) {
                if (result.output.Id > 0) {

                    this.eventSaleService.UpdateEventSale(result.output).then(rs => {

                        if (rs.Result == true) {
                            this.activate();
                            toastr.success('Cập nhật EventSale thành công!', "EventSale");
                        } else {
                            this.activate();
                            toastr.success('Lỗi không cập nhật EventSale!', "EventSale");

                        }

                    })
                } else {


                    this.eventSaleService.InsertEventSale(result.output).then(rs => {
                        if (rs.Result == true) {

                            this.activate();
                            toastr.success('Tạo mới EventSale thành công!', "EventSale");

                        } else {
                            toastr.success('Lỗi không Tạo mới EventSale!', "EventSale");
                            this.activate();
                        }

                    })

                }

            } else {

            }
        });
    }
    DeleteGeneralCode(item) {
        this.dialogService.open({
            viewModel: DeleteGeneralCodeDlg,
            model: item
        }).then((result) => {

            if (!result.wasCancelled) {

                this.eventSaleService.DeactiveEventSale(result.output.Id).then(rs => {
                    toastr.success('DeActive EventSale thành công!', "Banner");
                    this.activate();
                })

            } else {
                console.log('bad');
            }
        });
    }

    download() {
        this.excelService.download(this.excelService.jsonToSsXml(this.exportExcel(this.listEvent), this.headerTable, this.testTypes), 'ReportEventSale.xls', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }

    exportExcel(ListOrder) {

        var testJson = [];
        var obj = {};
        for (var item of ListOrder) {

            obj.Name = item.Name;
            obj.Code = item.Code;
            obj.StartDate = this.dateFormat.getDateFormat(new Date(item.StartDate));
            obj.EndDate = this.dateFormat.getDateFormat(new Date(item.EndDate));
            obj.FromPrice = item.FromPrice;
            obj.ToPrice = item.ToPrice;

            obj.DiscountValue = item.DiscountValue;
            obj.TotalNumber = item.TotalNumber;
            obj.UsedNumber = item.UsedNumber;
            obj.PosCode = item.PosCode;
            obj.Status = item.Status;



            testJson.push(obj);
            obj = {};
        }

        return testJson;

    }
}

export class FilterByNameValueConverter {
    toView(array, title) {
        if (title !== "" && title != null && typeof title !== "undefined") {
            return array.filter(x => ((x.Title !== null) && (x.Name.indexOf(title) !== -1)));
        }
        return array;
    }
}
export class FilterByCodeValueConverter {
    toView(array, title) {
        if (title !== "" && title != null && typeof title !== "undefined") {
            return array.filter(x => ((x.Title !== null) && (x.Code.indexOf(title) !== -1)));
        }
        return array;
    }
}
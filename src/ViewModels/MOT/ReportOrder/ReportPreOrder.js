import { inject } from 'aurelia-framework';

import { ReportService } from 'Services/MOT/ReportService';
import { ExcelService } from 'Helpers/ExcelHelper';
import { DateFormat } from 'Helpers/datetime-format';

import 'select2';

@inject(ReportService, ExcelService, DateFormat)
export class ReportPreOrder {
    obj = {};
    ListOrder;
    ListFilter;
    testTypes = {
        "Stt": "String",
        "NgayDat": "String",
        "NhanvienSO": "String",
        "OrderId": "String",
        "TenKh": "String",
        "Phone": "String",
        "Color": "String",
        "Msp": "String",
        "Chinhanh": "String",
        "MaChinhanh": "String",
        "Khuvuc": "String",
        "Trangthai": "String"
    };
    headerTable = [
        "STT",
        "Ngày đặt",
        "Nhân viên Seo",
        "OrderId",
        "Tên khách hàng",
        "Điện thoại",
        "Màu",
        "Mã sản phẩm",
        "Chi nhánh",
        "Mã chi nhánh",
        "Khu vực",
        "Trang thái"
    ];

    selectedProduct = {};
    constructor(reportService, excelService, dateFormat) {
        this.reportService = reportService;
        this.current = 1;
        this.itemperpage = 10;
        this.pagesize = 8;
        this.selectedProduct.CampaignId = "112";
        this.excelService = excelService;
        this.dateFormat = dateFormat;
    }
    activate() {

        return this.dataServer(this.selectedProduct);

    }
    async dataServer(selectedProduct) {
        let response = await this.reportService.GetReportPreOrder(selectedProduct);

        if (response != null) {
            this.ListFilter = response.Data.ListFilter;
            this.ListOrder = response.Data.ListOrder;
            this.total = response.ItemsCount;


        }


    }
    attached() {

        ($('#filterByCampaign').select2().val(this.selectedProduct.CampaignId));
        $('#filterByCampaign').select2({
            allowClear: true
        }).on('change', () => {
            this.selectedProduct.CampaignId = $('#filterByCampaign').val();
            this.dataServer(this.selectedProduct);
        });


    }

    download() {
        this.excelService.download(this.excelService.jsonToSsXml(this.exportExcel(this.ListOrder), this.headerTable, this.testTypes), 'ReportPreOrder.xls', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }

    exportExcel(ListOrder) {

        var testJson = [];
        var obj = {};
        let i = 1;
        for (var item of ListOrder) {
            obj.Stt = i++;
            obj.NgayDat = this.dateFormat.getDateFormat(new Date(item.NgayDat));
            obj.NhanvienSO = item.NhanvienSO;
            obj.OrderId = item.OrderId;
            obj.TenKh = item.TenKh;
            obj.Phone = item.Phone;
            obj.Color = item.Color;
            obj.Msp = item.Msp;

            obj.Chinhanh = item.Chinhanh;
            obj.MaChinhanh = item.MaChinhanh;
            obj.Khuvuc = item.Khuvuc;
            obj.Trangthai = item.Trangthai;


            testJson.push(obj);

            obj = {};
        }

        return testJson;

    }


}
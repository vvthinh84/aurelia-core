import { inject } from 'aurelia-framework';
import { ReportService } from 'Services/MOT/ReportService';
import { ExcelService } from 'Helpers/ExcelHelper';
import 'select2';

@inject(ReportService, ExcelService)
export class ReportOrderFlashDeal {
    obj = {};
    ListOrder;
    ListFilter;
    testTypes = {
        "Stt": "String",
        "FullName": "String",
        "Phone": "String",
        "ProductName": "String",
        "Email": "String",
        "CampaignName": "String"
    };
    headerTable = [
        "STT",
        "Họ và tên",
        "Điện thoại",
        "Sản phẩm",
        "Email",
        "CampaignName"
    ];
    selectedProduct = {};
    constructor(reportService, excelService) {
        this.reportService = reportService;
        this.current = 1;
        this.itemperpage = 10;
        this.pagesize = 8;
        this.selectedProduct.CampaignId = "99";
        this.excelService = excelService;
    }
    activate() {
        this.dataServer(this.selectedProduct);
    }
    async dataServer(selectedProduct) {
        let response = await this.reportService.GetReportOrderFlashDeal(selectedProduct);

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
        this.excelService.download(this.excelService.jsonToSsXml(this.exportExcel(this.ListOrder), this.headerTable, this.testTypes), 'ReportOrderFlashDeal.xls', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }

    exportExcel(ListOrder) {

        var testJson = [];
        var obj = {};
        for (var item of ListOrder) {

            obj.Stt = item.Stt;
            obj.FullName = item.FullName;
            obj.Phone = item.Phone;
            obj.ProductName = item.ProductName;
            obj.Email = item.Email;
            obj.CampaignName = item.CampaignName

            testJson.push(obj);
            obj = {};
        }

        return testJson;

    }


}
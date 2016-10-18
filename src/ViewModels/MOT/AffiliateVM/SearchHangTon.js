import { inject } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';
import { EnterpriseService } from 'Services/EnterpriseSvc/EnterpriseService';
import 'eonasdan-bootstrap-datetimepicker';
import { UtilitiesJS } from 'Helpers/UtilitiesJS';
import { ExcelService } from 'Helpers/ExcelHelper';
import * as toastr from "toastr";

@inject(EnterpriseService, UtilitiesJS, ExcelService)
export class SearchHangTon {
    ListDN = [];
    SanPham = {};
    pendding = true;
    constructor(enterpriseService, utilitiesJS, excelService) {
        this.enterpriseService = enterpriseService;
        this.excelService = excelService;


        //Pagination
        this.current = 1;
        this.itemperpage = 20;


    }

    activate() {
        this.Init();
    }




    attached() {

    }

    Init() {

        this.SanPham.Products = "";
        this.SanPham.Stores = "";
    }

    testTypes = {
        "STT": "String",
        "ProductCode": "String",
        "ProductId": "String",
        "ProductName": "String",
        "ProductColorCode": "String",
        "ColorName": "String",
        "Tonthucte": "String",
        "StoreCode": "String",
        "StoreName": "String"

    };
    headerTable = [
        "STT",
        "Mã code",
        "Mã sản phẩm",
        "Sản phẩm",
        "Mã màu",
        "Màu",
        "Tồn thực tế",
        "Mã Store",
        "Store"

    ];

    download() {
        this.excelService.download(this.excelService.jsonToSsXml(this.exportExcel(), this.headerTable, this.testTypes), 'Excel.xls', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }

    exportExcel() {

        var testJson = [];
        var obj = {};
        var i = 1;
        for (var item of this.GiftDN.items) {
            obj.STT = i;
            obj.ProductCode = item.ProductCode;
            obj.ProductId = item.ProductId;
            obj.ProductName = item.ProductName;
            obj.ProductColorCode = item.ProductColorCode;
            obj.ColorName = item.ColorName;
            obj.Tonthucte = item.Tonthucte;
            obj.StoreCode = item.StoreCode;
            obj.StoreName = item.StoreName
            i++;
            testJson.push(obj);
            obj = {};
        }

        return testJson;

    }


    ValidateBeforeSubmit() {

        var strErrorMsg = "";
        if (this.SanPham.Products == "" || typeof this.SanPham.Products === "undefined")
            strErrorMsg += "• Lỗi. <br/>";
        if (strErrorMsg !== "") {
            toastr.error(strErrorMsg, "Lỗi dữ liệu nhập!");
            return false;
        }
        return true;

    }

    SearchLienHe() {
        var obj = {};
        obj.ListProductCode = this.SanPham.Products;
        obj.StoreCode = this.SanPham.Stores;
        this.pendding = !this.pendding;
        if (this.ValidateBeforeSubmit() == true) {
            this.enterpriseService.GetListDanhsachton(obj).then((rs) => {

                if (rs.Result == true) {

                    this.ListDN = rs.Data;
                    this.pagesize = Math.round(rs.Data.length / 20) + 1;
                    this.pendding = !this.pendding;
                    $('#myModal').modal('hide');
                }
            });
        } else {
            this.pendding = !this.pendding;
            $('#myModal').modal('hide');
        }
    }

}



export class ToToTalSoLuongValueConverter {
    toView(array) {
        var tt = 0;
        if (array == undefined) {
            return 0;
        } else {
            return array.length;
        }

    }
}
export class ToTotalAmountValueConverter {
    toView(arr) {
        var tt = 0;
        for (var i in arr) {
            tt += arr[i].Tonthucte;
        }
        return tt;
    }
}
export class FilterByProductColorValueConverter {
    toView(array, obj) {
        if (obj) {
            return array
                .filter(x => ((x.ProductColorCode != null) && (x.ProductColorCode.toLowerCase().indexOf(obj.toLowerCase().trim()) != -1)) ||
                    ((x.ProductCode != null) && (x.ProductCode == obj)) ||
                    ((x.ProductId != null) && (x.ProductId == obj)) ||
                    ((x.ProductName != null) && (x.ProductName.toLowerCase().indexOf(obj.toLowerCase().trim()) != -1)) ||
                    ((x.ColorName != null) && (x.ColorName.toLowerCase().indexOf(obj.toLowerCase().trim()) != -1)) ||
                    ((x.StoreCode != null) && (x.StoreCode.toLowerCase().indexOf(obj.toLowerCase().trim()) != -1)) ||
                    ((x.StoreName != null) && (x.StoreName.toLowerCase().indexOf(obj.toLowerCase().trim()) != -1))

                );
        }
        return array;
    }
}
export class FilterByStroreCodeValueConverter {
    toView(array, obj) {
        if (obj) {
            return array
                .filter(x => ((x.StoreCode != null) && (x.StoreCode.toLowerCase().indexOf(obj.toLowerCase().trim()) != -1)));
        }
        return array;
    }
}
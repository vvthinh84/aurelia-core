import { inject, BindingEngine, LogManager, computedFrom } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { DialogService } from 'aurelia-dialog';

import { UtilitiesJS } from 'Helpers/UtilitiesJS';
import { EnterpriseService } from 'Services/EnterpriseSvc/EnterpriseService';
import { ExcelService } from 'Helpers/ExcelHelper';

import 'eonasdan-bootstrap-datetimepicker';
import * as toastr from 'toastr';

@inject(Router, BindingEngine, DialogService, UtilitiesJS, EnterpriseService, ExcelService)
export class OrderMng {


    Orders = [];

    checklst = [];
    search = {};
    od = {};
    csvContent = "";
    ctr = 0;



    @computedFrom('mydata.items.length')
    get _TongTien() {
        this.TotalAmount = 0;
        if (this.mydata) {
            if (this.mydata.items.length == 0) {
                this.TotalAmount = 0;
            } else {
                for (var y = 0; y < this.mydata.items.length; y++) {
                    this.TotalAmount += this.mydata.items[y].Total;
                }
            }
            return this.TotalAmount;
        }

    }





    goToListProductsCash() {

        this.theRouter.navigate(`ListProductsCash`);
    }

    goToInstalment() {
        this.theRouter.navigate(`ListProductsInstalment`);
    }
    constructor(router, bindingEngine, dialogService, utilitiesJS, enterpriseService, excelService) {

        this.logger = LogManager.getLogger('OrderMng');
        this.excelService = excelService;
        this.dialogService = dialogService;

        this.theRouter = router;
        // this.orderService = orderService;
        this.utilitiesJS = utilitiesJS;
        this.enterpriseService = enterpriseService;
        // EXCEL


        //PAGINATION
        this.current = 1;
        this.itemperpage = 20;
        this.pagesize = 10;
        this.isSearch = false;

        var currentDate = new Date();

        this.search.FromDate = this.utilitiesJS.GetFormattedDate(currentDate);
        this.search.ToDate = this.utilitiesJS.GetFormattedDate(currentDate);

        this.search.FromDateDisplay = this.search.FromDate;
        this.search.ToDateDisplay = this.search.ToDate;



        let subscriptionchecklst = bindingEngine.collectionObserver(this.checklst)
            .subscribe(() => {
                this.logger.info(this.checklst);
            });
        let subscriptioncurrent = bindingEngine.propertyObserver(this, 'current')
            .subscribe(() => {
                this.initOrders();
            });

        Lockr.rm('doanhnghiep');
        Lockr.rm('congty');
        Lockr.rm('Cash');
        Lockr.rm('currentProduct');
        Lockr.rm('Listorderdetail');
        Lockr.rm('businessCode');
    }

    testTypes = {
        "STT": "String",
        "OrderId": "String",
        "Sohoadon": "String",
        "CreatedDate": "String",
        "MaPhieuxuat": "String",
        "Name": "String",
        "Phone": "String",
        "TenCongty": "String",
        "Address": "String",
        "OrderTypeId": "String",
        "Total": "String",
        "StatusName": "String"


    };
    headerTable = [
        "STT",
        "Mã hóa đơn",
        "Mã hóa đơn tại POS",
        "Ngày đặt hàng",
        "Mã phiếu xuất",
        "Họ tên",
        "SĐT",
        "Doanh nghiệp",
        "Địa chỉ",
        "Loại đơn hàng",
        "Tổng tiền",
        "Trạng thái"

    ];
    download() {
        this.excelService.download(this.excelService.jsonToSsXml(this.exportExcel(), this.headerTable, this.testTypes), 'Excel.xls', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }



    exportExcel() {

        var testJson = [];
        var obj = {};
        var i = 1;
        for (var item of this.mydata.items) {
            obj.STT = i;
            obj.OrderId = item.OrderId;
            obj.Sohoadon = item.Sohoadon;
            obj.CreatedDate = this.utilitiesJS.GetFormattedDate(new Date(item.CreatedDate), "DD-MM-YYYY");
            obj.MaPhieuxuat = item.MaPhieuxuat;
            obj.Name = item.Name;
            obj.Phone = item.Phone;
            obj.TenCongty = item.TenCongty;
            obj.Address = item.Address;
            obj.OrderTypeId = item.OrderTypeId == 1 ? "Tiền mặt" : "Trả góp"
            obj.Total = item.Total;
            obj.StatusName = item.StatusName;
            i++;
            testJson.push(obj);
            obj = {};
        }
        return testJson;
    }

    activate() {
        var objtopost = this.initOrders();


        return Promise.all([this.enterpriseService.GetListOrdersEnterprise(objtopost), this.enterpriseService.GetListCompany(), this.enterpriseService.GetListOrdersStatus("StatusBusinessOrder")]).then(
            (rs) => {

                this.Orders = rs[0].Data;

                this.companybusiness = rs[1].Data;
                this.OrderStatus = rs[2].Data;
                this.total = this.Orders.length;
                this.TotalAmount = 0;
                this.getSomeJson(objtopost);

            })

    }

    attached() {


        $('#txtFilterDateStart').datetimepicker({
            defaultDate: this.search.FromDate,
            format: "YYYY-MM-DD"

        });
        $("#txtFilterDateStart").on("dp.change", () => {
            this.dateStartFilter = $('#txtFilterDateStart').val();
            this.FromDateDisplay = $('#txtFilterDateStart').val()
        });


        $('#txtFilterDateEnd').datetimepicker({
            defaultDate: this.search.ToDate,
            format: "YYYY-MM-DD"

        });
        $("#txtFilterDateEnd").on("dp.change", () => {
            this.dateEndFilter = $('#txtFilterDateEnd').val();
            this.ToDateDisplay = $('#txtFilterDateStart').val()

        });
        $("#sanpham tbody tr").click(function() {

            $(this).parent().children().removeClass("selected");
            $(this).addClass("selected");
        });

    }


    bind(ct, ovr) {
        if (this.Orders != null)
            ovr.bindingContext.total = this.Orders.length;
    }

    DateFormatValueConverter(value, format) {
        return moment(value).format(format);
    }



    TotalDay(daya, dayb) {
        var a = new Date(daya);
        var b = new Date(dayb);
        var c = 1000 * 60 * 60 * 24;

        var d = (b.getTime() - a.getTime());

        if ((d / c) >= 0 && (d / c) <= 92) {

            return true;

        } else {

            return false;
        }
    }



    CheckDatetime() {
        if (($('#txtFilterDateStart').val() === '') && ($('#txtFilterDateEnd').val() === '')) {
            return 1; // two null 
        }
        if (($('#txtFilterDateStart').val() !== '') && ($('#txtFilterDateEnd').val() === '')) {
            return 2; // two null
        }
        if (($('#txtFilterDateStart').val() === '') && ($('#txtFilterDateEnd').val() !== '')) {
            return 3; // two null
        }
        if (($('#txtFilterDateStart').val() !== '') && ($('#txtFilterDateEnd').val() !== '')) {
            return 4; // two null
        }


    }
    case3() {
        console.log('case3', JSON.stringify(objtopost));
        var objtopost = this.SearchByFilterInit();
        this.search.FromDateDisplay = this.search.FromDate;
        this.search.ToDateDisplay = $('#txtFilterDateEnd').val();
        objtopost.FromDate = this.search.FromDate;
        objtopost.ToDate = $('#txtFilterDateEnd').val();

        if (new Date(objtopost.ToDate) < new Date(objtopost.FromDate)) {
            toastr.error("Thời gian kết thúc  < thời gian kết thúc bắt đầu. Vui lòng chọn lại.", "Tìm kiếm đơn hàng");
            this.mydata.items = [];

            return;
        } else {
            return this.getSomeJson(objtopost);
        }

    }
    case2() {
        console.log('case2', JSON.stringify(objtopost));
        var objtopost = this.SearchByFilterInit();
        this.search.FromDateDisplay = $('#txtFilterDateStart').val();
        this.search.ToDateDisplay = this.search.ToDate;
        objtopost.FromDate = $('#txtFilterDateStart').val();
        objtopost.ToDate = this.search.ToDate;

        if (new Date(objtopost.FromDate) > new Date(objtopost.ToDate)) {
            toastr.error("Thời gian bắt đầu > thời gian kết thúc. Vui lòng chọn lại.", "Tìm kiếm đơn hàng");
            this.mydata.items = [];

            return;
        } else {
            return this.getSomeJson(objtopost);
        }

    }



    case1() {
        var objtopost = this.SearchByFilterInit();

        if (($('#txtFilterDateStart').val() === '') && ($('#txtFilterDateEnd').val() === '')) {

            console.log('case1', JSON.stringify(objtopost));

            return this.getSomeJson(objtopost);
        }
    }

    case4() {
        var objtopost = this.SearchByFilterInit();
        console.log('case4', JSON.stringify(objtopost));
        if (new Date($('#txtFilterDateStart').val()) < new Date($('#txtFilterDateEnd').val())) {
            if (!this.TotalDay($('#txtFilterDateStart').val(), $('#txtFilterDateEnd').val())) {
                toastr.error("Khoảng thời gian tìm kiếm không được quá 3 tháng.", "Tìm kiếm đơn hàng");
                this.DateToDisplay();
                this.mydata.items = [];
                return;
            } else {
                this.DateToDisplay();
                objtopost.FromDate = $('#txtFilterDateStart').val();
                objtopost.ToDate = $('#txtFilterDateEnd').val();
                return this.getSomeJson(objtopost);

            }

        } else {
            if (new Date($('#txtFilterDateStart').val()) > new Date($('#txtFilterDateEnd').val())) {
                toastr.error("Thời gian bắt đầu > thời gian kết thúc. Vui lòng chọn lại.", "Tìm kiếm đơn hàng");
            }

            this.DateToDisplay();
            this.mydata.items = [];
            return;
        }

    }
    DateToDisplay() {
        this.search.FromDateDisplay = $('#txtFilterDateStart').val();
        this.search.ToDateDisplay = $('#txtFilterDateEnd').val();
    }
    SearchByFilter() {


        switch (this.CheckDatetime()) {
            case 1:
                this.case1();
                break;
            case 2:
                this.case2();
                break;
            case 3:
                this.case3();
                break;
            case 4:
                this.case4();
                break;

        }
    }




    SearchByFilterInit() {
        let searchofobj = {};
        if (this.search.Name) {
            searchofobj.Name = this.search.Name;
        }

        if (this.search.Status) {
            searchofobj.Status = +this.search.Status;
        }
        if (this.search.Phone) {
            searchofobj.Phone = this.search.Phone;
        }

        if (this.dateStartFilter) {
            searchofobj.FromDate = this.search.FromDate;
        }
        if (this.dateEndFilter) {
            searchofobj.ToDate = this.search.ToDate;
        }
        if (this.od.maoder) {
            searchofobj.OrderId = this.od.maoder;
        }
        return searchofobj;
    }

    getSomeJson(obj) {

        return Promise.all([this.enterpriseService.GetListOrdersEnterprise(obj)]).then(
            (rs) => {

                this.Orders = rs[0].Data;
                this.total = this.Orders.length;
                this.TotalAmount = 0;
            });

    }



    initOrders() {
        this.checklst = [];
        let obj = {};
        obj.UserId = Lockr.get('UserInfo').UserId;
        if (this.dateStartFilter) {
            obj.FromDate = this.search.FromDate;
        }
        if (this.dateEndFilter) {
            obj.ToDate = this.search.ToDate;
        }

        obj.FromDate = this.search.FromDate;
        obj.ToDate = this.search.ToDate;

        if (this.search.Name) {
            obj.Name = this.search.Name;
        }

        if (this.search.Status) {
            obj.Status = +this.search.Status;
        }
        if (this.search.Phone) {
            obj.Phone = this.search.Phone;
        }
        obj.OrderId = 0;
        if (this.search.OrderType) {
            obj.OrderTypeId = this.search.OrderType;
        }
        return obj;
    }







    doSubmit() {
        this.isSearch = true;
        if ($('#searchFromDate').val() != '') {
            this.search.FromDate = this.utilitiesJS.GetFormattedDate(new Date($('#searchFromDate').val()));
            this.search.FromDateDisplay = this.search.FromDate;
        }

        if ($('#searchToDate').val() != '') {
            this.search.ToDate = this.utilitiesJS.GetFormattedDate(new Date($('#searchToDate').val()));
            this.search.ToDateDisplay = this.search.ToDate;
        }

        this.initOrders();
    }

    orderToEdit(order) {

        this.theRouter.navigate(`EditOrder/${order.OrderId}`, {
            replace: true
        });
    }

    getShipper(companyId) {}


    DeleteOrderByOrderId(id) {

        this.enterpriseService.DeleteOrderByOrderId(id.OrderId).then((data) => {

            if (data.Result == true) {
                var objtopost = this.initOrders();
                //reload data

                this.enterpriseService.GetListOrdersEnterprise(objtopost).then((rs) => {

                    this.Orders = rs.Data;
                });


                $('#deleteProduct').modal('hide');
                toastr.success('Đơn hàng ' + id.OrderId + ' xóa thành công!', "Đơn Hàng");

            } else {
                toastr.warning('Xóa không thành công!', "Đơn Hàng");
            }
        });
    }



    deleteOrder(item) {
        this.selectedOrderForDelete = item;
    }


}

export class FilterByCompanyNameValueConverter {
    toView(array, obj) {

        if (obj) {
            return array
                .filter(x => x.TenCongty == obj);
        }
        return array;
    }
}



export class FilterLoaiDonHangValueConverter {
    toView(array, obj) {
        if (obj) {

            return array
                .filter(x => x.OrderType && x.OrderType == obj);
        }
        return array;
    }
}

export class FilterLoaiDonHangsValueConverter {
    toView(array, obj) {
        console.log(JSON.stringify(array.filter(x => x.OrderTypeId)));
        if (obj == 0) {
            return array;
        } else {
            return array
                .filter(x => x.OrderTypeId == obj);
        }
    }
}

export class ObjFilterValueConverter {
    toView(array, obj) {
        if (obj != null) {
            Object.keys(obj).forEach(function(key) {
                var val = obj[key];
                if (val) {
                    array = array.filter(x => x[key] && x[key].indexOf(val) != -1);
                }
            });
            return array;
        }
        return array;
    }
}

export class SortValueConverter {
    toView(array, propertyName, direction) {
        var factor = direction === 'ascending' ? 1 : -1;
        return array
            .slice(0)
            .sort((a, b) => {
                return (a[propertyName] - b[propertyName]) * factor
            });
    }
}
export class FilterPhoneValueConverter {
    toView(array, obj) {

        if (obj) {
            return array
                .filter(x => x.Phone && x.Phone === obj.trim());
        }
        return array;
    }
}

export class FilterOrderIDValueConverter {
    toView(array, obj) {

        if (obj) {
            return array
                .filter(x => x.OrderId && x.OrderId == obj.trim());
        }
        return array;

    }


}
export class FilterByEmailValueConverter {
    toView(array, obj) {
        if (obj) {
            return array
                .filter(x => x.Email && x.Email.indexOf(obj.trim()) != -1);
        }


        return array;
    }
}
export class FilterByNameValueConverter {
    toView(array, obj) {
        if (obj) {
            return array
                .filter(x => x.Name && x.Name.indexOf(obj.trim()) != -1);
        }

        return array;
    }
}
export class FilterByOrderStatusValueConverter {
    toView(array, obj) {
        if (obj == "") {
            return array;
        } else {
            return array
                .filter(x => x.Status == obj);
        }
    }
}





export class ToTextValueConverter {
    toView(value) {
        var str = '';
        switch (value) {
            case 1:
                return 'Đơn hàng mới';
            case 2:
                return 'Sẵn sàng chuyển VTA';
            case 3:
                return 'Đã chuyển VTA';
            case 4:
                return 'VNP đã nhận hàng';
            case 5:
                return 'VTA hết hàng';
            case 6:
                return 'Giao hàng thành công';
            case 7:
                return 'Giao hàng thất bại';
            case 8:
                return 'Hủy';
            case 9:
                return 'Hủy do hết hàng';
            case 10:
                return 'Khách hàng trả';
            case 12:
                return 'Online đang xử lý';
            case 14:
                return 'Xác nhận trả góp lần 1';
            case 15:

                return 'PPF đang xử lý';
            case 17:
                return 'Hủy trả góp';
            case 18:
                return 'Mới';
            case 19:
                return 'Đã bấm chuyển online';
            default:
                return 'N/A';
        }
    }
}

export class ToTotalPriceValueConverter {
    toView(arr) {
        var tt = 0;
        for (var i in arr) {
            tt += arr[i].Total;
        }
        return tt;
    }
}

// export class ToTotalPriceValueConverter {
//     toView(arr) {
//         var tt = 0;
//         for (var i in arr) {
//             tt += arr[i].Total;
//         }
//         return tt;
//     }
// }



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
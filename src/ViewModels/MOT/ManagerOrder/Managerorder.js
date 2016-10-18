import { inject } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';

import { OrderService } from 'Services/MOT/OrderService';
import { UtilitiesJS } from 'Helpers/UtilitiesJS';
import 'eonasdan-bootstrap-datetimepicker';
import 'pdfmake';
import 'vfs_fonts';
import * as toastr from "toastr";
import moment from 'moment';
import 'select2';


@inject(UtilitiesJS, OrderService)
export class Managerorder {

    OBJ = {};
    numbercheck = 0;
    selectedOrderToPrints = [];
    listOrder = [];
    ListStatus = [];
    ListLoaiDonhang = [];
    ListAffiliate = [];
    ListChinhanh = [];
    ListNhanvien = [];
    constructor(utilitiesJS, orderService) {

        this.checkAll = false;
        this.orderService = orderService;
        //Pagination
        this.current = 1;
        this.itemperpage = 20;
        this.orderselect = 0;

    }

    bind(ct, ovr) {
        ovr.bindingContext.total = this.listOrder.length;
    }
    activate() {
        setTimeout(() => {  this.activate() }, 60000);

        return Promise.all([this.orderService.GetListOrder(this.OBJ)]).then(rs => {
            //console.log(this.OBJ);
            this.listOrder = rs[0].Data.ListOrder;
            this.ListStatus = rs[0].Data.ListStatus;
            this.ListAffiliate = rs[0].Data.ListAffiliate;
            this.ListChinhanh = rs[0].Data.ListChinhanh;
            this.ListNhanvien = rs[0].Data.ListNhanvien;
            this.ListLoaiDonhang = rs[0].Data.ListLoaiDonhang;
            this.pagesize = Math.round(rs[0].Data.ListOrder.length / 20) + 1;
            // convert loai don hang  
            // for (let i in rs[0].Data.ListOrder) {
            //   for (var k of this.ListLoaiDonhang) {
            //     if (rs[0].Data.ListOrder[i].LoaiDonhang === k.Id) {
            //       rs[0].Data.ListOrder[i].LoaiDonhang = k.Name;
            //     }
            //   }
            // }
        })

    }



    attached() {
        $('#txtFilterDateTo').datetimepicker({ format: "YYYY-MM-DD HH:mm:ss " });
        $("#txtFilterDateTo").on("dp.change", () => {
            this.EndDate = $('#txtFilterDateTo').val();
        });

        $('#txtFilterDateFrom').datetimepicker({ format: "YYYY-MM-DD HH:mm:ss " });
        $("#txtFilterDateFrom").on("dp.change", () => {
            this.StartDate = $('#txtFilterDateFrom').val();
        });

        $('#filterByCN').select2().val(this.filterCN);
        $('#filterByCN').select2({
            placeholder: "--- Tất cả ---",
            allowClear: true
        }).on('change', () => {
            this.filterCN = $('#filterByCN').val();
        });

        $('#filterByLoaiDonHang').select2().val(this.filterLoaiDonHang);
        $('#filterByLoaiDonHang').select2({
            placeholder: "--- Tất cả ---",
            allowClear: true
        }).on('change', () => {
            this.filterLoaiDonHang = $('#filterByLoaiDonHang').val();
        });

        $('#filterByTT').select2().val(this.filterTT);
        $('#filterByTT').select2({
            placeholder: "--- Tất cả ---",
            allowClear: true
        }).on('change', () => {
            this.filterTT = $('#filterByTT').val();
        });

        $('#filterByOrQuanLyDonHang').select2().val(this.OrQuanLyDonHang);
        $('#filterByOrQuanLyDonHang').select2({
            placeholder: "--- Tất cả ---",
            allowClear: true
        }).on('change', () => {
            this.OrQuanLyDonHang = $('#filterByOrQuanLyDonHang').val();
        });

        $('#filterByOrAfiliate').select2().val(this.OrAfiliate);
        $('#filterByOrAfiliate').select2({
            placeholder: "--- Tất cả ---",
            allowClear: true
        }).on('change', () => {
            this.OrAfiliate = $('#filterByOrAfiliate').val();
        });

         $('.ckbox label').on('click', function () {
      $(this).parents('tr').toggleClass('selected');
    });

    $('.btn-filter').on('click', function () {
      var $target = $(this).data('target');
      if ($target != 'all') {
        $('.table tr').css('display', 'none');
        $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
      } else {
        $('.table tr').css('display', 'none').fadeIn('slow');
      }
    });
    }

    imageExists(image_url) {

        if (image_url == 'N') {
            image_url = "dist/Resources/Images/not.png";
        } else {
            image_url = "dist/Resources/Images/check.png";
        }

        return image_url;

    }

    EditDN(currentKH) {
        this._CodeKH = currentKH.Id;
        this._CreateDateKH = currentKH.CreatedDate;
        this.isEdit = true;
        this.currentKH = currentKH;
    }

    printdonhang() {

        this.selectedOrderToPrints = this.listOrder.filter(x => x.checked == true);

        if (this.selectedOrderToPrints.length == 0) {
            toastr.warning('Vui lòng check những thông tin bên dưới trước khi khi print', "Thông báo");
            return;
        }

        if (this.selectedOrderToPrints.length > 20) {
            toastr.warning('Số lượng đơn hàng được chọn để in không vượt quá 20', "Thông báo");
            return;
        }

        let selectedOrder = [];
        for (var i in this.selectedOrderToPrints) {
            selectedOrder.push(this.selectedOrderToPrints[i]);
            //this.listOrder[i].Status = this.newStatus;
        }
       

        var _contentToPrint = {};
        _contentToPrint.content = [];
        _contentToPrint.styles = {};
        _contentToPrint.defaultStyle = {};

        var t = 0;
        for (let i in selectedOrder) {
           
            if (t > 20)
                continue;

            var _rowObject = {};

            if ((t % 5 === 0 && t !== 0))
                _contentToPrint.content.push({ text: 'Page ' + (t / 5 + 1), fontSize: 6, bold: true, pageBreak: 'before', margin: [0, 0, 0, 2] });
            else {
                if (t == 0)
                    _contentToPrint.content.push({ text: 'Page 1', fontSize: 6, bold: true, margin: [0, 0, 0, 2] });
            }


            _rowObject.style = 'mainTableStyle';
            _rowObject.table = {};
            _rowObject.table.widths = [];
            _rowObject.table.widths.push(120);
            _rowObject.table.widths.push(125);
            _rowObject.table.widths.push(250);
            _rowObject.table.body = [];
            _rowObject.table.body.push([{ rowSpan: 5, text: '\n\nCÔNG TY CP VIỄN THÔNG A,\n Đ/C : 328 - 330 đường 3/2. \nP.12, Quận 10, TP. HCM\nHotline : 1900545446 Hoặc\n0888.545.446', style: 'firstCol', alignment: 'center' },
                { text: 'NGÀY - SỐ ĐƠN HÀNG:', style: 'title' },
                { text: moment(selectedOrder[i].Ngaydat).format("DD/MM/YYYY") + ' - ' + selectedOrder[i].MaDonhang, style: 'title' }
            ]);
            _rowObject.table.body.push(['', { text: 'NGƯỜI NHẬN & SỐ ĐIỆN THOẠI:', style: 'title' }, { text: this.listOrder[i].OrderManagerName + " - " + selectedOrder[i].Phone, style: 'title' }]);
            _rowObject.table.body.push(['', { text: 'ĐỊA CHỈ NHẬN HÀNG:', style: 'title' }, { text: selectedOrder[i].Address, style: 'title' }]);
            _rowObject.table.body.push(['', { text: 'TÊN HÀNG:', style: 'title' }, { text: selectedOrder[i].ProductName, style: 'title' }]);
            _rowObject.table.body.push(['', { text: 'THU COD:', style: 'title' }, '']);
            _rowObject.table.body.push([{ colSpan: 3, text: 'Nếu có vấn đề gì về đơn hàng vui lòng gọi ngay cho Hotline của chúng tôi, cảm ơn!', style: 'footer', alignment: 'center' }, '', '']);
            //console.log(JSON.stringify(_rowObject));

            _contentToPrint.content.push(_rowObject);

            //console.log(i);
            //console.log(JSON.stringify(_contentToPrint));
            t++;
        }

        _contentToPrint.styles = {
            firstCol: {
                fontSize: 9,
                margin: [0, 8, 0, 5]
            },
            title: {
                fontSize: 8,
                margin: [0, 3, 0, 3]
            },
            footer: {
                fontSize: 8
            },
            mainTableStyle: {
                height: 500,
                margin: [0, 5, 0, 10]
            },
        };

        _contentToPrint.defaultStyle = { alignment: 'justify' };

        //console.log(JSON.stringify(_contentToPrint));
        // open the PDF in a new window
        pdfMake.createPdf(_contentToPrint).open();

        // print the PDF (not working in this version, will be added back in a couple of days)
        // pdfMake.createPdf(docDefinition).print();

        // download the PDF
        //pdfMake.createPdf(_contentToPrint).download();

    }




    SubmitTimkiem() {
        let infomartion = {};
        infomartion.TuNgay = this.StartDate;
        infomartion.DenNgay = this.EndDate;

        this.orderService.GetListOrder(infomartion).then((data) => {

            if (data.Result == true) {

                this.listOrder = [];
                this.listOrder = data.Data.ListOrder;
                this.pagesize = Math.round(data.Data.ListOrder.length / 20) + 1;
            }
        });
    }

    SelectAllBizProducts() {
        this.numbercheck = 0;
        if (this.checkAll === false) {
            for (var i in this.listOrder) {
                this.listOrder[i].checked = true;

                this.numbercheck += 1;
                this.orderselect = this.numbercheck;

            }
            if (this.orderselect > 20) {
                toastr.warning('Số lượng đơn hàng được chọn để in không vượt quá 20', "Thông báo");
            }
        } else {
            for (var i in this.listOrder) {
                this.listOrder[i].checked = false;
                this.orderselect = 0;
                this.numbercheck = 0;
            }
        }
        this.checkAll = !this.checkAll;


    }
    searchSchoolDistrict() {
        this.numbercheck = 0;
        this.orderselect = 0;
        for (var i in this.listOrder) {
            if (this.listOrder[i].checked == true) {
                this.numbercheck += 1;
                this.orderselect = this.numbercheck;
                
            }

        }
        if (this.orderselect > 20) {
            toastr.warning('Số lượng đơn hàng được chọn để in không vượt quá 20', "Thông báo");
        }

    }


}


export class FilterByLoaiDonHangValueConverter {
    toView(array, chinhanh) {
        if (chinhanh != "" && chinhanh != null && typeof chinhanh !== "undefined") {
            return array.filter(x => x.LoaiDonhang != null && x.LoaiDonhang == chinhanh);
        }
        return array;
    }
}
export class FilterByQuanLyDonHangValueConverter {
    toView(array, mndh) {
        if (mndh != "" && mndh != null && typeof mndh !== "undefined") {
            return array.filter(x => x.OrderManagerId != null && x.OrderManagerId == mndh);
        }
        return array;
    }
}

export class FilterByAffValueConverter {
    toView(array, aff) {
        if (aff != "" && aff != null && typeof aff !== "undefined") {
            return array.filter(x => x.AffiliateId != null && x.AffiliateId == aff);
        }
        return array;
    }
}


export class FilterByTrangThaiValueConverter {
    toView(array, tinhtrang) {
        if (tinhtrang != "" && tinhtrang != null && typeof tinhtrang !== "undefined") {
            return array.filter(x => x.Trangthai != null && x.Trangthai == tinhtrang);
        }
        return array;
    }
}


export class FilterByCSValueConverter {
    toView(array, obj) {
        if (obj == "") {
            return array;
        } else {
            return array
                .filter(x => x.Macn === obj);
        }
    }
}
export class FilterchinhanhValueConverter {
    toView(array, chinhanh) {
        if (chinhanh != "" && chinhanh != null && typeof chinhanh !== "undefined") {
            return array.filter(x => x.Macn != null && x.Macn == chinhanh);
        }
        return array;
    }
}


export class FilterByPhoneValueConverter {
    toView(array, obj) {

        if (obj) {
            return array
                .filter(x => ((x.Phone != null) && (x.Phone.toLowerCase().indexOf(obj.trim().toLowerCase()) != -1 ||
                    ((x.TenKh != null) && (x.TenKh.toLowerCase().indexOf(obj.trim().toLowerCase()) != -1)) ||
                    ((x.Email != null) && (x.Email.toLowerCase().indexOf(obj.trim().toLowerCase()) != -1)))));
        }
        return array;
    }
}



export class FilterByNameValueConverter {
    toView(array, obj) {
        if (obj) {
            return array
                .filter(x => ((x.Name != null) && (x.Name.toLowerCase().indexOf(obj.trim().toLowerCase()) != -1)) ||
                    ((x.BusinessCode != null) && (x.BusinessCode.toLowerCase().indexOf(obj.trim().toLowerCase()) != -1)) ||
                    ((x.Phone != null) && (x.Phone.toLowerCase().indexOf(obj.trim().toLowerCase()) != -1)) ||
                    ((x.Manhanvien != null) && (x.Manhanvien.toLowerCase().indexOf(obj.trim().toLowerCase()) != -1))
                );
        }
        return array;
    }
}
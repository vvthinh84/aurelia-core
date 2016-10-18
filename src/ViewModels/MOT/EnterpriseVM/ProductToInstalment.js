import { BindingEngine, inject } from 'aurelia-framework';
import { EnterpriseService } from 'Services/EnterpriseSvc/EnterpriseService';
import * as toastr from "toastr";
import 'eonasdan-bootstrap-datetimepicker';

@inject(BindingEngine, EnterpriseService)
export class ProductToInstalment {

    selectedColor = [];

    showMoney = {};
    dataSelect = {};
    ListColor = [];
    ListCompany = {};
    product = {};
    AddressDW = [];
    Address = [];
    ListWard = [];
    tam = "";
    constructor(bindingEngine, enterpriseService) {


        let Laisuat = 1.00;
        this.enterpriseService = enterpriseService;
        this.bindingEngine = bindingEngine;
        let subscriptioncurrent = bindingEngine.propertyObserver(this, "tinhthanhid")
            .subscribe(() => {
                if (this.tinhthanhid > 0) {

                    this.Getdiachi(this.tinhthanhid);
                }
            });

        this.Noiohientai = [{ text: 'Nam', value: 'T' },
            { text: 'Nữ', value: 'F' }
        ];

    }

    activate() {

        return Promise.all([this.enterpriseService.GetListProductColor(Lockr.get('businessCode'), Lockr.get('currentProduct').Product_id),


            this.enterpriseService.GetLisTraGop(),
            this.enterpriseService.GetListCompany(),
            this.enterpriseService.GetListAddress()
        ]).then(rs => {

            this.ListColor = rs[0].Data;
            this.dataSelect = rs[1].Data;
            this.Address = rs[3].Data;
            this.AddressDW = rs[3].Data.map(x => {
                return {
                    Code: x.Code,
                    Name: x.Name,

                }
            })
            this.product = Lockr.get('currentProduct');
            this.ListCompany = rs[2].Data;
            this.tam = Lockr.get('businessCode');

            this.User = Lockr.get('Instalment');
            if (this.User != undefined) {
                this.User.Amount = this.User.ListDetails[0].Amount;
                this.product.ImageDetail = this.User.ListDetails[0].ImageDetail;
                this.tinhthanhid = this.User.ListDetails[0].TinhThanh;
                this.quanhuyenid = this.User.ListDetails[0].quanhuyen;
            }


        });

    }

    Getdiachi(CityCode) {
        this.ListWard = this.Address.filter(x => x.Code == CityCode)[0].ListDistrict;
    }
    attached() {
        //let laisuat=3.00;
        $('#txtFilterDateTo').datetimepicker();
        $("#txtFilterDateTo").on("dp.change", () => {

            this.User.Birthday = $('#txtFilterDateTo').val();

        });
        let tongtien = Lockr.get('currentProduct').NoInterestPrice;

        if (this.User.Tratruoc && this.User.Thoihanvay) {
            this.enterpriseService.GetListMoney(tongtien, this.User.Tratruoc, this.User.Thoihanvay, 1).then(rs => {
                this.showMoney = rs.Data;

            });
        }


    }
    backToListProducts() {
        Lockr.rm('Instalment');
        Lockr.rm('BusinessId');
        Lockr.rm('businessCode');
        Lockr.rm('currentProduct');
        window.location = "#MOTMenus/ListProductsInstalment";
    }
    validateNumber(number) {
        var re = /[0-9]|\./;
        return re.test(number);
    }
    validateName(str) {

        var regex = /^[0-9a-zA-Z\_]+$/;
        return regex.test(str);
    }
    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    addToCart() {
        if (this.User.Name == undefined || this.User.Name == "") {
            toastr.error('Bạn chưa nhập thông tin vào ô ' + '<b>' + '[Họ tên]. ' + '</b>', "Thêm mới đơn hàng");

            return;
        } else {
            if (this.validateName(this.User.Name) == false) {
                toastr.error('<b>' + '[Họ Tên]. ' + '</b> không đúng định dạng. Vui lòng chọn/nhập lại.', "Cập nhật thông tin đơn hàng");
                return;
            }

        }
        if (this.User.Sex == undefined || this.User.Sex == "") {
            toastr.error('Bạn chưa nhập thông tin vào ô ' + '<b>' + '[Giới tính]. ' + '</b>', "Thêm mới đơn hàng");
            return;
        }
        if (this.User.Email == undefined || this.User.Email == "") {

        } else
        if (this.validateEmail(this.User.Email) == false) {
            toastr.error('<b>' + '[Email]. ' + '</b> không đúng định dạng. Vui lòng chọn/nhập lại.', "Cập nhật thông tin đơn hàng");
            return;
        }


        if (this.User.Birthday == undefined || this.User.Birthday == "") {
            toastr.error('Bạn chưa nhập thông tin vào ô ' + '<b>' + '[Ngày sinh]. ' + '</b>', "Thêm mới đơn hàng");
            return;
        }

        if (this.User.Address == undefined || this.User.Address == "") {
            toastr.error('Bạn chưa nhập thông tin vào ô ' + '<b>' + '[Địa chỉ]. ' + '</b>', "Thêm mới đơn hàng");
            return;
        }
        if (this.User.NoioHientai == undefined || this.User.NoioHientai == "") {
            toastr.error('Bạn chưa nhập thông tin vào ô ' + '<b>' + '[Nơi ở hiện tại]. ' + '</b>', "Thêm mới đơn hàng");
            return;
        }
        if (this.User.DiachiHokhau == undefined || this.User.DiachiHokhau == "") {
            toastr.error('Bạn chưa nhập thông tin vào ô ' + '<b>' + '[Hộ khẩu]. ' + '</b>', "Thêm mới đơn hàng");
            return;
        }
        if (this.User.Phone == undefined || this.User.Phone == "") {
            toastr.error('Bạn chưa nhập thông tin vào ô ' + '<b>' + '[Số điện thoại]. ' + '</b>', "Thêm mới đơn hàng");
            return;
        } else {

        }

        if (this.User.Nghenghiep == undefined || this.User.Nghenghiep == "") {
            toastr.error('Bạn chưa nhập thông tin vào ô ' + '<b>' + '[Nghề nghiệp]. ' + '</b>', "Thêm mới đơn hàng");
            return;
        }


        if (this.User.AddressShipping == undefined || this.User.AddressShipping == "") {
            toastr.error('Bạn chưa nhập thông tin vào ô ' + '<b>' + '[Địa chỉ giao hàng]. ' + '</b>', "Thêm mới đơn hàng");
            return;
        }
        if (this.tinhthanhid == undefined || this.tinhthanhid == "0") {
            toastr.error('Bạn chưa nhập thông tin vào ô ' + '<b>' + '[Tỉnh thành]. ' + '</b>', "Thêm mới đơn hàng");
            return;
        }
        if (this.quanhuyenid == undefined || this.quanhuyenid == "0") {
            toastr.error('Bạn chưa nhập thông tin vào ô ' + '<b>' + '[Quận huyện]. ' + '</b>', "Thêm mới đơn hàng");
            return;
        }
        if (this.User.Amount == undefined || this.User.Amount == "" || this.User.Amount <= 0) {
            toastr.error('Bạn chưa nhập thông tin vào ô ' + '<b>' + '[Số lượng]. ' + '</b>', "Thêm mới đơn hàng");
            return;
        }
        if (typeof this.selectedColor.ColorName === "undefined" || this.selectedColor.ColorName == null) {
            toastr.error('Vui lòng chọn  ' + '<b>' + '[Màu sản phẩm]. ' + '</b>', "Thêm mới đơn hàng");
            return;
        }

        let prd = {};
        let tam = {};
        tam.Sex = this.User.Sex;
        tam.Name = this.User.Name;
        tam.Birthday = this.User.Birthday;
        tam.Address = this.User.Address;
        tam.AddressShipping = this.User.AddressShipping;
        tam.Phone = this.User.Phone;
        tam.Email = this.User.Email;
        tam.Cmnd = this.User.Cmnd;
        tam.TenCongty = Lockr.get('businessCode');
        tam.MaNv = this.User.MaNv;
        tam.Nghenghiep = this.User.Nghenghiep;

        tam.OrderTypeId = 2;
        tam.Status = 30;
        tam.PaymentType = "Tiền trả góp";
        tam.BusinessCode = Lockr.get('businessCode');
        tam.Note = "ghi chu";
        tam.NoioHientai = this.User.NoioHientai;
        tam.DiachiHokhau = this.User.DiachiHokhau;
        tam.DistictCode = this.quanhuyenid;


        tam.Unit = "HomeCredit";
        tam.Thoihanvay = this.User.Thoihanvay;
        tam.Tratruoc = this.User.Tratruoc;
        tam.Sotientratruoc = this.showMoney.Sotientratruoc;
        tam.Sotientragop = this.showMoney.Sotientragop;
        tam.ListDetails = [];
        prd.ProductId = this.selectedColor.Product_id;
        prd.ProductCode = this.selectedColor.Product_code;
        prd.ProductColorCode = this.selectedColor.Product_color_code;
        prd.Amount = this.User.Amount;
        prd.ProductName = this.selectedColor.ProductName;
        prd.ColorName = this.selectedColor.ColorName;
        prd.ImageDetail = this.selectedColor.Thumbs;
        prd.NoInterestPrice = this.selectedColor.NoInterestPrice;
        prd.TinhThanh = this.tinhthanhid;
        prd.quanhuyen = this.quanhuyenid;

        prd.Hinhthuc = "Trả góp 0%";
        tam.ListDetails.push(prd);


        Lockr.set("Instalment", tam);
        window.location = "#MOTMenus/CartOrderInstalment";

    }


}
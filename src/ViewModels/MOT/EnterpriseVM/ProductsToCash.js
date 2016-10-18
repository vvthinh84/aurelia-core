import { HttpClient, json } from 'aurelia-fetch-client';
import { BindingEngine, inject, LogManager } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import * as toastr from "toastr";

import 'eonasdan-bootstrap-datetimepicker';
import { EnterpriseService } from 'Services/EnterpriseSvc/EnterpriseService';


@inject(BindingEngine, EnterpriseService)
export class ProductsToCash {
    companybusiness = [];
    selectedColor = [];
    selectedHappyCare = [];
    InfoUserOrderBack = [];
    InfoOrderCashBack = [];
    AddressDW = [];
    Address = [];
    ListWard = [];
    User = {};
    product = {};
    _xoa = [];
    tam = "";




    constructor(bindingEngine, enterpriseService) {
        this.enterpriseService = enterpriseService;


        this.Gender = [{
            text: 'Nam',
            value: 'T'
        }, {
            text: 'Nữ',
            value: 'F'
        }];



        let subscriptioncurrent = bindingEngine.propertyObserver(this, "tinhthanhid")
            .subscribe(() => {
                if (this.tinhthanhid > 0) {
                    this.Getdiachi(this.tinhthanhid);
                }

            });


    }


    activate(params) {


        return Promise.all([this.enterpriseService.GetListProductColor(Lockr.get('congty'), params.productId),
            this.enterpriseService.GetListCompany(), this.enterpriseService.GetListAddress(),
        ]).then(
            (rs) => {

                this.Data = rs[0].Data; // màu
                this.companybusiness = rs[1].Data; // công ty


                this.product = Lockr.get('currentProduct');
                this.Address = rs[2].Data;
                this.AddressDW = rs[2].Data.map(x => {
                    return {
                        Code: x.Code,
                        Name: x.Name,

                    }
                })

                this.User = Lockr.get('Cash');

                this.tam = Lockr.get('congty');
                if (this.User != undefined) {

                    this.User.SoLuong = this.User.ListDetails[0].Amount;
                    this.product.ImageDetail = this.User.ListDetails[0].ImageDetail;
                    this.tinhthanhid = this.User.ListDetails[0].TinhThanh;
                    this.quanhuyenid = this.User.ListDetails[0].DistictCode;
                    //this.tam=this.User.TenCongty;

                }

            })
    }


    Getdiachi(CityCode) {
        this.ListWard = this.Address.filter(x => x.Code == CityCode)[0].ListDistrict;
    }
    attached() {

        $('#txtNgaySinh').datetimepicker({
            format: "YYYY/MM/DD"
        });
        $("#txtNgaySinh").on("dp.change", () => {
            this.User.Birthday = $('#txtNgaySinh').val();
        });
    }


    loadProductToView() {
        this.ColorList = this.Data.ColorList;
    }
    loadHappyCareToView() {
        this.HappyCare = [];
        this.HappyCare.push(this.Data.HappyCare.ghbh);
        this.HappyCare.push(this.Data.HappyCare.bvtd);
    }

    goToBack() {
        window.location = "#MOTMenus/ListProductsCash";
        Lockr.rm('Cash');
        Lockr.rm("DetailEdit");
        Lockr.rm('currentProduct');
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
            toastr.error('Bạn chưa nhập thông tin vào ô ' + '<b>' + '[Họ Tên]. ' + '</b>', "Cập nhật thông tin đơn hàng");

            return;
        } else {
            if (this.validateName(this.User.Name) == false) {
                toastr.error('<b>' + '[Họ Tên]. ' + '</b> không đúng định dạng. Vui lòng chọn/nhập lại.', "Cập nhật thông tin đơn hàng");
                toastr.options.progressBar = true;
                return;
            }
        }
        if (this.User.Sex == undefined || this.User.Sex == "") {
            toastr.error('Bạn chưa nhập thông tin vào ô ' + '<b>' + '[Giới tính]. ' + '</b>', "Cập nhật thông tin đơn hàng");
            return;
        }

        if (this.User.Phone == undefined || this.User.Phone == "") {
            toastr.error('Bạn chưa nhập thông tin vào ô ' + '<b>' + '[Số điện thoại]. ' + '</b>', "Cập nhật thông tin đơn hàng");
            return;
        }
        if (this.User.Email == undefined || this.User.Email == "") {

        } else {
            if (this.validateEmail(this.User.Email) == false) {
                toastr.error('<b>' + '[Email]. ' + '</b> không đúng định dạng. Vui lòng chọn/nhập lại.', "Cập nhật thông tin đơn hàng");
                return;
            }
        }

        if (this.User.Address == undefined || this.User.Address == "") {
            toastr.error('Bạn chưa nhập thông tin vào ô ' + '<b>' + '[Địa chỉ giao hàng]. ' + '</b>', "Cập nhật thông tin đơn hàng");
            return;
        }
        if (this.tinhthanhid == undefined || this.tinhthanhid == "0") {
            toastr.error('Vui lòng chọn  ' + '<b>' + '[Tỉnh/Thành phố]. ' + '</b>', "Cập nhật thông tin đơn hàng");
            return;
        }
        if (this.quanhuyenid == undefined || this.quanhuyenid == "0") {
            toastr.error('Vui lòng chọn  ' + '<b>' + '[Quận/huyện]. ' + '</b>', "Cập nhật thông tin đơn hàng");
            return;
        }
        if (this.User.SoLuong == undefined || this.User.SoLuong == "" || this.User.SoLuong <= 0) {
            toastr.error('Bạn chưa nhập thông tin vào ô ' + '<b>' + '[Số lượng]. ' + '</b>', "Cập nhật thông tin đơn hàng");
            return;
        }

        if (typeof this.selectedColor.ColorName === "undefined" || this.selectedColor.ColorName == null) {
            toastr.error('Vui lòng chọn  ' + '<b>' + '[Màu sản phẩm]. ' + '</b>', "Cập nhật thông tin đơn hàng");
            return;
        }
        let prd = {};
        let tam = {};

        tam.Sex = this.User.Sex;
        tam.Name = this.User.Name;
        tam.Birthday = "";
        tam.Address = this.User.Address;
        tam.AddressShipping = this.User.Address;
        tam.Phone = this.User.Phone;
        tam.Email = this.User.Email;
        tam.Cmnd = this.User.Cmnd;
        tam.TenCongty = Lockr.get('congty');
        tam.MaNv = this.User.MaNv;

        tam.OrderTypeId = 1;
        tam.Status = 30;
        tam.PaymentType = "Tiền mặt";
        tam.BusinessCode = Lockr.get('congty');
        tam.ListDetails = [];


        prd.ProductId = this.selectedColor.Product_id;
        prd.ProductCode = this.selectedColor.Product_code;
        prd.ProductColorCode = this.selectedColor.Product_color_code;
        prd.Amount = this.User.SoLuong;;
        prd.ProductName = this.selectedColor.ProductName;
        prd.ColorName = this.selectedColor.ColorName;
        prd.ImageDetail = this.selectedColor.Thumbs;
        prd.Price = this.selectedColor.Price;
        prd.TinhThanh = this.tinhthanhid;
        prd.DistictCode = this.quanhuyenid;

        tam.ListDetails.push(prd);

        Lockr.set("Cash", tam);
        window.location = "#MOTMenus/ProductsToCashDetail";
    }

}
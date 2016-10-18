import { HttpClient, json } from 'aurelia-fetch-client';
import { BindingEngine, inject, LogManager } from 'aurelia-framework';
import { Router } from 'aurelia-router';

import 'eonasdan-bootstrap-datetimepicker';
import * as toastr from "toastr";

import { EnterpriseService } from 'Services/EnterpriseSvc/EnterpriseService';
import { UtilitiesJS } from 'Helpers/UtilitiesJS';


@inject(BindingEngine, Router, EnterpriseService, UtilitiesJS)
export class EditOrder {
    OrderId = [];
    OrderIdobj = [];
    OrderEdit = [];
    Listorderdetail = [];
    AddressDW = [];
    Address = [];
    ListWard = [];
    DetailEdit = {};
    Product = {};
    TotalAmount = 0;
    TotalPrice = 0;
    TotalDiscount = 0;
    Discount = 0;
    Price = 0;
    _currentStatus;
    _productname;
    _luongthuclanh;
    _tongthunhap;
    check = false;
    isTraGop = false;
    constructor(bindingEngine, router, enterpriseService, utilitiesJS) {
        this.enterpriseService = enterpriseService;
        this.router = router;
        this.utilitiesJS = utilitiesJS;
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
        this.check = false;
    }
    showValue(obj) {
        this.Initobj();
    }

    activate(params) {


        this.OrderId = params.id;
        return Promise.all([this.enterpriseService.GetListOrdersStatus("StatusBusinessOrder"), this.enterpriseService.GetListOrdersDetail(this.OrderId), this.enterpriseService.GetListAddress()]).then(
            (rs) => {

                //  this._OrderTypeId =rs[1].Data.ListOrderDetails.OrderTypeId;

                this.OrderStatus = rs[1].Data.ListStatus;

                this._currentStatus = rs[1].Data.Status;
                if (rs[1].Data.Status == 41 || rs[1].Data.Status == 42 || rs[1].Data.Status == 37 || rs[1].Data.Status == 38 || rs[1].Data.Status == 39) {
                    this.check = true;
                } else {
                    this.check = false;
                }

                this.DetailEdit = rs[1].Data;

                this.Sexid = this.DetailEdit.Sex;
                this.Listorderdetail = rs[1].Data.ListOrderDetails

                if (rs[1].Data.OrderTypeId == 1) { this.isTraGop = true } else { this.isTraGop = false };

                this.DetailEdit.StutusId = rs[1].Data.ListStatus.filter(x => x.Name == rs[1].Data.StatusName)[0].Id;

                Lockr.set('Listorderdetail', rs[1].Data.ListOrderDetails);
                this.UpdateInfoProduct();
                this.Address = rs[2].Data;
                this.AddressDW = rs[2].Data.map(x => {
                    return {
                        Code: x.Code,
                        Name: x.Name,
                    }
                })

                this.BindtoDistrict(this.DetailEdit.DistictCode);
                this.DetailEdit.StutusId = this.DetailEdit.Status;

                this.binditemsproducts();
                this._luongthuclanh = rs[1].Data.Luongthuclanh;
                this._tongthunhap = rs[1].Data.Tongthunhap;

            })
    }

    binditemsproducts() {
        for (let i of this.Listorderdetail) {
            this._productname = i.ProductName;

        }

    }




    attached() {

        $('#txtNgaySinh').datetimepicker({
            format: "YYYY/MM/DD"
        });

        $("#txtNgaySinh").on("dp.change", () => {
            this.DetailEdit.Birthday = $('#txtNgaySinh').val();
        });


    }



    BindtoDistrict(DistictCode) {

        var city = this.Address.filter(x => {
            let lstDistrict = x.ListDistrict;
            let lstDistrictCode = lstDistrict.map(y => y.Code);
            if (lstDistrictCode.indexOf(DistictCode) != -1)
                return true
        });
        this.tinhthanhid = city[0].Code;
        this.quanhuyenid = DistictCode;
    }

    UpdateInfoProduct() {

        this.TotalAmount = this.Listorderdetail.length;
        this.Price = this.Listorderdetail[0].Price * this.Listorderdetail[0].Amount;
        this.Discount = this.Listorderdetail[0].Discount;
        this.TotalPrice = (this.TotalAmount * this.Price) - this.Discount;
    }

    OrderToPosBusiness() {

        let listcurrent = {};
        listcurrent = this.Listorderdetail;
        let tam = {};
        let copy = {};
        tam.OrderId = this.DetailEdit.OrderId;
        tam.UserId = this.DetailEdit.UserId;
        tam.Sex = this.DetailEdit.Sex;
        tam.Name = this.DetailEdit.Name;
        tam.Birthday = this.DetailEdit.Birthday;
        tam.Address = this.DetailEdit.Address;
        tam.AddressShipping = this.DetailEdit.AddressShipping;
        tam.Phone = this.DetailEdit.Phone;
        tam.Email = this.DetailEdit.Email;
        tam.Cmnd = this.DetailEdit.Cmnd;
        tam.TenCongty = this.DetailEdit.TenCongty;
        tam.MaNv = this.DetailEdit.MaNv;
        tam.Chucvu = this.DetailEdit.Chucvu;
        tam.Phongban = this.DetailEdit.Phongban;
        tam.Hinhthuclaodong = this.DetailEdit.Hinhthuclaodong;
        tam.BusinessCode = this.DetailEdit.BusinessCode;
        tam.OrderTypeId = this.DetailEdit.OrderTypeId;
        tam.MaPhieuXuat = this.DetailEdit.MaPhieuXuat;
        tam.Sohoadon = this.DetailEdit.Sohoadon;
        tam.OrderPos = this.DetailEdit.OrderPos;
        tam.DistictCode = this.quanhuyenid;
        tam.PaymentType = this.DetailEdit.PaymentType;
        tam.DiachiHokhau = this.DetailEdit.DiachiHokhau;
        tam.Noio = this.DetailEdit.Noio;
        tam.Status = 42;
        tam.ListDetails = [];

        for (let i of listcurrent) {
            copy.OrderDetailId = i.OrderDetailId;
            copy.OrderId = i.OrderId;
            copy.ProductId = i.ProductId;
            copy.ProductColorCode = i.ProductColorCode;
            copy.ProductCode = i.ProductCode;
            copy.Amount = i.Amount;
            copy.ProductName = i.ProductName;
            copy.ColorName = i.ColorName;
            copy.Imei = i.Imei;
            tam.ListDetails.push(copy);
            copy = {};
        }

        this.enterpriseService.DoanhNghiepOrderToPos(this.DetailEdit.OrderId).then((data) => {

            if (data.Result == true) {

                $('#deleteProduct').modal('hide');
                toastr.success(data.Message, "Đơn Hàng");


            } else {
                toastr.warning(data.Message, "Đơn Hàng");
            }
        });
    }


    DeleteOrder() {

        this.enterpriseService.DeleteOrderByOrderId(this.DetailEdit.OrderId).then((data) => {
            if (data.Result == true) {
                toastr.success('Đơn hàng ' + this.DetailEdit.OrderId + ' xóa thành công!', "Cập nhật thông tin đơn hàng");

            } else {
                toastr.warning('Xóa không thành công!', "Cập nhật thông tin đơn hàng");
            }
        });
    }

    deleteProductById(pro) {
        this.Listorderdetail.splice(this.Listorderdetail.indexOf(this.Listorderdetail.filter(x => x.OrderDetailId === pro.OrderDetailId)[0]), 1);
        this.UpdateInfoProduct();
        Lockr.set('Listorderdetail', this.Listorderdetail);
    }

    goToBack() {
        this.router.navigate(`EnterpriseOrderMng`);
        Lockr.rm('currentProduct');
    }
    Getdiachi(CityCode) {
        this.ListWard = this.Address.filter(x => x.Code == CityCode)[0].ListDistrict;
    }
    Initobj() {

        if (this._currentStatus == 37) {
            if (this.DetailEdit.StutusId == 38) {
                toastr.error('Bạn không thể cập nhật đơn hàng sang trạng thái này' + '</b>', "Cập nhật thông tin đơn hàng");
                return;
            }
        }
        if (this.DetailEdit.Name == undefined || this.DetailEdit.Name == "") {

            toastr.error('Bạn chưa nhập thông tin vào ô ' + '<b>' + '[Họ Tên]. ' + '</b>', "Cập nhật thông tin đơn hàng");
            return;
        }
        if (this.DetailEdit.Sex == undefined || this.DetailEdit.Sex == "") {
            toastr.error('Bạn chưa nhập thông tin vào ô ' + '<b>' + '[Giới tính]. ' + '</b>', "Cập nhật thông tin đơn hàng");
            return;
        }
        if (this.DetailEdit.Cmnd == undefined || this.DetailEdit.Cmnd == "") {
            toastr.error('Bạn chưa nhập thông tin vào ô ' + '<b>' + '[CMND]. ' + '</b>', "Cập nhật thông tin đơn hàng");
            return;
        }
        if (this.DetailEdit.Phone == undefined || this.DetailEdit.Phone == "") {
            toastr.error('Bạn chưa nhập thông tin vào ô ' + '<b>' + '[Số điện thoại]. ' + '</b>', "Cập nhật thông tin đơn hàng");
            return;
        }
        if (this.DetailEdit.AddressShipping == undefined || this.DetailEdit.AddressShipping == "") {
            toastr.error('Bạn chưa nhập thông tin vào ô ' + '<b>' + '[Địa chỉ giao hàng]. ' + '</b>', "Cập nhật thông tin đơn hàng");
            return;
        }



        let listcurrent = {};
        listcurrent = this.Listorderdetail;
        let tam = {};
        let copy = {};
        tam.OrderId = this.DetailEdit.OrderId;
        tam.UserId = this.DetailEdit.UserId;
        tam.Sex = this.Sexid;
        tam.Name = this.DetailEdit.Name;
        tam.Birthday = this.DetailEdit.Birthday;
        tam.Address = this.DetailEdit.Address;
        tam.AddressShipping = this.DetailEdit.AddressShipping;
        tam.Phone = this.DetailEdit.Phone;
        tam.Email = this.DetailEdit.Email;
        tam.Cmnd = this.DetailEdit.Cmnd;
        tam.TenCongty = this.DetailEdit.TenCongty;
        tam.MaNv = this.DetailEdit.MaNv;
        tam.Chucvu = this.DetailEdit.Chucvu;
        tam.Phongban = this.DetailEdit.Phongban;
        tam.Hinhthuclaodong = this.DetailEdit.Hinhthuclaodong;
        tam.BusinessCode = this.DetailEdit.BusinessCode;
        tam.OrderTypeId = this.DetailEdit.OrderTypeId;
        tam.MaPhieuXuat = this.DetailEdit.MaPhieuXuat;
        tam.Sohoadon = this.DetailEdit.Sohoadon;
        tam.OrderPos = this.DetailEdit.OrderPos;
        tam.DistictCode = this.quanhuyenid;
        tam.PaymentType = this.DetailEdit.PaymentType;
        tam.DiachiHokhau = this.DetailEdit.DiachiHokhau;
        tam.Noio = this.DetailEdit.Noio;
        tam.Status = this.DetailEdit.StutusId;
        tam.ListDetails = [];

        for (let i of listcurrent) {
            copy.OrderDetailId = i.OrderDetailId;
            copy.OrderId = i.OrderId;
            copy.ProductId = i.ProductId;
            copy.ProductColorCode = i.ProductColorCode;
            copy.ProductCode = i.ProductCode;
            copy.Amount = i.Amount;
            copy.ProductName = i.ProductName;
            copy.ColorName = i.ColorName;
            copy.Imei = i.Imei;
            tam.ListDetails.push(copy);
            copy = {};
        }


        this.enterpriseService.UpdateOrdersEnterprise(tam).then((data) => {

            if (data.Result == true) {
                this.router.navigate(`EnterpriseOrderMng`);
                toastr.success('Cập nhật thông tin đơn hàng ' + '<b>' + data.Data + '</b>' + ' thành công!', "Cập nhật thông tin đơn Hàng");

            } else {
                toastr.warning('Cập nhật đơn hàng thất bại. Xin thử lại!', "Cập nhật thông tin đơn Hàng");
            }
        });
    }






}
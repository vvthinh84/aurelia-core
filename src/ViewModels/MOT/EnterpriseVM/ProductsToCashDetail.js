import { json } from 'aurelia-fetch-client';
import { inject, LogManager } from 'aurelia-framework';
import { Router } from 'aurelia-router';

import 'eternicode-bootstrap-datepicker';
import { EnterpriseService } from 'Services/EnterpriseSvc/EnterpriseService';
import * as toastr from "toastr";

@inject(EnterpriseService)
export class ProductsToCashDetail {

    Detail = {};
    //ListCompany=[];
    DetailOrderCash = [];
    Cart = [];
    customer = {};
    canBind = true;
    PriceOnline = 0;
    productid;
    AddressTinh = [];
    ListHuyen = [];
    constructor(enterpriseService) {

        this.enterpriseService = enterpriseService;

    }

    activate() {
        this.getCart();
        return Promise.all([this.enterpriseService.GetListAddress()]).then(rs => {
            this.Address = rs[0].Data;

            this.AddressTinh = rs[0].Data.map(x => {
                return {
                    Code: x.Code,
                    Name: x.Name,

                }
            });
            this.ListHuyen = this.Address.filter(x => x.Code == Lockr.get('Cash').ListDetails[0].TinhThanh)[0].ListDistrict;
        });

    }

    CreatedOrder() {

        let obj = {};
        let tong = this.Detail.ListDetails[0].Amount;
        let list = this.Detail.ListDetails;
        if (this.Detail.Sex == "Nữ") {
            this.Detail.Sex = "F";
        } else {
            this.Detail.Sex = "T";
        }
        this.Detail.DistictCode = this.Detail.ListDetails[0].DistictCode;
        this.Detail.ListDetails = [];
        for (let i = 0; i < tong; i++) {
            obj.ProductId = list[0].ProductId;
            obj.ProductCode = list[0].ProductCode;
            obj.ProductColorCode = list[0].ProductColorCode;
            obj.Amount = 1;
            obj.ProductName = list[0].ProductName;
            obj.ColorName = list[0].ColorName;
            this.Detail.ListDetails.push(obj);

        }



        this.enterpriseService.InsertOrderCashEnterprise(this.Detail).then(rs => {
            if (rs.Result == true) {
                Lockr.rm("Cash");
                Lockr.rm("DetailEdit");
                Lockr.rm("congty");
                toastr.success('Tạo đơn hàng thành công');
                window.location = "#EnterpriseMenu"
            } else {
                toastr.error('Tạo đơn hàng thất bại');
            }
        });

    }



    getCart() {
        this.Detail = Lockr.get('Cash');

        if (this.Detail.Sex == "T") {
            this.Detail.Sex = "Nam";
        } else {
            this.Detail.Sex = "Nữ";
        }
        this.tong = this.Detail.ListDetails[0].Price * this.Detail.ListDetails[0].Amount;

    }




}
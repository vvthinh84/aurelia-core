import { inject } from 'aurelia-framework';
import { EnterpriseService } from 'Services/EnterpriseSvc/EnterpriseService';
import * as toastr from "toastr";
@inject(EnterpriseService)
export class CartOrderInstalment {
    order = {};
    ListCompany = {};
    tong = 0;
    Address = [];
    AddressTinh = [];
    ListHuyen = [];
    constructor(enterpriseService) {
        this.enterpriseService = enterpriseService;
    }

    activate() {
        this.getCart();
        return Promise.all([this.enterpriseService.GetListCompany(), this.enterpriseService.GetListAddress()]).then(rs => {
            this.ListCompany = rs[0].Data;

            this.Address = rs[1].Data;
            this.AddressTinh = rs[1].Data.map(x => {
                return {
                    Code: x.Code,
                    Name: x.Name,

                }
            });


            this.ListHuyen = this.Address.filter(x => x.Code == Lockr.get('Instalment').ListDetails[0].TinhThanh)[0].ListDistrict;


        });

    }
    getCart() {
        this.order = Lockr.get('Instalment');

        this.tong = this.order.ListDetails[0].NoInterestPrice * this.order.ListDetails[0].Amount;
    }
    addToOrder() {
        let obj = {};
        let tong = this.order.ListDetails[0].Amount;
        let list = this.order.ListDetails;
        this.order.ListDetails = [];
        for (let i = 0; i < tong; i++) {
            obj.ProductId = list[0].ProductId;
            obj.ProductCode = list[0].ProductCode;
            obj.ProductColorCode = list[0].ProductColorCode;
            obj.Amount = 1;
            obj.ProductName = list[0].ProductName;
            obj.ColorName = list[0].ColorName;
            this.order.ListDetails.push(obj);

        }

        this.enterpriseService.InsertOrderCashEnterprise(this.order).then(rs => {
            if (rs.Result == true) {

                Lockr.rm('businessCode');
                Lockr.rm('Instalment');
                toastr.success('Tạo đơn hàng trả góp thành công');
                window.location = "#EnterpriseMenu"
            } else {
                toastr.error('Tạo đơn hàng trả góp thất bại');
            }
        });


    }
}
import { inject } from 'aurelia-framework';
import { EnterpriseService } from 'Services/EnterpriseSvc/EnterpriseService';

import * as toastr from "toastr";
import 'eonasdan-bootstrap-datetimepicker';

@inject(EnterpriseService)
export class InstalmentOrderDetail {
    order = [];
    Business = [];
    LoaiSanpham = [];
    Thuonghieu = [];
    checked = false;
    constructor(enterpriseService) {
        this.enterpriseService = enterpriseService;
    }
    activate(params) {
        let obj = {};
        obj.Id = params.Id;
        return Promise.all([this.enterpriseService.GetListInstalmentProducts(obj)]).then(rs => {
            this.order = rs[0].Data.BusinessProduct[0];

            this.Business = rs[0].Data.Business;

            this.LoaiSanpham = rs[0].Data.LoaiSanpham;

            this.Thuonghieu = rs[0].Data.Thuonghieu;


        });


    }
    attached() {




        $('#txtFilterStartDateImport').datetimepicker();
        $("#txtFilterStartDateImport").on("dp.change", () => {

            this.order.Modified_date = $('#txtFilterStartDateImport').val();

        });

        $('#txtFilterDateFrom').datetimepicker();
        $("#txtFilterDateFrom").on("dp.change", () => {

            this.order.StartDate = $('#txtFilterDateFrom').val();

        });



        $('#txtFilterDateTo').datetimepicker();
        $("#txtFilterDateTo").on("dp.change", () => {

            this.order.EndDate = $('#txtFilterDateTo').val();

        });
    }
    editIntalment(order) {
        /*
    	 
        */
        let model = {};
        model.Status = order.Status;
        model.StartDate = order.StartDate;
        model.EndDate = order.EndDate;
        model.Brand = order.Brand;
        model.Nhomhang = order.Nhomhang;
        model.BusinessId = order.BusinessId;
        model.Price = order.Price;
        model.NoInterestPrice = order.NoInterestPrice;
        model.InterestRatePrice = order.InterestRatePrice;

        model.Promotion_description = order.Promotion_description;
        if (this.checked == true) {

            this.enterpriseService.UpdateCampaignAllProductCode(model).then(data => {
                if (data.Result == true) {
                    toastr.success('Cập nhật tất cả sản phẩm thành công');
                } else {
                    toastr.success('Cập nhật tất cả sản phẩm thất bại');
                }
            })
        } else {
            this.enterpriseService.UpdateBusinessProduct(order).then(rs => {
                if (rs.Result) {
                    toastr.success('Cập nhật thông tin thành công');
                } else {
                    toastr.success('Cập nhật thất bại');
                }
            })

        }

    }



}
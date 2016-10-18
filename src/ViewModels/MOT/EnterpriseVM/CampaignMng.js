import { inject } from 'aurelia-framework';
import { BizProductsService } from 'Services/AffiliateSvc/BizProductsService';

import * as toastr from "toastr";

@inject(BizProductsService)
export class CampaignMng {

    business = [];
    listBusiness = [];
    constructor(bizProductsService) {

        this.bizProductsService = bizProductsService;
        this.current = 1;
        this.itemperpage = 10;
        this.pagesize = 8;

    }

    bind(ct, ovr) {
        if (this.business != null)
            ovr.bindingContext.total = this.business.length;
    }




    activate() {
        return Promise.all([
            this.bizProductsService.GetListBusiness().then(data => {
                this.listBusiness = data;
            }),
            this.bizProductsService.GetBusiness().then(data => {
                this.business = data;

            })
        ]);




    }
    addBusiness() {
        location.href = `#/MOTMenus/AddCampaign`;
    }
    editToBusiness(item) {

        location.href = `#/MOTMenus/EditCampaign?campaignid=${item.Business_id}`;
    }
    deleteBusiness(item) {
        item.Status = 'D';


        var json = {};
        json.Business = item;
        this.bizProductsService.SubmitBusinessCampaign(json).then((data) => {
            if (data.Result == true) {
                toastr.success('Xóa thành công!', "Chương trình");

            } else {
                toastr.success('Không thành công!', "Chương trình");;
            }
        });
    }

}


export class FilterBusinessValueConverter {
    toView(array, businessId) {

        if (businessId == "") {
            return array;

        } else {
            return array.filter(x => x.Business_id == businessId);

        }
        return array;

    }
}
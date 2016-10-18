import { inject } from 'aurelia-framework';
import { BizProductsService } from 'Services/AffiliateSvc/BizProductsService';

import * as toastr from "toastr";
import 'select2';


@inject(BizProductsService)
export class BusinessMng {
    campaign = [];
    listBusiness = [];
    CampaignMng = {};
    campaigns = [];

    constructor(bizProductsService) {

        this.bizProductsService = bizProductsService;
        this.current = 1;
        this.itemperpage = 10;
        this.pagesize = 8;


    }
    bind(ct, ovr) {
        if (this.campaigns != null)
            ovr.bindingContext.total = this.campaigns.length;
    }





    activate() {
        return Promise.all([
            this.bizProductsService.GetBusiness().then(data => {
                this.campaign = data;
                //console.log('list campaign', JSON.stringify(data));
            }),

            this.bizProductsService.GetCampaigns().then(data => {
                this.campaigns = data;
                //console.log('data ', JSON.stringify(data));
                // console.log('list campaign', JSON.stringify(data));
            }),

            this.bizProductsService.GetListBusiness().then(data => {
                this.listBusiness = data;


            })
        ]);




    }

    addCampaign() {
        location.href = `#/MOTMenus/AddBusiness`;
    }
    editToCampaign(item) {
        //console.log('item',JSON.stringify(item));
        //location.href = `#/AffiliateMenu/EditCampaign?campaignid=${item.Business_campaign_id}`;
        window.location = `#/MOTMenus/EditBusiness?businessid=${item.Business_campaign_id}`;
        this.bizProductsService.GetCampaignDetailById(item.Business_campaign_id).then(data => {
            this.detailCampaign = data;
            console.log('detailCampaign', JSON.stringify(data));
        });
    }
    deleteCampaign(item) {
        item.Status = 'D';
        //{"Campaign":{"Business_campaign_id":0,"Business_id":"1","Discount_code":0,"Campaign_code":"D","Name":"fa","Description":"fa","Date_start":"2016-06-29","Date_end":"2016-06-28","Position":"16","Status":"A"}}
        //{"Business_id":1,"Loyalty_id":"e2565cc9-b283-4716-88e5-be1a53416f1f","Affiliate_branch_id":4,"User":"admin@vienthonga.com","Pass":"123456","Name":"Administrator","Banner":"~/Upload/2015/11/1/banner-slide-acs.jpg","Descriptions":"Quảng trị hệ thống","Date_reg":0,"Position":0,"Status":"D","Userweb_id":""} 
        // console.log('item', JSON.stringify(item));
        var json = {};
        var deleteCampaign = {};
        deleteCampaign.Business_id = item.Business_id;
        //deleteCampaign.Business_id=
        json.campaign = item;
        // console.log('deleteCampaign', JSON.stringify(json));
        this.bizProductsService.SubmitBusinessCampaign(json).then((data) => {
            if (data.Result == true) {
                toastr.success('Xóa chương trình thành công!', "Chương trình");
                //console.log('deleteCampaign',JSON.stringify(data));
            } else {
                toastr.success('Không xóa chương trình thành công!', "Chương trình");;
            }
        });
    }

}


export class FilterBusinessValueConverter {
    toView(array, obj) {
        if (obj) {
            let filteredArr = array.filter(x => x.Business_id == obj);
            return filteredArr;
        }
        return array;
    }
}
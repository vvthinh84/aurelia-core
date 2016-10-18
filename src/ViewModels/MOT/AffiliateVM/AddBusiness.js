import { inject } from 'aurelia-framework';
import { BizProductsService } from 'Services/AffiliateSvc/BizProductsService';

import * as toastr from 'toastr';
import 'eonasdan-bootstrap-datetimepicker';
import 'moment/moment';

@inject(BizProductsService)

export class AddBusiness {
    Campaign = {};
    BizFormOnCampaign = {};
    listBusiness = [];

    constructor(bizProductsService) {

        this.bizProductsService = bizProductsService;
        this.current = 1;
        this.itemperpage = 10;
        this.pagesize = 8;


    }
    backToCampaign() {
        window.location = "#MOTMenus/BusinessMng";
    }


    attached() {
        $('#dtBannerStartDate').datetimepicker();
        $("#dtBannerStartDate").on("dp.change", () => {
            console.log('dtBannerStartDate', $('#dtBannerStartDate').val());
            this.StartDate = $('#dtBannerStartDate').val();
            console.log('Date_start', this.StartDate);
        });
        $('#dtBannerEndDate').datetimepicker();
        $("#dtBannerEndDate").on("dp.change", () => {
            console.log('dtBannerEndDate', $('#dtBannerEndDate').val());
            this.EndDate = $('#dtBannerEndDate').val();
        });

    }
    activate() {
        /*this.bizProductsService.GetBusiness().then(data => { this.business = data;
            console.log('business', JSON.stringify(data)); })
        this.bizProductsService.GetListBusiness().then(data => { this.listBusiness = data;
            console.log('listBusiness', JSON.stringify(data)); });*/
        this.bizProductsService.GetListBusiness().then(data => {
            this.listBusiness = data;
            // console.log('listBusiness', JSON.stringify(data));
        });


    }
    Submitcampaign() {

        var jsonToPost = {};
        this.Campaign.Business_campaign_id = 0;

        this.Campaign.Business_id = this.Business_id;
        this.Campaign.Discount_code = 0;
        this.Campaign.Campaign_code = this.Use_code;
        this.Campaign.Name = this.Name;

        this.Campaign.Description = this.Description;

        this.Campaign.Date_start = this.StartDate;
        this.Campaign.Date_end = this.EndDate;
        this.Campaign.Position = this.Position;

        this.Campaign.Status = 'A';
        //this.Business=this.BU

        //console.log('Campaign', JSON.stringify(this.Campaign));
        jsonToPost.Campaign = this.Campaign;
        //var Campaignid={};
        //Campaignid.Business_id=this.Business_id;
        //jsonToPost.Business=Campaignid;

        //this.bizProductsService.GetCampaignByBussinessId(this.Business_id).then(data=>{Campaignid=data;console.log('business',JSON.stringify(Campaignid))});
        //jsonToPost.Business=this.Business_id;
        //console.log('business',JSON.stringify(jsonToPost.Business));
        console.log('jsonToPost', JSON.stringify(jsonToPost));
        this.bizProductsService.SubmitBusinessCampaign(jsonToPost).then((data) => {
            if (data.Result == true) {

                toastr.success('Tạo mới chương trình thành công!', "Chương trình");
                window.location = "#MOTMenus/BusinessMng";

                return true;
            } else {
                toastr.success('Tạo mới đối tác thất bại !');
                return false;
            }
        });

    }

}
export class FilterBusinessIdValueConverter {
    toView(array, businessId) {
        // console.log('vo van thinh',businessId);
        if (businessId == "") {
            //console.log('array',JSON.stringify(array));
            return array;
        } else if (businessId != "") {
            return array.filter(x => x.Business_id != null && x.Business_id == businessId);
        }
        return array;
    }
}
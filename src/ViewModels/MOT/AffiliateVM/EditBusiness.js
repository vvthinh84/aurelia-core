import { inject } from 'aurelia-framework';
import { BizProductsService } from 'Services/AffiliateSvc/BizProductsService';

import * as toastr from 'toastr';
import 'eonasdan-bootstrap-datetimepicker';
import 'moment/moment';

@inject(BizProductsService)

export class EditBusiness {
    detailCampaign = {};

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
            //console.log('dtBannerStartDate',$('#dtBannerStartDate').val());
            this.detailCampaign.Date_start = $('#dtBannerStartDate').val();
            //console.log('Date_start',this.detailCampaign.Date_start);
        });
        $('#dtBannerEndDate').datetimepicker();
        $("#dtBannerEndDate").on("dp.change", () => {
            //console.log('dtBannerEndDate',$('#dtBannerEndDate').val());
            this.detailCampaign.Date_end = $('#dtBannerEndDate').val();

        });

    }
    activate(params) {


        this.bizProductsService.GetCampaignDetailById(params.businessid).then(data => {
            this.detailCampaign = data;
            //  console.log('detailCampaign', JSON.stringify(data));
        });

    }
    backToCampaignMng() {
        window.location = "#MOTMenus/BusinessMng";
    }
    editCampaign() {

        var jsonToPost = {};

        var campaign = {};
        campaign.Business_campaign_id = this.detailCampaign.Business_campaign_id;

        campaign.Business_id = this.detailCampaign.Business_id;
        campaign.Discount_code = this.detailCampaign.Discount_code;
        campaign.Campaign_code = this.detailCampaign.Use_code;
        campaign.Name = this.detailCampaign.Name;
        campaign.Description = this.detailCampaign.Description;
        campaign.Date_start = this.detailCampaign.Date_start;
        campaign.Date_end = this.detailCampaign.Date_end;
        campaign.Position = this.detailCampaign.Position;
        campaign.Status = this.detailCampaign.Status;
        jsonToPost.Campaign = campaign;
        // console.log('editCampaign', JSON.stringify(jsonToPost));
        this.bizProductsService.SubmitBusinessCampaign(jsonToPost).then((data) => {
            if (data.Result == true) {

                toastr.success('Tạo mới chương trình thành công!', "Chương trình");
                window.location = "#AffiliateMenu/BusinessMng";

                return true;
            } else {
                toastr.success('Tạo mới chương trình thất bại !');
                return false;
            }
        });

    }

}
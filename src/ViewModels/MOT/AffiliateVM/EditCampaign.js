import { inject } from 'aurelia-framework';
import { BizProductsService } from 'Services/AffiliateSvc/BizProductsService';

import * as toastr from 'toastr';
import 'eternicode-bootstrap-datepicker';

@inject(BizProductsService)

export class EditCampaign {
    detailBusiness = {};
    constructor(bizProductsService) {
        this.bizProductsService = bizProductsService;
    }

    backToBusinessMng() {
        window.location = "#MOTMenus/CampaignMng";
    }


    activate(params) {


        this.bizProductsService.GetBusinessId(params.campaignid).then(data => {
            this.detailBusiness = data;
            // console.log('detailBusiness', JSON.stringify(data)); 
        });

    }
    editBusiness() {

        var jsonToPost = {};
        var business = {};
        business.Business_id = this.detailBusiness.Business_id;


        business.Loyalty_id = this.detailBusiness.Loyalty_id;
        business.Affiliate_branch_id = this.detailBusiness.Affiliate_branch_id;
        business.User = this.detailBusiness.User;
        business.Pass = this.detailBusiness.Pass;
        business.Name = this.detailBusiness.Name;

        business.Banner = this.detailBusiness.Banner;
        business.Descriptions = this.detailBusiness.Descriptions;
        business.Date_reg = this.detailBusiness.Date_reg;
        business.Position = this.detailBusiness.Position;
        business.Status = this.detailBusiness.Status;
        business.Userweb_id = this.detailBusiness.Userweb_id;

        jsonToPost.Business = this.detailBusiness;

        //console.log('jsonToPost',JSON.stringify(jsonToPost));
        this.bizProductsService.SubmitBusinessCampaign(jsonToPost).then((data) => {
            if (data.Result == true) {

                toastr.success('Cập nhật đối tác thành công!', "Chương trình");
                window.location = "#MOTMenus/CampaignMng";

                return true;
            } else {
                toastr.success('Cập nhật đối tác thất bại !');
                return false;
            }
        });

    }

}
export class FilterBusinessIdValueConverter {
    toView(array, businessId) {

        if (businessId == "") {
            //  console.log('array',JSON.stringify(array));
            return array;
        } else if (businessId != "") {
            return array.filter(x => x.Business_id != null && x.Business_id == businessId);
        }
        return array;
    }
}
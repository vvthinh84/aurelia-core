import { inject } from 'aurelia-framework';
import { BizProductsService } from 'Services/AffiliateSvc/BizProductsService';

import * as toastr from 'toastr';
import 'eonasdan-bootstrap-datetimepicker';
import 'moment/moment';

@inject(BizProductsService)
export class AddUpload {
    campaign = [];
    business = [];

    constructor(bizProductsService) {

        this.bizProductsService = bizProductsService;

    }
    goToBack() {
        window.location = "#MOTMenus/BizProductsMng";
    }
    backToUpload() {
        if (this.file != null) {
            //console.log('length',this.file);
            window.location = "#MOTMenus/BizProductsMng";
            alert('upload file thành công');
        } else {
            alert('upload file thất bại');
        }

    }

    attached() {

        $('#startDate').datetimepicker();
        $("#startDate").on("dp.change", () => {
            //console.log('startDate',$('#startDate').val());
        });
        $('#endDate').datetimepicker();
        $("#endDate").on("dp.change", () => {
            //console.log('endDate',$('#endDate').val());
        });


    }

    activate() {


        this.bizProductsService.GetCampaigns().then(data => {
            this.campaign = data;
            //console.log('list campaign', JSON.stringify(data));
        });
        return Promise.all([this.bizProductsService.GetListBusiness()]).then(rs => { this.business = rs[0] });


    }

}
export class FilterBusinessIdValueConverter {
    toView(array, businessId) {
        // console.log('vo van thinh', businessId);
        //console.log('businessId',businessId);
        if (businessId == "") {
            // console.log('array', JSON.stringify(array));
            return array;
        } else if (businessId != "") {
            return array.filter(x => x.Business_id != null && x.Business_id == businessId);
        }
        return array;
    }
}
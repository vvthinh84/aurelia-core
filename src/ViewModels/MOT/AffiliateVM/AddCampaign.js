import { inject } from 'aurelia-framework';
import { BizProductsService } from 'Services/AffiliateSvc/BizProductsService';

import * as toastr from 'toastr';
import 'eternicode-bootstrap-datepicker';

@inject(BizProductsService)

export class AddCampaign {

    BizForm = {};
    Business = {};
    constructor(bizProductsService) {

        this.bizProductsService = bizProductsService;
        this.current = 1;
        this.itemperpage = 10;
        this.pagesize = 8;

    }
    backToBusiness() {
            window.location = "#MOTMenus/CamPaignMng";
        }
        //datetime now
    getDateTime() {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        if (month.toString().length == 1) {
            var month = '0' + month;
        }
        if (day.toString().length == 1) {
            var day = '0' + day;
        }
        if (hour.toString().length == 1) {
            var hour = '0' + hour;
        }
        if (minute.toString().length == 1) {
            var minute = '0' + minute;
        }
        if (second.toString().length == 1) {
            var second = '0' + second;
        }
        var dateTime = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
        return dateTime;
    }


    activate() {
        this.bizProductsService.GetListBusiness().then(data => {
            this.listBusiness = data;
            //console.log('listBusiness', JSON.stringify(data));
        });

    }
    submitBusiness() {

        var jsonToPost = {};
        this.BizForm.Business_id = 0;
        this.BizForm.Loyalty_id = null;
        this.BizForm.Affiliate_branch_id = 0;
        this.BizForm.User = this.User;
        this.BizForm.Pass = this.Pass;
        this.BizForm.Name = this.Name;
        this.BizForm.Banner = null;
        this.BizForm.Descriptions = this.Description;
        this.BizForm.Date_reg = this.getDateTime();
        this.BizForm.Position = 0;
        this.BizForm.Status = "A";
        this.BizForm.Userweb_id = null;

        jsonToPost.Business = this.BizForm;
        //this.Business=this.BU

        //console.log('Business', JSON.stringify(jsonToPost));        
        this.bizProductsService.SubmitBusinessCampaign(jsonToPost).then((data) => {
            if (data.Result == true) {

                toastr.success('Tạo mới đối tác thành công!', "Chương trình");
                window.location = "#AffiliateMenu/CampaignMng";
                //  console.log('Object Business',JSON.stringify(data));

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
        // console.log('vo van thinh', businessId);
        if (businessId == "") {
            // console.log('array', JSON.stringify(array));
            return array;
        } else if (businessId != "") {
            return array.filter(x => x.Business_id != null && x.Business_id == businessId);
        }
        return array;
    }
}
export class FileListToArrayValueConverter {
    toView(fileList) {
        let files = [];
        if (!fileList) {
            return files;
        }
        for (let i = 0; i < fileList.length; i++) {
            files.push(fileList.item(i));
        }
        return files;
    }
}
export class BlobToUrlValueConverter {
    toView(blob) {
        return URL.createObjectURL(blob);
    }
}
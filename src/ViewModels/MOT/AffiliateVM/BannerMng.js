import { inject, LogManager } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';

import { BannerService } from 'Services/AffiliateSvc/BannerService';
import { BizProductsService } from 'Services/AffiliateSvc/BizProductsService';

import * as toastr from "toastr";
import 'select2';
import 'trumbowyg';

@inject(BannerService, BizProductsService)
export class BannerMng {

    ListBanners = [];
    Positions = [];
    BizCampaigns = [];
    Business = [];

    constructor(bannerService, bizProductsService) {
        this.bannerService = bannerService;
        this.bizProductsService = bizProductsService;

        this.filterCampaign = "";
        this.filterBusiness = "";

        //PAGINATION
        this.current = 1;
        this.itemperpage = 10;
        this.pagesize = 8;
    }

    bind(ct, ovr) {
        if (this.ListBanners != null)
            ovr.bindingContext.total = this.ListBanners.length;
    }

    getBannerStatusName(status) {
        return this.bannerService.GetBannerStatusName(status);
    }

    activate() {
        return Promise.all([this.bannerService.GetBannerPositions(),
                this.bannerService.GetListBanner(),
                this.bizProductsService.GetCampaignByBussinessId(),
                this.bizProductsService.GetListBusiness()
            ])
            .then((rs) => {
                this.Positions = rs[0];

                this.ListBanners = rs[1];
                this.BizCampaigns = rs[2];
                this.Business = rs[3];
            })

    }

    attached() {
        $('#filterByCampaign').select2().val(this.filterCampaign);
        $('#filterByCampaign').select2({
            placeholder: "- Chọn Chương trình -",
            allowClear: true
        }).on('change', () => {
            this.filterCampaign = $('#filterByCampaign').val();
        });

        $('#filterPositions').select2().val(this.Positions);
        $('#filterPositions').select2({
            placeholder: "- Chọn Vị trí -",
            allowClear: true
        }).on('change', () => {
            this.Banner.Position = $('#filterPositions').val();
        });
    }

    active() {}

    ChangeBusiness() {
        this.BizCampaigns = [];
        this.bizProductsService.GetCampaignByBussinessId(this.BusinessId).then((data) => {
            if (data != null) {
                this.BizCampaigns = data;
            }
        });
    }

    viewLargeImage(image) {
        $('.imagepreview').attr('src', image);
        $('#imagemodal').modal('show');
    }

    // AddBanner() {
    //     console.log(this.filterCampaign);
    //     console.log(this.filterBusiness);
    //     if (this.filterCampaign !== "" && this.filterBusiness !== "") {
    //         //console.log(`#/MOTMenus/AddBanner?business=${this.filterBusiness}&campaign=${this.filterCampaign}`);
    //         window.location = `#/MOTMenus/AddBanner?business=${this.filterBusiness}&campaign=${this.filterCampaign}`;
    //         return;
    //     }
    //     window.location = `#/MOTMenus/AddBanner`;
    //     return;
    // }

    UpdateBanner(banner) {
        var jsonToPost = {};
        jsonToPost = banner;

        jsonToPost.Title = banner.Title;
        jsonToPost.CampaignId = banner.CampaignId;
        jsonToPost.Url = banner.Url;
        jsonToPost.StartDate = banner.StartDate;
        jsonToPost.EndDate = banner.EndDate;

        jsonToPost.Position = banner.Position;
        jsonToPost.Status = banner.Status;

        this.bannerService.UpdateBanner(jsonToPost).then((data) => {
            console.log(data);
            if (data.Result == true) {
                toastr.success('Cập nhật banner thành công!', "Banner");
            } else {
                toastr.error('Lỗi! Không thể cập nhật banner. Xin thử lại!', "Banner");
            }
        });
    }

    goToEdit(banner) {
        window.location = `#/MOTMenus/EditBanner?bannerid=${banner.Id}`;
    }

    imageExists(image_url) {
        try {
            // var http = new XMLHttpRequest();
            // http.open('HEAD', image_url, false);
            // http.send();
            // console.log("http.status", http.status);

            // if (http.status == 404)
            //     return "src/Resources/Images/no_image.gif";
            // else

            return image_url;
        } catch (error) {
            return image_url;
        }

    }
}

export class FilterPositionValueConverter {
    toView(array, obj) {
        if (array != null && obj != null) {
            obj = obj.trim();
            array = array.filter(x => ((x.Position != null) && (x.Position.indexOf(obj) != -1)));
        }
        return array;
    }
}

export class FilterCampaignValueConverter {
    toView(array, campaign) {
        if (campaign != "" && campaign != null && typeof campaign !== "undefined") {
            return array.filter(x => x.CampaignId != null && x.CampaignId == campaign);
        }
        return array;
    }
}

export class FilterNameValueConverter {
    toView(array, title) {
        if (title !== "" && title != null && typeof title !== "undefined") {
            return array.filter(x => ((x.Title !== null) && (x.Title.indexOf(title) !== -1)));
        }
        return array;
    }
}
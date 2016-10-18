import { inject } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';
import { BannerService } from 'Services/AffiliateSvc/BannerService';
import { BizProductsService } from 'Services/AffiliateSvc/BizProductsService';
import { UtilitiesJS } from 'Helpers/UtilitiesJS';

import 'select2';
import 'trumbowyg';
import 'eonasdan-bootstrap-datetimepicker';
import * as toastr from "toastr";

@inject(BannerService, BizProductsService, UtilitiesJS)
export class AddBanner {

    Positions = [];
    BizCampaigns = [];
    Banner;
    Business = [];

    _initBussiness = 0;
    _initCampaign = 0;

    constructor(bannerService, bizProductsService, utilitiesJS) {
        this.bannerService = bannerService;
        this.bizProductsService = bizProductsService;
        this.utilitiesJS = utilitiesJS;
        this.strErrorMsg = "";
        this.InitBanner();
    }

    InitBanner() {
        this.Banner = {};
        this.Banner.Title = "";
        this.Banner.Image = "";
        this.Banner.ImageMobile = "";
        this.Banner.Type = "G";
        this.Banner.Description = "";
        this.Banner.Url = "";
        this.Banner.Position = "";
        this.Banner.StartDate = this.utilitiesJS.GetFormattedDate(new Date());
        this.Banner.ImagePosition = 0;
        this.Banner.EndDate = this.utilitiesJS.GetFormattedDate(new Date());
        this.Banner.ImageType = 1;
        this.Banner.CampaignId = "";
    }

    activate(params) {
        //console.log(params);
        this._initBussiness = params.business;
        this._initCampaign = params.campaign;

        return Promise.all([this.bannerService.GetBannerPositions(),
                this.bizProductsService.GetCampaignByBussinessId(),
                this.bizProductsService.GetListBusiness()
            ])
            .then((rs) => {
                this.Positions = rs[0];
                this.BizCampaigns = rs[1];
                this.Business = rs[2];
            })
    }

    ChangeBusiness() {
        this.bizProductsService.GetCampaignByBussinessId(this.BusinessId).then((data) => {
            this.BizCampaigns = data;
        });
    }

    attached() {
        $('#BannerDescription').trumbowyg({
            svgPath: 'dist/Resources/Images/icons.svg',
            semantic: false
        });

        // $('.date').datepicker({
        //   format: "yyyy-mm-dd",
        //   autoclose: true
        // });
        $('#dtBannerStartDate').datetimepicker({ format: "YYYY-MM-DD HH:mm:ss " });
        $("#dtBannerStartDate").on("dp.change", () => {
            this.Banner.StartDate = $('#dtBannerStartDate').val();
        });
        $('#dtBannerEndDate').datetimepicker({ format: "YYYY-MM-DD HH:mm:ss " });
        $("#dtBannerEndDate").on("dp.change", () => {
            this.Banner.EndDate = $('#dtBannerEndDate').val();
        });



        $('#filterPositions').select2().val(this.Positions);
        $('#filterPositions').select2({
            placeholder: "- Chọn Vị trí -",
            allowClear: true
        }).on('change', () => {
            this.Banner.Position = $('#filterPositions').val();
        });
    }

    SubmitBanner() {

        //this.Banner.CampaignId = this._initCampaign;
        this.Banner.Status = "A";
        this.Banner.Description = $('#BannerDescription').trumbowyg('html');
        this.Banner.StartDate = $('#dtBannerStartDate').val();
        this.Banner.EndDate = $('#dtBannerEndDate').val();

        if (!this.ValidateBannerBeforeSubmit()) {
            alert(this.strErrorMsg);
            this.handleError(this.strErrorMsg)
            return;
        }

        var jsonToPost = {};
        jsonToPost = this.Banner;

        //console.log(JSON.stringify(jsonToPost));
        this.bannerService.InsertBanner(jsonToPost).then((data) => {
            if (data.Result == true) {
                this.InitBanner();
                toastr.success('Tạo mới Banner thành công!', "Banner");
                $('#BannerDescription').trumbowyg('empty');
                return true;
            } else {
                toastr.error('Lỗi! Không thể tạo Banner. Xin thử lại!', "Banner");
                return false;
            }
        });
    }

    BackToBannerMng() {
        location.href = `#/MOTMenus/BannerMng`;
    }

    ValidateBannerBeforeSubmit() {
        this.strErrorMsg = "";
        console.log(this.Banner);



        if (this.Banner.StartDate == "" || typeof this.Banner.StartDate === "undefined")
            this.strErrorMsg += "• \"Ngày Bắt Đầu\" phải nhập. \n";
        if (this.Banner.EndDate == "" || typeof this.Banner.EndDate === "undefined")
            this.strErrorMsg += "• \"Ngày Kết Thúc\" phải nhập. \n";

        if (this.strErrorMsg !== "")
            return false;
        return true;
    }
}
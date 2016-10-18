import { inject } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';
import { Router } from 'aurelia-router';

import { BannerService } from 'Services/AffiliateSvc/BannerService';
import { BizProductsService } from 'Services/AffiliateSvc/BizProductsService';
import { UtilitiesJS } from 'Helpers/UtilitiesJS';

import 'select2';
import 'trumbowyg';
import 'eonasdan-bootstrap-datetimepicker';
import * as toastr from "toastr";

//import 'eternicode/bootstrap-datepicker/js/bootstrap-datepicker';
@inject(BannerService, BizProductsService, UtilitiesJS, Router)
export class EditBanner {

    Positions = [];
    BizCampaigns = [];
    ImagePositionArray = [];
    ImageTypeArray = [];
    BannerToEdit;
    startday;
    endday;

    constructor(bannerService, bizProductsService, utilitiesJS, router) {
        this.bannerService = bannerService;
        this.bizProductsService = bizProductsService;
        this.utilitiesJS = utilitiesJS;
        this.theRouter = router;
        this.strErrorMsg = "";

        //Init Image Position
        this.ImagePositionArray.push({ "value": 0, "name": "Mặc định" });
        this.ImagePositionArray.push({ "value": 1, "name": "Vị trí 1" });
        this.ImagePositionArray.push({ "value": 2, "name": "Vị trí 2" });
        this.ImagePositionArray.push({ "value": 3, "name": "Vị trí 3" });
        this.ImagePositionArray.push({ "value": 4, "name": "Vị trí 4" });
        this.ImagePositionArray.push({ "value": 5, "name": "Vị trí 5" });
        this.ImagePositionArray.push({ "value": 6, "name": "Vị trí 6" });
        this.ImagePositionArray.push({ "value": 7, "name": "Vị trí 7" });
        this.ImagePositionArray.push({ "value": 8, "name": "Vị trí 8" });
        this.ImagePositionArray.push({ "value": 9, "name": "Vị trí 9" });
        this.ImagePositionArray.push({ "value": 10, "name": "Vị trí 10" });
        this.ImagePositionArray.push({ "value": 11, "name": "Vị trí 11" });
        this.ImagePositionArray.push({ "value": 12, "name": "Vị trí 12" });
        this.ImagePositionArray.push({ "value": 13, "name": "Vị trí 13" });
        this.ImagePositionArray.push({ "value": 14, "name": "Vị trí 14" });
        this.ImagePositionArray.push({ "value": 15, "name": "Vị trí 15" });
        this.ImagePositionArray.push({ "value": 16, "name": "Vị trí 16" });
        this.ImagePositionArray.push({ "value": 17, "name": "Vị trí 17" });
        this.ImagePositionArray.push({ "value": 18, "name": "Vị trí 18" });
        this.ImagePositionArray.push({ "value": 19, "name": "Vị trí 19" });
        this.ImagePositionArray.push({ "value": 20, "name": "Vị trí 20" });

        //Init ImageTypeArray
        this.ImageTypeArray.push({ "value": 1, "name": "Mặc định" });
        this.ImageTypeArray.push({ "value": 2, "name": "2 cột 1 hàng" });
        this.ImageTypeArray.push({ "value": 3, "name": "1 cột 2 hàng" });
        this.ImageTypeArray.push({ "value": 4, "name": "2 cột 2 hàng" });

    }

    activate(params) {

        return Promise.all([this.bannerService.GetBannerPositions(),
                this.bannerService.GetBannerDetail(params.bannerid),
                this.bizProductsService.GetCampaignByBussinessId()
            ])
            .then((rs) => {
                this.Positions = rs[0];
                this.BannerToEdit = rs[1];

                //console.log(this.BannerToEdit);

                if (rs[1].ImageMobile === null) {
                    this.BannerToEdit.ImageMobile = '';

                }
                if (rs[1].Image === null) {
                    this.BannerToEdit.Image = '';

                }
                // console.log(this.BannerToEdit.ImageMobile);
                // console.log(this.BannerToEdit.Image);
                this.startday = this.BannerToEdit.StartDate;
                this.endday = this.BannerToEdit.EndDate;
                this.BizCampaigns = rs[2];
            })
    }

    attached() {
        $('#BannerDescription').trumbowyg({
            svgPath: 'dist/Resources/Images/icons.svg',
            semantic: false
        });
        $('#BannerDescription').trumbowyg('html', this.BannerToEdit.Description);
        //$('.date').datepicker({ format: "yyyy-mm-dd", autoclose: true });




        $('#dtBannerStartDate').datetimepicker({ format: "YYYY-MM-DD HH:mm:ss " });
        $("#dtBannerStartDate").on("dp.change", () => {

            //this.selectedProductForEditing.DateStart = $('#dtSelectedProductForEditingDateStart').val();
            //this.BannerToEdit.StartDate = $('#dtBannerStartDate').val();

        });

        $('#dtBannerEndDate').datetimepicker({ format: "YYYY-MM-DD HH:mm:ss " });
        $("#dtBannerEndDate").on("dp.change", () => {

            //this.selectedProductForEditing.DateStart = $('#dtSelectedProductForEditingDateStart').val();
            //this.BannerToEdit.EndDate = $('#dtBannerEndDate').val();

        });

        this.BannerToEdit.StartDate = this.utilitiesJS.GetFormattedDate(new Date(this.BannerToEdit.StartDate));
        this.BannerToEdit.EndDate = this.utilitiesJS.GetFormattedDate(new Date(this.BannerToEdit.EndDate));

        $('#filterPositions').select2().val(this.BannerToEdit.Position);

        $('#filterPositions').select2({
            placeholder: "- Chọn Vị trí -",
            allowClear: true
        }).on('change', () => {
            this.BannerToEdit.Position = $('#filterPositions').val();
        });

    }

    SubmitBanner() {
        this.BannerToEdit.Status = "A";
        this.BannerToEdit.Description = $('#BannerDescription').trumbowyg('html');
        this.BannerToEdit.StartDate = $('#dtBannerStartDate').val();
        this.BannerToEdit.EndDate = $('#dtBannerEndDate').val();
        this.BannerToEdit.Type = "G";

        // if (!this.ValidateBannerBeforeSubmit()) {
        //   alert(this.strErrorMsg);
        //   return;
        // }

        var jsonToPost = {};
        jsonToPost = this.BannerToEdit;

        console.log(JSON.stringify(jsonToPost));
        this.bannerService.UpdateBanner(jsonToPost)
            .then((data) => {
                if (data.Result === true) {
                    toastr.success('Cập nhật banner thành công!', "Banner");
                    location.href = `#/MOTMenus/BannerMng`;
                    return true;
                } else {
                    toastr.error('Lỗi! Không thể cập nhật banner. Xin thử lại!', "Banner");
                }
            });
    }

    BackToBannerMng() {
        location.href = `#/MOTMenus/BannerMng`;
    }

    ValidateBannerBeforeSubmit() {
        this.strErrorMsg = "";

        if (this.BannerToEdit.StartDate === "" || typeof this.BannerToEdit.StartDate === "undefined")
            this.strErrorMsg += "• \"Ngày Bắt Đầu\" phải nhập. \n";
        if (this.BannerToEdit.EndDate === "" || typeof this.BannerToEdit.EndDate === "undefined")
            this.strErrorMsg += "• \"Ngày Kết Thúc\" phải nhập. \n";

        if (this.strErrorMsg !== "")
            return false;
        return true;
    }
}
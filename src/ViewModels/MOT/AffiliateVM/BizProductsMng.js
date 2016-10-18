import { inject } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';

import { BizProductsService } from 'Services/AffiliateSvc/BizProductsService';
import { UtilitiesJS } from 'Helpers/UtilitiesJS';

import * as toastr from 'toastr';
import 'eonasdan-bootstrap-datetimepicker';
import 'trumbowyg';

@inject(BizProductsService, UtilitiesJS)
export class BizProductsMng {

    Business = [];
    BizCampaigns = [];
    BizProducts = [];

    selectedProducts = [];

    BizForm = {};
    CampaignForm = {};
    BizFormOnCampaign = {};
    pendding = true;
    get total() {
        return this.mydata.items.length;
    }

    constructor(bizProductsService, utilitiesJS) {
        this.bizProductsService = bizProductsService;
        this.utilitiesJS = utilitiesJS;

        this.newStatus = "A";
        this.BusinessId = 0;
        this.CampaignId = 1;
        this.checkAll = false;

        //PAGINATION
        this.current = 1;
        this.itemperpage = 10;
        this.pagesize = 8;
        this.strErrorMsg = "";
    }

    activate(params) {
        if (params.result) {
            if (params.result == "true") {
                toastr.success('Tạo mới Upload thành công!', "Upload");
            } else {
                toastr.error('Tạo mới Upload khong thành công!', "Upload");
            }
        }

        return Promise.all([this.bizProductsService.GetListBusiness(),
            this.bizProductsService.GetCampaignByBussinessId(null),
            this.bizProductsService.GetListBizProducts(this.CampaignId)
        ]).then((rs) => {
            this.Business = rs[0];
            this.BizCampaigns = rs[1];
            for (var i in rs[2]) {
                rs[2][i].checked = false;
            }
            this.BizProducts = rs[2];
        })
    }
   async syncProduct() {
       this.pendding = !this.pendding;
       let sync = await this.bizProductsService.DongboDataProduct();
       console.log('sync', JSON.stringify(sync));
        
       if(sync.Result==true)
       {
             this.pendding = !this.pendding;
            toastr.success('Đồng bộ sản phẩm web thành công!', "QUẢN LÝ SẢN PHẨM");  
       } 
       else
       {
          this.pendding = !this.pendding;
         toastr.error('Đồng bộ sản phẩm web thất bại!', "QUẢN LÝ SẢN PHẨM");    
       }     
    }
    
    attached() {
        $('#dtSelectedProductForEditingDateStart').datetimepicker();
        $("#dtSelectedProductForEditingDateStart").on("dp.change", () => {
            this.selectedProductForEditing.DateStart = $('#dtSelectedProductForEditingDateStart').val();
        });

        $('#dtSelectedProductForEditingDateEnd').datetimepicker();
        $("#dtSelectedProductForEditingDateEnd").on("dp.change", () => {
            this.selectedProductForEditing.DateEnd = $('#dtSelectedProductForEditingDateEnd').val();
        });

        $('#txtFilterDateStart').datetimepicker();
        $("#txtFilterDateStart").on("dp.change", () => {
            this.dateStartFilter = $('#txtFilterDateStart').val();
        });


        $('#txtFilterDateEnd').datetimepicker();
        $("#txtFilterDateEnd").on("dp.change", () => {
            this.dateEndFilter = $('#txtFilterDateEnd').val();
        });

        $('#dtCampaignDateStart').datetimepicker();
        $("#dtCampaignDateStart").on("dp.change", () => {
            this.Date_start = $('#dtCampaignDateStart').val();
        });
        $('#dtCampaignDateEnd').datetimepicker();
        $("#dtCampaignDateEnd").on("dp.change", () => {
            this.Date_End = $('#dtCampaignDateEnd').val();
        });

        $('#PromotionDescription').trumbowyg({
            svgPath: 'dist/Resources/Images/icons.svg',
            semantic: false
        });
    }

    SelectAllBizProducts() {
        if (this.checkAll === false) {
            for (var i in this.BizProducts) {
                this.BizProducts[i].checked = true;
            }
        } else {
            for (var i in this.BizProducts) {
                this.BizProducts[i].checked = false;
            }
        }
        this.checkAll = !this.checkAll;

        //console.log(this.checkAll);
    }

    ChangeBusiness() {
        this.bizProductsService.GetCampaignByBussinessId(this.BusinessId).then((data) => {
            this.BizCampaigns = data;
            //console.log('Business',JSON.stringify(this.BizCampaigns));
        });
    }

    ChangeCampaign() {
        this.bizProductsService.GetListBizProducts(this.CampaignId).then((data) => {
            this.BizProducts = data;
            //console.log('Campaign',JSON.stringify(this.BizProducts));
        });
    }

    SubmitBusiness() {

        if (!this.ValidateBusinessBeforeSubmit()) {
            alert(this.strErrorMsg);
            return;
        }

        var jsonToPost = {};

        //Set Up Business
        this.BizForm.Business_id = 0;
        this.BizForm.Affiliate_branch_id = 0;
        this.BizForm.Date_reg = 0;
        this.BizForm.Position = 0;
        this.BizForm.Status = "A";

        jsonToPost.Business = this.BizForm;
        jsonToPost.Campaign = null;

        this.bizProductsService.SubmitBusinessCampaign(jsonToPost).then((data) => {
            if (data.Result == true) {
                this.bizProductsService.GetListBusiness().then((data) => {
                    this.Business = data;
                });
                toastr.success('Tạo mới đối tác thành công!', "Đối tác");
                $('#addBusiness').modal('hide');
                return true;
            } else {
                toastr.error('Lỗi! Không thể tạo mới đối tác. Xin thử lại!', "Đối tác");
                return false;
            }
        });
    }

    SubmitCampaign() {

        this.CampaignForm.Date_start = this.Date_start;
        this.CampaignForm.Date_end = this.Date_End;

        if (!this.ValidateCampaignBeforeSubmit()) {
            alert(this.strErrorMsg);
            return;
        }

        var jsonToPost = {};

        this.CampaignForm.Business_campaign_id = 0;
        this.CampaignForm.Use_code = "D";
        this.CampaignForm.Campaign_code = "";
        this.CampaignForm.Position = 0;
        this.CampaignForm.Status = "A";
        this.CampaignForm.Business_id = this.BizFormOnCampaign.Business_id;

        jsonToPost.Campaign = this.CampaignForm;
        jsonToPost.Business = this.BizFormOnCampaign;
        //console.log('Campaign', JSON.stringify(jsonToPost.Campaign));
        //console.log('Business',JSON.stringify(jsonToPost.Business));
        this.bizProductsService.SubmitBusinessCampaign(jsonToPost).then((data) => {
            if (data.Result == true) {
                //console.log('object', JSON.stringify(data));
                this.bizProductsService.GetCampaignByBussinessId(null).then((data) => {
                    this.BizCampaigns = data;
                    //console.log('BizCampaigns sadfsdf', JSON.stringify(data));
                });
                toastr.success('Tạo mới chương trình thành công!', "Chương trình");
                $('#addCampaign').modal('hide');
                return true;
            } else {
                toastr.error('Lỗi! Không thể tạo chương trình. Xin thử lại!', "Chương trình");
                return false;
            }
        });
    }

    UpdateSelectedBizProductsStatus() {
            this.selectedProducts = this.BizProducts.filter(x => x.checked == true);
            if (this.selectedProducts.length == 0) {
                toastr.warning('Please select products on below table before for changing their status!', "Update Products")
                return;
            }

            let selectedProductIds = [];
            for (var i in this.selectedProducts) {
                selectedProductIds.push(this.selectedProducts[i].Id);
                this.selectedProducts[i].Status = this.newStatus;
            }

            var jsonToPost = {};
            jsonToPost.Status = this.newStatus;
            jsonToPost.ListCampaignProduct = selectedProductIds;

            this.bizProductsService.UpdateSelectedBizProductsStatus(jsonToPost).then((data) => {
                if (data.Result == true) {
                    toastr.success('Cập nhật danh sách thành công!', "Business Products");
                    return true;
                } else {
                    toastr.error('Lỗi! Không thể cập nhật danh sách. Xin thử lại!', "Business Products");
                    return false;
                }
            });
        }
        //thịnh làm phần create upload file
    goToUpload() {
        location.href = '#/MOTMenus/AddUpload';
    }
    EditProduct(product) {
        this.selectedProductForEditing = product;
        this.selectedProductForEditing.DateStart = this.utilitiesJS.GetFormattedDate(new Date(product.DateStart));
        this.selectedProductForEditing.DateEnd = this.utilitiesJS.GetFormattedDate(new Date(product.DateEnd));
        this.selectedProductForEditing.PromotionDescription = product.PromotionDescription;
        this.selectedProductForEditing.BusinessCampaignId = product.BusinessCampaignId;
        $('#PromotionDescription').trumbowyg('html', product.PromotionDescription);
    }

    UpdateBizProduct(selectedProductForEditing) {
        var jsonToPost = {};
        this.selectedProductForEditing.DateStart = $('#dtSelectedProductForEditingDateStart').val();
        this.selectedProductForEditing.DateEnd = $('#dtSelectedProductForEditingDateEnd').val();
        this.selectedProductForEditing.PromotionDescription = $('#PromotionDescription').trumbowyg('html');

        jsonToPost.Id = selectedProductForEditing.Id;
        jsonToPost.Status = selectedProductForEditing.Status;
        jsonToPost.StartDate = this.selectedProductForEditing.DateStart;
        jsonToPost.EndDate = this.selectedProductForEditing.DateEnd;
        jsonToPost.PromotionDescription = this.selectedProductForEditing.PromotionDescription;
        jsonToPost.DisplayType = this.selectedProductForEditing.DisplayType;
        jsonToPost.PromotionType = this.selectedProductForEditing.PromotionType;





        this.bizProductsService.UpdateBizProduct(jsonToPost).then((data) => {
            if (data.Result == true) {
                toastr.success('Cập nhật sản phẩm thành công!', "Product");
                $('#editProduct').modal('hide');
                return true;
            } else {
                toastr.error('Lỗi! Không thể cập nhật sản phẩm. Xin thử lại!', "Product");
                return false;
            }
        });
    }


    //
    UpdateBizAllProductCode(selectedProductForEditing) {
        var jsonToPost = {};

        this.selectedProductForEditing.DateStart = $('#dtSelectedProductForEditingDateStart').val();
        this.selectedProductForEditing.DateEnd = $('#dtSelectedProductForEditingDateEnd').val();
        this.selectedProductForEditing.PromotionDescription = $('#PromotionDescription').trumbowyg('html');

        jsonToPost.Id = selectedProductForEditing.Id;
        jsonToPost.Status = selectedProductForEditing.Status;
        jsonToPost.StartDate = this.selectedProductForEditing.DateStart;
        jsonToPost.EndDate = this.selectedProductForEditing.DateEnd;
        jsonToPost.PromotionDescription = this.selectedProductForEditing.PromotionDescription;
        jsonToPost.ProductCode = this.selectedProductForEditing.ProductCode;
        jsonToPost.BusinessCampaignId = this.selectedProductForEditing.BusinessCampaignId;
        jsonToPost.DisplayType = this.selectedProductForEditing.DisplayType;
        jsonToPost.PromotionType = this.selectedProductForEditing.PromotionType;
        this.bizProductsService.UpdateListCampaignProductbyProductCodes(jsonToPost).then((data) => {

            if (data.Result == true) {
                toastr.success('Áp dụng tất cả mã code thành công!', "Product");
                $('#editProduct').modal('hide');
                location.reload();
                return true;

            } else {
                toastr.error('Lỗi! Không thể áp dụng. Xin thử lại!', "Product");
                return false;
            }
        });
    }


    ValidateBusinessBeforeSubmit() {
        this.strErrorMsg = "";
        if (this.BizForm.Name == "" || typeof this.BizForm.Name === "undefined")
            this.strErrorMsg += "• \"Tên\" phải nhập. \n";
        if (this.BizForm.User == "" || typeof this.BizForm.User === "undefined")
            this.strErrorMsg += "• \"Người Dùng\" phải nhập. \n";
        if (this.BizForm.Pass == "" || typeof this.BizForm.Pass === "undefined")
            this.strErrorMsg += "• \"Mật Khẩu\" phải nhập. \n";
        if (this.strErrorMsg !== "")
            return false;
        return true;
    }

    ValidateCampaignBeforeSubmit() {
        this.strErrorMsg = "";
        if (this.BizFormOnCampaign.Business_id == "" || typeof this.BizFormOnCampaign.Business_id === "undefined")
            this.strErrorMsg += "• \"Business\" phải nhập. \n";
        if (this.CampaignForm.Name == "" || typeof this.CampaignForm.Name === "undefined")
            this.strErrorMsg += "• \"Tên\" phải nhập. \n";
        if (this.CampaignForm.Date_start == null || typeof this.CampaignForm.Date_start === "undefined")
            this.strErrorMsg += "• \"Ngày Bắt Đầu\" phải nhập. \n";
        if (this.CampaignForm.Date_end == null || typeof this.CampaignForm.Date_end === "undefined")
            this.strErrorMsg += "• \"Ngày Kết Thúc\" phải nhập. \n";
        if (this.strErrorMsg !== "")
            return false;
        return true;
    }
}

export class FilterByCampaignIdValueConverter {
    toView(array, obj) {
        if (obj) {
            let filteredArr = array.filter(x => x.BusinessCampaignId == obj);
            return filteredArr;
        }
        return array;
    }
}

export class FilterByIdOrCodeValueConverter {
    toView(array, obj) {
        if (obj) {
            obj = obj.trim();
            return array
                .filter(x => (((x.ProductCode != null) && (x.ProductCode.indexOf(obj) != -1)) || ((x.ProductId != null) && (x.ProductId == obj)) || ((x.ProductColorCode != null) && (x.ProductColorCode.indexOf(obj) != -1)) || ((x.ProductName != null) && (x.ProductName == obj))));
        }
        return array;
    }
}

export class FilterByErrorProductsValueConverter {
    toView(array, obj) {
        if (typeof obj === "undefined")
            obj = false;
        if (obj) {
            return array
                .filter(x => (x.ProductId == 0));
        }
        return array;
    }
}

export class FilterByRangeDateValueConverter {
    setDateGMT(x) {
        var a = new Date(x);
        return new Date(a.setHours(a.getHours() + a.getTimezoneOffset() / 60));
    }


    toView(array, dateStartFilter, dateEndFilter) {

        //console.log(startDate);
        //console.log(endDate);
        //convert to Unix time before compare


        var start = new Date(dateStartFilter);
        var end = new Date(dateEndFilter);

        //console.log("end",end);

        //console.log('array',JSON.stringify(array));
        if (dateStartFilter == undefined || dateEndFilter == undefined) {

            return array;
        } else if (start > end) {
            array = [];
            return array;
        } else if ((dateStartFilter != undefined && dateEndFilter != undefined) && end >= start) {


            return array.filter((x) => {
                return ((this.setDateGMT(x.DateStart) >= start) && (this.setDateGMT(x.DateEnd) <= end))
            });

        }

        return array;
    }

}
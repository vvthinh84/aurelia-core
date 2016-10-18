import * as APISettings from 'Configuration/APISettings';
import { inject, transient } from 'aurelia-framework';
import { HttpService } from 'Services/HttpService';
import { AppState } from 'Helpers/AppStateHelper';

@inject(HttpService)
@transient()
export class EnterpriseService {

    constructor(httpService) {
        this.httpService = httpService;
    }

    GetListCompany() {

            return this.httpService.GetData(APISettings.APIDoanhNghiepListDoanhNghiep, 'get', null);
        }
        //Lay danh sach mat hang
    GetListProduct(param) {
        var _str = `?businesscode` + `=` + param;
        return this.httpService.GetData(APISettings.APIDoanhNghiepGetListProduct + _str, 'get', null);
    }
    GetListProductColor(param, productid) {
        var _str = `?businessCode` + `=` + param + `&productId=` + productid;
        return this.httpService.GetData(APISettings.APIDoanhNghiepGetListProductColor + _str, 'get', null);
    }

    GetListOrdersEnterprise(jsonToPost) {
        // this.logger.info("JSON GetListUserByCompanyIdPassed: ", JSON.stringify(jsonToPost));
        return this.httpService.GetData(APISettings.APIDoanhNghiepGetListOrders, 'post', jsonToPost);
    }
    GetListStatusOrder(StatusBusinessOrder) {
        var _str = `?` + `loaistatus` + `=` + StatusBusinessOrder;
        // this.logger.info("JSON GetListUserByCompanyIdPassed: ", JSON.stringify(jsonToPost));
        return this.httpService.GetData(APISettings.APIDoanhNghiepGetListStatusOrder + _str, 'get', null);
    }
    GetListOrdersDetail(OrderId) {
        var _str = `?` + `OrderId` + `=` + OrderId;
        // this.logger.info("JSON GetListUserByCompanyIdPassed: ", JSON.stringify(jsonToPost));
        return this.httpService.GetData(APISettings.APIDoanhNghiepGetListOrdersDetail + _str, 'get', null);
    }

    GetListOrdersStatus(Statusname) {
            var _str = `?` + `loaistatus` + `=` + Statusname;
            // this.logger.info("JSON GetListUserByCompanyIdPassed: ", JSON.stringify(jsonToPost));
            return this.httpService.GetData(APISettings.APIDoanhNghiepGetListStatusOrder + _str, 'get', null);
        }
        // GetListOrdersStatus(Statusname) {
        //     var _str=`?`+`loaistatus`+`=`+Statusname;
        //  // this.logger.info("JSON GetListUserByCompanyIdPassed: ", JSON.stringify(jsonToPost));
        //   return this.httpService.GetData(APISettings.APIDoanhNghiepGetListStatusOrder+_str, 'get', null);
        // }

    GetListAddress() {
        return this.httpService.GetData(APISettings.APIDoanhNghiepGetListAddress, 'get', null);
    }
    GetListCategory() {
        return this.httpServiceWebVNPOSTApi.GetData(APISettings.APIDoanhNghiepGetListCategory, 'get', null);
    }

    InsertOrderCashEnterprise(jsonToPost) {
        // this.logger.info("JSON GetListUserByCompanyIdPassed: ", JSON.stringify(jsonToPost));
        return this.httpService.GetData(APISettings.APIDoanhNghiepInsertOrderCash, 'post', jsonToPost);
    }

    DeleteOrderByOrderId(id) {
        var _str = `?` + `orderId` + `=` + id;
        return this.httpService.GetData(APISettings.APIDoanhNghiepDeleteOrder + _str, 'get', null);
    }
    UpdateOrdersEnterprise(jsonToPost) {
        // this.logger.info("JSON GetListUserByCompanyIdPassed: ", JSON.stringify(jsonToPost));
        return this.httpService.GetData(APISettings.APIDoanhNghiepUpdateOrder, 'post', jsonToPost);
    }
    InsertBusiness(jsonToPost) {
        // this.logger.info("JSON GetListUserByCompanyIdPassed: ", JSON.stringify(jsonToPost));
        return this.httpService.GetData(APISettings.APIDoanhNghiepInsertBusiness, 'post', jsonToPost);
    }
    UpdateBusiness(jsonToPost) {
        // this.logger.info("JSON GetListUserByCompanyIdPassed: ", JSON.stringify(jsonToPost));
        return this.httpService.GetData(APISettings.APIDoanhNghiepUpdateBusiness, 'post', jsonToPost);
    }
    DoanhNghiepOrderToPos(OrderId) {
        var _str = `?` + `orderId` + `=` + OrderId;
        // this.logger.info("JSON GetListUserByCompanyIdPassed: ", JSON.stringify(jsonToPost));
        return this.httpService.GetData(APISettings.APIDoanhNghiepOrderToPos + _str, 'get', null);
    }
    DoanhNghiepDeleteBusiness(businessid) {
        var _str = `?` + `businessId` + `=` + businessid;
        return this.httpService.GetData(APISettings.APIDoanhNghiepDelBusiness + _str, 'get', null);
    }
    DoanhNghiepListKhachHangDN() {

        return this.httpService.GetData(APISettings.APIDoanhNghiepListKhachHangDN, 'get', null);
    }

    UpdateKhachHangDoanhNghiep(jsonToPost) {

        return this.httpService.GetData(APISettings.APIDoanhNghiepUpdateKhachHangDN, 'post', jsonToPost);
    }
    DoanhNghiepXoaKhachHang(id) {
        var _str = `?` + `id` + `=` + id;
        return this.httpService.GetData(APISettings.APIDoanhNghiepDeleteKhachHangDN + _str, 'get', null);
    }

    DoanhNghiepUpdateListKhachHang(json) {

        return this.httpService.GetData(APISettings.APIDoanhNghiepUpdateListStatusKhachHangDN, 'post', json);
    }

    DoanhNghiepListDanhSachLienHe(json) {

        return this.httpService.GetData(APISettings.APIDoanhNghiepListDanhSachLienHe, 'post', json);
    }


    GetListDanhsachton(jsonToPost) {
        return this.httpService.GetData(APISettings.APIDoanhNghiepListDanhSachTon, 'post', jsonToPost);
    }



    //Lay danh sach cap tren
    GetListTeamleadbyCompanyId() {
        var jsonToPost = {
            CompanyId: this.appState.UserInfo.CompanyId,
            UserId: this.appState.UserInfo.UserId
        };
        return this.httpService.GetData(APISettings.APIGetListTeamleadbyCompanyId, 'post', jsonToPost);
    }

    //List product sản phẩm
    GetListInstalmentProducts(obj) {

        return this.httpService.GetData(APISettings.APIGetListBizProducts, 'post', obj);

    }
    UpdateBusinessProduct(obj) {
        return this.httpService.GetData(APISettings.APIUpdateBusinessProduct, 'post', obj);
    }
    DeleteListProduct(obj) {
        return this.httpService.GetData(APISettings.APIDeleteListProduct, 'post', obj)
    }
    UpdateCampaignAllProductCode(obj) {
        return this.httpService.GetData(APISettings.APIUpdateCampaignAllProductCode, 'post', obj);
    }
    UpdateStatusListProduct(obj) {
        return this.httpService.GetData(APISettings.APIUpdateStatusListProduct, 'post', obj);

    }

    //End List
    InsertInstalmentOrder(jsonToPost) {
        return this.httpService.GetData(APISettings.APIPostInstalmentOrder, 'post', jsonToPost);
    }

    GetListMoney(tongtien, phantramtra, sothangtra, laisuat) {
        //3290000&phantramtra=30&sothangtra=3&laisuat=3.00
        //doanhnghiep-api/TinhTragop?tongtien=
        var _str = +tongtien + `&phantramtra=` + phantramtra + `&sothangtra=` + sothangtra + `&laisuat=` + laisuat;
        ///console.log('testapi',APISettings.APITinhTien+_str);
        return this.httpService.GetData(APISettings.APITinhTien + _str, 'get', null);
    }

    GetLisTraGop() {
        return this.httpService.GetData(APISettings.APILisTraGop, 'get', null);
    }



}
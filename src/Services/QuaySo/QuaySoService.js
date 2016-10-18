import * as APISettings from 'Configuration/APISettings';
import { inject, transient } from 'aurelia-framework';
import { HttpServiceWebPublicApi } from 'Services/HttpService';
import { HttpServiceLocalApi } from 'Services/HttpService';

@inject(HttpServiceWebPublicApi, HttpServiceLocalApi)
@transient()
export class QuaySoService {

    constructor(httpServiceWebPublicApi, httpServiceLocalApi) {
        this.httpServiceWebPublicApi = httpServiceWebPublicApi;
        this.httpServiceLocalApi = httpServiceLocalApi;
    }

    //Table Gift
    GetListQuaySoGift() {
        return this.httpServiceWebPublicApi.GetData(APISettings.APIGetListQuaySoGift, 'get', null);
    }

    InsertOrUpdateQuaySoGift(jsonToPost) {
        return this.httpServiceWebPublicApi.GetData(APISettings.APIInsertOrUpdateQuaySoGift, 'post', jsonToPost);
    }

    //Table Condition
    GetListQuaySoCondition() {
        return this.httpServiceWebPublicApi.GetData(APISettings.APIGetListQuaySoCondition, 'get', null);
    }

    InsertOrUpdateQuaySoCondition(jsonToPost) {
        return this.httpServiceWebPublicApi.GetData(APISettings.APIInsertOrUpdateQuaySoCondition, 'post', jsonToPost);
    }

    //Table Condition-Gift
    GetListQuaySoConditionGift() {
        return this.httpServiceWebPublicApi.GetData(APISettings.APIGetListQuaySoConditionGift, 'get', null);
    }

    InsertOrUpdateQuaySoConditionGift(jsonToPost) {
        return this.httpServiceWebPublicApi.GetData(APISettings.APIInsertOrUpdateQuaySoConditionGift, 'post', jsonToPost);
    }

    GetListQuaySoBranch() {
        return this.httpServiceWebPublicApi.GetData(APISettings.APIGetListQuaySoBranch, 'get', null);
    }

    UpdateQuaySoResult(jsonToPost) {
        return this.httpServiceWebPublicApi.GetData(APISettings.APIUpdateQuaySoResult, 'post', jsonToPost);
    }

    GetListQuaySoResult() {
        return this.httpServiceWebPublicApi.GetData(APISettings.APIGetListQuaySoResult, 'get', null);
    }

    SearchResultByOrderCode(orderCodeSearch) {
        if (orderCodeSearch == null || typeof orderCodeSearch === "undefined") { orderCodeSearch = ""; }
        return this.httpServiceWebPublicApi.GetData(APISettings.APISearchQuaySoResult + orderCodeSearch, 'get', null);
    }

    GetListQuaySoBranchSapHetHang() {
        return this.httpServiceWebPublicApi.GetData(APISettings.APIGetListQuaySoBranchSapHetHang, 'get', null);
    }

    GetListQuaySoCampaign() {
        return this.httpServiceWebPublicApi.GetData(APISettings.APIGetListQuaySoCampaign, 'get', null);
    }


    GetListQuaTuongUngBranch(campaignId) {
        return this.httpServiceWebPublicApi.GetData(APISettings.APIGetListQuaTuongUngBranch + "?campaignId=" + campaignId, 'get', null);
    }

    GetKetQuaQuaySoHangThang(campaign, branch) {
        return this.httpServiceWebPublicApi.GetData(APISettings.APIGetKetQuaQuaySoHangThang + "?campaign=" + campaign + "&branch=" + branch, 'get', null);
    }

}
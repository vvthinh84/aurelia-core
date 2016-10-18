import * as APISettings from 'Configuration/APISettings';
import { inject, transient } from 'aurelia-framework';
import { HttpServiceWebPublicApi } from 'Services/HttpService';

@inject(HttpServiceWebPublicApi)
@transient()
export class CoBrandService {

    constructor(httpServiceWebPublicApi) {
        this.httpServiceWebPublicApi = httpServiceWebPublicApi;
    }

    InsertCoBrandItem(jsonToPost) {
        return this.httpServiceWebPublicApi.GetData(APISettings.APIInsertCoBrandItem, 'post', jsonToPost);
    }

    SearchCoBrandItem(keywordSearch) {
        if (keywordSearch == null || typeof keywordSearch === "undefined") { keywordSearch = ""; }
        return this.httpServiceWebPublicApi.GetData(APISettings.APISearchCoBrandItem + keywordSearch, 'get', null);
    }


}
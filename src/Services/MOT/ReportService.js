import * as APISettings from 'Configuration/APISettings';
import { inject, transient } from 'aurelia-framework';
import { HttpServiceLocalApi } from 'Services/HttpService';

@inject(HttpServiceLocalApi)
@transient()
export class ReportService {

    constructor(httpServiceLocalApi) {
        this.httpServiceLocalApi = httpServiceLocalApi;
    }

    GetReportOrderFlashDeal(jsonToPost) {
        return this.httpServiceLocalApi.GetData(APISettings.APIMOTGetReportOrderFlashDeal, 'post', jsonToPost);
    }
    GetReportPreOrder(jsonToPost) {
        return this.httpServiceLocalApi.GetData(APISettings.APIMOTGetReportPreOrder, 'post', jsonToPost);
    }
}
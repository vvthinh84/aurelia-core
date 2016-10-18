import * as APISettings from 'Configuration/APISettings';
import { inject, transient } from 'aurelia-framework';
import { HttpServiceLocalApi } from 'Services/HttpService';

@inject(HttpServiceLocalApi)
@transient()
export class EventSaleService {

    constructor(httpServiceLocalApi) {
        this.httpServiceLocalApi = httpServiceLocalApi;
    }

    GetListEventSale() {
        return this.httpServiceLocalApi.GetData(APISettings.APIMOTGetListEventSale, 'get');
    }
    InsertEventSale(jsonToObj) {
        return this.httpServiceLocalApi.GetData(APISettings.APIMOTInsertEventSale, 'post', jsonToObj);
    }
    UpdateEventSale(jsonToObj) {
        return this.httpServiceLocalApi.GetData(APISettings.APIMOTUpdateEventSale, 'post', jsonToObj);
    }
    DeactiveEventSale(id) {
        return this.httpServiceLocalApi.GetData(APISettings.APIMOTDeactiveEventSale + id, 'get');
    }


}
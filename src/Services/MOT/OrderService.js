import * as APISettings from 'Configuration/APISettings';
import { inject, transient } from 'aurelia-framework';
import { HttpServiceLocalApi } from 'Services/HttpService';

@inject(HttpServiceLocalApi)
@transient()
export class OrderService {

    constructor(httpServiceLocalApi) {
        this.httpServiceLocalApi = httpServiceLocalApi;
    }

    GetListOrder(jsonToPost) {
        return this.httpServiceLocalApi.GetData(APISettings.APIMOTGetListOrder, 'post', jsonToPost);
    }
}
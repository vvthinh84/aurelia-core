import * as APISettings from 'Configuration/APISettings';
import { inject, transient } from 'aurelia-framework';
import { HttpServiceWebPublicApi } from 'Services/HttpService';

@inject(HttpServiceWebPublicApi)
@transient()
export class TraGopService {

    constructor(httpServiceWebPublicApi) {
        this.httpServiceWebPublicApi = httpServiceWebPublicApi;
    }

}
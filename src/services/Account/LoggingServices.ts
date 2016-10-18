import { inject, transient } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';
import { HttpService } from '../..//services/HttpService';
@inject(HttpService)
//Create OBJ
@transient()
export class LoggingServices {
    http: any;
    constructor(httpService: HttpService) {
        this.http = httpService.httpInstance;

    }
    GetListLogging(meta) {
        return new Promise((resolve, reject) => {
            this.http.fetch(`api/logging/GetAllLogging`, { method: 'post', body: json(meta) }).then(response => response.json()).then(data => { resolve(data) }).catch(err => reject(Error(err)));
        })
    }



}

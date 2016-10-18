import { inject, transient } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';
import { HttpService } from '../..//services/HttpService';
@inject(HttpService)
//Create OBJ
@transient()
export class CustomerServices {
    http: any;
    constructor(httpService: HttpService) {
        this.http = httpService.httpInstance;

    }
    GetListCustomer(meta) {
        return new Promise((resolve, reject) => {
            this.http.fetch(`api/customer/GetAllSyncCustomer`, { method: 'post', body: json(meta) }).then(response => response.json()).then(data => { resolve(data) }).catch(err => reject(Error(err)));
        })
    }

    UpdateGeneralCode(meta) {
        return new Promise((resolve, reject) => {
            this.http.fetch(`api/customer/UpdateGeneralCode`, { method: 'post', body: json(meta) }).then(response => response.json()).then(data => { resolve(data) }).catch(err => reject(Error(err)));
        })
    }

    SendSmsCode(meta) {
        return new Promise((resolve, reject) => {
            this.http.fetch(`api/customer/SendSmsCode`, { method: 'post', body: json(meta) }).then(response => response.json()).then(data => { resolve(data) }).catch(err => reject(Error(err)));
        })
    }


}

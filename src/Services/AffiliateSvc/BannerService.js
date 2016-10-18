import * as APISettings from 'Configuration/APISettings';
import { inject, transient } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';
import { HttpServiceWebVNPOSTApi } from 'Services/HttpService';
import { HttpService } from 'Services/HttpService';

@inject(HttpServiceWebVNPOSTApi, HttpService)
@transient()
export class BannerService {


    constructor(httpServiceWebVNPOSTApi, httpService) {
        this.httpService = httpService;
        this.httpServiceWebVNPOSTApi = httpServiceWebVNPOSTApi;
        this.http = httpServiceWebVNPOSTApi.httpInstance;

    }

    GetBannerStatusName(status) {
        switch (status) {
            case "H":
                return "Ẩn";
                break;
            case "D":
                return "Vô hiệu lực";
                break;
            default:
                return "Hiệu lực";
        }
    }

    GetBannerDetail(bannerid) {
        return new Promise((resolve, reject) => {
            this.http.fetch(`banner-api/GetBannerDetail?Id=${bannerid}`, {
                    method: 'get'
                })
                .then(response => response.json())
                .then(data => {
                    resolve(data.Data);
                })
                .catch(err => reject(this.httpServiceWebVNPOSTApi.HandlingServerError(err)));
        });
    }

    GetBannerPositions() {
        return new Promise((resolve, reject) => {
            this.http.fetch(`banner-api/GetPosition`, {})
                .then(response => response.json())
                .then(data => {
                    resolve(data.Data);
                })
                .catch(err => reject(this.httpServiceWebVNPOSTApi.HandlingServerError(err)));
        });
    }

    GetListBanner() {
        return new Promise((resolve, reject) => {
            this.http.fetch(`banner-api/GetListBanner`, {})
                .then(response => response.json())
                .then(data => {
                    resolve(data.Data);
                })
                .catch(err => reject(this.httpServiceWebVNPOSTApi.HandlingServerError(err)));
        });
    }

    UpdateBanner(jsonToPost) {
        console.log("JSON Update Banner:" + JSON.stringify(jsonToPost));
        return new Promise((resolve, reject) => {
            this.http.fetch(`banner-api/UpdateBanner`, {
                    method: 'post',
                    body: json(jsonToPost)
                })
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                })
                .catch(err => reject(this.httpServiceWebVNPOSTApi.HandlingServerError(err)));
        });
    }

    InsertBanner(jsonToPost) {
        console.log("JSON Insert Banner:" + JSON.stringify(jsonToPost));
        return new Promise((resolve, reject) => {
            this.http.fetch(`banner-api/InsertBanner`, {
                    method: 'post',
                    body: json(jsonToPost)
                })
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                })
                .catch(err => reject(this.httpServiceWebVNPOSTApi.HandlingServerError(err)));
        });
    }

}
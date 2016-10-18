import * as APISettings from 'Configuration/APISettings';
import { inject, transient, NewInstance } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { HttpServiceWebVNPOSTApi } from 'Services/HttpService';



// @inject(HttpServiceWebVNPOSTApi, HttpService)
@inject(NewInstance.of(HttpClient), HttpServiceWebVNPOSTApi)
@transient()
export class BizProductsService {

    constructor(http, httpServiceWebVNPOSTApi) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl(APISettings.WebPublicApiVNPOST)
                //.withBaseUrl(APISettings.AdminCpApiUrlBase)
                .withDefaults({
                    headers: {
                        'SessionToken': (Lockr.get('UserInfo') == null || typeof Lockr.get('UserInfo') === "undefined") ? "" : Lockr.get('UserInfo').SessionToken
                    }
                })
        });

        this.httpServiceWebVNPOSTApi = httpServiceWebVNPOSTApi;
        this.http = http;

    }

    GetCampaigns() {

        return new Promise((resolve, reject) => {
            this.http.fetch(`Affiliate-api/GetCampaigns?bussinessId=0`, {})
                .then(response => response.json())
                .then(data => {
                    resolve(data.Data);
                })
                .catch(err => reject(this.httpServiceWebVNPOSTApi.HandlingServerError(err)));
        });

    }
    
    DongboDataProduct(){
        return new Promise((resolve, reject) => {
            this.http.fetch(`product-api/DongboDataProduct`, { method: 'get' })
                .then(response => response.json())
                .then(data => {
                    console.log("Data: ", data);
                    resolve(data);
                })
                .catch(err => reject(this.httpService.HandlingServerError(err)));
        });
   } 
    GetCampaignByBussinessId(businessId) {
        if (businessId == null || businessId == "" || typeof businessId === "undefined") {
            businessId = 0;
        }

        return new Promise((resolve, reject) => {
            this.http.fetch(`Affiliate-api/GetCampaignByBussinessId?businessId=${businessId}`, {})
                .then(response => response.json())
                .then(data => {
                    resolve(data.Data);
                })
                .catch(err => reject(this.httpServiceWebVNPOSTApi.HandlingServerError(err)));
        });
    }

    GetListCompanies() {
        return new Promise((resolve, reject) => {
            this.http.fetch(`store-api/GetCompany`, { method: 'get' })
                .then(response => response.json())
                .then(data => {
                    console.log("Data: ", data.Data);
                    resolve(data.Data);
                })
                .catch(err => reject(this.httpService.HandlingServerError(err)));
        });
    }

    GetCampaignNameById(campaignId, listBizCampaigns) {
        if (listBizCampaigns.length > 0) {
            listBizCampaigns = listBizCampaigns.filter(x => x.CampaignId != null && x.CampaignId == campaignId);
            if (listBizCampaigns.length > 0)
                return listBizCampaigns[0].Name;
        }
        return "";
    }

    GetCompanyNameById(companyId, listCompanies) {
        if (listCompanies.length > 0) {
            listCompanies = listCompanies.filter(x => x.Id != null && x.Id == companyId);
            if (listCompanies.length > 0)
                return listCompanies[0].CompanyName;
        }
        return "";
    }

    GetListBusiness() {
        return new Promise((resolve, reject) => {
            this.http.fetch(`Affiliate-api/GetListBussiness`, {})
                .then(response => response.json())
                .then(data => {
                    resolve(data.Data);
                })
                .catch(err => reject(this.httpServiceWebVNPOSTApi.HandlingServerError(err)));
        });
    }

    GetListBizProducts(campaignId) {
        if (campaignId == null || campaignId == "" || typeof campaignId === "undefined") {
            campaignId = 0;
        }

        return new Promise((resolve, reject) => {
            this.http.fetch(`Affiliate-api/GetListCampaignProduct?campaignId=${campaignId}`, {})
                .then(response => response.json())
                .then(data => {
                    resolve(data.Data);
                })
                .catch(err => reject(this.httpServiceWebVNPOSTApi.HandlingServerError(err)));
        });
    }

    SubmitBusinessCampaign(jsonToPost) {
        return new Promise((resolve, reject) => {
            this.http.fetch(`Affiliate-api/UpdateBusinessCampaign`, {
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

    UpdateSelectedBizProductsStatus(jsonToPost) {
        //  console.log("JSON Update Seleted Business Products:" + JSON.stringify(jsonToPost));
        return new Promise((resolve, reject) => {
            this.http.fetch(`Affiliate-api/UpdateListCampaignProduct`, {
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

    UpdateBizProduct(jsonToPost) {
        return new Promise((resolve, reject) => {
            this.http.fetch(`Affiliate-api/UpdateCampaignProduct`, {
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

    UpdateListCampaignProductbyProductCodes(jsonToPost) {
        return new Promise((resolve, reject) => {
            this.http.fetch(`Affiliate-api/UpdateListCampaignProductbyProductCode`, {
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
    UpdateCompany(jsonToPost) {
        return new Promise((resolve, reject) => {
            this.http.fetch(`store-api/UpdateCompany`, {
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
    GetBusiness() {
        return new Promise((resolve, reject) => {
            this.http.fetch(`Affiliate-api/GetBusiness`, {})
                .then(response => response.json())
                .then(data => {
                    resolve(data.Data);
                })
                .catch(err => reject(this.httpServiceWebVNPOSTApi.HandlingServerError(err)));
        });
    }
    GetCampaignDetailById(campaignId) {
        return new Promise((resolve, reject) => {
            this.http.fetch(`Affiliate-api/GetCampaignDetailById?id=${campaignId}`, {})
                .then(response => response.json())
                .then(data => {
                    resolve(data.Data);
                })
                .catch(err => reject(this.httpServiceWebVNPOSTApi.HandlingServerError(err)));
        });
    }
    GetBusinessId(businessId) {
        return new Promise((resolve, reject) => {
            this.http.fetch(`Affiliate-api/GetBusinessId?id=${businessId}`, {})
                .then(response => response.json())
                .then(data => {
                    resolve(data.Data);
                })
                .catch(err => reject(this.httpServiceWebVNPOSTApi.HandlingServerError(err)));
        });
    }
    GetListBlock() {
        return this.httpServiceWebVNPOSTApi.GetData(APISettings.APIGetListBlock, 'get', null);
    }
    GetListSponsorById(sponsorId) {
        var _str = `?` + `sponsorId` + `=` + sponsorId;

        return this.httpServiceWebVNPOSTApi.GetData(APISettings.APIGetListSponsor + _str, 'get', null);
    }
    InsertSponsorProdcut(obj) {
        return this.httpServiceWebVNPOSTApi.GetData(APISettings.APIInsertSponsorProduct, 'post', obj);
    }


}
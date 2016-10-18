import { inject, transient, NewInstance } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { HttpServiceHelpers } from 'Helpers/HttpServiceHelpers';
import * as APISettings from 'Configuration/APISettings';
import * as toastr from "toastr";

//Using for calling API from WebApiBackendVTA
@transient()
@inject(NewInstance.of(HttpClient), HttpServiceHelpers)
export class HttpService {
    constructor(http, httpServiceHelpers) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl(APISettings.AdminCpApiUrlBase)
                .withDefaults({
                    headers: {
                        'SessionToken': (Lockr.get('UserInfo') == null || typeof Lockr.get('UserInfo') === "undefined") ? "" : Lockr.get('UserInfo').SessionToken
                    }
                })
        });
        this.http = http;
        this.httpInstance = http;
        this.httpServiceHelpers = httpServiceHelpers;
    }

    GetData(apiUrl, method, jsonToPost) {

        var bodyToPost = {};
        if (jsonToPost != null) {
            bodyToPost = json(jsonToPost);
        }

        if (method === 'get') {
            return new Promise((resolve, reject) => {
                this.http.fetch(apiUrl, {
                        method: method
                            // body: bodyToPost
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.StatusCode == 'Access_Denied') {
                            toastr.warning("Bạn không có quyền truy cập!", "Thông báo");
                        }
                        resolve(data);
                    })
                    .catch(err => reject(this.HandlingServerError(err)));
            });
        } else {
            return new Promise((resolve, reject) => {
                this.http.fetch(apiUrl, {
                        method: method,
                        body: bodyToPost
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.StatusCode == 'Access_Denied') {
                            toastr.warning("Bạn không có quyền truy cập!", "Thông báo");
                        }
                        resolve(data);
                    })
                    .catch(err => reject(this.HandlingServerError(err)));
            });
        }
    }

    HandlingServerError(error) {
        return this.httpServiceHelpers.HandlingServerError(error);
    }
}

///Using for call API from WebPublicAPI
@transient()
@inject(NewInstance.of(HttpClient), HttpServiceHelpers)
export class HttpServiceWebPublicApi {
    constructor(http, httpServiceHelpers) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl(APISettings.WebPublicApiUrlBase)
        });
        this.http = http;
        this.httpInstance = http;
        this.httpServiceHelpers = httpServiceHelpers;
    }


    convertObjectToFormData(obj) {
        var formData = new FormData();
        for (var key in query) {
            formData.append(key, query[key]);
        }
        return formData;
    }
    GetData(apiUrl, method, jsonToPost) {
        // console.log('get data');
        var bodyToPost = {};
        if (jsonToPost != null) {
            bodyToPost = json(jsonToPost);
        }

        if (method === 'get') {
            return new Promise((resolve, reject) => {
                this.http.fetch(apiUrl, {
                        method: method
                            // body: bodyToPost
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.StatusCode == 'Access_Denied') {
                            toastr.warning("Bạn không có quyền truy cập!", "Thông báo");
                        }
                        resolve(data);
                    })
                    .catch(err => reject(this.HandlingServerError(err)));
            });
        } else {
            return new Promise((resolve, reject) => {
                this.http.fetch(apiUrl, {
                        method: method,
                        body: bodyToPost
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.StatusCode == 'Access_Denied') {
                            toastr.warning("Bạn không có quyền truy cập!", "Thông báo");
                        }
                        resolve(data);
                    })
                    .catch(err => reject(this.HandlingServerError(err)));
            });
        }
    }

    HandlingServerError(error) {
        return this.httpServiceHelpers.HandlingServerError(error);
    }


}

///Using for call API from WebPublicApiVNPOST
@transient()
@inject(NewInstance.of(HttpClient), HttpServiceHelpers)
export class HttpServiceWebVNPOSTApi {
    constructor(http, httpServiceHelpers) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl(APISettings.WebPublicApiVNPOST)
        });
        this.http = http;
        this.httpInstance = http;
        this.httpServiceHelpers = httpServiceHelpers;
    }

    GetData(apiUrl, method, jsonToPost) {

        var bodyToPost = {};
        if (jsonToPost != null) {
            bodyToPost = json(jsonToPost);
        }

        if (method === 'get') {
            return new Promise((resolve, reject) => {
                this.http.fetch(apiUrl, {
                        method: method
                            // body: bodyToPost
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.StatusCode == 'Access_Denied') {
                            toastr.warning("Bạn không có quyền truy cập!", "Thông báo");
                        }
                        resolve(data);
                    })
                    .catch(err => reject(this.HandlingServerError(err)));
            });
        } else {
            return new Promise((resolve, reject) => {
                this.http.fetch(apiUrl, {
                        method: method,
                        body: bodyToPost
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.StatusCode == 'Access_Denied') {
                            toastr.warning("Bạn không có quyền truy cập!", "Thông báo");
                        }
                        resolve(data);
                    })
                    .catch(err => reject(this.HandlingServerError(err)));
            });
        }
    }

    HandlingServerError(error) {
        return this.httpServiceHelpers.HandlingServerError(error);
    }

}

///Using for call API from WebLocalAPI
@transient()
@inject(NewInstance.of(HttpClient), HttpServiceHelpers)
export class HttpServiceLocalApi {
    constructor(http, httpServiceHelpers) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl(APISettings.LocalApiUrlBase)
        });
        this.http = http;
        this.httpInstance = http;
        this.httpServiceHelpers = httpServiceHelpers;
    }

    GetData(apiUrl, method, jsonToPost) {

        var bodyToPost = {};
        if (jsonToPost != null) {
            bodyToPost = json(jsonToPost);
        }

        if (method === 'get') {
            return new Promise((resolve, reject) => {
                this.http.fetch(apiUrl, {
                        method: method
                            // body: bodyToPost
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.StatusCode == 'Access_Denied') {
                            toastr.warning("Bạn không có quyền truy cập!", "Thông báo");
                        }
                        resolve(data);
                    })
                    .catch(err => reject(this.HandlingServerError(err)));
            });
        } else {
            return new Promise((resolve, reject) => {
                this.http.fetch(apiUrl, {
                        method: method,
                        body: bodyToPost
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.StatusCode == 'Access_Denied') {
                            toastr.warning("Bạn không có quyền truy cập!", "Thông báo");
                        }
                        resolve(data);
                    })
                    .catch(err => reject(this.HandlingServerError(err)));
            });
        }
    }

    HandlingServerError(error) {
        return this.httpServiceHelpers.HandlingServerError(error);
    }

}
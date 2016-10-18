import { inject, transient } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';
import { HttpService } from '../..//services/HttpService';
@inject(HttpService)
//Create OBJ
@transient()
export class UserServices {
    http: any;
    constructor(httpService: HttpService) {
        this.http = httpService.httpInstance;

    }
    GetByMeta(meta) {
        return new Promise((resolve, reject) => {
            this.http.fetch(`user-api/GetUsers`, {
                method: 'post',
                body: json(meta),
            })
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                })
                .catch(err => reject(Error(err)));

        });
    }
    GetUserRoles() {
        return new Promise((resolve, reject) => {
            this.http.fetch(`user-api/GetUserRoles`, { method: 'get' }).then(response => response.json()).then(data => { resolve(data) }).catch(err => reject(Error(err)));
        })
    }
    UpdateByUser(meta) {
        return new Promise((resolve, reject) => {
            this.http.fetch(`user-api/UpdateUser`, {
                method: 'post',
                body: json(meta),
            })
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                })
                .catch(err => reject(Error(err)));

        });
    }
    GetUserHistory(meta) {
     
        return new Promise((resolve, reject) => {
            this.http.fetch(`user-api/GetHistoryByUserId`, {
                method: 'post',
                body: json(meta),
            })
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                })
                .catch(err => reject(Error(err)));

        });
    }
    GetListStudent() {
        return new Promise((resolve, reject) => {
            this.http.fetch(`api/student/GetAllStudent`, { method: 'get' }).then(response => response.json()).then(data => { resolve(data) }).catch(err => reject(Error(err)));
        })
    }
    
    SentActiveMailRequest(id) {
        return new Promise((resolve, reject) => {
            this.http.fetch(`user-api/SentActiveMailRequest?userId=${id}`, { method: 'get' }).then(response => response.json()).then(data => { resolve(data) }).catch(err => reject(Error(err)));
        })
    }
}

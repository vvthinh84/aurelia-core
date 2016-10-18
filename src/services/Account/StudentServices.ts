import { inject, transient } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';
import { HttpService } from '../..//services/HttpService';
@inject(HttpService)
//Create OBJ
@transient()
export class StudentServices {
    http: any;
    constructor(httpService: HttpService) {
        this.http = httpService.httpInstance;

    }
    GetListStudent(meta) {
        return new Promise((resolve, reject) => {
            this.http.fetch(`api/student/GetAllStudent`, { method: 'post',body:json(meta) }).then(response => response.json()).then(data => { resolve(data) }).catch(err => reject(Error(err)));
        })
    }

    GetListSchool() {
        return new Promise((resolve, reject) => {
            this.http.fetch(`api/student/getALlSchool`, { method: 'get' }).then(response => response.json()).then(data => { resolve(data) }).catch(err => reject(Error(err)));
        })
    }
    
    UpdateUserStatus(meta){
          return new Promise((resolve, reject) => {
              console.log('i am from service');
            this.http.fetch(`api/student/UpdateUserStatus`, { method: 'post',body:json(meta)}).then(response => response.json()).then(data => { resolve(data) }).catch(err => reject(Error(err)));
        })

    }



}

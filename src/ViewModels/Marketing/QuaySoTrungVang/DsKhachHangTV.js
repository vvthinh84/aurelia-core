import { inject } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';
import { WebQuaySoService } from 'Services/Webquayso/WebQuaySoService';
import * as toastr from "toastr";
// import 'select2';
// import 'select2/css/select2.css!'
import 'Eonasdan/bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min';

@inject(WebQuaySoService)
export class DsKhachHang {
    jsonToPost = { "Tuan": 1, "EventId": 1 };
    ListKhachHang = [];
    constructor(webQuaySoService) {

        this.webQuaySoService = webQuaySoService;
        this.filterBranch = "";

        //Pagination
        this.current = 1;
        this.itemperpage = 10;
        this.pagesize = 10;
    }

    activate(params ? : any) {
        if (params.result) {
            if (params.result == "true") {
                toastr.success('Tạo mới Upload thành công!', "Upload");
            } else {
                toastr.error('Tạo mới Upload khong thành công!', "Upload");
            }
        }


        console.log(this.jsonToPost);
        return Promise.all([this.webQuaySoService.GetListQuaySoKhachHang(this.jsonToPost), ]).then((rs) => {
            this.ListKhachHang = rs[0].Data;
        })
    }

    bind(ct, ovr) {
        ovr.bindingContext.total = this.ListKhachHang.length;
    }

    attached() {

    }
    search() {

        this.activate({ result: false });
    }

}
import { inject } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';

import { EnterpriseService } from 'Services/EnterpriseSvc/EnterpriseService';
import { UtilitiesJS } from 'Helpers/UtilitiesJS';

import * as toastr from "toastr";
import 'eonasdan-bootstrap-datetimepicker';

@inject(EnterpriseService, UtilitiesJS)
export class Mncontact {
    ListKH = [];

    constructor(enterpriseService, utilitiesJS) {
        this.enterpriseService = enterpriseService;
        this.utilitiesJS = utilitiesJS;
        this.checkAll = false;

        //Pagination
        this.current = 1;
        this.itemperpage = 10;
        this.pagesize = 10;
    }

    activate() {

    }

    bind(ct, ovr) {
        ovr.bindingContext.total = this.ListKH.length;
    }


    attached() {
        $('#txtFilterDateStart').datetimepicker({

            format: "YYYY-MM-DD HH:mm:ss"
        });
        $("#txtFilterDateStart").on("dp.change", () => {
            this.dateStartFilter = $('#txtFilterDateStart').val();

        });


        $('#txtFilterDateEnd').datetimepicker({

            format: "YYYY-MM-DD HH:mm:ss"

        });
        $("#txtFilterDateEnd").on("dp.change", () => {
            this.dateEndFilter = $('#txtFilterDateEnd').val();


        });
    }





    SearchLienHe() {

        var obj = {};
        obj.FromDate = this.dateStartFilter;
        obj.ToDate = this.dateEndFilter;

        this.enterpriseService.DoanhNghiepListDanhSachLienHe(obj).then((kq) => {
            if (kq.Result == true) {
                this.ListKH = kq.Data;
            }
        });
    }

}






export class FilterByStatusValueConverter {
    toView(array, status) {
        if (status) {
            return array.filter(x => x.Status != null && x.Status == status);
        }
        return array;
    }
}

export class FilterByNameValueConverter {
    toView(array, obj) {
        if (obj) {
            return array
                .filter(x => ((x.FullName != null) && (x.FullName.toLowerCase().indexOf(obj.toLowerCase()) != -1)) ||
                    ((x.Email != null) && (x.Email.toLowerCase().indexOf(obj.toLowerCase()) != -1)) ||
                    ((x.Phone != null) && (x.Phone.toLowerCase().indexOf(obj.toLowerCase()) != -1))


                );
        }
        return array;
    }
}
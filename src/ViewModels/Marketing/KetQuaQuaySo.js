import { inject } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';
import { QuaySoService } from 'Services/QuaySo/QuaySoService';
import * as toastr from 'toastr';
import 'select2';

@inject(QuaySoService)
export class KetQuaQuaySo {

    _defaultMonth = "10";
    _defaultYear = "2016";
    pendding = true;

    ListCampaigns = [];
    ListBranchs = [];
    ListKetQuaQuaySoHangThang = [];

    constructor(quaySoService) {
        this.filterBranch = "";
        this.quaySoService = quaySoService;
    }

    activate() {
        return Promise.all([
            this.quaySoService.GetListQuaySoCampaign(),
            this.quaySoService.GetListQuaySoBranch()
        ]).then((rs) => {
            //console.log(rs[1].Data);
            this.ListCampaigns = rs[0].Data;
            this.ListBranchs = rs[1].Data.ListBranchs;
        })
    }

    attached() {
        $('#filterByBranch').select2().val(this.filterBranch);
        $('#filterByBranch').select2({
            placeholder: "Tất cả Chi nhánh",
            allowClear: true
        }).on('change', () => {
            this.filterBranch = $('#filterByBranch').val();
        });
    }

    SearchKetQuaQuaySo() {
        this.ListKetQuaQuaySoHangThang = [];
        if (this.filterBranch === null)
            this.filterBranch = "All";
        this.pendding = !this.pendding;
        this.quaySoService.GetKetQuaQuaySoHangThang(this.filterCampaign.value, this.filterBranch).then((data) => {
            if (data.Result === true) {
                this.ListKetQuaQuaySoHangThang = data.Data;
                this.pendding = !this.pendding;
                return true;
            } else {
                this.pendding = !this.pendding;
                toastr.error("Lỗi! Xin thử lại!");
                return false;
            }
        });
    }
}
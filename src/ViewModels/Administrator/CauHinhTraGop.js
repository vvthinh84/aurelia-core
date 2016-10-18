import { inject } from 'aurelia-framework';
import * as toastr from 'toastr';
import 'eonasdan-bootstrap-datetimepicker';

export class CauHinhTraGop {
    attached() {
        $('#datetimepicker1').datetimepicker({ format: "DD-MM-YYYY HH:mm A" });
        $("#datetimepicker1").on("dp.change", () => {});
        $('#datetimepicker2').datetimepicker({ format: "DD-MM-YYYY HH:mm A" });
        $("#datetimepicker2").on("dp.change", () => {});
    }
}
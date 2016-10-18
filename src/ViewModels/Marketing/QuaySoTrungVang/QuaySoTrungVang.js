import { inject } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';
import { WebQuaySoService } from 'Services/Webquayso/WebQuaySoService';
import * as toastr from "toastr";

@inject(WebQuaySoService)
export class BackToSchool {
    postObject = {};
    isSTop = false;
    quaySoResult = '000000000000000';

    constructor(webQuaySoService) {
        this.webQuaySoService = webQuaySoService;
    }

    activate() {

    }

    attached() {
        // Lấy giá trị Text
        $('#el_week').on('change', () => {
            this.Danhsachkhachhangtheotuan1();
        });
    }

    // select list data when Week changed
    Danhsachkhachhangtheotuan1() {
        this.webQuaySoService.GetKetQuaKhachHangTrungGiaiTV(this.objQua1()).then(rs => {
            this.DSKhachHangTrung1 = rs.Data.DsKhachhangsDaTrung;
        });
    }

    // Break Point Counter
    counter = 1;

    objQua1() {
        let obj = {};
        obj.Tuan = this.postObject.Tuan;;
        return obj;
    }

    HieuUng1() {
        if (this.counter >= 40) {
            this.stop();
            this.KetQua1();
            return;

        }
        setTimeout(() => {
            this.quaySoResult = this.randChars(15);
            this.HieuUng1();
            this.counter++;
        }, 50)
    }

    KetQua1() {
        this.webQuaySoService.GetKetQuaQuaySoTV(this.objQua1()).then(rs => {
            console.log(rs);
            if (rs.StatusCode == "Success") {
                this.quaySoResult = rs.Data.KhachhangsDangTrung.MaKh;

                this.DSKhachHangTrung1 = rs.Data.DsKhachhangsDaTrung;

            } else {
                this.quaySoResult = '000000000000000';
                toastr.warning("Chưa Lấy được kết quả hoặc hết quà!!!", "QUAY SỐ");
            }

        });
    }

    play1() {
        if (!this.ValidateConditionBeforeSubmit()) {
            return false;
        }
        this.HieuUng1();
    }

    stop() {

        this.isSTop = true;
        this.counter = 1;
    }
    randChars(n_char) {
        var text = "";
        var possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (var i = 0; i < n_char; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    ValidateConditionBeforeSubmit() {
        var strErrorMsg = "";
        if (this.postObject.Tuan == "" || typeof this.postObject.Tuan === "undefined")
            strErrorMsg += "• Tuần quay phải chọn. <br/>";
        if (strErrorMsg !== "") {
            toastr.error(strErrorMsg, "Lỗi dữ liệu nhập!");
            return false;
        }
        return true;
    }


}
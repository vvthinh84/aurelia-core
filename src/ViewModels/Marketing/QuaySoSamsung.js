import { inject } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';
import { WebQuaySoService } from 'Services/WebQuaySo/WebQuaySoService';
import * as toastr from "toastr";
@inject(WebQuaySoService)
export class BackToSchool {
    postObject = {};
    isSTop = false;
    quaySoResult = '000000000000000';
    quaySoResult2 = '000000000000000';
    quaySoResult3 = '000000000000000';
    constructor(webQuaySoService) {
        this.webQuaySoService = webQuaySoService;


    }

    activate() {
        return Promise.all([this.webQuaySoService.GetKetQuaKhachhangtrunggiai({ "Tuan": 1, "LoaiQua": 4, "EventId": 2 })])
            .then((rs) => {
                this.DSKhachHangTrung1 = rs[0].Data.DsKhachhangsDaTrung.filter(x => x.LoaiQua == 4);
                //  this.DSKhachHangTrung2 = rs[0].Data.DsKhachhangsDaTrung.filter(x =>x.LoaiQua==2);
                //  this.DSKhachHangTrung3 = rs[0].Data.DsKhachhangsDaTrung.filter(x =>x.LoaiQua==3);


            })
    }
    attached() {

    }

    // Break Point Counter
    counter = 1;


    objQua1() {

        let obj = {};
        obj.Tuan = this.postObject.Tuan;
        obj.LoaiQua = 1;
        obj.EventId = 1;
        return obj;
    }
    objQua2() {

        let obj = {};
        obj.Tuan = this.postObject.Tuan;
        obj.LoaiQua = 2;
        obj.EventId = 1;
        return obj;
    }
    objQua3() {

        let obj = {};
        obj.Tuan = this.postObject.Tuan;
        obj.LoaiQua = 3;
        obj.EventId = 1;
        return obj;
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
    HieuUng2() {
        if (this.counter >= 40) {
            this.stop();
            this.KetQua2();
            return;

        }
        setTimeout(() => {
            this.quaySoResult2 = this.randChars(15);
            this.HieuUng2();
            this.counter++;
        }, 50)

    }
    HieuUng3() {
        if (this.counter >= 40) {
            this.stop();
            this.KetQua3();
            return;

        }
        setTimeout(() => {
            this.quaySoResult3 = this.randChars(15);
            this.HieuUng3();
            this.counter++;
        }, 50)

    }




    KetQua1() {

        //console.log(JSON.stringify(this.objQua1()));
        this.webQuaySoService.GetKetQuaQuaySo(this.objQua1()).then(rs => {

            // this.DSKhachHangTrung1 = rs.Data;

            if (rs.StatusCode == "Success") {
                // console.log(rs.Data.KhachhangsDangTrung.MaKh);
                this.quaySoResult = rs.Data.KhachhangsDangTrung.MaKh;
                this.webQuaySoService.GetKetQuaKhachhangtrunggiai(this.objQua1()).then(rs => {
                    this.DSKhachHangTrung1 = rs.Data.DsKhachhangsDaTrung.filter(x => x.LoaiQua == 1);
                });
            } else {
                this.quaySoResult = '000000000000000';
                toastr.warning("Chưa Lấy được kết quả hoặc hết quà!!!", "QUAY SỐ");

            }

        });
    }
    KetQua2() {

        //console.log(JSON.stringify(this.objQua2()));
        this.webQuaySoService.GetKetQuaQuaySo(this.objQua2()).then(rs => {

            // this.DSKhachHangTrung2 = rs.Data;

            if (rs.StatusCode == "Success") {
                //console.log(rs.Data.KhachhangsDangTrung.MaKh);
                this.quaySoResult2 = rs.Data.KhachhangsDangTrung.MaKh;
                this.webQuaySoService.GetKetQuaKhachhangtrunggiai(this.objQua2()).then(rs => {
                    this.DSKhachHangTrung2 = rs.Data.DsKhachhangsDaTrung.filter(x => x.LoaiQua == 2);
                });
            } else {
                this.quaySoResult2 = '000000000000000';
                toastr.warning("Chưa Lấy được kết quả hoặc hết quà!!!", "QUAY SỐ");

            }

        });
    }
    KetQua3() {

        //  console.log(JSON.stringify(this.objQua3()));
        this.webQuaySoService.GetKetQuaQuaySo(this.objQua3()).then(rs => {

            //this.DSKhachHangTrung3 = rs.Data;

            if (rs.StatusCode == "Success") {
                //  console.log(rs.Data.KhachhangsDangTrung.MaKh);
                this.quaySoResult3 = rs.Data.KhachhangsDangTrung.MaKh;
                this.webQuaySoService.GetKetQuaKhachhangtrunggiai(this.objQua3()).then(rs => {
                    this.DSKhachHangTrung3 = rs.Data.DsKhachhangsDaTrung.filter(x => x.LoaiQua == 3);
                });
            } else {
                this.quaySoResult3 = '000000000000000';
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

    play2() {

        if (!this.ValidateConditionBeforeSubmit()) {
            return false;
        }
        this.HieuUng2();
    }
    play3() {

        if (!this.ValidateConditionBeforeSubmit()) {
            return false;
        }
        this.HieuUng3();
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

}
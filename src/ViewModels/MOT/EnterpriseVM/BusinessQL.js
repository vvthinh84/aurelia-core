import { BindingEngine, inject } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';

import { EnterpriseService } from 'Services/EnterpriseSvc/EnterpriseService';
import { UtilitiesJS } from 'Helpers/UtilitiesJS';

import * as toastr from "toastr";
import 'eonasdan-bootstrap-datetimepicker';

@inject(BindingEngine, EnterpriseService, UtilitiesJS)
export class BusinessQL {
    ListDN = [];
    AddressDW = [];
    Address = [];
    ListWard = [];
    _DistTrictName = "";
    _WardName = "";
    listNguoiDaiDien = [];
    search = {};
    constructor(bindingEngine, enterpriseService, utilitiesJS) {
        this.enterpriseService = enterpriseService;
        this.utilitiesJS = utilitiesJS;

        //Pagination
        this.current = 1;
        this.itemperpage = 10;
        this.pagesize = 10;

        // Xử lý ngày tháng
        // var currentDate = new Date();
        //   var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        //   var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        //   this.search.FromDate = this.utilitiesJS.GetFormattedDate(firstDay);
        //   this.search.ToDate = this.utilitiesJS.GetFormattedDate(lastDay);

        //   this.search.FromDateDisplay = this.search.FromDate;
        //   this.search.ToDateDisplay = this.search.ToDate;

        let subscriptioncurrent = bindingEngine.propertyObserver(this, "tinhthanhid")
            .subscribe(() => {
                if (this.tinhthanhid > 0) {
                    this.Getdiachi(this.tinhthanhid);
                }
            });
    }

    activate() {

        return Promise.all([this.enterpriseService.GetListCompany(), this.enterpriseService.GetListAddress()]).then((rs) => {

            this.ListDN = rs[0].Data;
            //console.log(JSON.stringify(this.ListDN));
            this.Address = rs[1].Data;
            this.AddressDW = rs[1].Data.map(x => {
                return {
                    Code: x.Code,
                    Name: x.Name,
                }
            })
            for (let i in rs[0].Data) {
                var city = this.Address.filter(x => {
                    let lstDistrict = x.ListDistrict;
                    let lstDistrictCode = lstDistrict.map(y => y.Code);
                    if (lstDistrictCode.indexOf(rs[0].Data[i].DistrictCode) != -1) return true
                });
                if (rs[0].Data[i].DistrictCode != null) {
                    rs[0].Data[i].listNguoiDaiDien = JSON.parse(rs[0].Data[i].NguoiDaidien); // Thong Tin Dai Dien
                    rs[0].Data[i].Tinhthanh = city[0].Name; // Thong Tin Tinh Thanh
                    rs[0].Data[i].QuanHuyen = city[0].ListDistrict.filter(x => { return x.Code == rs[0].Data[i].DistrictCode })[0].Name; // Thong Tin Quan huyen
                } else {
                    rs[0].Data[i].listNguoiDaiDien = "";
                    rs[0].Data[i].Tinhthanh = ""; // Thong Tin Tinh Thanh
                    rs[0].Data[i].QuanHuyen = "";
                }
            }
        });

    }





    bind(ct, ovr) {
        ovr.bindingContext.total = this.ListDN.length;
    }


    attached() {
        $('#txtFilterDateStart').datetimepicker({
            //defaultDate:    this.search.FromDate
            format: "YYYY-MM-DD HH:mm:ss"
        });
        $("#txtFilterDateStart").on("dp.change", () => {
            this.dateStartFilter = $('#txtFilterDateStart').val();
            //this.search.FromDateDisplay= $('#txtFilterDateStart').val()
        });


        $('#txtFilterDateEnd').datetimepicker({
            //defaultDate: this.search.ToDate
            format: "YYYY-MM-DD HH:mm:ss"

        });
        $("#txtFilterDateEnd").on("dp.change", () => {
            this.dateEndFilter = $('#txtFilterDateEnd').val();
            // this.search.ToDateDisplay= $('#txtFilterDateStart').val()

        });


        // Lấy giá trị Text
        $('#huyenid').on('change', () => {
            this._DistTrictName = $("#huyenid option:selected").text();
        });
        $('#tinhthanid').on('change', () => {

            this._WardName = $("#tinhthanid option:selected").text();
        });


    }
    AddDN() {
        this.isEdit = false;
        this.InitGiftInfo();
    }

    EditDN(currentDN) {
        this._CodeDN = currentDN.BusinessCode;
        this._CreateDateDN = currentDN.CreatedDate;
        this.tinhthanhid = 0;
        this.quanhuyenid = 0;
        this.isEdit = true;
        this.currentDN = currentDN;
        this.BindtoDistrict(this.currentDN.DistrictCode);

    }
    DelDN(currentDN) {

        this.enterpriseService.DoanhNghiepDeleteBusiness(currentDN.Business_id).then((data) => {
            if (data.Result == true) {
                //Reload data
                this.enterpriseService.GetListCompany().then((data) => {
                    this.ListDN = data.Data;
                });

                toastr.success('Xóa doanh nghiệp thành công!', "QL Doanh Nghiệp");
                return true;
            } else {
                toastr.error("Lỗi! Xin thử lại!");
                return false;
            }
        });
    }
    Getdiachi(CityCode) {
        this.ListWard = this.Address.filter(x => x.Code == CityCode)[0].ListDistrict;
    }

    ChangeDNStatus(gift) {
        this.isEdit = true;
        this.currentDN = gift;
        if (gift.Status === "D") {
            this.currentDN.Status = "A";
        } else {
            this.currentDN.Status = "D";
        }
        this.SubmitGift();
    }

    BindtoDistrict(DistictCode) {

        var city = this.Address.filter(x => {
            let lstDistrict = x.ListDistrict;
            let lstDistrictCode = lstDistrict.map(y => y.Code);
            if (lstDistrictCode.indexOf(DistictCode) != -1)
                return true
        });

        this.tinhthanhid = city[0].Code;
        this.quanhuyenid = DistictCode;
    }



    SubmitGift() {

        var Ngdaidien = {};
        Ngdaidien.HoTen = this.currentDN.listNguoiDaiDien.HoTen;
        Ngdaidien.ChucVu = this.currentDN.listNguoiDaiDien.ChucVu;
        Ngdaidien.Sdt = this.currentDN.listNguoiDaiDien.Sdt;
        Ngdaidien.Email = this.currentDN.listNguoiDaiDien.Email;


        if (!this.ValidateGiftBeforeSubmit()) { return false; }
        var jsonToPost = {};
        jsonToPost.BusinessId = this.currentDN.Business_id;
        jsonToPost.DistrictCode = this.quanhuyenid;
        jsonToPost.BusinessCode = this.currentDN.Name;
        jsonToPost.Name = this.currentDN.Name;
        jsonToPost.Adddress = this.currentDN.Address + ',' + this._DistTrictName + ',' + this._WardName;
        jsonToPost.Status = this.currentDN.Status;
        jsonToPost.Sex = this.currentDN.Sex;
        jsonToPost.NguoiDaidien = JSON.stringify(Ngdaidien);
        jsonToPost.CreatedDate = this.currentDN.CreatedDate;
        jsonToPost.LastUpdate = this.currentDN.LastUpdate;



        if (this.isEdit === false) {
            this.enterpriseService.InsertBusiness(jsonToPost).then((data) => {
                if (data.Result == true) {
                    //Reload data
                    this.enterpriseService.GetListCompany().then((data) => {
                        this.ListDN = data.Data;
                        for (let i in data.Data) {
                            data.Data[i].listNguoiDaiDien = JSON.parse(data.Data[i].NguoiDaidien);
                        }
                    });
                    $('#addEditGift').modal('hide');
                    toastr.success('Tạo mới doanh nghiệp thành công!', "QL Doanh Nghiệp");
                    return true;
                } else {
                    toastr.error("Lỗi! Xin thử lại!");
                    return false;
                }
            });
        } else {
            jsonToPost.BusinessId = this.currentDN.Business_id;
            this.enterpriseService.UpdateBusiness(jsonToPost).then((data) => {
                if (data.Result == true) {
                    //Reload data
                    this.enterpriseService.GetListCompany().then((data) => {
                        this.ListDN = data.Data;
                        for (let i in data.Data) {
                            data.Data[i].listNguoiDaiDien = JSON.parse(data.Data[i].NguoiDaidien);
                        }
                    });
                    $('#addEditGift').modal('hide');
                    toastr.success('Cập nhật doanh nghiệp thành công!', "QL Doanh Nghiệp");
                    return true;
                } else {
                    toastr.error("Lỗi! Xin thử lại!");
                    return false;
                }
            });

        }
    }

    ValidateGiftBeforeSubmit() {

        var strErrorMsg = "";

        if (this.currentDN.Name == "" || typeof this.currentDN.Name === "undefined")
            strErrorMsg += "• Tên doanh nghiệp phải nhập. <br/>";
        if (this.quanhuyenid == "" || typeof this.quanhuyenid === "undefined")
            strErrorMsg += "• Quận huyện phải chọn. <br/>";
        if (this.currentDN.Address == "" || typeof this.currentDN.Address === "undefined")
            strErrorMsg += "• Địa chỉ phải nhập. <br/>";

        if (strErrorMsg !== "") {
            toastr.error(strErrorMsg, "Lỗi dữ liệu nhập!");
            return false;
        }
        return true;
    }

    InitGiftInfo() {


        //  obj.FromDate = this.search.FromDate;
        //  obj.ToDate = this.search.ToDate;

        this.currentDN = {};
        this.currentDN.DistrictCode = null;
        this.currentDN.BusinessCode = "";
        this.currentDN.Name = "";
        this.currentDN.Adddress = "";
        this.currentDN.Status = "A";
        this.currentDN.NguoiDaidien = null;
        this.currentDN.CreatedDate = null;
        this.currentDN.LastUpdate = null;
        this.tinhthanid = 0;
        this.quanhuyenid = 0;
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
                .filter(x => ((x.Name != null) && (x.Name.toLowerCase().indexOf(obj.trim().toLowerCase()) != -1)) ||
                    ((x.BusinessCode != null) && (x.BusinessCode.toLowerCase().indexOf(obj.trim().toLowerCase()) != -1)) ||
                    ((x.Tinhthanh != null) && (x.Tinhthanh.toLowerCase().indexOf(obj.trim().toLowerCase()) != -1)) ||
                    ((x.QuanHuyen != null) && (x.QuanHuyen.toLowerCase().indexOf(obj.trim().toLowerCase()) != -1)));
        }
        return array;
    }
}

export class FilterByCodeValueConverter {
    toView(array, obj) {
        if (obj) {
            return array
                .filter(x => ((x.BusinessCode != null) && (x.BusinessCode.toLowerCase().indexOf(obj.toLowerCase()) != -1)));
        }
        return array;
    }
}


export class FilterByRangeDateValueConverter {
    setDateGMT(x) {
        var a = new Date(x);
        return new Date(a.setHours(a.getHours() + a.getTimezoneOffset() / 60));
    }


    toView(array, dateStartFilter, dateEndFilter) {


        //convert to Unix time before compare


        var start = new Date(dateStartFilter);
        var end = new Date(dateEndFilter);


        if (dateStartFilter == undefined || dateEndFilter == undefined) {

            return array;
        } else if (start > end) {
            array = [];
            return array;
        } else if ((dateStartFilter != undefined && dateEndFilter != undefined) && end >= start) {


            return array.filter((x) => {
                return ((this.setDateGMT(x.CreatedDate) >= start) && (this.setDateGMT(x.CreatedDate) <= end))
            });

        }

        return array;
    }

}
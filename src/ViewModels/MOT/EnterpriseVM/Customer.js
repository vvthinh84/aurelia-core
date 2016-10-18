import { inject } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';

import { EnterpriseService } from 'Services/EnterpriseSvc/EnterpriseService';
import { UtilitiesJS } from 'Helpers/UtilitiesJS';
import { ExcelService } from 'Helpers/ExcelHelper';

import * as toastr from "toastr";
import 'eonasdan-bootstrap-datetimepicker';

@inject(EnterpriseService, UtilitiesJS, ExcelService)
export class BusinessQL {
    ListKH = [];
    selectedProducts = [];
    OBJ = [];
    constructor(enterpriseService, utilitiesJS, excelService) {
        this.enterpriseService = enterpriseService;
        this.utilitiesJS = utilitiesJS;
        this.excelService = excelService;
        this.checkAll = false;

        //Pagination
        this.current = 1;
        this.itemperpage = 10;
        this.pagesize = 10;
    }

    activate() {

        return Promise.all([this.enterpriseService.DoanhNghiepListKhachHangDN(), this.enterpriseService.GetListCompany()]).then((rs) => {
            this.ListKH = rs[0].Data;
            this.ListCompany = rs[1].Data;
        })
    }

    bind(ct, ovr) {
        ovr.bindingContext.total = this.ListKH.length;
    }


    attached() {

    }


    EditDN(currentKH) {
        this._CodeKH = currentKH.Id;
        this._CreateDateKH = currentKH.CreatedDate;
        this.isEdit = true;
        this.currentKH = currentKH;
    }
    DelKH(KhID) {

        this.enterpriseService.DoanhNghiepXoaKhachHang(KhID.Id).then((data) => {
            if (data.Result == true) {
                //Reload data
                this.enterpriseService.DoanhNghiepListKhachHangDN().then((data) => {
                    this.ListKH = data.Data;
                });

                toastr.success(data.Message, "Quản lý khách hàng");
                return true;
            } else {
                toastr.error(data.Message, "Quản lý khách hàng");
                return false;
            }
        });
    }

    ChangeDNStatus(KhachHang) {
        this.isEdit = true;
        this.currentKH = KhachHang;
        if (KhachHang.Status === "D") {
            this.currentKH.Status = "A";
        } else {
            this.currentKH.Status = "D";
        }
        this.SubmitKhachHang();
    }







    SubmitKhachHang() {
        if (!this.ValidateGiftBeforeSubmit()) { return false; }

        var jsonToPost = {};
        jsonToPost = this.currentKH;
        jsonToPost.LastUpdate = this.utilitiesJS.getDateFormat(new Date());

        if (this.isEdit === true) {
            this.enterpriseService.UpdateKhachHangDoanhNghiep(jsonToPost).then((data) => {
                if (data.Result == true) {
                    //Reload data
                    this.enterpriseService.DoanhNghiepListKhachHangDN().then((data) => {
                        this.ListKH = data.Data;
                    });
                    $('#addEditGift').modal('hide');
                    toastr.success(' thành công!', "QL Khách hàng doanh nghiệp");
                    return true;
                } else {
                    toastr.error("Lỗi! Xin thử lại!");
                    return false;
                }
            });
        }

    }

    SelectAllBizProducts() {
        if (this.checkAll === false) {
            for (var i in this.ListKH) {
                this.ListKH[i].checked = true;
            }
        } else {
            for (var i in this.ListKH) {
                this.ListKH[i].checked = false;
            }
        }
        this.checkAll = !this.checkAll;


    }
    ValidateGiftBeforeSubmit() {

        var strErrorMsg = "";
        if (this.currentKH.Name == "" || typeof this.currentKH.Name === "undefined")
            strErrorMsg += "• Tên khách hàng phải nhập. <br/>";

        if (this.currentKH.Phone == "" || typeof this.currentKH.Phone === "undefined")
            strErrorMsg += "• Số điện thoại phải nhập. <br/>";

        if (this.currentKH.Manhanvien == "" || typeof this.currentKH.Manhanvien === "undefined")
            strErrorMsg += "• Mã nhân viên phải nhập. <br/>";
        if (this.currentKH.BusinessCode == "" || typeof this.currentKH.BusinessCode === "undefined")
            strErrorMsg += "• Mã doanh nghiệp phải nhập. <br/>";
        if (strErrorMsg !== "") {
            toastr.error(strErrorMsg, "Lỗi dữ liệu nhập!");
            return false;
        }
        return true;

    }

    testTypes = {
        "STT": "String",
        "CreatedDate": "String",
        "Id": "String",
        "Name": "String",
        "Sex": "String",
        "Phone": "String",
        "Manhanvien": "String",
        "BusinessCode": "String",
        "Status": "String"

    };
    headerTable = [
        "STT",
        "Ngày thêm mới KH",
        "Mã khách hàng",
        "Tên khách hàng",
        "Giới tính",
        "Số điện thoại",
        "Mã nhân viên",
        "doanh nghiệp",
        "Trạng thái"

    ];

    download() {
        this.excelService.download(this.excelService.jsonToSsXml(this.exportExcel(), this.headerTable, this.testTypes), 'Excel.xls', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }

    exportExcel() {

        var testJson = [];
        var obj = {};
        var i = 1;
        for (var item of this.GiftDN.items) {
            obj.STT = i;
            obj.CreatedDate = this.utilitiesJS.getDateFormat(new Date(item.CreatedDate));
            obj.Id = item.Id;
            obj.Name = item.Name;
            if (item.Sex == 'T') { obj.Sex = "Nam"; } else {
                obj.Sex = "Nữ";
            }

            obj.Phone = item.Phone;
            obj.Manhanvien = item.Manhanvien;
            obj.BusinessCode = item.BusinessCode;
            if (item.Status == 'A') { obj.Status = "Active"; } else {
                obj.Status = "Deactive"
            }
            i++;
            testJson.push(obj);
            obj = {};
        }

        return testJson;

    }
    UpdateSelectedBizProductsStatus() {
        this.selectedProducts = this.ListKH.filter(x => x.checked == true);
        //console.log('selected',this.selectedProducts);
        if (this.selectedProducts.length == 0) {
            toastr.warning('Vui lòng check những thông tin bên dưới trước khi cập nhật trạng thái!', "Update Products")
            return;
        }
        let selectedKH = [];
        for (var i in this.selectedProducts) {
            selectedKH.push(this.selectedProducts[i].Id);
            this.ListKH[i].Status = this.newStatus;
        }
        var jsonToPost = {};
        jsonToPost.Status = this.newStatus;
        jsonToPost.ListKhachhang = selectedKH;

        this.enterpriseService.DoanhNghiepUpdateListKhachHang(jsonToPost).then(data => {
            if (data.Result == true) {
                this.enterpriseService.DoanhNghiepListKhachHangDN().then(data => {
                    this.ListKH = data.Data;
                });
                toastr.success('Cập nhật danh sách thành công!', "Quản lý khách hàng");
                return true;
            } else {
                toastr.error('Lỗi! Không thể cập nhật danh sách. Xin thử lại!', "Quản lý khách hàng");
                return false;
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
export class FilterBySexValueConverter {
    toView(array, status) {
        if (status) {
            return array.filter(x => x.Sex != null && x.Sex == status);
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
                    ((x.Phone != null) && (x.Phone.toLowerCase().indexOf(obj.trim().toLowerCase()) != -1)) ||
                    ((x.Manhanvien != null) && (x.Manhanvien.toLowerCase().indexOf(obj.trim().toLowerCase()) != -1))
                );
        }
        return array;
    }
}
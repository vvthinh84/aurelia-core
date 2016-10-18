import { inject } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';

import { QuaySoService } from 'Services/QuaySo/QuaySoService';
import { QuaySoPermission } from 'Configuration/PermissionSettings/QuaySoPermission';
import { ExcelService } from 'Helpers/ExcelHelper';

import * as toastr from 'toastr';
import moment from 'moment';
import 'select2';

@inject(QuaySoService, ExcelService, QuaySoPermission)
export class BranchSapHetQua {

    ListBranchSapHetQua = [];
    ListBranchs = [];
    ReportData = [];
    ListCampaigns = [];
    ReportCampaignId = "";

    isViewOnly = false;
    isNoAccess = false;

    testTypes = {
        "BranchCode": "String",
        "BranchAdd": "String",
        "CampaignName": "String",
        "GiftName1": "String",
        "GiftName2": "String",
        "GiftName3": "String",
        "GiftName4": "String",
        "GiftName5": "String",
        "GiftName6": "String",
        "GiftName7": "String",
        "GiftName8": "String",
        "GiftName9": "String",
        "GiftName10": "String",
    };

    headerTable = [];

    constructor(quaySoService, excelService, quaySoPermission) {
        this.quaySoService = quaySoService;
        this.excelService = excelService;
        this.quaySoPermission = quaySoPermission;

        this.filterBranch = "";

        this.current = 1;
        this.itemperpage = 10;
        this.pagesize = 10;
    }

    activate() {
        return Promise.all([this.quaySoService.GetListQuaySoBranchSapHetHang(),
                this.quaySoService.GetListQuaySoBranch(),
                this.quaySoService.GetListQuaySoCampaign()
            ])
            .then((rs) => {
                this.ListBranchSapHetQua = rs[0].Data;
                this.ListBranchs = rs[1].Data.ListBranchs;
                this.ListCampaigns = rs[2].Data;

                var username = Lockr.get('UserInfo').Username;
                this.isViewOnly = this.quaySoPermission.IsViewOnly(username, "saphetqua");
                this.isNoAccess = this.quaySoPermission.IsNoAccess(username, "saphetqua");
            })
    }

    attached() {
        $('#filterByBranch').select2().val(this.filterBranch);
        $('#filterByBranch').select2({
            placeholder: "- Chọn Chi nhánh -",
            allowClear: true
        }).on('change', () => {
            this.filterBranch = $('#filterByBranch').val();
        });
    }

    bind(ct, ovr) {
        ovr.bindingContext.total = this.ListBranchSapHetQua.length;
    }

    async DownloadReport() {
        if (this.ReportCampaignId == "") {
            toastr.error("Xin hãy chọn chương trình để xuất báo cáo!", "Error");
            return;
        }

        let response = await (this.quaySoService.GetListQuaTuongUngBranch(this.ReportCampaignId));
        if (response != null) {
            this.ReportData = response.Data;
            var testJson = [];
            var obj = {};
            //console.log("reportData", this.ReportData);
            //Cap nhat TestType, HeaderTable

            this.headerTable = [];
            this.headerTable.push("Mã Chi nhánh");
            this.headerTable.push("Địa chỉ");
            this.headerTable.push("Tên Chương trình");

            for (let item in this.ReportData[0].ThongTinSlQua) {
                this.headerTable.push(this.ReportData[0].ThongTinSlQua[item].GiftName);
            }

            for (let i in this.ReportData) {
                obj.BranchCode = this.ReportData[i].BranchCode;
                obj.BranchAdd = this.ReportData[i].BranchAdd;
                obj.CampaignName = this.ReportData[i].CampaignName;

                for (let k in this.ReportData[i].ThongTinSlQua) {
                    if (k == 0)
                        obj.GiftName1 = this.ReportData[i].ThongTinSlQua[k].UsedQuantity + "/" + this.ReportData[i].ThongTinSlQua[k].TotalQuantity;
                    if (k == 1)
                        obj.GiftName2 = this.ReportData[i].ThongTinSlQua[k].UsedQuantity + "/" + this.ReportData[i].ThongTinSlQua[k].TotalQuantity;
                    if (k == 2)
                        obj.GiftName3 = this.ReportData[i].ThongTinSlQua[k].UsedQuantity + "/" + this.ReportData[i].ThongTinSlQua[k].TotalQuantity;
                    if (k == 3)
                        obj.GiftName4 = this.ReportData[i].ThongTinSlQua[k].UsedQuantity + "/" + this.ReportData[i].ThongTinSlQua[k].TotalQuantity;
                    if (k == 4)
                        obj.GiftName5 = this.ReportData[i].ThongTinSlQua[k].UsedQuantity + "/" + this.ReportData[i].ThongTinSlQua[k].TotalQuantity;
                    if (k == 5)
                        obj.GiftName6 = this.ReportData[i].ThongTinSlQua[k].UsedQuantity + "/" + this.ReportData[i].ThongTinSlQua[k].TotalQuantity;
                    if (k == 6)
                        obj.GiftName7 = this.ReportData[i].ThongTinSlQua[k].UsedQuantity + "/" + this.ReportData[i].ThongTinSlQua[k].TotalQuantity;
                    if (k == 7)
                        obj.GiftName8 = this.ReportData[i].ThongTinSlQua[k].UsedQuantity + "/" + this.ReportData[i].ThongTinSlQua[k].TotalQuantity;
                    if (k == 8)
                        obj.GiftName9 = this.ReportData[i].ThongTinSlQua[k].UsedQuantity + "/" + this.ReportData[i].ThongTinSlQua[k].TotalQuantity;
                    if (k == 9)
                        obj.GiftName10 = this.ReportData[i].ThongTinSlQua[k].UsedQuantity + "/" + this.ReportData[i].ThongTinSlQua[k].TotalQuantity;
                }

                //console.log("obj", obj);

                testJson.push(obj);
                //console.log("testJson", testJson);
                obj = {};
            }

            let exportwaiting = this.download(this.excelService.jsonToSsXml(testJson, this.headerTable, this.testTypes), 'Report.xls', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            toastr.success("Xuất báo cáo thành công!", "Thành công");

        } else
            toastr.error("Không có dữ liệu để xuất báo cáo!", "Error");
    }

    download(content, filename, contentType) {
        if (!contentType)
            contentType = 'application/octet-stream';
        var a: any = document.createElement('a');
        var blob = new Blob([content], {
            'type': contentType
        });
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;

        a.target = '_blank';
        a.click();

    }

    GetDanhSachQua(BranchCode, ListQua) {
        if (BranchCode !== "") {
            var strThongTinQua = "";
            if (ListQua != null && ListQua.length > 0) {
                for (var i = 0; i < ListQua.length; i++) {
                    if (ListQua[i].TotalQuantity - ListQua[i].UsedQuantity <= 5)
                        strThongTinQua += "<Font html:Color='#FF0000'>" + ListQua[i].GiftName + " " + "(" + ListQua[i].UsedQuantity + "/" + ListQua[i].TotalQuantity + ")" + "</Font>" + ", ";
                    else
                        strThongTinQua += ListQua[i].GiftName + " (" + ListQua[i].UsedQuantity + "/" + ListQua[i].TotalQuantity + "), ";
                }
                if (strThongTinQua.length > 1) {
                    strThongTinQua = strThongTinQua.substring(0, strThongTinQua.length - 2);
                }
            }
            return strThongTinQua;
        }
        return "N/A";
    }

    GetStringOfUserRolesName(roles) {
        var strRoleName = "";
        if (roles != null && roles.length > 0) {
            for (var i = 0; i < roles.length; i++) {
                strRoleName += roles[i].Name + ", ";
            }
        }
        if (strRoleName.length > 1) {
            return strRoleName.substring(0, strRoleName.length - 2);
        }
        return strRoleName;
    }

}

export class ThongTinQuaSapHetValueConverter {
    toView(BranchCode, ListQua) {
        if (BranchCode !== "") {
            var strThongTinQua = "";
            if (ListQua != null && ListQua.length > 0) {
                for (var i = 0; i < ListQua.length; i++) {
                    //Xuat nhung qua sap het
                    if (ListQua[i].TotalQuantity - ListQua[i].UsedQuantity <= 5)
                        strThongTinQua += ListQua[i].GiftName + " (" + ListQua[i].UsedQuantity + "/" + ListQua[i].TotalQuantity + "), ";
                }
                if (strThongTinQua.length > 1) {
                    strThongTinQua = strThongTinQua.substring(0, strThongTinQua.length - 2);
                }
            }
            return strThongTinQua;
        }
        return "N/A";
    }
}

export class FilterByBranchValueConverter {
    toView(array, branchsCodePos) {
        if (branchsCodePos !== null && branchsCodePos !== "") {
            return array.filter(x => x.BranchCode != null && x.BranchCode == branchsCodePos);
        }
        return array;
    }
}
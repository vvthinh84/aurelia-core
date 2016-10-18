import { inject } from 'aurelia-framework';

import { EnterpriseService } from 'Services/EnterpriseSvc/EnterpriseService';
import { UtilitiesJS } from 'Helpers/UtilitiesJS';
import { ExcelService } from 'Helpers/ExcelHelper';
import { DateFormat } from 'Helpers/datetime-format';

import 'eonasdan-bootstrap-datetimepicker';
import * as toastr from "toastr";

@inject(UtilitiesJS, EnterpriseService, ExcelService, DateFormat)
export class BizProductsMng {
    Business = [];
    LoaiSanpham = [];
    Thuonghieu = [];
    selectedProducts = [];
    OBJ = [];
    testTypes = {
        "Product_id": "String",
        "ProductName": "String",
        "Product_color_code": "String",
        "Nhomhang": "String",
        "Brand": "String",
        "BusinessName": "String",
        "Modified_date": "String",
        "StartDate": "String",
        "EndDate": "String",
        "Status": "String"

    };
    headerTable = [

        "Mã sản phẩm",
        "Tên  sản phẩm",
        "Mã màu",
        "Loại sản phẩm",
        "Thương hiệu",
        "Doanh nghiệp",
        "Ngày thêm sản phẩm",
        "Ngày áp dụng từ",
        "Ngày áp dụng đến",
        "Trạng thái"


    ];
    constructor(utilitiesJS, enterpriseService, excelService, dateFormat) {
        this.utilitiesJS = utilitiesJS;
        this.enterpriseService = enterpriseService;
        this.excelService = excelService;
        this.dateFormat = dateFormat;
        this.newStatus = "A";
        this.checkAll = false;

        //PAGINATION
        this.current = 1;
        this.itemperpage = 20;
        this.pagesize = 8;
        this.strErrorMsg = "";

    }
    bind(ct, ovr) {
        ovr.bindingContext.total = this.OBJ.length;
    }

    download() {
        this.excelService.download(this.excelService.jsonToSsXml(this.exportExcel(), this.headerTable, this.testTypes), 'Excel.xls', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }

    exportExcel() {

        var testJson = [];
        var obj = {};
        for (var item of this.mydata.items) {
            obj.Product_id = item.Product_id;
            obj.ProductName = item.ProductName;
            obj.Product_color_code = item.Product_color_code;
            obj.Nhomhang = item.Nhomhang;
            obj.Brand = item.Brand;
            obj.BusinessName = item.BusinessName;
            obj.Modified_date = this.dateFormat.getDateFormat(new Date(item.Modified_date));
            obj.StartDate = this.dateFormat.getDateFormat(new Date(item.StartDate));
            obj.EndDate = this.dateFormat.getDateFormat(new Date(item.EndDate));
            if (item.Status == 'A') { obj.Status = "Active"; } else {
                obj.Status = "Deactive"
            }
            testJson.push(obj);
            obj = {};
        }

        return testJson;

    }

    getSomeJson(obj) {

        return new Promise((resolve, reject) => {
            this.enterpriseService.GetListInstalmentProducts(obj).then(data => {
                //console.log(data.Data);
                for (let i in data.Data.BusinessProduct) {
                    data.Data.BusinessProduct[i].checked = false;
                }

                resolve(data);

            });

        });

    }
    searchByEnterprise() {
        if (new Date(this.StartDateImport) > new Date(this.EndDateImport)) {
            toastr.error('Lỗi khi nhập thời gian');
        } else if (new Date(this.StartDate) > new Date(this.EndDate)) {
            toastr.error('Lỗi khi nhập thời gian');
        } else {
            return Promise.all([this.getSomeJson(this.initInstalment())]).then(rs => {

                this.OBJ = rs[0].Data.BusinessProduct;
                //console.log(rs[0].Data.BusinessProduct);

                //this.Business = rs[0].Data.Business;

                //this.LoaiSanpham = rs[0].Data.LoaiSanpham;
                this.LoaiSanpham = rs[0].Data.LoaiSanpham.map(x => {
                    if (x == null) {
                        return 'rổng'
                    }
                    return x
                });
                this.Thuonghieu = rs[0].Data.Thuonghieu.map(x => {
                    if (x == null) {
                        return 'rổng'
                    }
                    return x
                });


                //console.log('vai',rs[0].Data.Thuonghieu);
            });
        }

    }
    activate() {
        if (Lockr.get('doanhnghiep', this.BusinessId) == undefined) {
            return Promise.all([this.enterpriseService.GetListCompany()]).then(rs => {
                this.Business = rs[0].Data;



            });
        } else {
            this.BusinessId = Lockr.get('doanhnghiep', this.BusinessId);
            return Promise.all([this.enterpriseService.GetListCompany(), this.getSomeJson(this.initInstalment())]).then(rs => {
                this.Business = rs[0].Data;
                this.OBJ = rs[1].Data.BusinessProduct;
                //console.log(rs[0].Data.BusinessProduct);

                //this.Business = rs[0].Data.Business;

                //this.LoaiSanpham = rs[0].Data.LoaiSanpham;

                this.LoaiSanpham = rs[1].Data.LoaiSanpham.map(x => {
                    if (x == null) {
                        return 'rổng'
                    }
                    return x
                });
                this.Thuonghieu = rs[1].Data.Thuonghieu.map(x => {
                    if (x == null) {
                        return 'rổng'
                    }
                    return x
                });



            });

        }


        //this.searchByEnterprise();
    }

    initInstalment() {
        let obj = {};

        if (this.BusinessId) {
            obj.Business_id = this.BusinessId;
            Lockr.set('doanhnghiep', this.BusinessId);
        }
        if (this.status) {
            obj.Status = this.status;
        }


        if (this.StartDateImport && this.EndDateImport) {
            obj.StartDateImport = this.StartDateImport;
            obj.EndDateImport = this.EndDateImport;
        }
        if (this.StartDate && this.EndDate) {
            obj.StartDate = this.StartDate;
            obj.EndDate = this.EndDate;
        }

        return obj;

    }


    attached() {

        $('#txtFilterDateTo').datetimepicker();
        $("#txtFilterDateTo").on("dp.change", () => {
            this.EndDate = $('#txtFilterDateTo').val();
        });

        $('#txtFilterDateFrom').datetimepicker();
        $("#txtFilterDateFrom").on("dp.change", () => {
            this.StartDate = $('#txtFilterDateFrom').val();
        });

        $('#txtFilterStartDateImport').datetimepicker();
        $("#txtFilterStartDateImport").on("dp.change", () => {
            this.StartDateImport = $('#txtFilterStartDateImport').val();
        });
        $('#txtFilterEndDateImport').datetimepicker();
        $("#txtFilterEndDateImport").on("dp.change", () => {
            this.EndDateImport = $('#txtFilterEndDateImport').val();
        });
        $("#sanpham tbody tr").click(function() {

            $(this).parent().children().removeClass("selectedd");
            $(this).addClass("selectedd");
        });
    }

    SelectDeleteProduct(selectedProductForDelete) {
        let obj = [];
        obj.push(this.selectedProductForDelete.Id);
        // console.log(obj);
        this.selectedProductForDelete.ListProduct = obj;
        // console.log('da',JSON.stringify(this.selectedProductForDelete));

        this.enterpriseService.DeleteListProduct(this.selectedProductForDelete).then(rs => {
            if (rs.Result == true) {
                console.log(this.selectedProductForDelete);
                toastr.success('Xóa thành công');
                $('#deleteProduct').modal('hide');
            } else {
                toastr.error('Xóa thất bại do lỗi hệ thống');
            }
        })

    }

    DeleteProduct(product) {
        this.selectedProductForDelete = product;
    }

    SelectAllBizProducts() {
        if (this.checkAll === false) {
            for (var i in this.OBJ) {
                this.OBJ[i].checked = true;
            }
        } else {
            for (var i in this.OBJ) {
                this.OBJ[i].checked = false;
            }
        }
        this.checkAll = !this.checkAll;

    }
    UpdateSelectedBizProductsStatus() {
        this.selectedProducts = this.OBJ.filter(x => x.checked == true);
        //console.log('selected',this.selectedProducts);
        if (this.selectedProducts.length == 0) {
            toastr.warning('Please select products on below table before for changing their status!', "Update Products")
            return;
        }
        let selectedProductIds = [];
        for (var i in this.selectedProducts) {
            selectedProductIds.push(this.selectedProducts[i].Id);
            this.OBJ[i].Status = this.newStatus;
        }
        var jsonToPost = {};
        jsonToPost.Status = this.newStatus;
        jsonToPost.ListProduct = selectedProductIds;
        this.enterpriseService.UpdateStatusListProduct(jsonToPost).then(data => {
            if (data.Result == true) {
                // console.log('data',data.Data);
                toastr.success('Cập nhật danh sách thành công!', "Business Products");
                return true;
            } else {
                toastr.error('Lỗi! Không thể cập nhật danh sách. Xin thử lại!', "Business Products");
                return false;
            }
        });

    }

    goToUpload() {
        location.href = '#/MOTMenus/AddUploadFile';
    }
    EditProduct(product) {
        window.location = `#MOTMenus/InstalmentOrderDetail?Id=${product.Id}`;
    }

}

export class FilterByThuonghieuValueConverter {
    toView(array, obj) {


        if (obj) {
            if (obj == 'rổng') {
                array = array.filter(x => x.Brand == null);
            } else {
                array = array.filter(x => x.Brand === obj);
                //console.log('name',obj);
                //return filteredArr;

            }
        }
        return array;

    }
}
export class FilterByNhomhangValueConverter {
    toView(array, obj) {


        if (obj) {
            if (obj == 'rổng') {
                array = array.filter(x => x.Nhomhang == null);
            } else {
                array = array.filter(x => x.Nhomhang === obj);
                //console.log('name',obj);
                //return filteredArr;

            }
        }
        return array;

    }
}

export class FilterByProductCodeValueConverter {
    toView(array, obj) {
        if (obj) {
            let filteredArr = array.filter(x => x.Product_id == obj);

            return filteredArr;
        }
        return array;
    }
}
export class FilterByProductColorCodeValueConverter {
    toView(array, obj) {
        if (obj) {
            let filteredArr = array.filter(x => x.Product_color_code == obj);

            return filteredArr;
        }
        return array;
    }
}

export class FilterByProductNameValueConverter {
    toView(array, obj) {
        if (obj) {


            let filteredArr = array.filter(x => x.ProductName.indexOf(obj) != -1);
            if (filteredArr.length == 0) return [];
            // console.log("thinh",filteredArr);

            return filteredArr;
        }
        return array;
    }
}
export class FilterByStatusValueConverter {
    toView(array, obj) {
        if (obj == "") {
            return array;
        } else if (obj) {
            let filteredArr = array.filter(x => x.Status == obj);
            // console.log("thinh",filteredArr);
            return filteredArr;
        }
        return array;
    }
}
export class FilterByErrorProductsValueConverter {
    toView(array, obj) {
        if (typeof obj === undefined)
            obj = false;
        if (obj) {

            return array
                .filter(x => ((x.Product_id == 0) || (x.Nhomhang == undefined) || (x.Nhomhang == "null") || (x.Brand == undefined) || (x.Brand == "null")));
        }

        return array;
    }

}
import { inject, BindingEngine, LogManager } from 'aurelia-framework';
import { EnterpriseService } from 'Services/EnterpriseSvc/EnterpriseService';
import * as toastr from "toastr";

@inject(BindingEngine, EnterpriseService)
export class ListProductsCash {
    companybusiness = [];
    _categoryID = 0;
    BusinessId = "";

    constructor(bindingEngine, enterpriseService) {
        this.enterpriseService = enterpriseService;

        //inject

        let subscriptionchecklst = bindingEngine.propertyObserver(this, "BusinessId")
            .subscribe(() => {
                if (this.BusinessId == 0) {
                    this.RootCategoryId = 0;
                    this.CategoryId = 0;
                    this.idbyname = "";
                    this.Products = [];

                } else {


                    return Promise.all([this.enterpriseService.GetListProduct(this.BusinessId), this.enterpriseService.GetListCategory()]).then(
                        (rs) => {
                            this.Products = rs[0].Data;

                            if (rs[0].Data.length == 0) {
                                toastr.warning("Doanh nghiệp không có rổ sản phẩm", "Danh sách sản phẩm");
                            }
                            if (this.Products.length > 0) {
                                this.RootCategories = rs[1].Data.filter(x => x.RootCategoryId === 0);
                                this.Categories = rs[1].Data.filter(x => x.RootCategoryId != 0);
                            }
                        })
                }
            });
    }



    activate() {
        Lockr.rm('doanhnghiep');
        Lockr.rm('congty');
        Lockr.rm('Cash');
        Lockr.rm('currentProduct');
        Lockr.rm('Listorderdetail');
        Lockr.rm('businessCode');
        return Promise.all([this.enterpriseService.GetListCompany()]).then(
            (rs) => {
                this.companybusiness = rs[0].Data;
            })
    }

    selectProduct(product) {
        Lockr.set('businessCode', this.BusinessId);
        Lockr.set('currentProduct', product);
        location.href = `#MOTMenus/ProductToInstalment?productId=${product.Product_id}`;
    }
}

export class FilterByRootCategoryIdValueConverter {
    toView(array, obj) {
        if (obj) {
            return array
                .filter(x => x.RootCategoryId == obj);
        }
        return array;
    }
}

export class FilterByNameValueConverter {
    toView(array, obj) {
        if (obj) {
            return array
                .filter(x => x.ProductName.toUpperCase().indexOf(obj.toUpperCase()) != -1);
        }
        return array;
    }
}

export class FilterByCategoryIdValueConverter {
    toView(array, obj) {
        if (obj) {
            return array
                .filter(x => x.CategoryId == obj);
        }
        return array;
    }
}
export class FilterByBusinessIdValueConverter {
    toView(array, obj) {
        if (obj) {
            return array
                .filter(x => x.BusinessId == obj);
        }
        return array;
    }
}
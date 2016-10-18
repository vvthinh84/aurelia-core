import { HttpClient, json } from 'aurelia-fetch-client';
import { inject, LogManager, ObserverLocator, BindingEngine } from 'aurelia-framework';

import { BizProductsService } from 'Services/AffiliateSvc/BizProductsService';

import * as toastr from 'toastr';
import _ from 'lodash';
import 'select2';

@inject(HttpClient, ObserverLocator, BindingEngine, BizProductsService)
export class UpdateMapVnpVM {

    st = {};
    CheckAll = {};
    removeItems = [];
    insertItems = [];
    isEdit = false;
    CompanyCode = 1;
    k = [];
    a = [];

    //test
    constructor(http, observerLocator, bindingEngine, bizProductsService) {

        this.current = 1;
        this.itemperpage = 8;
        this.pagesize = 8;


        let watchcheckAllListStore = bindingEngine.propertyObserver(this.CheckAll, 'ListStore')
            .subscribe((newValue, oldValue) => {
                //console.log(newValue);
                this.checkAllListStore(newValue);
            });
        let watchcheckMapVta = bindingEngine.propertyObserver(this.CheckAll, 'MapVnp')
            .subscribe((newValue, oldValue) => {
                // console.log(newValue);
                this.checkAllMapVnp(newValue);
            });
        this.bizProductsService = bizProductsService;
    }
    activate(params) {
        //this.heading = `heading ` + params.id;
        //this.loadMapVnp(this.CompanyCode);
        return Promise.all([this.bizProductsService.GetListBlock()]).then(
            (rs) => {


                this.Companies = rs[0].Data.ListSponsor;
                this.ListStore = rs[0].Data.ListProduct;
                this.total = this.ListStore.length;


            })

    }

    attached() {
        $('#select2').select2(this.value)
            .on('change', () => {
                this.Business_id = $('#select2').val();
                // this.loadMapVnp($('#select2').val());
                this.loadListSponsorById($('#select2').val());
                this.SponsorId = $('#select2').val();

                if (this.SponsorId == 0) {
                    this.rm = false;
                    this.is = false;
                    this.isEdit = false;
                } else {

                    this.rm = true;
                    this.is = true;
                    this.isEdit = true;
                }
            });
    }
    loadListSponsorById(id) {

        this.bizProductsService.GetListSponsorById(id).then((rs) => {
                this.MapVnp = rs.Data;
            })
            // reset 



    }


    removeStore() {
        if (!this.MapVnp == "" || !this.MapVnp == null) {
            this.tmpremove = this.MapVnp.filter(x => !x.checked);
            this.MapVnp = this.tmpremove;

            this.uncheckAll();
        }



    }
    insertStore() {
        var aa = [];

        if (!this.MapVnp == "" || !this.MapVnp == null) {
            this.tmpinsert = this.ListStore.filter(x => x.checked);
            // this.ListStore = this.ListStore.filter(x => !x.checked);
            this.selectItems();
            this.bizProductsService.GetListBlock().then(
                (rs) => {

                    this.ListStore = rs.Data.ListProduct;
                    this.Companies = rs.Data.ListSponsor;


                })
        }

    }


    doInsertItemsToMapVnP(array, array_push, Child_Param) {
        for (var i of array) {
            i.SponsorId = Child_Param;
            array_push.push(i);
        }

    }

    doCheckItems(array, Paramtocheck) {
        let tmp = [];
        tmp = _.uniqBy(array, Paramtocheck);
        return tmp;
    }

    doClearArrayWhenNoSelected(array) {
        array = [];
        this.uncheckAll();
    }
    selectItems() {

        if (!this.tmpinsert.length == 0) {
            this.doInsertItemsToMapVnP(this.tmpinsert, this.MapVnp, this.SponsorId);
            this.MapVnp = this.doCheckItems(this.MapVnp, 'ProductId');
            this.doClearArrayWhenNoSelected(this.tmpinsert);

        } else {
            toastr.warning('Vui lòng chọn sản phẩm, Xin thử lại!', "THÔNG BÁO");
            return;
        }
    }







    uncheckAll() {
        for (var i in this.ListStore) {
            this.ListStore[i].checked = false;
        }
        for (let i in this.MapVnp) {
            this.MapVnp[i].checked = false;
        }
    }

    checkAllListStore(n) {
        for (var i in this.storeVta.items) {
            this.storeVta.items[i].checked = n;
        }
    }
    checkAllMapVnp(n) {
        for (var i in this.rMapVnp.items) {
            this.rMapVnp.items[i].checked = n;
        }
    }
    updateMapVnp() {

        let prd = {};
        let objToPost = {};
        objToPost.SponsorId = this.SponsorId;
        objToPost.ListProduct = [];
        for (var i of this.MapVnp) {
            prd.SponsorId = i.SponsorId;
            prd.ProductId = i.ProductId;
            prd.ProductCode = i.ProductCode;
            objToPost.ListProduct.push(prd);
            prd = {};
        }
        this.bizProductsService.InsertSponsorProdcut(objToPost).then((rs) => {
            if (rs.Result) {
                toastr.success('Cập nhật thành công');
            } else {
                toastr.success('Cập nhật không thành công');
            }
        })



    }

}
export class ObjToFilterValueConverter {
    toView(array, obj) {
        if (obj) {
            obj = obj.trim();
            return array
                .filter(x => (((x.ProductCode != null) && (x.ProductCode.indexOf(obj) != -1)) ||
                    ((x.ProductId != null) && (x.ProductId == obj)) ||
                    ((x.ProductName != null) && (x.ProductName.toLowerCase().indexOf(obj.toLowerCase()) != -1))));
        }
        return array;
    }
}
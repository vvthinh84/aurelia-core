import { HttpClient, json } from 'aurelia-fetch-client';
import { inject, LogManager, ObserverLocator, BindingEngine } from 'aurelia-framework';

import * as APISettings from 'Configuration/APISettings';
import { HttpService } from 'Services/HttpService';

import 'select2';

@inject(ObserverLocator, BindingEngine, HttpService)
export class UpdateMapVnpVM {
    st = {};
    CheckAll = {};
    removeItems = [];
    insertItems = [];
    isEdit = false;
    CompanyCode = 1;
    constructor(observerLocator, bindingEngine, httpService) {
        this.logger = LogManager.getLogger('UpdateMapVnpVM');
        let subscription = bindingEngine.propertyObserver(this.st, 'DiaChi')
            .subscribe((newValue, oldValue) => {});
        let watchcheckAllListStore = bindingEngine.propertyObserver(this.CheckAll, 'ListStore')
            .subscribe((newValue, oldValue) => {
                this.checkAllListStore(newValue);
            });
        let watchcheckMapVta = bindingEngine.propertyObserver(this.CheckAll, 'MapVnp')
            .subscribe((newValue, oldValue) => {
                this.checkAllMapVnp(newValue);
            });
        observerLocator
            .getArrayObserver(this.removeItems)
            .subscribe(() => {});

        this.http = httpService.httpInstance;



    }
    activate(params) {
        //this.heading = `heading ` + params.id;
        //this.loadMapVnp(this.CompanyCode);
        this.getCompany();

    }

    attached() {
        $('#select2').select2(this.value)
            .on('change', () => {
                this.Business_id = $('#select2').val();
                this.loadMapVnp($('#select2').val());
                //alert($('#select2').val());
            });
    }
    getCompany() {
        this.http.fetch('Affiliate-api/GetAffiliateBusinesses', {
                method: 'get'
            })
            .then(response => response.json())
            .then(response => {
                this.Companies = response.Data;
                //this.logger.info('Companies', this.Companies);
            });
    }
    loadMapVnp(id) {
        var objToPost = {
            CompanyCode: id
        };
        this.http.fetch('Affiliate-api/GetMapAffiliate', {
                method: 'post',
                body: json(objToPost)
            })
            .then(response => response.json())
            .then(response => {
                this.MapVnp = [];
                this.ListStore = [];
                this.LstMACS = [];
                if (response.Data && +response.Data.TotalItem !== 0 && response.Data[0]) {
                    this.GetMVnPostVtaData = response.Data[0];
                    this.CompanyCode = response.Data[0].CompanyCode;
                    this.MapVnp = response.Data[0].ListStoreCode;
                    //this.logger.info('mapvnp list store code', this.MapVnp);
                    this.LstMACS = (response.Data[0].ListStoreCode != null) ? Array.from(response.Data[0].ListStoreCode, x => x.MACS) : [];
                    //this.logger.info('macs', (response.Data[0].ListStoreCode != null) ? Array.from(response.Data[0].ListStoreCode, x => x.MACS) : 'null');
                    this.loadListStore();
                } else {
                    this.loadListStore();
                }

            });
    }

    loadListStore() {
        var objToPost = {};
        this.http.fetch('store-api/GetDmStroreVta', {
                method: 'post',
                body: json(objToPost)
            })
            .then(response => response.json())
            .then(response => {
                this.data = response;
                for (var i in response.Data) {
                    response.Data[i].checked = false;
                }
                //this.logger.info('macs', Array.from(response.Data, x => x.MaCs));
                this.ListStore = response.Data.filter(x => this.LstMACS.indexOf(x.MaCs) == -1);
                this.MapVnp = response.Data.filter(x => !(this.LstMACS.indexOf(x.MaCs) == -1));
                //this.logger.info('this.MapVnp', this.MapVnp);
                this.initListcity();
            });

    }
    removeStore() {
        //this.logger.info('this.MapVnp', this.MapVnp);
        // for (var i in this.removeItems) {
        //   this.MapVnp = this.MapVnp.filter(x => x.MaCs != this.removeItems[i]);
        //   this.logger.info('rm item', this.removeItems[i]);
        // }
        // this.removeItems = [];
        this.MapVnp = this.MapVnp.filter(x => !x.checked);
        //update lst MaCs
        this.LstMACS = Array.from(this.MapVnp, x => x.MaCs);
        this.ListStore = this.data.Data.filter(x => this.LstMACS.indexOf(x.MaCs) == -1);
        this.isEdit = true;
        this.uncheckAll();
    }
    insertStore() {
        // for (var i in this.insertItems) {
        //   this.ListStore = this.ListStore.filter(x => x.MaCs != this.insertItems[i]);
        //   this.logger.info('rm item', this.insertItems[i]);
        // }
        this.ListStore = this.ListStore.filter(x => !x.checked);
        this.LstMACS = Array.from(this.ListStore, x => x.MaCs);
        this.MapVnp = this.data.Data.filter(x => this.LstMACS.indexOf(x.MaCs) == -1);
        this.insertItems = [];
        this.isEdit = true;
        this.uncheckAll();
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
        let objToPost = {};
        //objToPost = this.GetMVnPostVtaData;
        objToPost.ListStoreCode = [];
        objToPost.CompanyCode = this.Business_id;
        if (this.isEdit) {
            objToPost.MaCsCollection = Array.from(this.MapVnp, x => x.MaCs);
            //this.logger.info('obj to post', objToPost);


            this.http.fetch('Affiliate-api/UpdateMapAff', {
                    method: 'post',
                    body: json(objToPost)
                })
                .then(response => response.json())
                .then(response => {
                    alert(response.Message);
                });
        }
    }

    initListcity() {
        this.ListCity = Array.from(new Set(Array.from(this.data.Data, x => x.ThanhPho)));
        //this.logger.debug('load thanh pho : done');
    }
}

export class ObjToFilterValueConverter {
    toView(array, tp, dc, macs) {
        if (tp) {
            array = array
                .filter(x => x.ThanhPho && x.ThanhPho.toUpperCase().indexOf(tp.toUpperCase()) != -1);
        }
        if (dc) {
            array = array
                .filter(x => x.DiaChi && x.DiaChi.toUpperCase().indexOf(dc.toUpperCase()) != -1);
        }
        if (macs) {
            array = array
                .filter(x => x.MaCs && x.MaCs.toUpperCase().indexOf(macs.toUpperCase()) != -1);
        }
        return array;
    }
}
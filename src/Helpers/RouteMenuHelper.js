export class RouteMenu {

    SetInternalMenu(config, Data) {
        for (var i = 0; i < Data.length; i++) {
            var menu = {};
            menu.route = Data[i].route;
            menu.name = Data[i].name;
            menu.moduleId = Data[i].moduleId;
            menu.nav = Data[i].nav;
            menu.title = Data[i].title;
            config.map(menu);
        }
    }

    SetMenuMain(config, Data) {
        var menu = this.MenuCapCha();

        var ta = {};
        var setRoute = [];
        var j = 0;
        if (menu == undefined) {} else {
            config.map([{ route: 'Dashboard', name: 'Dashboard', moduleId: 'ViewModels/Dashboard/Dashboard', nav: true, title: 'DASHBOARD' }]);
            for (var i of menu) {
                for (var j = 0; j < Data.length; j++) {

                    if (i == Data[j].route) {
                        ta.route = Data[j].route;
                        ta.name = Data[j].name;
                        ta.moduleId = Data[j].moduleId;
                        ta.nav = Data[j].nav;
                        ta.title = Data[j].title;
                        config.map(ta);
                    } else {
                        ta = {};
                    }
                }
            }
        }
    }

    MenuCapCha() {
        var obj = [];
        if (Lockr.get('UserInfo') == undefined) {} else {
            obj = Lockr.get('UserInfo').Menu;
            var menu = [];
            for (var item of obj) {
                if (item.MenuCap1.Code !== "OrderMenu" && item.MenuCap1.Code !== "StoreMenuVM") //CoHH: comment Order menu (VNPost)
                {
                    menu.push(item.MenuCap1.Code);
                }
            }
        }
        return menu;
    }

    ListMenuCon(code) {
        var obj = [];
        if (Lockr.get('UserInfo') !== undefined) {
            obj = Lockr.get('UserInfo').Menu;
            var menu = [];
            for (var item of obj) {
                if (item.MenuCap1.Code == code) {
                    for (var i of item.ListMenuCon) {
                        menu.push(i.Code);
                    }
                }
            }
        }
        return menu;
    }

    SetMenuCon(config, Data, Code) {
        var obj = this.ListMenuCon(Code);
        if (obj == undefined) {} else {
            var tam = {};
            for (var item of obj) {
                for (var i = 0; i < Data.length; i++) {
                    if (item == Data[i].route) {
                        var tam = {};
                        tam.route = Data[i].route;
                        tam.name = Data[i].name;
                        tam.moduleId = Data[i].moduleId;
                        tam.nav = Data[i].nav;
                        tam.title = Data[i].title;
                        config.map(tam);
                    } else {
                        tam = {};
                    }
                }
            }
        }
    }
}
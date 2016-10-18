import { inject } from 'aurelia-framework';
import { RouteMenu } from 'Helpers/RouteMenuHelper';
import * as RouteMenuSettings from 'Configuration/RouteMenuSettings';

@inject(RouteMenu)
export class MOTMenu {

    constructor(routeMenu) {
        this.routeMenu = routeMenu;
        this.showDropdownNotification = true;
        this.showDropdownAffiliate = true;
        this.showDropdownEnterpriseVM = true;
    }

    configureRouter(config, router) {
        config.map([RouteMenuSettings.MOTMenus[0]]);
        config.map([RouteMenuSettings.MOTMenuAction]);
        this.routeMenu.SetMenuCon(config, RouteMenuSettings.MOTMenus, "MOTMenus");
        this.router = router;

    }
}
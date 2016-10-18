import { inject } from 'aurelia-framework';
import { RouteMenu } from 'Helpers/RouteMenuHelper';
import * as RouteMenuSettings from 'Configuration/RouteMenuSettings';

@inject(RouteMenu)
export class MarketingMenu {

    constructor(routeMenu) {
        this.routeMenu = routeMenu;
    }

    configureRouter(config, router) {
        this.showDropdownQuaySoBackToSchool = true;


        config.map([RouteMenuSettings.MarketingMenu[0]]);
        this.routeMenu.SetMenuCon(config, RouteMenuSettings.MarketingMenu, "MarketingMenu");
        this.router = router;


    }
}
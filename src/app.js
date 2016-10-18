import { inject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AppState } from 'Helpers/AppStateHelper';
import * as RouteMenuSettings from 'Configuration/RouteMenuSettings';
import { RouteMenu } from 'Helpers/RouteMenuHelper';

@inject(AppState, RouteMenu, Router)
export class App {
    @bindable appState;
    constructor(appState, routeMenu, router) {
        this.appState = appState;
        this.routeMenu = routeMenu;
        this.theRouter = router;
    }

    configureRouter(config, router) {
        config.title = 'VTA ADMINCP';

        this.routeMenu.SetMenuMain(config, RouteMenuSettings.ListMainMenu);
        this.routeMenu.SetInternalMenu(config, RouteMenuSettings.ListInternalMenu);

        console.log("routenotfound");
        config.mapUnknownRoutes('routenotfound');

        this.router = router;
        this.router.appState = this.appState;
    }
}
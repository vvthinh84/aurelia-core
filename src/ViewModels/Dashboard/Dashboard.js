import { inject } from 'aurelia-framework';

import { RouteMenu } from 'Helpers/RouteMenuHelper';
import * as RouteMenuSettings from 'Configuration/RouteMenuSettings';

@inject(RouteMenu)
export class Dashboard {

    constructor(routeMenu) {
        this.routeMenu = routeMenu;
    }
}
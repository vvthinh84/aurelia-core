import { inject, LogManager, bindable } from 'aurelia-framework';
import { AppState } from './services/appState';
import { AuthorizeStep } from './configs/authorizeStep';
import { HttpClient } from 'aurelia-fetch-client';
import { History } from 'aurelia-history';
@inject(AppState, History)
export class App {
  logger: any;
  router: any;

  @bindable appState;
  constructor(appState, private history: History) {
  }
  configureRouter(config, router) {
    config.title = ' ADMINCP';
    config.addPipelineStep('authorize', AuthorizeStep);
    config.map([
      { route: 'Dashboard', name: 'Dashboard', moduleId: 'viewmodels/DashBoardVM/dash_board', nav: true, title: 'Dashboard' },
      { route: ['', 'Welcome'], name: 'Welcome', moduleId: './welcome', nav: true, settings: { roles: [] }, title: 'Welcome' },
      { route: 'login', name: 'login', moduleId: 'viewmodels/LoginVM/login', nav: true, settings: { roles: [] }, title: 'Đăng nhập' },
    ]);

    this.router = router;
    this.router.history = this.history;
  }


}

import { inject } from 'aurelia-framework'
import { Router } from 'aurelia-router';

@inject(Router)

export class LogOut {
  theRouter: Router;

  constructor(router: Router) {
    this.theRouter = router;
  }

  activate() {
    let window: Window;
    Lockr.rm('UserInfo');
    (() => {

      this.theRouter.navigateToRoute('login');
    })() ;
    ;
  }
}

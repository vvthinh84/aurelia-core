import { AppState } from '../../services/appState';
import { json } from 'aurelia-fetch-client';
import { Router } from 'aurelia-router';
import { inject, NewInstance } from 'aurelia-dependency-injection';
import { ValidationControllerFactory } from 'aurelia-validation';
// import * as AppConfig from '../../Configs/appConfig';
import { Login } from '../../models/login';
import {BootstrapFormRenderer} from '../../resources/validation-render/bootstrap-render';

@inject( AppState, Router, ValidationControllerFactory)
export class LoginViewModel {
  appState: AppState;
  theRouter: Router;
  Login: Login = new Login();

  controller = null;
  constructor(appState: AppState, router: Router, controllerFact: ValidationControllerFactory) {
    {
      this.appState = appState;
      this.theRouter = router;
      this.controller = controllerFact.createForCurrentScope();
      this.controller.addRenderer(new BootstrapFormRenderer());
    }
  }
  submit() {
    let errors = this.controller.validate()
      .then(errors => {
        if (errors.length == 0) {
          this.login();
        }
      });


    // todo: call server...
  }
  reset() {
    this.controller.reset();
  }

  login() {
    swal('Đăng nhập', 'Đăng nhập thành công', 'success');
  }

}

import { inject } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';
import { Router } from 'aurelia-router';
import { Validation, ensure } from 'aurelia-validation';

import { UserService } from 'Services/UserSvc/UserService';
import { RouteMenu } from 'Helpers/RouteMenuHelper';
import { AppState } from 'Helpers/AppStateHelper';

import * as toastr from 'toastr';

@inject(AppState, Validation, Router, UserService, RouteMenu)
export class Login {

    pendding = true;
    constructor(appState, validation, router, userService, routeMenu) {
        this.theRouter = router;
        this.routeMenu = routeMenu;

        this.validation = validation.on(this)
            .ensure('username')
            .isNotEmpty().withMessage("Tài khoản bắt buộc nhập.")
            .hasLengthBetween(3, 20).withMessage("Tài khoản phải có từ 3-20 ký tự.")
            .ensure('password')
            .isNotEmpty().withMessage("Mật khẩu bắt buộc nhập.")
            .hasLengthBetween(3, 20).withMessage("Mật khẩu phải có từ 3-20 ký tự.");
        //this.validation.result.isValid = false;

        if (Lockr.get('UserInfo') != null) {
            this.theRouter.navigate("Dashboard");
            location.reload();
        }


        this.appState = appState;
        this.userService = userService;

    }

    login() {

        var jsonToPost = {};

        jsonToPost.Username = this.username;
        jsonToPost.Password = this.password;
        jsonToPost.Domain = "WebApp";
        this.pendding = !this.pendding;
        this.userService.LogIn(jsonToPost).then((data) => {
            if (data.Result == true) {
                this.pendding = !this.pendding;
                this.appState.isAuthenticated = true;
                this.appState.UserId = data.Data.UserId;

                monster.set('isAdmin', true, 1);
                Lockr.set('UserInfo', data.Data);

                toastr.success('Đăng nhập thành công.', "Đăng nhập");
                window.setTimeout(() => {
                    location.reload();
                }, 1200);

                return true;
            } else {
                this.pendding = !this.pendding;
                toastr.error('Đăng nhập không thành công. Xin thử lại!', "Đăng nhập");
                return false;
            }
        });
    }
}
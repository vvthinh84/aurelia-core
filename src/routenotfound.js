import { Router } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import * as toastr from "toastr";

@inject(Router)
export class RouteNotFound {
    constructor(router) {

        this.router = router;

        toastr.error("Không tìm thấy trang!", "Thông báo");
        console.log("Route not found. Redirecting...");

        window.setTimeout(() => {
            if (Lockr.get('UserInfo') != null) {
                this.router.navigate("Dashboard");
            } else {
                this.router.navigate("login");
            }
            location.reload();
        }, 1500);
    }
}
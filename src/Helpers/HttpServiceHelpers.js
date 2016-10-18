import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import * as toastr from "toastr";

@inject(Router)
export class HttpServiceHelpers {

    constructor(router) {
        this.router = router;
    }

    HandlingServerError(err) {
        if (typeof err.status === 'undefined') {
            toastr.error("Không thể kết nối tới máy chủ. Vui lòng kiểm tra đường truyền", "Thông báo");
        }
        if (err.status === 500) {
            toastr.error("Không thể kết nối tới máy chủ. Vui lòng kiểm tra đường truyền", "Thông báo");
            window.setTimeout(() => {
                this.router.navigate('logout');
                location.reload();
            }, 1500);
            return;
        }
        if (err.status === 403) {
            toastr.error("Lỗi 403!", "Thông báo");
        }
        return false;
    }
}
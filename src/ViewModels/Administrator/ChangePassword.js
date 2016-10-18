import { inject } from 'aurelia-framework';
import { Validation } from 'aurelia-validation';
import { Router } from 'aurelia-router';

import { UserService } from 'Services/UserSvc/UserService';
import * as toastr from 'toastr';

@inject(UserService, Validation, Router)
export class ChangePassword {

    constructor(userServices, validation, router) {
        this.userServices = userServices;
        this.validation = validation.on(this)
            .ensure('OldPassword')
            .isNotEmpty().withMessage("Nhập mật khẩu")
            .hasLengthBetween(6, 30)
            .withMessage("Độ dài từ 6 đến 30")
            .ensure('password')
            .isNotEmpty().withMessage("Nhập mật khẩu mới")
            .hasLengthBetween(6, 30).withMessage("Độ dài từ 6 đến 30").ensure('confirmPassword', (config) => {
                config.computedFrom(['password'])
            }).isEqualTo(() => {
                return this.password
            }).withMessage("mật khẩu không khớp nhau");
        this.theRouter = router;
    }

    ChangePassword() {
        let obj = {};
        obj.userId = Lockr.get('UserInfo').UserId;
        obj.oldPassword = this.OldPassword;
        obj.usenewPasswordrId = this.password;
        this.userServices.EditChangePassword(obj).then((data) => {
            if (data.Result == true) {
                toastr.success('Cập nhật thông tin thành công');
                this.theRouter.navigate('OrderMenu');
                return true;
            } else {
                toastr.error('Mật khẩu cũ không đúng vui lòng nhập lại');
                return false;
            }
        });
    }
}
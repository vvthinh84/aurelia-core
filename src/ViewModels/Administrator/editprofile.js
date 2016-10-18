import { inject } from 'aurelia-framework';
import { Validation } from 'aurelia-validation';
import { Router } from 'aurelia-router';

import { UserService } from 'Services/UserSvc/UserService';

import * as toastr from 'toastr';
import 'eternicode-bootstrap-datepicker';

@inject(UserService, Validation, Router)
export class EditProfile {

    UserInfo = {};

    constructor(userService, validation, router) {
        this.userService = userService;
        this.validation = validation.on(this)
            .ensure('UserInfo.Fullname')
            .isNotEmpty().withMessage("Nhập Tên vào")
            .hasLengthBetween(6, 50).withMessage("Tên có độ dài ít nhất 6").ensure('UserInfo.Phone').hasLengthBetween(10, 11).withMessage('Lỗi khi nhập Phone').isNumber().withMessage('nhập số').ensure('UserInfo.PersonalId').isNotEmpty().withMessage('Xin vui lòng nhập cmnd').isNumber().withMessage('Lỗi khi nhập Cmnd').ensure('UserInfo.Email')
            .isEmail().withMessage('Lỗi khi nhập Email');

        this.theRouter = router;
    }

    activate() {
        this.UserInfo = Lockr.get('UserInfo');
    }

    attached() {

        $('.date').datepicker({
            format: "yyyy-mm-dd",
            autoclose: true
        });
    }

    UpdateUser(UserInfo) {
        let obj = {};
        obj.UserId = this.UserInfo.UserId;
        obj.Email = this.UserInfo.Email;
        obj.Phone = this.UserInfo.Phone;
        obj.FullName = this.UserInfo.Fullname;
        obj.PersonalId = this.UserInfo.PersonalId;
        obj.Birthday = $('#dtBannerStartDate').val();
        obj.EmployeeId = this.UserInfo.EmployeeId;

        this.userService.UpdateUserInfo(obj).then(data => {
            if (data.Result == true) {
                toastr.success('Cập nhật thông tin thành công');
                this.theRouter.navigate('OrderMenu');
            } else {
                toastr.error('Lỗi! Không thể cập nhật thông tin. Xin thử lại!');
            }
        });
    }
}
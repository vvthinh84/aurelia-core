import { inject } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';

import { UserService } from 'Services/UserSvc/UserService';
import { BizProductsService } from 'Services/AffiliateSvc/BizProductsService';
import { UtilitiesJS } from 'Helpers/UtilitiesJS';

import * as toastr from 'toastr';
import 'select2';
import 'eternicode-bootstrap-datepicker';

@inject(UserService, BizProductsService, UtilitiesJS)
export class UserMng {

    Companies = [];
    ListRolesToBind = [];
    UserByCompany = [];

    constructor(userService, bizProductsService, utilitiesJS) {
        this.bizProductsService = bizProductsService;
        this.userService = userService;
        this.utilitiesJS = utilitiesJS;

        this.selectedCompany = 1;
        this.filterCompany = "";

        //Pagination
        this.current = 1;
        this.itemperpage = 10;
        this.pagesize = 8;

        this.isEdit = false;
        this.strErrorMsg = "";
    }

    activate() {
        return Promise.all([
            this.userService.GetListCompanies(),
            this.userService.GetListUserByCompanyIdPassed(this.selectedCompany),
            this.userService.GetListRoles(),
        ]).then((rs) => {
            //console.log("GetListCompanies", JSON.stringify(rs[0]));
            this.Companies = rs[0].Data;
            this.UserByCompany = rs[1].Data;
            this.ListRolesToBind = rs[2].Data;
        })
    }

    attached() {
        $('#filterByCompany').select2().val(this.filterCompany);
        $('#filterByCompany').select2({
            placeholder: "- Chọn Đơn vị -",
            allowClear: true
        }).on('change', () => {
            this.filterCompany = $('#filterByCompany').val();
        });
        $('.date').datepicker({
            format: "yyyy-mm-dd",
            autoclose: true
        });
    }

    bind(ct, ovr) {
        ovr.bindingContext.total = this.UserByCompany.length;
    }

    LoadDDLAddEditUserCompanyId(companyId) {
        $('#ddlAddEditUserCompanyId').select2().val(this.selectedUserForEditing.CompanyId);
        $('#ddlAddEditUserCompanyId').select2({
            placeholder: "- Chọn Đơn vị -",
            allowClear: true
        }).on('change', () => {
            this.selectedUserForEditing.CompanyId = $('#ddlAddEditUserCompanyId').val();
        });
    }

    GetDonViName(companyId) {
        return this.bizProductsService.GetCompanyNameById(companyId, this.Companies);
    }

    GetStringOfUserRolesName(roles) {
        return this.userService.GetStringOfUserRolesName(roles);
    }

    AddUser() {
        this.isEdit = false;
        this.InitUserInfo();
        this.LoadDDLAddEditUserCompanyId(this.selectedUserForEditing.CompanyId);
    }

    EditUser(user) {
        this.isEdit = true;
        this.selectedUserForEditing = user;
        this.selectedUserForEditing.Birthday = this.utilitiesJS.GetFormattedDate(new Date(user.Birthday));
        this.LoadDDLAddEditUserCompanyId(this.selectedUserForEditing.CompanyId);
        this.selectedUserForEditing.SelectedRoleIds = [];

        if (user.RoleIds != null && user.RoleIds.length > 0) {
            for (var i = 0; i < user.RoleIds.length; i++) {
                this.selectedUserForEditing.SelectedRoleIds.push(user.RoleIds[i].RoleId);
            }
        }
    }

    SubmitUser() {

        var jsonToPost = {};

        this.selectedUserForEditing.Birthday = $('#dtSelectedUserForEditingBirthday').val();
        if (!this.ValidateUserBeforeSubmit()) {
            //alert(this.strErrorMsg);
            toastr.error(this.strErrorMsg, "Lỗi");
            return;
        }

        jsonToPost.RoleIds = [];
        if (this.isEdit === false) {
            jsonToPost.UserId = null;
            jsonToPost.CreateDate = this.utilitiesJS.GetFormattedDate(new Date());
            jsonToPost.Password = this.selectedUserForEditing.Password;
        } else {
            jsonToPost.UserId = this.selectedUserForEditing.UserId;
            if (this.selectedUserForEditing.SelectedRoleIds.length > 0) {
                for (var i = 0; i < this.selectedUserForEditing.SelectedRoleIds.length; i++) {
                    jsonToPost.RoleIds.push({
                        "RoleId": this.selectedUserForEditing.SelectedRoleIds[i]
                    });
                }
            }
        }

        jsonToPost.Birthday = this.selectedUserForEditing.Birthday

        jsonToPost.UserName = this.selectedUserForEditing.UserName;
        jsonToPost.Email = this.selectedUserForEditing.Email;
        jsonToPost.FullName = this.selectedUserForEditing.FullName;
        jsonToPost.Phone = this.selectedUserForEditing.Phone;
        jsonToPost.PersonalId = this.selectedUserForEditing.PersonalId;
        jsonToPost.CompanyId = this.selectedUserForEditing.CompanyId;
        jsonToPost.Status = this.selectedUserForEditing.Status;
        jsonToPost.EmployeeId = this.selectedUserForEditing.EmployeeId;

        this.userService.SubmitUser(jsonToPost).then((data) => {
            if (data.Result == true) {
                this.userService.GetListUserByCompanyIdPassed(this.selectedCompany).then((data) => {
                    this.UserByCompany = data.Data;
                });
                $('#addEditUser').modal('hide');
                toastr.success(this.isEdit === false ? 'Tạo mới user thành công!' : 'Cập nhật user thành công!', "Thông báo");
                return true;
            } else {
                toastr.error(data.Message, "Lỗi");
                return false;
            }
        });
    }

    ResetPassword(user) {
        this.isEdit = true;
        var jsonToPost = {
            "userId": user.UserId,
            "oldPassword": null,
            "usenewPasswordrId": null
        };

        this.userService.ResetPassword(jsonToPost).then((data) => {
            if (data.Result == true) {
                this.userService.GetListUserByCompanyIdPassed(this.selectedCompany).then((data) => { this.UserByCompany = data.Data; });
                toastr.success('Reset mật khẩu user thành công! Mật khẩu mới là \'123456\'', "Thông báo");
                return true;
            } else {
                toastr.error('Không thể reset mật khẩu user. Xin thử lại!', "Lỗi");
                return false;
            }
        });
    }


    GetUserSeletedRoleIds(user) {
        this.selectedUserForEditing.SelectedRoleIds = [];
        if (user.RoleIds != null && user.RoleIds.length > 0) {
            for (var i = 0; i < user.RoleIds.length; i++) {
                this.selectedUserForEditing.SelectedRoleIds.push(user.RoleIds[i].RoleId);
            }
        }
    }

    ActiveUser(user) {
        this.isEdit = true;
        this.selectedUserForEditing = user;
        this.selectedUserForEditing.Status = "Active";
        this.GetUserSeletedRoleIds(user);
        if (!this.SubmitUser())
            this.selectedUserForEditing.Status = "NotActiveYet";
    }

    DeActiveUser(user) {
        this.isEdit = true;
        this.selectedUserForEditing = user;
        this.selectedUserForEditing.Status = "NotActiveYet";
        this.GetUserSeletedRoleIds(user);
        if (!this.SubmitUser())
            this.selectedUserForEditing.Status = "Active";
    }

    ValidateUserBeforeSubmit() {
        this.strErrorMsg = "";

        if (this.selectedUserForEditing.UserName == "" || typeof this.selectedUserForEditing.UserName === "undefined")
            this.strErrorMsg += "• \"User name\" phải nhập. \n";

        if (this.isEdit === false) {
            if (this.selectedUserForEditing.Password == "" || typeof this.selectedUserForEditing.Password === "undefined")
                this.strErrorMsg += "• \"Password\" phải nhập. \n";

            if (this.selectedUserForEditing.Password.length < 6)
                this.strErrorMsg += "• \"Password\" phải có ít nhất 6 ký tự. \n";
        }
        if (this.selectedUserForEditing.FullName == "" || typeof this.selectedUserForEditing.FullName === "undefined")
            this.strErrorMsg += "• \"Tên đầy đủ\" phải nhập. \n";
        if (this.selectedUserForEditing.CompanyId == "" || typeof this.selectedUserForEditing.CompanyId === "undefined")
            this.strErrorMsg += "• \"Đơn vị\" phải nhập. \n";
        // if (this.selectedUserForEditing.Birthday == "" || typeof this.selectedUserForEditing.Birthday === "undefined")
        //     this.strErrorMsg += "• \"Ngày sinh\" phải nhập. \n";

        if (this.strErrorMsg !== "")
            return false;
        return true;
    }

    InitUserInfo() {
        this.selectedUserForEditing = {};
        this.selectedUserForEditing.UserRoleIds = "";
        this.selectedUserForEditing.UserName = "";
        this.selectedUserForEditing.Password = "";
        this.selectedUserForEditing.FullName = "";
        this.selectedUserForEditing.PersonalId = "";
        this.selectedUserForEditing.CompanyId = "";
        this.selectedUserForEditing.EmployeeId = "";
        this.selectedUserForEditing.Status = "Active";
    }
}

export class FilterByEmailOrUsernameValueConverter {
    toView(array, obj, sdt, email) {
        if (obj) {
            obj = obj.trim();
            return array
                .filter(x => (((x.Email != null) && (x.Email.indexOf(obj) != -1)) || ((x.UserName != null) && (x.UserName.indexOf(obj) != -1))));
        }
        if (sdt) {
            return array = array.filter(x => x.Phone && x.Phone == sdt);
        }

        if (email) {
            return array = array.filter(x => x.Email && x.Email == email);
        }

        return array;
    }
}

export class FilterByCompanyValueConverter {
    toView(array, company) {
        if (company != "" && company != null && typeof company !== "undefined") {
            return array.filter(x => x.CompanyId != null && x.CompanyId == company);
        }
        return array;
    }
}

export class FilterByStatusValueConverter {
    toView(array, status) {
        if (status) {
            return array.filter(x => x.Status != null && x.Status == status);
        }
        return array;
    }
}
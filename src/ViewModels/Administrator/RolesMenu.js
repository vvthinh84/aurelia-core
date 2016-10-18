import { inject } from 'aurelia-framework';
import { json } from 'aurelia-fetch-client';
import { UserService } from 'Services/UserSvc/UserService';
import * as toastr from 'toastr';
import 'eonasdan-bootstrap-datetimepicker';

@inject(UserService)
export class RolesMenu {
    ListRolesToBind = [];
    ListDN = [];
    ListParent = [];

    IdToUpdate;
    constructor(userService) {
        this.userService = userService;

        //Pagination
        this.current = 1;
        this.itemperpage = 12;
        this.pagesize = 12;
    }

    activate() {
        return Promise.all([this.userService.ListMenu(), this.userService.GetListRoles()]).then((rs) => {
            for (var i in rs[0].Data) {
                rs[0].Data[i].Status = rs[0].Data[i].Status.trim();

            }
            this.ListDN = rs[0].Data;
            this.ListRolesToBind = rs[1].Data;

            this.BindtoParentList(rs[0].Data);
        })


    }

    bind(ct, ovr) {
        ovr.bindingContext.total = this.ListDN.length;
    }



    BindtoParentList(array) {
        this.ListParent = array.filter(x => { if (x.ParentId == null) return { x } });
    }


    attached() {

    }
    AddRole() {
        this.isEdit = false;
        this.InitInfoRole();
    }
    AddMenu() {
        this.isEdit = false;
        this.InitInfoMenu();
    }

    EditMenu(currentDN) {
        this.IdToUpdate = null;
        this.isEdit = true;
        this.IdToUpdate = currentDN.Id;
        if (currentDN.ListRole != null && currentDN.ListRole.length > 0) {
            this.currentDNMenu.ListRole = currentDN.ListRole.split(",");

        }

        // bindingContext
        this.currentDNMenu.Name = currentDN.Name;
        this.currentDNMenu.Loai = currentDN.Loai;
        this.currentDNMenu.Code = currentDN.Code;
        this.currentDNMenu.ControllerName = currentDN.ControllerName;
        this.currentDNMenu.Status = currentDN.Status;
        this.currentDNMenu.ParentId = currentDN.ParentId;


    }






    SubmitRole() {
        if (!this.ValidateGiftBeforeSubmit()) { return false; }

        var jsonToPost = {};
        jsonToPost = this.currentDN;


        if (this.isEdit === false) {
            this.userService.InsertRoles(jsonToPost).then((data) => {
                if (data.Result == true) {

                    this.userService.GetListRoles().then((data) => {
                        //Reload data ListRole
                        this.ListRolesToBind = data.Data;

                    });
                    $('#addEditDN').modal('hide');
                    toastr.success('Tạo mới roles thành công!', 'Quản lý Roles');
                    return true;
                } else {
                    toastr.error("Lỗi! Xin thử lại!");
                    return false;
                }
            });
        }

    }
    SubmitMenu() {

        if (!this.ValidateMenuBeforeSubmit()) { return false; }

        //init jsonToPost
        var jsonToPost = {};
        var jsonToUpdate = {};
        jsonToPost.Name = this.currentDNMenu.Name;
        jsonToPost.Loai = this.currentDNMenu.Loai;
        jsonToPost.Code = this.currentDNMenu.Code;
        jsonToPost.ControllerName = this.currentDNMenu.ControllerName;
        jsonToPost.Status = this.currentDNMenu.Status;
        jsonToPost.ParentId = this.currentDNMenu.ParentId;
        jsonToPost.ListRole = "";


        // format ListRolesToPost

        // insert menu
        if (this.isEdit === false) {

            if (this.currentDNMenu.ListRole != null) {
                // insert here
                for (var i = 0; i < this.currentDNMenu.ListRole.length; i++) {
                    jsonToPost.ListRole += this.currentDNMenu.ListRole[i] + ",";
                }
                jsonToPost.ListRole = jsonToPost.ListRole.substring(0, jsonToPost.ListRole.length - 1);



                // insert menu
                this.userService.InsertMenu(jsonToPost).then((data) => {
                    if (data.Result == true) {
                        //Reload data
                        this.userService.ListMenu().then((data) => {
                            this.ListDN = data.Data;
                            for (var i in this.ListDN) {
                                this.ListDN[i].Status = this.ListDN[i].Status.trim();

                            }
                        });
                        $('#addEditMENU').modal('hide');
                        toastr.success('Tạo mới menu thành công!', 'Quản lý menu');
                        return true;
                    } else {
                        toastr.error("Lỗi! Xin thử lại!");
                        return false;
                    }
                });

            } else {
                toastr.warning('Danh sách Role chưa được chọn!', 'Quản lý menu');
            }

        } else {
            jsonToUpdate.ListRole = "";
            jsonToUpdate.Id = this.IdToUpdate,
                jsonToUpdate.Name = this.currentDNMenu.Name;
            jsonToUpdate.Loai = this.currentDNMenu.Loai;
            jsonToUpdate.Code = this.currentDNMenu.Code;
            jsonToUpdate.ControllerName = this.currentDNMenu.ControllerName;
            jsonToUpdate.Status = this.currentDNMenu.Status;
            jsonToUpdate.ParentId = this.currentDNMenu.ParentId;
            for (var i = 0; i < this.currentDNMenu.ListRole.length; i++) {
                jsonToUpdate.ListRole += this.currentDNMenu.ListRole[i] + ",";
            }
            jsonToUpdate.ListRole = jsonToUpdate.ListRole.substring(0, jsonToUpdate.ListRole.length - 1);

            // update menu
            this.userService.UpdateMenu(jsonToUpdate).then((data) => {

                if (data.Result == true) {
                    //Reload data
                    this.userService.ListMenu().then((data) => {
                        this.ListDN = data.Data;
                        for (var i in this.ListDN) {
                            this.ListDN[i].Status = this.ListDN[i].Status.trim();

                        }
                    });
                    $('#addEditMENU').modal('hide');
                    toastr.success('Cập nhật thành công!', 'Quản lý menu');
                    return true;
                } else {
                    toastr.error("Lỗi! Xin thử lại!");
                    return false;
                }
            });





        }

    }



    GetUserSeletedRoleIds(user) {
        this.currentDNMenu.ListRole = [];
        if (user.RoleIds != null && user.RoleIds.length > 0) {
            for (var i = 0; i < user.RoleIds.length; i++) {
                currentDNMenu.ListRole.push(user.RoleIds[i].RoleId);
            }
        }
    }


    ValidateGiftBeforeSubmit() {

        var strErrorMsg = "";
        if (this.currentDN.Name == "" || typeof this.currentDN.Name === "undefined")
            strErrorMsg += "• Tên roles phải nhập. <br/>";


        if (this.currentDN.Type == "" || typeof this.currentDN.Type === "undefined")
            strErrorMsg += "• Type phải nhập. <br/>";

        if (this.currentDN.Code == "" || typeof this.currentDN.Code === "undefined")
            strErrorMsg += "• Code phải nhập. <br/>";

        if (strErrorMsg !== "") {
            toastr.error(strErrorMsg, "Lỗi dữ liệu nhập!");
            return false;
        }
        return true;
    }


    ValidateMenuBeforeSubmit() {

        var strErrorMsg = "";
        if (this.currentDNMenu.Name == "" || typeof this.currentDNMenu.Name === "undefined")
            strErrorMsg += "• Tên menu phải nhập. <br/>";
        if (this.currentDNMenu.Loai == "" || typeof this.currentDNMenu.Loai === "undefined")
            strErrorMsg += "• Loại phải nhập. <br/>";

        if (this.currentDNMenu.Code == "" || typeof this.currentDNMenu.Code === "undefined")
            strErrorMsg += "• Code phải nhập. <br/>";


        if (strErrorMsg !== "") {
            toastr.error(strErrorMsg, "Lỗi dữ liệu nhập!");
            return false;
        }
        return true;
    }


    InitInfoRole() {
        this.currentDN = {};
        this.currentDN.Name = "";
        this.currentDN.Type = "";
        this.currentDN.Code = null;
        this.currentDN.Description = "";
    }
    InitInfoMenu() {
        this.currentDNMenu = {};
        this.currentDNMenu.Name = "";
        this.currentDNMenu.Loai = "";
        this.currentDNMenu.Code = null;
        this.currentDNMenu.ControllerName = null;
        this.currentDNMenu.Status = "A";
        this.currentDNMenu.Parentid = "";
        this.currentDNMenu.ListRole = null;


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

export class FilterByNameValueConverter {
    toView(array, obj) {
        if (obj) {
            return array
                .filter(x => ((x.Name != null) && (x.Name.toLowerCase().indexOf(obj.toLowerCase()) != -1)) ||
                    ((x.Loai != null) && (x.Loai.toLowerCase().indexOf(obj.toLowerCase()) != -1)) ||
                    ((x.Code != null) && (x.Code.toLowerCase().indexOf(obj.toLowerCase()) != -1)) ||
                    ((x.ControllerName != null) && (x.ControllerName.toLowerCase().indexOf(obj.toLowerCase()) != -1))

                )
        }
        return array;
    }
}
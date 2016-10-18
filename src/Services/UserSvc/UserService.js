import * as APISettings from 'Configuration/APISettings';
import { inject, transient } from 'aurelia-framework';
import { HttpService } from 'Services/HttpService';
import { AppState } from 'Helpers/AppStateHelper';

@inject(HttpService, AppState)
@transient()
export class UserService {

    constructor(httpService, appState) {
        this.httpService = httpService;
        this.appState = appState;
    }

    LogIn(jsonToPost) {
        //console.log(jsonToPost);
        return this.httpService.GetData(APISettings.APILogIn, 'post', jsonToPost);
    }

    GetListRoles() {
        return this.httpService.GetData(APISettings.APIGetListRoles, 'get', null);
    }

    //Lay danh sach User cap duoi
    GetListUserbyCompanyId() {
        var jsonToPost = {
            CompanyId: this.appState.UserInfo.CompanyId,
            UserId: this.appState.UserInfo.UserId
        };
        return this.httpService.GetData(APISettings.APIGetListUserbyCompanyId, 'post', jsonToPost);
    }

    //Lay danh sach user dua vao company ID
    GetListUserByCompanyIdPassed(companyId) {
        var jsonToPost = {
            CompanyId: companyId,
            UserId: this.appState.UserInfo.UserId
        }
        return this.httpService.GetData(APISettings.APIGetListUserbyCompanyId, 'post', jsonToPost);
    }

    //Lay danh sach cap tren
    GetListTeamleadbyCompanyId() {
        var jsonToPost = {
            CompanyId: this.appState.UserInfo.CompanyId,
            UserId: this.appState.UserInfo.UserId
        };
        return this.httpService.GetData(APISettings.APIGetListTeamleadbyCompanyId, 'post', jsonToPost);
    }

    IsCurrentUserInRole(roleToCheck) {
        var arrRoles = Lockr.get('UserInfo').Roles;
        if (arrRoles.length > 0) {
            for (var i = 0; i < arrRoles.length; i++) {
                if (arrRoles[i].Name === roleToCheck) {
                    return true;
                }
            }
        }
        return false;
    }

    GetStringOfUserRolesName(roles) {

        var strRoleName = "";
        if (roles != null && roles.length > 0) {
            for (var i = 0; i < roles.length; i++) {
                strRoleName += roles[i].Name + ", ";
            }
        }
        if (strRoleName.length > 1) {
            return strRoleName.substring(0, strRoleName.length - 2);
        }

        return strRoleName;
    }

    GetListCompanies() {
        return this.httpService.GetData(`store-api/GetCompany`, 'get', null);
    }

    SubmitUser(jsonToPost) {
        return this.httpService.GetData(APISettings.APIUpdateUser, 'post', jsonToPost);
    }

    ResetPassword(jsonToPost) {
        return this.httpService.GetData(APISettings.APIResetPassword, 'post', jsonToPost);
    }

    EditChangePassword(jsonToPost) {
        return this.httpService.GetData(APISettings.APIUserChangePass, 'post', jsonToPost);
    }

    UpdateUserInfo(jsonToPost) {
        return this.httpService.GetData(APISettings.APIUpdateUserInfo, 'post', jsonToPost);
    }

    ListMenu() {
        // this.logger.info("JSON Update User Info: ", JSON.stringify(jsonToPost));
        return this.httpService.GetData(APISettings.APIListMenu, 'get', null);
    }
    InsertMenu(jsonToPost) {
        // this.logger.info("JSON Update User Info: ", JSON.stringify(jsonToPost));
        return this.httpService.GetData(APISettings.APIInsertMenu, 'post', jsonToPost);
    }
    UpdateMenu(jsonToPost) {
        // this.logger.info("JSON Update User Info: ", JSON.stringify(jsonToPost));
        return this.httpService.GetData(APISettings.APIUpdateMenu, 'post', jsonToPost);
    }

    InsertRoles(jsonToPost) {
        // this.logger.info("JSON Update User Info: ", JSON.stringify(jsonToPost));
        return this.httpService.GetData(APISettings.APIInsertRoles, 'post', jsonToPost);
    }

}
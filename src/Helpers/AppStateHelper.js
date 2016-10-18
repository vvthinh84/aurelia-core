import { transient } from 'aurelia-framework';
@transient()
export class AppState {

    isAuthenticated = false;
    UserInfo = {};

    constructor() {

        this.isAuthenticated = false;
        if (Lockr.get('UserInfo')) {
            this.UserInfo = Lockr.get('UserInfo');
            this.isAuthenticated = true;
        }
    }

    CheckNav(roles) {
        if (Lockr.get('UserInfo')) {
            if (roles) {
                for (let i in roles) {
                    let rls = Lockr.get('UserInfo').Roles;
                    for (let j in rls) {
                        if (rls[j].Code.toLowerCase() == roles[i].toLowerCase()) {
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    }


}
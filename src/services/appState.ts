import {transient} from 'aurelia-framework';
import Lockr = require('lockr');
@transient()
export class AppState {
  isAuthenticated=false;
  UserInfo = {};
  //UserId='';
  constructor() {
    //this.isAuthenticated = monster.get('isAdmin')? monster.get('isAdmin') : false  ;
    if(Lockr.get('UserInfo')){
      this.UserInfo = Lockr.get('UserInfo');
    }
    else{
      
    }
  }

  setMyInFo(){
    Lockr.set('tung', {value:'we are the rule'});
  }

  CheckNav(roles){
    if(Lockr.get('UserInfo')){
      if(roles){
        for(let i in roles){
          let rls: any = (Lockr.get('UserInfo')as any).Roles;
          for(let j in rls){
            if(rls[j].Code.toLowerCase()==roles[i].toLowerCase()){
              return true;
            }
          }
        }
      }
    }

    return false;
  }

  // login(username, password) {
  //   let obj = {};
  //   obj.Username = username;
  //   obj.Password = password;
  //   this.http.post('http://localhost:10494/user-api/login', obj)
  //     // .then(response => {
  //     //   console.log(response.response);
  //     //   this.isAuthenticated = true;
  //     //   return true;
  //     // }).catch(err => {
  //     //   console.log(err);
  //     // });
  //   if (username == "Admin" && password == "xxx") {
  //
  //   }
  //   this.logout();
  //   return false;
  // }
  //
  // logout() {
  //   this.isAuthenticated = false;
  // }
}

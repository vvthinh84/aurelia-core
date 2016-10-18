import {  inject} from 'aurelia-framework';
import {  AppState } from '../services/appState';
import {  Redirect} from 'aurelia-router';
@inject(AppState)
export class AuthorizeStep {
  Lockr : any;
  appState : AppState;
  constructor(appState) {
    this.appState = appState;
    
    //this.theRouter = router;
  }
  run(navigationInstruction, next) {

    // Check if the route has an "auth" key
    // The reason for using `getAllInstructions()` is because
    // this includes child routes.
   
    // if (navigationInstruction.getAllInstructions().some(i => i.config.auth)) {

    //   var isLoggedIn = this.appState.isAuthenticated;
    //   if (!isLoggedIn) {
    //     return next.cancel(new Redirect('login'));
    //   }
    // }
    // if (navigationInstruction.getAllInstructions().some(i => i.config.settings.roles && i.config.settings.roles.indexOf('cs') !== -1)) {

    //   if (!Lockr.get('UserInfo')) {
    //     return next.cancel(new Redirect('login'));
    //   }
    //   else return next();
    // }
    // if (navigationInstruction.getAllInstructions().some(i => i.config.settings.roles && i.config.settings.roles.indexOf('vnpostadmin') !== -1)) {
    //   var isAdmin = /* insert magic here */ false;
    //   let roles = Lockr.get('UserInfo').Roles;
    //   for (let i in roles) {
    //     if (roles[i].Code.toLowerCase() == 'vnpostadmin') {
    //       isAdmin = true;
    //       return next();
    //     }
    //   }
    //   if (!isAdmin) {
    //     return next.cancel(new Redirect('login'));
    //   }
    // }
    // if (navigationInstruction.getAllInstructions().some(i => i.config.settings.roles && i.config.settings.roles.indexOf('teamlead') !== -1)) {
    //   var isAdmin = /* insert magic here */ false;
    //   let roles = Lockr.get('UserInfo').Roles;
    //   for (let i in roles) {
    //     if (roles[i].Code.toLowerCase() == 'teamlead') {
    //       isAdmin = true;
    //       return next();
    //     }
    //   }
    //   if (!isAdmin) {
    //     //return next.cancel(new Redirect('login'));
    //   }
    // }

    // if (navigationInstruction.getAllInstructions().some(i => i.config.settings.roles && i.config.settings.roles.indexOf('dev') !== -1)) {
    //   var arr = navigationInstruction.getAllInstructions().some(i => i.config.auth);
    //   alert('dev');
    //   var isAdmin = /* insert magic here */ false;
    //   let roles = Lockr.get('UserInfo').Roles;
    //   for (let i in roles) {
    //     if (roles[i].Code.toLowerCase() == 'dev') {
    //       isAdmin = true;
    //       return next();
    //     }
    //   }
    //   if (!isAdmin) {
    //     return next.cancel(new Redirect('login'));
    //   }
    // }
    // if (navigationInstruction.getAllInstructions().some(i => i.config.settings.roles && i.config.settings.roles.indexOf('ordermng') !== -1)) {
    //   var arr = navigationInstruction.getAllInstructions().some(i => i.config.auth);

    //   var isAdmin = /* insert magic here */ false;
    //   let roles = Lockr.get('UserInfo').Roles;
    //   for (let i in roles) {
    //     if (roles[i].Code.toLowerCase() == 'dev' || roles[i].Code.toLowerCase()=='teamlead') {
    //       isAdmin = true;
    //       return next();
    //     }
    //   }
    //   if (!isAdmin) {
    //     return next.cancel(new Redirect('login'));
    //   }
    // }
    // if (navigationInstruction.getAllInstructions().some(i => i.config.settings.roles && i.config.settings.roles.indexOf('usermng') !== -1)) {

    //   var isAdmin = /* insert magic here */ false;
    //   let roles = Lockr.get('UserInfo').Roles;
    //   for (let i in roles) {
    //     if (roles[i].Code.toLowerCase() == 'admin'||roles[i].Code.toLowerCase() == 'vnpostadmin') {
    //       isAdmin = true;
    //       return next();
    //     }

    //   }
    //   if (!isAdmin) {
    //     return next.cancel(new Redirect('login'));
    //   }
    // }
    // //
    //   if (navigationInstruction.getAllInstructions().some(i => i.config.settings.roles && i.config.settings.roles.indexOf('storemng') !== -1)) {

    //     var isAdmin = /* insert magic here */ false;
    //     let roles = Lockr.get('UserInfo').Roles;
    //     for (let i in roles) {
    //       if (roles[i].Code.toLowerCase() == 'admin'||roles[i].Code.toLowerCase() == 'vnpostadmin') {
    //         isAdmin = true;
    //         return next();
    //       }

    //     }
    //     if (!isAdmin) {
    //       return next.cancel(new Redirect('login'));
    //     }
    //   }
    // if (navigationInstruction.getAllInstructions().some(i => i.config.settings.roles && i.config.settings.roles.indexOf('affiliatemng') !== -1)) {
    //   //AFFILIATEADMIN
    //   var isAdmin = /* insert magic here */ false;
    //   let roles = Lockr.get('UserInfo').Roles;
    //   for (let i in roles) {
    //     if (roles[i].Code.toLowerCase() == 'admin'||roles[i].Code.toLowerCase() == 'affiliateadmin') {
    //       isAdmin = true;
    //       return next();
    //     }
    //   }
    //   if (!isAdmin) {
    //     return next.cancel(new Redirect('login'));
    //   }
    // }

    return next();
  }
}

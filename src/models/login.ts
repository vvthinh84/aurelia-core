import { ValidationRules } from 'aurelia-validation';
export class Login {

    UserName : string;
    Password : string;
    Remember : boolean;
}

ValidationRules
    .ensure((x : Login)=> x.UserName ).required().maxLength(20).minLength(4)
    .ensure((x : Login)=> x.Password ).required().maxLength(20).minLength(4)
    .on(Login);
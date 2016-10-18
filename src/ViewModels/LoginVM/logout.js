
export class LogOut {
  constructor() {
  }

  activate() {
    monster.remove('isAdmin');
    Lockr.rm('UserInfo');
    window.location = "#login";
    window.location.reload();
  }
}

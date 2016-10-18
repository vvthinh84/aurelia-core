export class GenderValueConverter {
  toView(str){
    if(str){
      if(str=='F') return "Nữ";
      if(str=='M') return "Nam";
    }
    else return "none";
  }
}

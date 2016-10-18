//import {numeral} from 'numeral';
export class VietNamDongValueConverter {
  toView(value) {
    if (value) {
      return numeral(value).format('(0,0)') + ' ₫';
    }
    else{
      return 'chưa xác định';
    }

  }
}

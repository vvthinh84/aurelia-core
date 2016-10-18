//import {numeral} from 'numeral';
export class NumberValueConverter {
  toView(value) {
    if (+value) {
      return numeral(value).format('(0,0)');
    }
    else{
      return 'NAN';
    }

  }
}

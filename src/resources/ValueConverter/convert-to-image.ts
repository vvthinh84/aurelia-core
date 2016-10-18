export class ConvertToImangeValueConverter{
  toView(obj){
    if(obj){
      return 'https://cdn1.vienthonga.vn/image/'+ obj.replace('~/Upload','');
    }
    else return 'http://www.dominicanajournal.org/wp-content/plugins/special-recent-posts-pro/images/no-thumb.png';

  }
}

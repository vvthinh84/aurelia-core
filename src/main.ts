import 'bootstrap';
import 'lockr';
import 'sweetalert';
import 'numeral';
import 'jquery';
import 'semantic';

/**
 * jquery-ui orveride some boostrapjs function , import jquery-ui explicit 
 */
//import 'jquery-ui';
export function configure(aurelia: any) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-validation')
    .feature('resources')
    //.plugin('aurelia-kendoui-bridge', (kendo) => kendo.core())

    .plugin('tungptvn/aurelia-paginator')
    .plugin('aurelia-dialog', config => {
      config.useDefaults();
      config.settings.lock = false;
      config.settings.centerHorizontalOnly = false;
      config.settings.startingZIndex = 10005;
    })
    // .plugin('aurelia-tabs')

  aurelia.start().then(a => a.setRoot());

}

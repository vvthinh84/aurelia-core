import 'bootstrap';
import 'cookie-monster';
import 'lockr';
import regeneratorRuntime from 'babel-runtime/regenerator';
window.regeneratorRuntime = regeneratorRuntime;


export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('aurelia-validation')
        .plugin('toastr')
        .plugin('Helpers/ValueConverterHelper')
        .plugin('tungptvn/aurelia-paginator')
        .plugin('aurelia-dialog', config => {
            config.useDefaults();
            config.settings.lock = false;
            config.settings.centerHorizontalOnly = false;
            config.settings.startingZIndex = 10005;
        });
    aurelia.start().then(a => a.setRoot());
}
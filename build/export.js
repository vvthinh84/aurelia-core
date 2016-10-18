// this file provides a list of unbundled files that
// need to be included when exporting the application
// for production.
module.exports = {
  'list': [
    'index.html',
    'config.js',
    'favicon.ico',
    'LICENSE',
    "jspm_packages/npm/bluebird@3.4.1/js/browser/bluebird.min.js",
    'jspm_packages/system.js',
    'jspm_packages/system-polyfills.js',
    'jspm_packages/system-csp-production.js',
    'styles/styles.css',

    "bower_components/lockr/lockr.min.js",
    "bower_components/sweetalert/dist/sweetalert.min.js",
    "bower_components/lodash/dist/lodash.min.js",
    "bower_components/numeral/min/numeral.min.js",
    "bower_components/ckeditor/ckeditor.js",
    "bower_components/summernote/dist/summernote.min.js",
    "bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js",
    "bower_components/magnific-popup/dist/jquery.magnific-popup.min.js",
    "bower_components/semantic/dist/semantic.min.js",

    "bower_components/sweetalert/dist/sweetalert.css",
    "bower_components/summernote/dist/summernote.css",
    "bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css",
    "bower_components/magnific-popup/dist/magnific-popup.css",
    "bower_components/semantic/dist/semantic.min.css",

    "bower_components/semantic/dist/themes/default/assets/fonts/icons.woff2",
    "bower_components/semantic/dist/themes/default/assets/fonts/icons.ttf",
    "bower_components/semantic/dist/themes/default/assets/fonts/icons.woff",

    'jspm_packages/github/tungptvn/aurelia-paginator@0.1.8/pagination/pagination-element.js',
    'jspm_packages/github/tungptvn/aurelia-paginator@0.1.8/pagination/pagination-element.html'
  ],
  // this section lists any jspm packages that have
  // unbundled resources that need to be exported.
  // these files are in versioned folders and thus
  // must be 'normalized' by jspm to get the proper
  // path.
  'normalize': [
    [
      // include font-awesome.css and its fonts files
      'font-awesome', [
        '/css/font-awesome.min.css',
        '/fonts/*'
      ]
    ], [
      // include bootstrap's font files
      'bootstrap', [
        '/fonts/*'
      ]
    ], [
      'bluebird', [
        '/js/browser/bluebird.min.js'
      ]
    ],
    [
      'select2', [
        '/css/select2.css'
      ]
    ],
    [
      'tungptvn/aurelia-paginator', [
        '/pagination/*'
      ]
    ]
  ]
};

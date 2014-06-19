/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');

var app = new EmberApp({
  name: require('./package.json').name,

  minifyCSS: {
    enabled: true,
    options: {}
  },

  getEnvJSON: require('./config/environment')
});

// Use this to add additional libraries to the generated output files.
app.import('vendor/ember-data/ember-data.js');

// If the library that you are including contains AMD or ES6 modules that
// you would like to import into your application please specify an
// object with the list of modules as keys along with the exports of each
// module as its value.
app.import('vendor/ic-ajax/dist/named-amd/main.js', {
  'ic-ajax': [
    'default',
    'defineFixture',
    'lookupFixture',
    'raw',
    'request',
  ]
});

//JS
app.import('vendor/momentjs/moment.js');
app.import('vendor/select2/select2.js');
app.import('vendor/easydropdown/jquery.easydropdown.min.js');
app.import('vendor/speakingurl/speakingurl.min.js');
app.import('vendor/fastclick/lib/fastclick.js');
app.import('vendor/modernizr/modernizr.js');
//Add jquery cookie here for joyride support

app.import('vendor/foundation/js/foundation/foundation.js');
app.import('vendor/foundation/js/foundation/foundation.tooltip.js');
app.import('vendor/foundation/js/foundation/foundation.tab.js');
app.import('vendor/foundation/js/foundation/foundation.reveal.js');
app.import('vendor/foundation/js/foundation/foundation.dropdown.js');
app.import('vendor/foundation/js/foundation/foundation.alert.js');

//CSS
app.import('vendor/foundation/css/normalize.css');
app.import('vendor/foundation/css/foundation.css');
app.import('vendor/font-awesome/css/font-awesome.css');
app.import('vendor/select2/select2.css');
app.import('vendor/easydropdown/themes/easydropdown.css');

//FONT
var fontawesome = pickFiles('vendor/font-awesome/fonts', {
    srcDir: '/',
    destDir: '/fonts'
});

var othercss = pickFiles('app/styles', {
    srcDir: '/',
    destDir: '/assets'
});

module.exports = mergeTrees([
    app.toTree(),
    fontawesome,
    othercss
]);

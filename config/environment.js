/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    baseURL: '/',
    locationType: 'auto',
    FEATURES: {
      // Here you can enable experimental features on an ember canary build
      // e.g. 'with-controller': true
    },

    APP: {
      MOCK_AUTHENTICATION: false,

      // Here you can pass flags/options to your application instance
      // when it is created
      apiBaseUrl: 'https://refset-api.snomedtools.info/refsets',
      authenticationActionSoapName: 'getUserByNameAuth',
      authenticationUrl: 'https://usermanagement.ihtsdotools.org/security-web/query/',
      permissionsUrl: 'https://usermanagement.ihtsdotools.org/security-web/query/users/__USER_ID__/apps/Refset'
    }
  };

  if (environment === 'development') {
    // LOG_MODULE_RESOLVER is needed for pre-1.6.0
    //ENV.LOG_MODULE_RESOLVER = true;

    //ENV.APP.LOG_RESOLVER = true;
    //ENV.APP.LOG_ACTIVE_GENERATION = true;
    //ENV.APP.LOG_MODULE_RESOLVER = true;
    //ENV.APP.LOG_TRANSITIONS = true;
    //ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    //ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.APP.MOCK_AUTHENTICATION = true;
    ENV.APP.apiBaseUrl = 'https://localhost:9000/refsets';
    
  }

  if (environment === 'production') {
  }

  return ENV;
};

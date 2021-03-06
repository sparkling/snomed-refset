import toEmberObject from '../utils/to_ember_object';

var Login = Ember.Object.extend({
  username:     null,
  password:     null,
  errorMessage: null
});

Login.reopenClass({
  authenticate: function(username, password) { 
    Ember.Logger.log('Ajax: authenticate');
    var data = {};
    data['username']  = username;
    data['password']  = password;
    data['queryName'] = ENV.APP.authenticationActionSoapName;
    
    return Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        url: ENV.APP.authenticationUrl,
        type: "POST",
        data: data
      }).then((function(success) {
        Ember.Logger.log('Ajax: success');
        return toEmberObject(success);
      }), function(error) {
        Ember.Logger.log('Ajax: error');
        return error; 
      }));
    });
  },

  getPermissionGroups: function(userId){
    Ember.Logger.log('Ajax: Get permissionGroups for user ' + userId);
    return Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8"
        },
        url: ENV.APP.permissionsUrl.replace('__USER_ID__', userId),
        type: "GET"
      }).then((function(success) {
        Ember.Logger.log('Ajax: success');
        return success;
      }), function(error) {
        Ember.Logger.log('Ajax: error');
        Ember.Logger.log('fail: ' + JSON.stringify(error));
        return error;
      }));
    });
  },

});

export default Login;
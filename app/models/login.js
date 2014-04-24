import toEmberObject from 'appkit/utils/to_ember_object';

var Login = Ember.Object.extend({
  username: null,
  password: null,
  errorMessage: null
});

Login.reopenClass({
  authenticate: function(username, password) { 
    Ember.Logger.log('Ajax: authenticate');

    var data = {};
    data['username']  = username;
    data['password']  = password;
    data['queryName'] = 'getUserByNameAuth';
    
    return Ember.Deferred.promise(function(p) {
      //return new Ember.RSVP.Promise(function(resolve, reject){
      //  resolve('success');
      //});
      return p.resolve($.ajax({
        url: 'http://usermanagement.ihtsdotools.org:8080/security-web/query/',
        type: "POST",
        data: data
      }).then((function(success) {
        //alert(JSON.stringify(success));
        Ember.Logger.log('Ajax: success');
        return toEmberObject(success);
      }), function(error) {
        Ember.Logger.log('Ajax: error');
        return error; 
      }));
    });
  }
});


export default Login;
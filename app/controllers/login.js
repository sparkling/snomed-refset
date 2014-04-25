import Login from 'appkit/models/login';
import PermissionGroup from 'appkit/models/permissionGroup';
import User from 'appkit/models/user';

export default Ember.ObjectController.extend({
  needs:              "application",
  attemptedTransition: null,
  token:               window.localStorage.token,
  loading:             false,

  tokenChanged: function() {
    if (!this.get('token')){
      window.localStorage.removeItem('token');      
    }
    else {
      window.localStorage.token = this.get('token');
    }
  }.observes('token'),

  actions:{
    login: function() {
      this.set('errorMessage', null);
      var _this = this;
      this.set('loading', true);
      Login.authenticate(this.get('username'), this.get('password')).
        then(function(success){
          var user = User.create({
            firstName: success.get('user.givenName'),
            lastName: success.get('user.surname'),
            login: success.get('user.name'),
            userId: success.get('user.id'),
            permissionGroups: Ember.A()
          });

          var permissionGroups = Login.getPermissionGroups(user.get('login')).
            then(function(success){
              Ember.Logger.log('success roles:' + success);
              for (var i = 0; i < success.perms.length; i++){
                User.get('permissionGroups').pushObject(
                  PermissionGroup.create({
                    app:     success.perms[i].app,
                    role:    success.perms[i].role,
                    country: success.perms[i].member
                  })
                );
              }
            },
            function(error){
              Ember.Logger.log('error:' + error);
              _this.set('loading', false);
              _this.set('errorMessage', "Unable to load permissions: " + error.errorMessage);
            }
            );

          _this.set('token', 'token-1234');
          _this.set('controllers.application.user', user);

          var attemptedTransition = _this.get('attemptedTransition');
          if (attemptedTransition) {
            attemptedTransition.retry();
            _this.set('attemptedTransition', null);
          } else {
            // Redirect to 'refsets' by default.
            _this.transitionToRoute('refsets');
          }
        },
        function(error){
          _this.set('loading', false);
          _this.set('errorMessage', "Username and password not recognised");
        });//then
    }//login
  }//actions
});
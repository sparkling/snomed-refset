import Login from '../models/login';
import PermissionGroup from '../models/permissionGroup';
import User from '../models/user';

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

      //This is a hack that should be removed. The right way to do this, is to create
      //a new github module for mocking these APIs, using express js

      Ember.Logger.log('Mock: ' + ENV.APP.MOCK_AUTHENTICATION);

      if (ENV.APP.MOCK_AUTHENTICATION){
        Ember.Logger.log('Mocking Authentication');
        var user = User.create({
          firstName: 'mock',
          lastName: 'user',
          login: 'user.name',
          userId: 'user.id',
          permissionGroups: Ember.A()
        });
        Ember.Logger.log("USER: " + user);
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
      }
      else{
        Ember.Logger.log('Performing Authentication');
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
            ); //getPermissionsGroup

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
        } //else
    }//login
  }//actions
});
import Login from 'appkit/models/login';
import User from 'appkit/models/user';

export default Ember.ObjectController.extend({
  needs:              "application",
  attemptedTransition: null,
  token:               window.localStorage.token,

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

      Login.authenticate(this.get('username'), this.get('password')).
        then(function(success){
          var user = User.create({
            firstName: success.get('user.givenName'),
            lastName: success.get('user.surname'),
            userId: success.get('user.id')
          });

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
          _this.set('errorMessage', "Username and password not recognised");
        });//then
    }//login
  }//actions
});
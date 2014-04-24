export default Ember.Controller.extend({
  needs: "login",
  user:  null,

  userChanged: function() {
    if (!this.get('user')){
      window.localStorage.removeItem('user');
    }
    else {
      window.localStorage.user = JSON.stringify(this.get('user'));
    }
  }.observes('user'),

  loggedIn: function(){
    return this.get('controllers.login.token');
  }.property('controllers.login.token')

});

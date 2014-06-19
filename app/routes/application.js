import User from '../models/user';
import toEmberObject from '../utils/to_ember_object';

export default Ember.Route.extend({
  
  setupController: function (controller, model) {
    if (window.localStorage.user){
      controller.set('user', JSON.parse(window.localStorage.user));
    }
  },

  actions: {
    showModal: function(name) {
      Ember.Logger.log('showing modal for controller ' + name);
      this.controllerFor(name).set('modalVisible', true);
    },
    goBack: function() {
      this.transitionTo('refsets');
    },
    logout: function(){
      this.controllerFor('login').set('token', null);
      this.controllerFor('application').set('user', null);
      this.transitionTo('login');
    }
  }
});

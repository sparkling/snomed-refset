export default Ember.Route.extend({
  actions: {
    showModal: function(name) {
      Ember.Logger.log('showing modal for controller ' + name);
      return this.controllerFor(name).set('modalVisible', true);
    },
    goBack: function() {
      return this.transitionTo('refsets');
    }
  }
});

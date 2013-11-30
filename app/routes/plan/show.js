export default Ember.Route.extend({
  setupController: function(controller, model) {
    this.controllerFor('plan').set('isEdit', false);
  }
});
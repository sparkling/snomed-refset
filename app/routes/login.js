import Login from '../models/login';

export default  Ember.Route.extend({
  model: function(params) {
    return Login.create();
  },
  setupController: function (controller, model) {
    this._super(controller, Login.create());
    controller.set('loading', false);
  }
});
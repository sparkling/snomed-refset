import Member from 'appkit/models/member';

export default Ember.Route.extend({
  setupController: function (controller, model) {
    model = Ember.Object.create();
    model.set('fileType', 'USE_EXTENSION');
    controller.set('model', model);
  }
});
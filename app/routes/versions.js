import Version from 'appkit/models/version';

export default Ember.Route.extend({
  needs: 'refset',

  setupController: function (controller, model) {
    Ember.Logger.log("Loading versions for refset " + this.modelFor('refset').get('publicId'));
    controller.set('model', Version.getVersions(this.modelFor('refset').get('publicId'), this));
  }
});
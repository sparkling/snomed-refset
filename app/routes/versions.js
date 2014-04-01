import Version from 'appkit/models/version';
import Tag from 'appkit/models/tag';

export default Ember.Route.extend({
  needs: 'refset',

  setupController: function (controller, model) {
    Ember.Logger.log("Loading versions for refset " + this.modelFor('refset').get('publicId'));
    controller.set('model', Version.getVersions(this.modelFor('refset').get('publicId'), this));
    controller.set('release', Tag.create());
    controller.set('alert', '');
  }
});
import Tag from 'appkit/models/tag';

export default Ember.Route.extend({
  needs: 'refset',

  setupController: function (controller, model) {
    Ember.Logger.log("Loading tags for refset " + this.modelFor('refset').get('publicId'));
    controller.set('model', Tag.getTags(this.modelFor('refset').get('publicId'), "title", "ASC", this));
  }
});
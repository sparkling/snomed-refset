import Version from 'appkit/models/version';
import Tag from 'appkit/models/tag';

export default Ember.Route.extend({

  model: function(params) {
    return Tag.getRelease(this.modelFor('refset').get('publicId'), params.releasePublicId, this);
  },

  serialize: function(model) {
    return { releasePublicId: model.get('publicId') };
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    Version.getMembers(this.modelFor('refset').get('publicId'), model.get('snapshot.publicId'), "component.fullySpecifiedName", "ASC", this).
      then(function(members){
        controller.set('members', members);
      });
  }
});
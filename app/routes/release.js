import Authenticated from 'appkit/routes/authenticated';
import Version from 'appkit/models/version';
import Tag from 'appkit/models/tag';

export default Authenticated.extend({

  model: function(params) {
    return Tag.getRelease(this.modelFor('refset').get('publicId'), params.releasePublicId, this);
  },

  serialize: function(model) {
    return { releasePublicId: model.get('publicId') };
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set('sortBy', "component.fullySpecifiedName");
    controller.set('sortOrder', 'ASC');

    Version.getMembers(this.modelFor('refset').get('publicId'), model.get('snapshot.publicId'), "component.fullySpecifiedName", "ASC", "", 0, 10, this).
      then(function(membersPage){
        controller.set('membersPage', membersPage);
      });
  }
});
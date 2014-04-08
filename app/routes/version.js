import Version from 'appkit/models/version';

export default Ember.Route.extend({
  model: function(params) {
    return Version.getVersion(this.modelFor('refset').get('publicId'), params.versionPublicId, this);
  },

  serialize: function(model) {
    return { versionPublicId: model.get('publicId') };
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('sortBy', "component.fullySpecifiedName");
    controller.set('sortOrder', 'ASC');
        
    Version.getMembers(this.modelFor('refset').get('publicId'), model.get('publicId'), "component.fullySpecifiedName", "ASC", 0, 10, this).
      then(function(members){
        controller.set('members', members);
      });
  }
});
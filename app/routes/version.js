import Version from 'appkit/models/version';

export default Ember.Route.extend({
  model: function(params) {
    this.controllerFor('version').set('members', 
      Version.getMembers(this.modelFor('refset').get('publicId'), params.versionPublicId, 
        "component.fullySpecifiedName", "ASC", this));
    return Version.getVersion(this.modelFor('refset').get('publicId'), params.versionPublicId, this);
  },
  serialize: function(model) {
    return { versionPublicId: model.get('publicId') };
  }
});
import Version from 'appkit/models/version';
import Tag from 'appkit/models/tag';

export default Ember.Route.extend({
  model: function(params) {
    var onSuccess = function(tag, _this){
      Ember.Logger.log('Found release ' + tag.get('publicId'));
      _this.controllerFor('release').set('members', 
        Version.getMembers(_this.modelFor('refset').get('publicId'), tag.get('snapshot.publicId'), 
          "component.fullySpecifiedName", "ASC", _this));
    };
    return Tag.getRelease(this.modelFor('refset').get('publicId'), params.releasePublicId, onSuccess, this);
  },
  serialize: function(model) {
    return { releasePublicId: model.get('publicId') };
  },

  setupController: function (controller, model) {
    if (model.get('snapshot.publicId') !== ''){
      controller.set('members', 
        Version.getMembers(this.modelFor('refset').get('publicId'), model.get('snapshot.publicId'), 
          "component.fullySpecifiedName", "ASC", this));

    }
    controller.set('model', model);
  }
});
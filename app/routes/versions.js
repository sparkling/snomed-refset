import Version from 'appkit/models/version';
import Tag from 'appkit/models/tag';

export default Ember.Route.extend({
  needs: 'refset',

  model: function(){
    return Version.getVersions(this.modelFor('refset').get('publicId'), this);
  },

  setupController: function (controller, model) {
    this._super(controller, model);  
    controller.set('alert', undefined);
  }
});
import Version from 'appkit/models/version';
import Tag from 'appkit/models/tag';

export default Ember.Route.extend({
  model: function(){
    var cache = this.controllerFor('cache');
    if (cache.get('versions').length === 0){
      cache.set('versions', Version.getVersions(this.modelFor('refset').get('publicId'), this));
    }
    return cache.get('versions');
  },

  setupController: function (controller, model) {
    this._super(controller, model);  
    controller.set('alert', undefined);
  }
});
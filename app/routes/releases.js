import Tag from 'appkit/models/tag';

export default Ember.Route.extend({
  needs: 'refset',

  model: function(){
    var cache = this.controllerFor('cache');
    if (cache.get('releases').length === 0){
      cache.set('releases', Tag.getTags(this.modelFor('refset').get('publicId'), "title", "ASC", this));
    }
    return cache.get('releases');
  },

  setupController: function(controller, model){
    this._super(controller, model);
    controller.set('sortBy', "title");
    controller.set('sortOrder', 'ASC');
  }

});
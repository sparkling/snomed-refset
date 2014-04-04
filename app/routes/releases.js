import Tag from 'appkit/models/tag';

export default Ember.Route.extend({
  needs: 'refset',

  model: function(){
    return Tag.getTags(this.modelFor('refset').get('publicId'), "title", "ASC", this);
  },

  setupController: function(controller, model){
    this._super(controller, model);
    controller.set('sortBy', "title");
    controller.set('sortOrder', 'ASC');
  }

});
import Refsets from 'appkit/models/refsets';

export default  Ember.Route.extend({
  model: function() {
    Ember.Logger.log('loading refsets');
    return Refsets.loadRefsets(this, "title", "ASC");
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set('sortBy', "component.fullySpecifiedName");
    controller.set('sortOrder', 'ASC');
    controller.set('alert', undefined);
    }  
});
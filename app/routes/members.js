import Member from 'appkit/models/member';
import Version from 'appkit/models/version';
import Refset from 'appkit/models/refset';

export default Ember.Route.extend({
  model: function() {

    //FIXME: Need to return a promise from the members() function, but that will break this cache handling
    //Don't think I can set a promise on the cache? Will that work?

    var cache = this.controllerFor('cache');
    if (cache.get('members').length === 0){
      cache.set('members', Member.getMembers(this.modelFor('refset').get('publicId'), "component.fullySpecifiedName", "ASC", this));
    }
    return cache.get('members');
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set('sortBy', "component.fullySpecifiedName");
    controller.set('sortOrder', 'ASC');

    //Display the Import alert, but only one time
    if (typeof controller.get('alert') !== 'undefined') {
      if (!controller.get('alert.onceSticky')){
        controller.set('alert', undefined);
      }else{
        controller.set('alert.onceSticky', false);        
      }
    }
  }
});
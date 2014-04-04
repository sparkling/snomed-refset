import Member from 'appkit/models/member';
import Version from 'appkit/models/version';
import Refset from 'appkit/models/refset';

export default Ember.Route.extend({
  model: function() {
    return Member.getMembers(this.modelFor('refset').get('publicId'), "component.fullySpecifiedName", "ASC", this);
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
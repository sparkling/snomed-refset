import Authenticated from 'appkit/routes/authenticated';
import Member from 'appkit/models/member';
import Version from 'appkit/models/version';
import Refset from 'appkit/models/refset';

export default Authenticated.extend({

  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set('sortBy', "component.fullySpecifiedName");
    controller.set('sortOrder', 'ASC');
    
    if (this.controllerFor('refset').get('membersPage.length') === 0){
      var _this = this;
      Member.getMembers(this.modelFor('refset').get('publicId'), "component.fullySpecifiedName", "ASC", "", 0, 10, this).
        then(function(page){
          _this.controllerFor('refset').set('membersPage', page);
          //_this.set('model', page);
        });
    }

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
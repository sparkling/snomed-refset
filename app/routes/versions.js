import Authenticated from 'appkit/routes/authenticated';
import Version from 'appkit/models/version';

export default Authenticated.extend({
  setupController: function(controller, model) {
    this._super(controller, model);  
    controller.set('sortBy', "creationTime");
    controller.set('sortOrder', 'DESC');

    if (this.controllerFor('refset').get('versionsPage.length') === 0){
      var _this = this;
      Version.getVersions(this.modelFor('refset').get('publicId'), "creationTime", "DESC", "", 0, 10, this).
        then(function(page){
          _this.controllerFor('refset').set('versionsPage', page);
        });
    }

    controller.set('alert', undefined);
  }
});
import Version from 'appkit/models/version';

export default Ember.Route.extend({
  setupController: function(controller, model) {
    this._super(controller, model);  
    controller.set('sortBy', "creationTime");
    controller.set('sortOrder', 'DESC');

    if (this.controllerFor('cache').get('versionsPage') === ''){
      var _this = this;
      Version.getVersions(this.modelFor('refset').get('publicId'), "creationTime", "DESC", "", 0, 10, this).
        then(function(page){
          _this.controllerFor('cache').set('versionsPage', page);
        });
    }

    controller.set('alert', undefined);
  }
});
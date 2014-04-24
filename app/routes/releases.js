import Authenticated from 'appkit/routes/authenticated';
import Tag from 'appkit/models/tag';

export default Authenticated.extend({
  setupController: function(controller, model){
    this._super(controller, model);
    controller.set('sortBy', "creationTime");
    controller.set('sortOrder', 'DESC');

    if (this.controllerFor('cache').get('releasesPage') === ''){
      var _this = this;
      Tag.getTags(this.modelFor('refset').get('publicId'), "creationTime", "DESC", "", 0, 10, this).
        then(function(page){
          _this.controllerFor('cache').set('releasesPage', page);
        });
    }

    controller.set('alert', undefined);
  }
});
import Authenticated from './authenticated';
import Tag from '../models/tag';

export default Authenticated.extend({
  setupController: function(controller, model){
    this._super(controller, model);
    controller.set('sortBy', "creationTime");
    controller.set('sortOrder', 'DESC');

    if (this.controllerFor('refset').get('releasesPage.length') === 0){
      var _this = this;
      Tag.getTags(this.modelFor('refset').get('publicId'), "creationTime", "DESC", "", 0, 10, this).
        then(function(page){
          _this.controllerFor('refset').set('releasesPage', page);
        });
    }

    controller.set('alert', undefined);
  }
});
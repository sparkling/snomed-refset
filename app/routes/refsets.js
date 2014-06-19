import Authenticated from '../routes/authenticated';
import Refset from '../models/refset';

export default Authenticated.extend({
  model: function() {
    return Refset.loadRefsets("title", "ASC", "", 0, 10);
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set('sortBy', "title");
    controller.set('sortOrder', 'ASC');
    controller.set('alert', undefined);
    }  
});
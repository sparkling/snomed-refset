import Authenticated from 'appkit/routes/authenticated';
import Refsets from 'appkit/models/refsets';

export default Authenticated.extend({
  model: function() {
    //alert('in model');
    return Refsets.loadRefsets("title", "ASC", "", 0, 10);
  },

  setupController: function (controller, model) {
    //alert('in setupController');
    this._super(controller, model);
    controller.set('sortBy', "title");
    controller.set('sortOrder', 'ASC');
    controller.set('alert', undefined);
    }  
});
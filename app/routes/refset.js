import Authenticated from './authenticated';
import Refset from '../models/refset';

export default Authenticated.extend({
  model: function(args) {
    Ember.Logger.log("Loading refset " + args.publicId + " from route model");
    return Refset.loadRefset(args.publicId, this);
  },

  setupController: function (controller, model) {
    this._super(controller, model);

    controller.set('membersPage', Ember.A());
    controller.set('versionsPage', Ember.A());
    controller.set('releasesPage', Ember.A());
  }
});
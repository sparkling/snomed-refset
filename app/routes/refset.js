import Refset from 'appkit/models/refset';

export default Ember.Route.extend({
  model: function(args) {
    Ember.Logger.log("Loading refset for " + args.publicId);
    return Refset.loadRefset(args.publicId, this);
  }
});
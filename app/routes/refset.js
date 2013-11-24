import Refset from 'appkit/models/refset';

export default Ember.Route.extend({
  model: function(args) {
    return Refset.loadRefset(args.publicId, this);
  }
});
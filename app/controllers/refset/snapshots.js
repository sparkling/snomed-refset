import Snapshot from 'appkit/models/snapshot';

export default Ember.ArrayController.extend({
  needs: "refset",
  refset: Ember.computed.alias("controllers.refset.model")
});


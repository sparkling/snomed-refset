import Snapshot from 'appkit/models/snapshot';

export default Ember.Route.extend({
  model: function(args) {
    Ember.Logger.log('In model hook for snapshot index route');
    return Snapshot.getSnapshot(this.modelFor('refset').get('publicId'), args.snapshotId, this);
  },
  serialize: function(model, params) {
    Ember.Logger.log('in serializer for snapshot index route');
    var refset = this.modelFor('refset');
    return { publicId: refset.get('publicId'), snapshotId: model.get('publicId') }; 
  }
});
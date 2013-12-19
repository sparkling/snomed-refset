import Snapshot from 'appkit/models/snapshot';

export default Ember.Route.extend({
  model: function() {
    Ember.Logger.log('Loading snapshots in router');
    var snapshots = this.get('model');
    Ember.Logger.log('Cached snapshots are: ' + JSON.stringify(snapshots));
    if (typeof snapshots !== 'undefined'){
      snapshots = Snapshot.getSnapshots(this.modelFor('refset'), this);
    }
    return snapshots;
  }
});
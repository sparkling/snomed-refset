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
  },
  setupController: function(controller, model) {
    Ember.Logger.log('In Snapshots setupController');

    Ember.Logger.log('Setting up Import Snapshot template');
    var created = Snapshot.create();
    created.set('fileType', 'USE_EXTENSION');
    
    controller.set('snapshot', created);
    controller.set('model', model);
  } 
});
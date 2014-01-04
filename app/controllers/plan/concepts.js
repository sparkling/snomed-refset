import Snapshot from 'appkit/models/snapshot';

export default Ember.ArrayController.extend({
  conceptsResponse: 'concepts-response-not-set',
  error: '',
  needs: ["refset", "snapshots"],
  refset: Ember.computed.alias("controllers.refset.model"),

  actions: {
    snapit: function(){
      Ember.Logger.log('handling event snapit. Snapshot is ' + JSON.stringify(this.get('snapshot')));
      return this.set('error', Snapshot.snapit(this.get('snapshot'), this.get('refset'), this));
    }
  }

});


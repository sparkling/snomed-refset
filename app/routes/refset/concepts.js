import Refset from 'appkit/models/refset';
import Snapshot from 'appkit/models/snapshot';

export default Ember.Route.extend({
  model: function() {
    Ember.Logger.log('Loading concepts in router');
    var concepts = this.get('model');
    Ember.Logger.log('Cached concepts are: ' + JSON.stringify(concepts));
    if (typeof concepts !== 'undefined'){
      concepts = Refset.getConcepts(this.modelFor('refset'), this);
    }
    return concepts;
  },
  setupController: function(controller, model) {
    Ember.Logger.log('In Concept setupController');
    controller.set('model', model);
    controller.set('snapshot', Snapshot.create());
  }
});
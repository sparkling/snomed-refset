import Concept from 'appkit/models/concept';
import Refset from 'appkit/models/refset';

export default Ember.Route.extend({
  model: function() {
    var r = Refset.create();
    //var c1 = Concept.create();
    r.set('source', 'LIST');
    r.set('type', 'CONCEPT');
    //r.set('refsetConcept', c1);
    return r;
  }
});


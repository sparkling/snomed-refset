import Concept from 'appkit/models/concept';
import Refset from 'appkit/models/refset';

export default Ember.Route.extend({
  model: function() {
    var r = Refset.create();
    r.set('source', 'LIST');
    r.set('type', 'CONCEPT');
    r.set('snomedReleaseDate', '20130731');
    r.set('snomedExtension', 'INTERNATIONAL');
    return r;
  }
});


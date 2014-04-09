import Refset from 'appkit/models/refset';

export default Ember.Route.extend({
  model: function() {
    var r = Refset.create();
    r.set('source', 'LIST');
    r.set('type', 'CONCEPT');
    r.set('snomedReleaseDate', '2014-01-31');
    r.set('snomedExtension', 'INTERNATIONAL');
    return r;
  }
});


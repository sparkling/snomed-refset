import Refset from '../models/refset';  
import Authenticated from '../routes/authenticated';

export default Authenticated.extend({
  model: function() {
    var r = Refset.create();
    r.set('source', 'LIST');
    r.set('type', 'CONCEPT');
    r.set('snomedReleaseDate', '2014-01-31');
    r.set('snomedExtension', 'INTERNATIONAL');
    return r;
  }
});


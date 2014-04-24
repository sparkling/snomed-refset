import Authenticated from 'appkit/routes/authenticated';
import Refset from 'appkit/models/refset';

export default Authenticated.extend({
  model: function(args) {
    Ember.Logger.log("Loading refset " + args.publicId + " from route model");
    return Refset.loadRefset(args.publicId, this);
  },

  afterModel: function(){
    //this.controllerFor('cache').set('members', Ember.A());
    //this.controllerFor('cache').set('versions', Ember.A());
    //this.controllerFor('cache').set('releases', Ember.A());    
  }
});
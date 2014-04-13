import Refset from 'appkit/models/refset';

export default Ember.Route.extend({
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
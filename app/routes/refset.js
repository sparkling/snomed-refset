import Refset from 'appkit/models/refset';

export default Ember.Route.extend({
  model: function(args) {
    this.controllerFor('cache').set('members', Ember.A());
    this.controllerFor('cache').set('versions', Ember.A());
    this.controllerFor('cache').set('releases', Ember.A());
    return Refset.loadRefset(args.publicId, this);
  }
});
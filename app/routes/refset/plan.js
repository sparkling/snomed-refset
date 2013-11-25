import Refset from 'appkit/models/refset';

export default Ember.Route.extend({
  model: function() {
    Ember.Logger.log('Loading plan in router');
    return Refset.getPlan(this.modelFor('refset'), this);
  },
  renderTemplate: function(){
    this.render({outlet:'details'});
  }  
});
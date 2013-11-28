import Refset from 'appkit/models/refset';

export default Ember.Route.extend({
  model: function() {
    Ember.Logger.log('Loading snapshots in router');
    var plan = this.get('model');
    Ember.Logger.log('Cached snapshots are: ' + JSON.stringify(plan));
    if (typeof plan !== 'undefined'){
      plan = Refset.getPlan(this.modelFor('refset'), this);
    }
    return plan;
  },
//  renderTemplate: function(){
//    this.render({outlet:'details'});
//  }  
});
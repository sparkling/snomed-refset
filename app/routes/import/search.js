import Member from 'appkit/models/member';

export default Ember.Route.extend({

  model: function(){
    return Ember.A();
  },

  afterModel: function(model){
    model.clear();
  }
});
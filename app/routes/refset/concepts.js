import Refset from 'appkit/models/refset';

export default Ember.Route.extend({
  model: function() {
    Ember.Logger.log('Loading concepts in router');
    return Refset.getConcepts(this.modelFor('refset'), this);
  },
  renderTemplate: function(){
    this.render({outlet:'details'});
  }
});
import Refset from 'appkit/models/refset';

export default Ember.Route.extend({
  model: function() {
    Ember.Logger.log('Loading concepts in router');
    var concepts = this.get('model');
    Ember.Logger.log('Cached concepts are: ' + JSON.stringify(concepts));
    if (typeof concepts !== 'undefined'){
      concepts = Refset.getConcepts(this.modelFor('refset'), this);
    }
    return concepts;
  },
//  renderTemplate: function(){
//    this.render({outlet:'details'});
//  }
});
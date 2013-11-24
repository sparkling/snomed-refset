import Refsets from 'appkit/models/refsets';

export default Ember.ObjectController.extend({
  error: 'none',
  needs: 'refsets',
  findConceptModalId: 'find-concept-modal',
  hashedFindConceptModalId: function(){
    return '#' + this.get('findConceptModalId');
  }.property('findConceptModalId'),
  showFindConceptButton: true,
  conceptEmpty: function(){
    Ember.Logger.log('conceptEmpty concept: ' + JSON.stringify(this.get('concept')));
    return (this.get('concept') === undefined);
  }.property('concept'),
  actions: {
    save: function() {
      Ember.Logger.log('handling save');
      Ember.Logger.log('model: ' + this.get('model'));
      return this.set('error', Refsets.createRefset(this.get('model'), this));
    },
    selected: function(concept){
      Ember.Logger.log('Found selected: ' + concept.title);
      this.set('concept', concept.id);
      this.set('conceptDisplayName', concept.title);
      this.set('showFindConceptButton', false);
    }
  }
});

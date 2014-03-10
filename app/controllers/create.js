import Refsets from 'appkit/models/refsets';
import Concept from 'appkit/models/concept';

export default Ember.ObjectController.extend({
  error: 'none',
  needs: 'refsets',

  findConceptModalId: 'find-concept-modal',

  selectType: [
    { label: "Concept",     key: "CONCEPT" },
    { label: "Description", key: "DESCRIPTION" },
    { label: "Statement",   key: "STATEMENT" }
  ],
  selectSource: [
    { label: "List",  key: "LIST" },
    { label: "Rules", key: "RULES" }
  ],

  hashedFindConceptModalId: function(){
    return '#' + this.get('findConceptModalId');
  }.property('findConceptModalId'),
  showFindConceptButton: true,
  
  conceptEmpty: function(){
    Ember.Logger.log('conceptEmpty concept: ' + JSON.stringify(this.get('concept')));
    return (this.get('concept') === undefined);
  }.property('concept'),
  
  actions: {
    changeRefsetConcept: function(event){
      if (event.removed){
        this.set('model.refsetConcept', '');
      }
      else{
        var c = Concept.create();
        c.set('id', event.added.id);
        this.set('model.refsetConcept', c);
      }    
    },
    changeModuleConcept: function(event){
      if (event.removed){
        this.set('model.moduleConcept', '');
      }
      else{
        var c = Concept.create();
        c.set('id', event.added.id);
        this.set('model.moduleConcept', c);
      }    
    },    
    save: function() {
      Ember.Logger.log('handling save');
      Ember.Logger.log('model: ' + this.get('model'));
      return this.set('error', Refsets.createRefset(this.get('model'), this));
    }
    //selected: function(concept){
    //  Ember.Logger.log('Found selected: ' + concept.title);
    //  this.set('concept', concept.id);
    //  this.set('conceptDisplayName', concept.title);
    //  this.set('showFindConceptButton', false);
    //}
  }
});

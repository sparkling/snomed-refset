import Refset from '../models/refset';
import Concept from '../models/concept';

export default Ember.ObjectController.extend({
  error: 'none',
  needs: ['refsets'],

  findConceptModalId: 'find-concept-modal',

  moduleSelectId: 'moduleSelectId',
  refsetConceptSelectId: 'refsetSelectId',

  onTitleChange: function(){
    this.set('model.publicId', window.getSlug(this.get('model.title'), {truncate:50}));
  }.observes('model.title'),

  selectType: [
    { label: "Concept (more coming)",     key: "CONCEPT" },
    { label: "Description", key: "DESCRIPTION" },
    { label: "Statement",   key: "STATEMENT" }
  ],
  selectSource: [
    { label: "List (coming: rules)",  key: "LIST" },
    { label: "Rules", key: "RULES" }
  ],
  selectExtension: [
    { label: "International (Core)",  key: "INTERNATIONAL" },
    { label: "United Kingdom (coming)", key: "UK" },
    { label: "Denmark (coming)", key: "DK" }
  ],
  selectReleaseDate: [
    { label: "January 31st, 2014", key: "2014-01-31"},
    { label: "July 31st, 2013",  key: "2013-07-31" }
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
      Ember.Logger.log('Creating refset');
      var _this = this;
      Refset.createRefset(this.get('model')).
        then(function(success){
          _this.transitionToRoute('members', _this.get('model'));
        }, 
        function(error){
          _this.set('error', error);
        });
    }
  }
});

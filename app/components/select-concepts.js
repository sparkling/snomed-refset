export default Em.Component.extend({
  modalid: 'select-concepts-modalid-not-set', 
  isSearching: false,
  actions: {
    showconcepts: function(){
      Ember.Logger.log('Handling event showconcepts');
      this.set('isSearching', false);
    },
    showsearch: function(){
      Ember.Logger.log('Handling event showsearch');
      this.set('isSearching', true);
    },
    removeconcept: function(concept){
      Ember.Logger.log('Handling event removeconcept');
      var concepts = this.get('model.concepts');
      Ember.Logger.log('Removing concept: ' + JSON.stringify(concept));
      var found = concepts.findBy('id', concept.get('id'));
      concepts.removeObject(found);
      Ember.Logger.log('Popped');
    },
    selected: function(concept){
      console.log('handling concept selected event with concept ' + JSON.stringify(concept));
      var found = this.get('model.concepts').findBy('id', concept.get('id'));
      console.log('Found concept ' + found);
      var concepts = this.get('model.concepts');
      if (found === undefined){
        concepts.pushObject(concept);
        this.set('isSearching', false);
      }else{
        console.log('can not add concept that already exists in selection');
      }
      return false;
    }    
  }

});

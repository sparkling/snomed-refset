export default Ember.ObjectController.extend({

  importPendingAlert: null,

  sourceString: function(){
    if (this.get('source') === 'LIST'){
      return 'List of Concepts';
    }
    return 'Concept Rules';
  }.property('model.source'),

  actions:{
    cancelImportSuccessModal: function(){
      $('#importSuccessModal').foundation('reveal', 'close'); 
    },
  }

});
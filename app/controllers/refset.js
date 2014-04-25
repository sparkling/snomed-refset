export default Ember.ObjectController.extend({

  importPendingAlert: null,
  membersPage:  '',
  versionsPage: '',
  releasesPage: '',

  sourceString: function(){
    if (this.get('source') === 'LIST'){
      return 'List of Concepts';
    }
    return 'Concept Rules';
  }.property('model.source'),

});
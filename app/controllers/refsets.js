import Refsets from 'appkit/models/refsets';

export default Ember.ArrayController.extend({
  deleteResponse: '',
  deleteCandidate: '',
  deleteModalId: "confirm-delete-refset",
  deleteMessage: function(){
    return "Are you sure you want to delete refset \"" + this.get('deleteCandidate').title + "\" ?";
  }.property('deleteCandidate'),
  actions: {
    deleteRefset: function(refset){
      Ember.Logger.log('Prompting to delete refset ' + JSON.stringify(refset));
      this.set('deleteCandidate', refset);
      Ember.Logger.log('Showing modal ' + this.get('deleteModalId'));
      $('#' + this.get('deleteModalId')).modal('show');
    },
    confirmDelete: function(refset){
      Ember.Logger.log('Confirmed delete of refset ' + JSON.stringify(refset));
      //this.get('model').removeObject(refset);
      this.set('deleteResponse', Refsets.deleteRefset(refset, this));
    }
  }
});


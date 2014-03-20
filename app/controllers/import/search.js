import Member from 'appkit/models/member';
import Alert from 'appkit/models/alert';

export default Ember.ArrayController.extend({
  error: '',
  alert: '',
  needs: ['refset','members'],

  actions: { 
    addConcept: function(event){
      if (event.added){
        var m = Member.create();
        m.set('component', event.added.id);
        m.set('title', event.added.title);
        m.set('effective', window.moment().format("YYYYMMDD"));
        this.get('model').pushObject(m);
      }
    },
    import: function(){
      Ember.Logger.log('Adding more members');
      var alert = Alert.create();
      this.get('controllers.members').set('alert', alert);
      alert.set('showUndo', false);
      
      //ON SUCCESS
      var onSuccess = function(members, memberModel, success, alert){
        alert.set('isError', false);
        alert.set('message', 'Successfully added new members');
        this.transitionToRoute('members');
      };

      //ON ERROR
      var onError = function(members, error, alert){
        alert.set('isError', true);
        alert.set('message', 'Unable to add new members. Message was: ' + error.responseText);
      };

      Member.addMembers(this.get('controllers.refset.model.publicId'), 
        this.get('model'), '', alert, onSuccess, onError);
    }  
  }
});
import Alert from 'appkit/models/alert';
import Member from 'appkit/models/member';


export default Ember.ArrayController.extend({
  deleteResponse: '',
  needs: 'refset',
  alert: '',

  hasAlert: function(){
    return this.get('alert') !== '';
  }.property('alert'),

  isError: function(){
    Ember.Logger.log('isError: ' + (this.get('alert.isError') === true))
    return this.get('alert.isError') === true;
  }.property('alert.isError'),

  isSuccess: function(){
    Ember.Logger.log('isSuccess: ' + (this.get('alert.isError') === false))
    return this.get('alert.isError') === false;
  }.property('alert.isError'),  

  showComponent: true,
  showIdentifier: false,
  showInactive: true,
  showEffective: true,
  showModule: true,

  actions: {
    resetAlert: function(){
      this.set('alert', '');
    },
    undo: function(){
      this.get('alert.undofunction') (this.get('alert.arguments'), this.get('alert'));
    },

    delete: function(member){
      Ember.Logger.log("Delete: member " + JSON.stringify(member));
      var alert = Alert.create();
      this.set('alert', alert);

      //BUILD ARGUMENTS FOR UNDO FUNCTION
      var undoArgs = Ember.A();
      undoArgs.pushObject(this.get('controllers.refset.model.publicId'));
      undoArgs.pushObject(member);
      undoArgs.pushObject(this.get('model'));
      alert.set('arguments', undoArgs);

      //CREATE UNDO FUNCTION
      alert.set('undofunction', function(undoArgs, undoAlert){
        Ember.Logger.log('UNDO: Adding back: ' + JSON.stringify(undoArgs.objectAt(1)));
        
        //UNDO: SUCCESS
        var onSuccess = function(members, memberModel, success, undoAlert){
          Ember.Logger.log('Undo: success');
          memberModel.pushObject(members[0]);
          undoAlert.set('isError', false);
          undoAlert.set('showUndo', false);
          undoAlert.set('message', 'Added back member ' + members[0].get('publicId'));
        };
        
        //UNDO: ERROR
        var onError = function(members, error, undoAlert){
          Ember.Logger.log('Undo: error');
          undoAlert.set('isError', true);
          undoAlert.set('message', 'Unable to add back member ' + 
            member.get('publicId') + '. Message was: ' + error.responseText);
        };

        //UNDO: DO IT
        Ember.Logger.log('Undo: Adding member back in');
        Member.addMembers(
          undoArgs.objectAt(0), [undoArgs.objectAt(1)], undoArgs.objectAt(2), undoAlert, onSuccess, onError);
      });

      //ON SUCCESS
      var onSuccess = function(member, memberModel, success, alert){
        Ember.Logger.log('Delete: success');
        alert.set('isError', false);
        memberModel.removeObject(member);
        alert.set('message', 'Removed member ' + member.get('publicId'));
      };

      //ON ERROR
      var onError = function(member, error, alert){
        Ember.Logger.log('Delete: error');
        alert.set('isError', true);
        alert.set('message', 'Unable to delete member ' + member.get('publicId') + '. Message was: ' + error.responseText);
      };

      //DO IT
      Member.delete(this.get('controllers.refset.model.publicId'), 
        member, this.get('model'), alert, onSuccess, onError);
    }
  }
});
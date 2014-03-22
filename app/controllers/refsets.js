import Refset from 'appkit/models/refset';
import Alert from 'appkit/models/alert';

export default Ember.ArrayController.extend({
  alert: '',

  actions: {
    delete: function(refset){
      Ember.Logger.log("Delete: refset " + JSON.stringify(refset));
      var alert = Alert.create();
      this.set('alert', alert);

      //BUILD ARGUMENTS FOR UNDO FUNCTION
      var undoArgs = Ember.A();
      undoArgs.pushObject(refset);
      undoArgs.pushObject(this.get('model'));
      alert.set('arguments', undoArgs);

      //CREATE UNDO FUNCTION
      alert.set('undofunction', function(undoArgs, undoAlert){
        var deletedRefset = undoArgs.objectAt(0);
        var targetModel   = undoArgs.objectAt(1);

        Ember.Logger.log('UNDO: Adding back: ' + deletedRefset.get('publicId'));
        
        //UNDO: SUCCESS
        var onSuccess = function(refset, targetModel, success, undoAlert, _this){
          Ember.Logger.log('Undo: success');
          targetModel.pushObject(refset);
          undoAlert.set('isError', false);
          undoAlert.set('showUndo', false);
          undoAlert.set('message', "Added back refset '" + refset.get('publicId') + "'");
        };
        
        //UNDO: ERROR
        var onError = function(refset, error, undoAlert, _this){
          Ember.Logger.log('Undo: error');
          undoAlert.set('isError', true);
          undoAlert.set('message', 'Unable to add back refset ' + refset.get('publicId') + '. Message was: ' + error.responseText);
        };

        //UNDO: DO IT
        Ember.Logger.log('Undo: Adding refset back in');
        Refset.resurect(deletedRefset, targetModel, undoAlert, onSuccess, onError, this);
      });

      //ON SUCCESS
      var onSuccess = function(refset, targetModel, success, alert, _this){
        Ember.Logger.log('Delete: success');
        alert.set('isError', false);
        targetModel.removeObject(refset);
        alert.set('message', "Removed refset '" + refset.get('publicId') + "'");
      };

      //ON ERROR
      var onError = function(refset, error, alert, _this){
        Ember.Logger.log('Delete: error');
        alert.set('isError', true);
        alert.set('message', 'Unable to delete refset ' + refset.get('publicId') + '. Message was: ' + error.responseText);
      };

      //DO IT
      Refset.delete(refset, this.get('model'), alert, onSuccess, onError, this);
    }
  }
});


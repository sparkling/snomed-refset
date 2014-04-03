import Tag from 'appkit/models/tag';
import Alert from 'appkit/models/alert';
import toEmberObject from 'appkit/utils/to_ember_object';


export default Ember.ArrayController.extend({
  needs: 'refset',
  alert: '',
  refsetName: Ember.computed.alias('controllers.refset.model.publicId'),

  actions:{
    delete: function(release){
      Ember.Logger.log("Deleting release id " + release.publicId);
      var alert = Alert.create();
      this.set('alert', alert);

      //BUILD ARGUMENTS FOR UNDO FUNCTION
      var undoArgs = Ember.A();
      undoArgs.pushObject(this.get('refsetName'));
      undoArgs.pushObject(release);
      undoArgs.pushObject(this);
      alert.set('arguments', undoArgs);

      //CREATE UNDO FUNCTION
      alert.set('undofunction', function(undoArgs, undoAlert){
        var refsetName     = undoArgs.objectAt(0);
        var deletedRelease = undoArgs.objectAt(1);
        var _this          = undoArgs.objectAt(2);

        Ember.Logger.log('UNDO: Adding back: ' + deletedRelease.get('publicId'));

        //UNDO: SUCCESS
        var onSuccess = function(release, success, undoAlert, _this){
          Ember.Logger.log('Undo: success');
          undoAlert.set('isError', false);
          undoAlert.set('showUndo', false);
          undoAlert.set('message', "Added back release with id '" + release.get('publicId') + "'");
          _this.set('model', Tag.getTags(_this.get('refsetName'), "title", "ASC", _this));
        };
        
        //UNDO: ERROR
        var onError = function(release, error, undoAlert, _this){
          Ember.Logger.log('Undo: error');
          undoAlert.set('isError', true);
          undoAlert.set('message', 'Unable to add back release ' + release.get('publicId') + '. Message was: ' + error.responseText);
        };

        //UNDO: DO IT
        Ember.Logger.log('Undo: Adding release back in');
        Tag.createTag(_this.get('refsetName'), deletedRelease, alert, onSuccess, onError, _this);
      });

      //ON SUCCESS
      var onSuccess = function(release, success, alert, _this){
        Ember.Logger.log('Delete: success');
        alert.set('isError', false);
        _this.set('model', Tag.getTags(_this.get('refsetName'), "title", "ASC", _this));
        alert.set('message', "Removed release with name '" + release.get('title') + "'");
      };

      //ON ERROR
      var onError = function(release, error, alert, _this){
        Ember.Logger.log('Delete: error');
        alert.set('isError', true);
        alert.set('message', "Unable to delete release with name '" + release.get('title') + "'. Message was: " + error.responseText);
      };

      //DO IT
      Tag.deleteTag(this.get('refsetName'), release, alert, onSuccess, onError, this);
    },


  }
});
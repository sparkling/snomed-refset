import Tag from 'appkit/models/tag';
import Version from 'appkit/models/version';
import Alert from 'appkit/models/alert';
import toEmberObject from 'appkit/utils/to_ember_object';


export default Ember.ArrayController.extend({
  needs: 'refset',
  release: '',
  alert: '',
  error: '',
  refsetName: Ember.computed.alias('controllers.refset.model.publicId'),

  actions: {
    
    createReleaseSetVersionPublicId: function(version){
      this.set('release.refsetPublicId', this.get('refsetName'));
      this.set('release.snapshot', version);
    },

    cancelReleaseModal: function(){
      this.set('release', Tag.create());
      $('#createRelease').foundation('reveal', 'close'); 
    },    

    createRelease: function(){
      Ember.Logger.log('Creating tag for ' + this.get('release.snapshot.publicId'));
      var alert = Alert.create();

      //ON SUCCESS
      var onSuccess = function(tag, successResponse, alert, _this){
        _this.set('alert', alert);
        alert.set('showUndo', false);
        alert.set('isError', false);
        alert.set('message', 'Successfully created new tag');
        _this.set('release', Tag.create());
        $('#createRelease').foundation('reveal', 'close');
      };

      //ON ERROR
      var onError = function(tag, errorResponse, alert, _this){
        _this.set('error', toEmberObject(JSON.parse(errorResponse.responseText)));
        //alert.set('isError', true);
        //alert.set('message', 'Unable to create new version. Message was: ' + errorResponse.responseText);
      };

      Tag.createTag(this.get('refsetName'), this.get('release'), alert, onSuccess, onError, this);
      
    },    
  }
});
import Tag from 'appkit/models/tag';
import Version from 'appkit/models/version';
import Alert from 'appkit/models/alert';
import toEmberObject from 'appkit/utils/to_ember_object';


export default Ember.ArrayController.extend({
  needs: ['refset', 'cache'],
  
  release:    undefined,
  alert:      undefined,
  error:      undefined,
  
  refset:     Ember.computed.alias('controllers.refset.model'),
  refsetName: Ember.computed.alias('controllers.refset.model.publicId'),

  actions: {
    
    createReleaseSetVersionPublicId: function(version){
      var release = Tag.create();
      release.set('refsetPublicId', this.get('refsetName'));
      release.set('snapshot', version);
      this.set('error', undefined);
      this.set('release', release);
    },

    cancelReleaseModal: function(){
      $('#createRelease').foundation('reveal', 'close'); 
    },    

    createRelease: function(){
      Ember.Logger.log('Creating release for ' + this.get('release.snapshot.publicId'));
      var alert = Alert.create();

      //ON SUCCESS
      var onSuccess = function(tag, successResponse, alert, _this){
        _this.set('alert', alert);
        alert.set('showUndo', false);
        alert.set('isError', false);

        //Goto
        alert.set('showGoto', true);
        alert.set('gotoTitle', "Go to '" + tag.get('publicId') + "'");
        alert.set('isDynamicGotoRoute', true);
        alert.set('gotoDynamicParam', tag.get('publicId'));
        alert.set('gotoTransition', 'release');

        alert.set('message', "Successfully created new release for version '" + _this.get('release.snapshot.title') + "'");
        $('#createRelease').foundation('reveal', 'close');
      };
      //ON ERROR
      var onError = function(tag, errorResponse, alert, _this){
        _this.set('error', toEmberObject(JSON.parse(errorResponse.responseText)));
      };
      Tag.createTag(this.get('refsetName'), this.get('release'), alert, onSuccess, onError, this);

      setTimeout(function(){
          Em.$(document).foundation();
      }, 250);
    }
  }
});
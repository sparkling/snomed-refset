import toEmberObject from 'appkit/utils/to_ember_object';
import Member from 'appkit/models/member';
import Alert from 'appkit/models/alert';

export default Ember.Controller.extend({
  needs: ['refset','members', 'cache'],

  error: undefined,
  alert: undefined,
  
  fileTypes: [
    {label:"Use File Extension", id:"USE_EXTENSION"},
    {label:".rf2",         id:"RF2"},
    {label:".json",        id:"JSON"},
    {label:".xml",         id:"XML"},
  ],    

  actions: { 
    import: function(){
      Ember.Logger.log('Importing file');
      var alert = Alert.create();
      alert.set('showUndo', false);
      alert.set('onceSticky', true);
      
      //ON SUCCESS
      var onSuccess = function(successResponse, alert, _this){
        Ember.Logger.log('Import success');
        alert.set('isError', false);
        alert.set('message', "Successfully imported members from file");
        _this.set('controllers.refset.model.pendingChanges', true);
        _this.set('controllers.members.alert', alert);
        _this.set('controllers.cache.members', Ember.A());
        _this.transitionToRoute('members');
      };

      //ON ERROR
      var onError = function(errorResponse, alert, _this){
        Ember.Logger.log('Import error');
        _this.set('error', toEmberObject(JSON.parse(errorResponse.responseText)));
      };

      Member.import(
        this.get('controllers.refset.model.publicId'), 
          document.getElementById('import-file-form'), this.get('model.fileType'), alert, onSuccess, onError, this);
    } 
  }
});
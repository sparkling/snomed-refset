import Member from 'appkit/models/member';
import Alert from 'appkit/models/alert';

export default Ember.Controller.extend({
  error: '',
  alert: '',
  needs: ['refset','members'],

  fileTypes: [
    {label:"Use File Extension", id:"USE_EXTENSION"},
    {label:".rf2",         id:"RF2"},
    {label:".json",        id:"JSON"},
    {label:".xml",         id:"XML"},
  ],    

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
      Ember.Logger.log('Importing file');
      var alert = Alert.create();
      
      alert.set('showUndo', false);
      
      //ON SUCCESS
      var onSuccess = function(successResponse, alert, _this){
        alert.set('isError', false);
        alert.set('message', "Successfully imported members from file");
        _this.set('controllers.refset.model.pendingChanges', true);
        _this.get('controllers.members').set('alert', alert);
        _this.transitionToRoute('members');
      };

      //ON ERROR
      var onError = function(errorResponse, alert, _this){
        alert.set('isError', true);
        alert.set('message', 'Unable to import members from file. Message was: ' + errorResponse.responseText);
        _this.get('controllers.import.file').set('alert', alert);
      };

      Member.import(
        this.get('controllers.refset.model.publicId'), 
        document.getElementById('import-file-form'),
        this.get('model.fileType'),
        alert, onSuccess, onError, this);
    } 
  }
});
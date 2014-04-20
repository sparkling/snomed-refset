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
      alert.set('isError', false);
      alert.set('onceSticky', true);
      alert.set('message', "Your import is pending, we will notify you when this is complete");
      
      this.set('controllers.members.alert', alert);
      //this.set('controllers.refset.importPendingAlert', alert);

      var _this = this;
      Member.import(this.get('controllers.refset.model.publicId'), 
                    document.getElementById('import-file-form'), 
                    this.get('model.fileType')).
      then(
        function(){
          Ember.Logger.log('Import success');
          $('#importSuccessModal').foundation('reveal', 'open'); 
          _this.set('controllers.refset.model.pendingChanges', true);
          _this.set('controllers.members.alert', null);
          Member.getMembers(_this.get('controllers.refset.publicId'), "component.fullySpecifiedName", "ASC", "", 0, 10, _this).
            then(function(page){
              _this.get('controllers.cache').set('membersPage', page);
            });
        },
        function(error){
          Ember.Logger.log('Import error');
          alert.set('isError', false);
          var errorMessage = '';

          for (var i = 0; i < error.get('fieldErrors.length'); i++){
            errorMessage = errorMessage + error.get('fieldErrors')[i] + '\n';
          }
          for (var j = 0; j < error.get('globalErrors.length'); j++){
            errorMessage = errorMessage + error.get('globalErrors')[j] + '\n';
          }          
          alert.set('message', "Import failed. Error message was: " + errorMessage);    
        }
      );
      this.transitionToRoute('members');
    } 
  }
});
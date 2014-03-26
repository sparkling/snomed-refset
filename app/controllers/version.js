import Alert from 'appkit/models/alert';
import Member from 'appkit/models/member';
import baseUrl from 'appkit/utils/baseurl';

export default Ember.ObjectController.extend({
  needs: 'refset',
  alert: '',
  members: '',
  refsetName: Ember.computed.alias('controllers.refset.model.publicId'),
  refset: Ember.computed.alias('controllers.refset.model'),


  //DISPLAY FIELD SELECTIONS
  showComponent: true,
  showIdentifier: false,
  showInactive: true,
  showEffective: true,
  showModule: true,

  //DOWNLOAD LINKS
  downloadJsonUrl: function(){
    return baseUrl() + '/' + this.get('refsetName') + '/members/' + this.get('refsetName') + '.unversioned.json';
  }.property('refsetName'),

  downloadXmlUrl: function(){
    return baseUrl() + '/' + this.get('refsetName') + '/members/' + this.get('refsetName') + '.unversioned.xml';
  }.property('refsetName'),

  downloadRf2Url: function(){
    return baseUrl() + '/' + this.get('refsetName') + '/members/' + this.get('refsetName') + '.unversioned.rf2';
  }.property('refsetName'), 

  //ACTIONS
  actions: {
    delete: function(member){
      Ember.Logger.log("Delete: member " + JSON.stringify(member));
      var alert = Alert.create();
      this.set('alert', alert);

      //BUILD ARGUMENTS FOR UNDO FUNCTION
      var undoArgs = Ember.A();
      undoArgs.pushObject(this.get('refsetName'));
      undoArgs.pushObject(member);
      undoArgs.pushObject(this.get('model'));
      alert.set('arguments', undoArgs);

      //CREATE UNDO FUNCTION
      alert.set('undofunction', function(undoArgs, undoAlert){
        var refsetName    = undoArgs.objectAt(0);
        var deletedMember = undoArgs.objectAt(1);
        var targetModel   = undoArgs.objectAt(2);

        Ember.Logger.log('UNDO: Adding back: ' + deletedMember);

        //UNDO: SUCCESS
        var onSuccess = function(members, memberModel, success, undoAlert, _this){
          Ember.Logger.log('Undo: success');
          memberModel.pushObject(members[0]);
          undoAlert.set('isError', false);
          undoAlert.set('showUndo', false);
          undoAlert.set('message', 'Added back member ' + members[0].get('publicId'));
        };
        
        //UNDO: ERROR
        var onError = function(members, error, undoAlert, _this){
          Ember.Logger.log('Undo: error');
          undoAlert.set('isError', true);
          undoAlert.set('message', 'Unable to add back member ' + 
            member.get('publicId') + '. Message was: ' + error.responseText);
        };

        //UNDO: DO IT
        Ember.Logger.log('Undo: Adding member back in');
        Member.addMembers(refsetName, [deletedMember], targetModel, undoAlert, onSuccess, onError, this);
      });

      //ON SUCCESS
      var onSuccess = function(member, memberModel, success, alert, _this){
        Ember.Logger.log('Delete: success');
        alert.set('isError', false);
        memberModel.removeObject(member);
        _this.set('controllers.refset.model.pendingChanges', true);
        alert.set('message', 'Removed member ' + member.get('publicId'));
      };

      //ON ERROR
      var onError = function(member, error, alert, _this){
        Ember.Logger.log('Delete: error');
        alert.set('isError', true);
        alert.set('message', 'Unable to delete member ' + member.get('publicId') + '. Message was: ' + error.responseText);
      };

      //DO IT
      Member.delete(this.get('refsetName'), member, this.get('model'), alert, onSuccess, onError, this);
    }
  }
});
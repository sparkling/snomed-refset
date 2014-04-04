import toEmberObject from 'appkit/utils/to_ember_object';
import Alert from 'appkit/models/alert';
import Member from 'appkit/models/member';
import Version from 'appkit/models/version';
import baseUrl from 'appkit/utils/baseurl';

export default Ember.ArrayController.extend({
  needs: 'refset',
  
  version:          undefined,
  alert:            undefined,
  error:            undefined,
  memberSortyBy:    undefined, 
  memberSortOrder:  undefined,
  showDeleteMember: true,

  //ALIAS
  refset:     Ember.computed.alias('controllers.refset.model'),
  refsetName: Ember.computed.alias('controllers.refset.model.publicId'),

  //DISPLAY FIELD SELECTIONS
  showComponent:  true,
  showIdentifier: false,
  showInactive:   true,
  showEffective:  true,
  showModule:     true,

  hasPendingChanges: function(){
    return this.get('refset.pendingChanges');
  }.property('refset.pendingChanges'),

  //DOWNLOAD LINKS
  downloadPopupText: function(){
    return 'Download ' + this.get('memberSize') + ' members as ...';
  }.property('memberSize'),

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
    clearTooltipAndTransitionToImport: function(){
      $('.tooltip').hide();
      this.transitionToRoute('import.file');
    },

    cancelCommitModal: function(){
      $('#createVersionModal').foundation('reveal', 'close'); 
    },

    showCommitModal: function(){
      this.set('version', Version.create());
      this.set('error', undefined);
      $('#createVersionModal').foundation('reveal', 'open'); 
    },

    sortMembers: function(sortBy, sortOrder){
      Ember.Logger.log('Sorting by ' + sortBy + ' ' + sortOrder);
      this.set('sortBy', sortBy);
      this.set('sortOrder', sortOrder);
      this.set('model', Member.getMembers(this.get('refsetName'), sortBy, sortOrder, this));
    },    

    createVersion: function(){
      Ember.Logger.log('Creating version');
      var alert = Alert.create();

      //ON SUCCESS
      var onSuccess = function(version, successResponse, alert, _this){
        Ember.Logger.log('Create version success');
        alert.set('showUndo', false);
        alert.set('isError', false);
        alert.set('message', 'Successfully created new version');
        _this.set('refset.pendingChanges', false);
        _this.set('alert', alert);
        $('#createVersionModal').foundation('reveal', 'close');
      };

      //ON ERROR
      var onError = function(version, errorResponse, alert, _this){
        Ember.Logger.log('Create version fail');
        _this.set('error', toEmberObject(JSON.parse(errorResponse.responseText)));
      };

      Version.createVersion(this.get('refsetName'), this.get('version'), alert, onSuccess, onError, this);
    },

    delete: function(member){
      Ember.Logger.log("Delete member");
      var alert = Alert.create();
      this.set('alert', alert);

      //BUILD ARGUMENTS FOR UNDO FUNCTION
      var undoArgs = Ember.A();
      undoArgs.pushObject(this.get('refsetName'));
      undoArgs.pushObject(member);
      undoArgs.pushObject(this);
      alert.set('arguments', undoArgs);

      //CREATE UNDO FUNCTION
      alert.set('undofunction', function(undoArgs, undoAlert){
        var refsetName    = undoArgs.objectAt(0);
        var deletedMember = undoArgs.objectAt(1);
        var _thisArg      = undoArgs.objectAt(2);

        Ember.Logger.log('UNDO: Adding back: ' + deletedMember.get('publicId'));

        //UNDO: SUCCESS
        var onSuccess = function(members, success, undoAlert, _this){
          Ember.Logger.log('Undo: success');
          undoAlert.set('isError', false);
          undoAlert.set('showUndo', false);
          undoAlert.set('message', "Added back member with component '" + members[0].get('component.title') + "'");
          //'target' points to the route; refresh refires beforeModel, model, and afterModel
          //this.get('target').refresh();
          _this.set('model', Member.getMembers(_this.get('refsetName'), _this.get('sortBy'), _this.get('sortOrder')));
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
        Member.addMembers(refsetName, [deletedMember], undoAlert, onSuccess, onError, _thisArg);
      });

      //ON SUCCESS
      var onSuccess = function(member, success, alert, _this){
        Ember.Logger.log('Delete: success');
        alert.set('isError', false);
        _this.set('refset.pendingChanges', true);
        alert.set('message', "Removed member with component '" + member.get('component.title') + "'");
        _this.set('model', Member.getMembers(_this.get('refsetName'), _this.get('sortBy'), _this.get('sortOrder')));
      };

      //ON ERROR
      var onError = function(member, error, alert, _this){
        Ember.Logger.log('Delete: error');
        alert.set('isError', true);
        alert.set('message', 'Unable to delete member ' + member.get('publicId') + '. Message was: ' + error.responseText);
      };

      //DO IT
      Member.delete(this.get('refsetName'), member, alert, onSuccess, onError, this);
    }
  }
    //showModal: function(){
    //  $('#commitModal').data('reveal-init', {
    //      animation: 'fadeAndPop',
    //      animation_speed: 250,
    //      close_on_background_click: false,
    //      close_on_esc: false,
    //      dismiss_modal_class: 'close-reveal-modal',
    //      bg_class: 'reveal-modal-bg',
    //      bg : $('.reveal-modal-bg'),
    //      css : {
    //          open : {
    //              'opacity': 0,
    //              'visibility': 'visible',
    //              'display' : 'block'
    //          },
    //          close : {
    //              'opacity': 1,
    //              'visibility': 'hidden',
    //              'display': 'none'
    //          }
    //      }
    //  });
    //  $('#commitModal').foundation('reveal', 'open');
    //},
});
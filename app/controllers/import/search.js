import Member from 'appkit/models/member';
import Alert from 'appkit/models/alert';

export default Ember.ArrayController.extend({
  error: '',
  alert: '',
  needs: ['refset','members', 'cache'],

  refset:     Ember.computed.alias('controllers.refset.model'),

  hasContent: function(){
    //Ember.Logger.log('model is size ' + this.get('model').length);
    return this.get('model').length !== 0;
  }.property('model.@each'),


  actions: { 
    delete: function(component){
      this.get('model').removeObject(component);
    },

    addConcept: function(event){
      if (event.added){
        var m = Member.create();
        m.set('component', event.added.id);
        m.set('title', event.added.title);
        m.set('effective', window.moment().format("YYYYMMDD"));
        this.get('model').pushObject(m);
        $('.concept-select2').select2('data', null);
      }
    },
    import: function(){
      Ember.Logger.log('Adding more members');
      var alert = Alert.create();
      this.set('controllers.members.alert', alert);
      alert.set('showUndo', false);
      alert.set('onceSticky', true);
      
      //ON SUCCESS
      var onSuccess = function(members, successResponse, alert, _this){
        Ember.Logger.log('Import success');
        alert.set('isError', false);
        alert.set('message', 'Successfully added new members');
        _this.set('controllers.refset.model.pendingChanges', true);
        _this.set('controllers.members.alert', alert);
        _this.set('controllers.cache.members', Ember.A());
        _this.transitionToRoute('members');
      };

      //ON ERROR
      var onError = function(members, errorResponse, alert, _this){
        Ember.Logger.log('Import error');
        alert.set('isError', true);
        alert.set('message', 'Unable to add new members. Message was: ' + errorResponse.responseText);
        _this.set('alert', alert);
      };

      Member.addMembers(
        this.get('controllers.refset.model.publicId'), this.get('model'), alert, onSuccess, onError, this);
    }  
  }
});
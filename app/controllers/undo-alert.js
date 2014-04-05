export default Ember.ObjectController.extend({
  hasAlert: function(){
    return this.get('model');
  }.property('model'),

  gotoTitle: function(){
    return this.get('model.gotoTitle');
  }.property('model.gotoTitle'),

  isError: function(){
    //Ember.Logger.log('isError: ' + (this.get('alert.isError') === true));
    return this.get('alert.isError') === true;
  }.property('isError'),

  isSuccess: function(){
    //Ember.Logger.log('isSuccess: ' + (this.get('alert.isError') === false));
    return this.get('alert.isError') === false;
  }.property('isError'),  

  actions: {
    goto: function(){
      if (this.get('isDynamicGotoRoute')){
        this.transitionToRoute(this.get('gotoTransition'), this.get('gotoDynamicParam'));
      }else{
        this.transitionToRoute(this.get('gotoTransition'));
      }
      $('.tooltip').hide();
    },

    resetAlert: function(){
      this.set('model', '');
      $('.tooltip').hide();
    },
    undo: function(){
      this.get('undofunction') (this.get('arguments'), this.get('model'));
      $('.tooltip').hide();
    }
  }
});


export default Ember.ObjectController.extend({
  hasAlert: function(){
    return this.get('model');
  }.property('model'),

  isError: function(){
    //Ember.Logger.log('isError: ' + (this.get('alert.isError') === true));
    return this.get('alert.isError') === true;
  }.property('isError'),

  isSuccess: function(){
    //Ember.Logger.log('isSuccess: ' + (this.get('alert.isError') === false));
    return this.get('alert.isError') === false;
  }.property('isError'),  

  actions: {
    resetAlert: function(){
      this.set('model', '');
    },
    undo: function(){
      this.get('undofunction') (this.get('arguments'), this.get('model'));
    }
  }
});


export default Ember.View.extend({

  didInsertElement: function() {
    Ember.run.scheduleOnce('afterRender', this, 'initFoundation');
  },

  initFoundation: function() {
    Ember.Logger.log('init foundation');
    setTimeout(function(){
        Em.$(document).foundation();
    }, 250);   
  }

});
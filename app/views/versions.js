export default Ember.View.extend({

  didInsertElement: function() {
    Ember.run.scheduleOnce('afterRender', this, 'processChildElements');
  },

  processChildElements: function() {
    setTimeout(function(){
        Em.$(document).foundation();
    }, 250);
    
  }

});
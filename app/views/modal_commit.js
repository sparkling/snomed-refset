export default Ember.View.extend({
  templateName: 'modal/commit',

  didInsertElement: function() {
    Ember.run.scheduleOnce('afterRender', this, 'processChildElements');
  },

  processChildElements: function() {
    Em.$(document).foundation();
  }
  

});
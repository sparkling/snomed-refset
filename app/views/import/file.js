export default Ember.View.extend({
  didInsertElement: function() {
    Ember.run.scheduleOnce('afterRender', this, 'processChildElements');
  },

  processChildElements: function() {
    //easy dropdown
    this.$('select.dropdown').easyDropDown({});
    setTimeout(function(){
        Em.$(document).foundation();
    }, 250);
  }
});
export default Ember.View.extend({
  didInsertElement: function() {
    Ember.run.scheduleOnce('afterRender', this, 'processChildElements');
  },

  processChildElements: function() {
    this.$('select.dropdown').easyDropDown({});
  }
});
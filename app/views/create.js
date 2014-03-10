export default Ember.View.extend({
  didInsertElement: function() {
    Ember.run.scheduleOnce('afterRender', this, 'processChildElements');
  },

  processChildElements: function() {
    //easy dropdown
    this.$('select.dropdown').easyDropDown({});

    this.$('#snomed-release-select').select2({
      width: '100%'
    });
  }
});
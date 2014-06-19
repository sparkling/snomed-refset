import Foundation from './foundation';

export default Foundation.extend({
  didInsertElement: function() {
    Ember.run.scheduleOnce('afterRender', this, 'processChildElements');
  },

  processChildElements: function() {
    this.$('select.dropdown').easyDropDown({});

    this.$('#snomed-release-select').select2({
      width: '100%'
    });

    this.initFoundation();    
  }
});
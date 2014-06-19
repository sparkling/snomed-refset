import Foundation from '../foundation';

export default Foundation.extend({
  didInsertElement: function() {
    Ember.run.scheduleOnce('afterRender', this, 'processChildElements');
  },

  processChildElements: function() {
    this.$('select.dropdown').easyDropDown({});

    this.initFoundation();
  }
});
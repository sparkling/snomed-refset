export default Ember.View.extend({
  showMembership: function(membership){
    //return membership.get('active') || this.get('controller.showInactive');
    return true;
  }.property('controller.showInactive'),

  didInsertElement: function() {
    Ember.run.scheduleOnce('afterRender', this, 'processChildElements');
  },

  processChildElements: function() {
    Em.$(document).foundation();
  }

});
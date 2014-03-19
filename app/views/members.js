export default Ember.View.extend({
  showMembership: function(membership){
    //return membership.get('active') || this.get('controller.showInactive');
    return true;
  }.property('controller.showInactive')
});
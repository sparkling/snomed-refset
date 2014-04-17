export default Ember.ObjectController.extend({
  needs:            'refset',

  refsetName:       Ember.computed.alias('controllers.refset.model.publicId'),
  refset:           Ember.computed.alias('controllers.refset.model'),

  displayActive: function(){
    if (this.get('active')){
      return 'Yes';
    }
    return 'No';
  }.property('active')

});
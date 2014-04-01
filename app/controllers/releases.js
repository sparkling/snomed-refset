export default Ember.ArrayController.extend({
  needs: 'refset',
  refsetName: Ember.computed.alias('controllers.refset.model.publicId'),
});
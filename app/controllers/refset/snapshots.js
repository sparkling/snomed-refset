export default Ember.ObjectController.extend({
  snapshotResponse: 'plan-response-not-set',
  needs: "refset",
  refset: Ember.computed.alias("controllers.refset")
});
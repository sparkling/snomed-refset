export default Ember.ObjectController.extend({
  planResponse: 'plan-response-not-set',
  needs: "refset",
  refset: Ember.computed.alias("controllers.refset")
});


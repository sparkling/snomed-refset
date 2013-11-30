export default Ember.ObjectController.extend({
  planResponse: 'plan-response-not-set',
  isEdit: false,
  needs: "refset",
  refset: Ember.computed.alias("controllers.refset")
});


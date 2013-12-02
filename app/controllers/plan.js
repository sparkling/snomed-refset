export default Ember.ObjectController.extend({
  planResponse: 'plan-response-not-set',
  isEdit: false,
  needs: "refset",
  alert: undefined,
  refset: Ember.computed.alias("controllers.refset")
});


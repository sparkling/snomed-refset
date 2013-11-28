export default Ember.ObjectController.extend({
  needs: "plan",
  model: Ember.computed.alias("controllers.plan.model")
});


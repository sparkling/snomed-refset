export default Ember.ObjectController.extend({
  needs: "refset",
  refset: Ember.computed.alias("controllers.refset"),
});

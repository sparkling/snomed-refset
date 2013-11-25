export default Ember.ArrayController.extend({
  conceptsResponse: 'concepts-response-not-set',
  needs: "refset",
  refset: Ember.computed.alias("controllers.refset.model")
});


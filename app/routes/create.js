export default Ember.Route.extend({
  model: function() {
    return {
      concept: undefined,
      title: '',
      description: '',
      publicId: ''
    };
  }
});


import Concept from 'appkit/models/concept';

export default Ember.Route.extend({
  model: function() {
    return {
      concept: '138875005',
      title: '',
      description: '',
      publicId: ''
    };
  }
});


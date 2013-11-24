import registerComponents from '../utils/register_components';

var register_components = {
  name: 'Register Components',
  initialize: function(container, application) {
    Ember.Logger.log('called Register Component initialiser');
    registerComponents(container);
  }
};

export default register_components;
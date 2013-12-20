import Resolver from 'resolver';
import registerComponents from './initializers/register_components';

var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  LOG_BINDINGS: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver['default'],

  ready: function() {
    return Ember.Logger.log('App.ready()');
  },
  lookupStore: function() {
    return this.__container__.lookup('store:main');
  },
  lookupRouter: function() {
    return this.__container__.lookup('router:main');
  },
  lookupController: function(controllerName, options) {
    return this.__container__.lookup('controller:' + controllerName, options);
  },
  lookupContainer: function() {
    return this.__container__;
  }
});

Ember.RSVP.configure('onerror', function(error) {
  // ensure unhandled promises raise awareness.
  // may result in false negatives, but visibility is more important
  if (error instanceof Error) {
    Ember.Logger.assert(false, error);
    Ember.Logger.error(error.stack);
  }
});

Ember.LinkView.reopen({
  action: null,
  _invoke: function(event){
    var action = this.get('action');
    if(action) {
      // There was an action specified (in handlebars) so take custom action
      event.preventDefault(); // prevent the browser from following the link as normal
      if (this.bubbles === false) { event.stopPropagation(); }

      // trigger the action on the controller
      this.get('controller').send(action, this.get('actionParam'));
      return false; 
    }           

    // no action to take, handle the link-to normally
    return this._super(event);
  }
});

//App.deferReadiness();
App.initializer(registerComponents);

var createApp = function() {
  App.initializer(registerComponents);
  return App.create();
};

export default App;
//export default App;



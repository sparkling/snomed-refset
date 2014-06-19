import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: 'snomed-refset-cli', // TODO: loaded via config
  Resolver: Resolver,

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

loadInitializers(App, 'snomed-refset-cli');

Ember.Handlebars.registerHelper("ifAllowed", function(activity, fn)
{
  var context = (fn.contexts && fn.contexts[0]) || this;
 
  var func = function(result){
    if (typeof result === 'boolean') {
      return result;
    }
         
    // The actual check if value is not undefined and null
    Ember.Logger.log("Checking permissions for activity " + activity);
    Ember.Logger.log("Defaulting to 'true'");
    return true;
  };

  return Em.Handlebars.bind.call(context, activity, fn, true, func, func);

});

// See:
// https://stackoverflow.com/questions/16124381/combine-linkto-and-action-helpers-in-ember-js
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

export default App;

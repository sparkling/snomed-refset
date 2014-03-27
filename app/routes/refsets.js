import Refsets from 'appkit/models/refsets';

export default  Ember.Route.extend({
  model: function() {
    Ember.Logger.log('loading refsets');
    Ember.Logger.log('Class is ' + JSON.stringify(Refsets));
    return Refsets.loadRefsets(this, "title", "ASC");
  }
});
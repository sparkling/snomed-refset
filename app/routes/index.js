import Release from 'appkit/models/release';

export default Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }

  setupController: function(controller){
    var releases = Release.getReleases(this);
    controller.set('snomedReleases', 'blah');
  }
});

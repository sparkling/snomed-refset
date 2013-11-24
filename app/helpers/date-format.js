export default Ember.Handlebars.makeBoundHelper(function(date) {
  return window.moment(date).fromNow();
});

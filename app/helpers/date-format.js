

export default Ember.Handlebars.makeBoundHelper(function(date) {
  var created = window.moment(date);
  return created;
});

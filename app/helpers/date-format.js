

export default Ember.Handlebars.makeBoundHelper(function(date) {
  var created = window.moment(date).format('MMMM Do, YYYY');

  return created;
});

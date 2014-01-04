export default Ember.Handlebars.makeBoundHelper(function(concept) {
  var linkUrl='http://browser.snomedtools.com/version/1/concept/' + concept.get('id');
  return new window.Handlebars.SafeString("<a href='" + linkUrl + "' target='_blank'>" + concept.title + "</a>");
});

export default Ember.Handlebars.makeBoundHelper(function(component) {
  var linkUrl = 'http://browser.ihtsdotools.org/index.html?perspective=full&conceptId1=' + component.id + '&diagrammingMarkupEnabled=true&acceptLicense=true';
  return new window.Handlebars.SafeString('<a href="' + linkUrl + '" target="_blank">' + component.title + '</a>');
});

export default Ember.Handlebars.makeBoundHelper(function(refsetPublicId, snapshotPublicId, downloadFileExtension, anchorTitle) {
  var linkUrl = 'https://refset-api.snomedtools.info/refsets/' + refsetPublicId + '/snapshot/' + snapshotPublicId + '.' + downloadFileExtension;
  //var linkUrl = 'http://localhost:8080/refsets/' + refsetPublicId + '/snapshot/' + snapshotPublicId + '.' + downloadFileExtension;
  return new window.Handlebars.SafeString("<a role='menuitem' download='" + snapshotPublicId + "." + downloadFileExtension + "' tabindex='-1' href='" + linkUrl + "'>" + anchorTitle + "</a>");
});

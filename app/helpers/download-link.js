export default Ember.Handlebars.makeBoundHelper(function(refsetPublicId, snapshotPublicId, downloadFileExtension, anchorTitle) {
  var linkUrl = 'https://refset-api.snomedtools.info/refsets/' + refsetPublicId + '/snapshot/' + snapshotPublicId + '/members.' + downloadFileExtension;
  //var linkUrl = 'http://localhost:8080/refsets/'               + refsetPublicId + '/snapshot/' + snapshotPublicId + '/members.' + downloadFileExtension;
  //Ember.Logger.log('linkUrl is: ' + linkUrl);
  return new window.Handlebars.SafeString("<a role='menuitem' download='" + snapshotPublicId + "." + downloadFileExtension + "' tabindex='-1' href='" + linkUrl + "'>" + anchorTitle + "</a>");
});

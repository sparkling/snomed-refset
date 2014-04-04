import Alert from 'appkit/models/alert';
import toEmberObject from 'appkit/utils/to_ember_object';
import baseUrl from 'appkit/utils/baseurl';


var Version = Ember.Object.extend({
  publicId:    '',
  title:       '',
  description: ''
});

 
Version.reopenClass({

  getVersions: function(refsetPublicId, _this) {
    var versions = Ember.A();
    Ember.Logger.log('Ajax: get versions');
    Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8"
        },
        url: baseUrl() + "/" + refsetPublicId + "/versions",
        type: "GET",
        data: '',
        dataType: "json"
      }).then((function(success) {
        Ember.Logger.log('Ajax: success');
        var returned = toEmberObject(success);
        versions.pushObjects(returned.get('versions'));
      }), function(error) {
        Ember.Logger.log('Ajax: error');
        Ember.Logger.log('fail: ' + JSON.stringify(error));
        _this.set('response', toEmberObject(JSON.parse(error.responseText)));
      }));
    });
    return versions;
  },

  getVersion: function(refsetPublicId, versionPublicId, _this) {
    Ember.Logger.log('Ajax: get version');
    var version = Version.create();
    Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8"
        },
        url: baseUrl() + "/" + refsetPublicId + "/version/" + versionPublicId,
        type: "GET",
        data: '',
        dataType: "json"
      }).then((function(success) {
        Ember.Logger.log('Ajax: success');
        var returned = toEmberObject(success);
        version.setProperties(returned);
      }), function(error) {
        Ember.Logger.log('Ajax: error');
        Ember.Logger.log('fail: ' + JSON.stringify(error));
        _this.set('error', toEmberObject(JSON.parse(error.responseText)));
      }));
    });
    return version;
  },  


  getMembers: function(refsetPublicId, versionPublicId, sortBy, sortOrder, _this) {
    Ember.Logger.log('Ajax: get members');
    var members = Ember.A();
    Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8"
        },
        url: baseUrl() + "/" + refsetPublicId + "/version/" + versionPublicId + "/members?sortBy=" + sortBy + "&sortOrder=" + sortOrder,
        type: "GET",
        data: '',
        dataType: "json"
      }).then((function(success) {
        Ember.Logger.log('Ajax: success');
        var returned = toEmberObject(success);
        members.pushObjects(returned.get('members'));
      }), function(error) {
        Ember.Logger.log('Ajax: error');
        Ember.Logger.log('fail: ' + JSON.stringify(error));
        _this.set('error', toEmberObject(JSON.parse(error.responseText)));
      }));
    });
    return members;
  },    

  createVersion: function(refsetPublicId, version, alert, onSuccess, onError, _this) {
    Ember.Logger.log('Ajax: create version');
    Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
                  "Content-Type": "application/json; charset=utf-8"
        },
        url: baseUrl() + "/" + refsetPublicId + "/versions",
        type: "POST",
        data: JSON.stringify(version),
        dataType: "json"
      }).then((function(success) {
        Ember.Logger.log('Ajax: success');
        onSuccess(version, success, alert, _this);
      }), function(error) {
        Ember.Logger.log('Ajax: error');
        onError(version, error, alert, _this);
      }));
    });
  },
   
});

export default Version;
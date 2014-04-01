import Alert from 'appkit/models/alert';
import Version from 'appkit/models/version';
import toEmberObject from 'appkit/utils/to_ember_object';
import baseUrl from 'appkit/utils/baseurl';


var Tag = Ember.Object.extend({
  publicId:         '',
  refsetPublicId:   '',
  snapshot:         '',
  title:            '',
  description:      '',
  creationTime:     '',
});

Tag.reopenClass({

  getTags: function(refsetPublicId, sortBy, sortOrder, _this) {
    var tags = Ember.A();
    Ember.Logger.log('Ajax: get tags');
    Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8"
        },
        url: baseUrl() + "/" + refsetPublicId + "/tags?sortBy=" + sortBy + "&sortOrder=" + sortOrder,
        type: "GET",
        data: '',
        dataType: "json"
      }).then((function(success) {
        Ember.Logger.log('Ajax: success');
        var returned = toEmberObject(success);
        tags.pushObjects(returned.get('tags'));
      }), function(error) {
        Ember.Logger.log('Ajax: error');
        Ember.Logger.log('fail: ' + JSON.stringify(error));
        _this.set('response', toEmberObject(JSON.parse(error.responseText)));
      }));
    });
    return tags;
  },    

  getRelease: function(refsetPublicId, releasePublicId, onSuccess, _this) {
    Ember.Logger.log('Ajax: get release');
    var tag = Tag.create();
    Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8"
        },
        url: baseUrl() + "/" + refsetPublicId + "/tag/" + releasePublicId,
        type: "GET",
        data: '',
        dataType: "json"
      }).then((function(success) {
        Ember.Logger.log('Ajax: success');
        var returned = toEmberObject(success);
        tag.setProperties(returned);
        if(typeof onSuccess !== 'undefined'){
          onSuccess(tag, _this);
        }
      }), function(error) {
        Ember.Logger.log('Ajax: error');
        Ember.Logger.log('fail: ' + JSON.stringify(error));
        _this.set('error', toEmberObject(JSON.parse(error.responseText)));
      }));
    });
    return tag;
  },    

  createTag: function(refsetPublicId, tag, targetModel, alert, onSuccess, onError, _this) {
    Ember.Logger.log('Ajax: create tag');
    Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
                  "Content-Type": "application/json; charset=utf-8"
        },
        url: baseUrl() + "/" + refsetPublicId + "/tags",
        type: "POST",
        data: JSON.stringify(tag),
        dataType: "json"
      }).then((function(success) {
        Ember.Logger.log('Ajax: success');
        onSuccess(tag, success, alert, _this);
      }), function(error) {
        Ember.Logger.log('Ajax: error');
        onError(tag, error, alert, _this);
      }));
    });
  },

  deleteTag: function(refsetPublicId, tag, targetModel, alert, onSuccess, onError, _this){
    Ember.Logger.log('Ajax: delete tag');
    Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
                  "Content-Type": "application/json; charset=utf-8"
        },
        url: baseUrl() + "/" + refsetPublicId + "/tag/" + tag.get('publicId'),
        type: "DELETE",
        data: '',
        dataType: "json"
      }).then((function(success) {
        Ember.Logger.log('Ajax: success');
        onSuccess(tag, targetModel, success, alert, _this);
      }), function(error) {
        Ember.Logger.log('Ajax: error');
        onError(tag, error, alert, _this);
      }));
    });
  },  
   
});

export default Tag;
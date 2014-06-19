import toEmberObject from '../utils/to_ember_object';


var Tag = Ember.Object.extend({
  publicId:         '',
  refsetPublicId:   '',
  snapshot:         '',
  title:            '',
  description:      '',
  creationTime:     '',
});

Tag.reopenClass({

  getTags: function(refsetPublicId, sortBy, sortOrder, filter, pageIndex, pageSize, _this) {
    Ember.Logger.log('Ajax: get tags');
    return Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8"
        },
        url: ENV.APP.apiBaseUrl + "/" + refsetPublicId + "/tags" +
          "?sortBy="    + sortBy + 
          "&sortOrder=" + sortOrder +
          "&filter="    + filter +
          "&pageIndex=" + pageIndex +
          "&pageSize="  + pageSize,        
        type: "GET",
        data: '',
        dataType: "json"
      }).then((function(success) {
        Ember.Logger.log('Ajax: success');
        return toEmberObject(success);
      }), function(error) {
        Ember.Logger.log('Ajax: error');
        Ember.Logger.log('fail: ' + JSON.stringify(error));
        _this.set('response', toEmberObject(JSON.parse(error.responseText)));
      }));
    });
  },    

  getRelease: function(refsetPublicId, releasePublicId, _this) {
    Ember.Logger.log('Ajax: get release');
    return Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8"
        },
        url: ENV.APP.apiBaseUrl + "/" + refsetPublicId + "/tag/" + releasePublicId,
        type: "GET",
        data: '',
        dataType: "json"
      }).then((function(success) {
        Ember.Logger.log('Ajax: success');
        return toEmberObject(success);
      }), function(error) {
        Ember.Logger.log('Ajax: error');
        Ember.Logger.log('fail: ' + JSON.stringify(error));
        _this.set('error', toEmberObject(JSON.parse(error.responseText)));
      }));
    });
  },    

  createTag: function(refsetPublicId, tag, alert, onSuccess, onError, _this) {
    Ember.Logger.log('Ajax: create tag');
    $.ajax({
      headers: {
        Accept: "application/json; charset=utf-8",
                "Content-Type": "application/json; charset=utf-8"
      },
      url: ENV.APP.apiBaseUrl + "/" + refsetPublicId + "/tags",
      type: "POST",
      data: JSON.stringify(tag),
      dataType: "json"
    }).then((function(success) {
      Ember.Logger.log('Ajax: success');
      onSuccess(tag, success, alert, _this);
    }), function(error) {
      Ember.Logger.log('Ajax: error');
      onError(tag, error, alert, _this);
    });
  },

  deleteTag: function(refsetPublicId, tag, alert, onSuccess, onError, _this){
    Ember.Logger.log('Ajax: delete tag');
    $.ajax({
      headers: {
        Accept: "application/json; charset=utf-8",
                "Content-Type": "application/json; charset=utf-8"
      },
      url: ENV.APP.apiBaseUrl + "/" + refsetPublicId + "/tag/" + tag.get('publicId'),
      type: "DELETE",
      data: '',
      dataType: "json"
    }).then((function(success) {
      Ember.Logger.log('Ajax: success');
      onSuccess(tag, success, alert, _this);
    }), function(error) {
      Ember.Logger.log('Ajax: error');
      onError(tag, error, alert, _this);
    });
  },  
   
});

export default Tag;
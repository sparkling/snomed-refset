import toEmberObject from '../utils/to_ember_object';
import Alert from './alert';

var Member = Ember.Object.extend({
  publicId:  '',
  title:     '',
  module:    '',
  component: '', 
  active:    '',
  effective: ''
});
 
Member.reopenClass({

  delete: function(refsetPublicId, member, alert, onSuccess, onError, _this){
    Ember.Logger.log('Ajax: delete member');
    $.ajax({
      headers: {
        Accept: "application/json; charset=utf-8",
                "Content-Type": "application/json; charset=utf-8"
      },
      url: ENV.APP.apiBaseUrl + "/" + refsetPublicId + "/members/" + member.get('publicId'),
      type: "DELETE",
      data: '',
      dataType: "json"
    }).then((function(success) {
      Ember.Logger.log('Ajax: success');
      onSuccess(member, success, alert, _this);
    }), function(error) {
      Ember.Logger.log('Ajax: error');
      onError(member, error, alert, _this);
    });
  },
  
  addMembers: function(refsetPublicId, members, alert, onSuccess, onError, _this) {
    Ember.Logger.log('Ajax: add member');
    $.ajax({
      headers: {
        Accept: "application/json; charset=utf-8",
                "Content-Type": "application/json; charset=utf-8"
      },
      url: ENV.APP.apiBaseUrl + "/" + refsetPublicId + "/members?type=list",
      type: "POST",
      data: JSON.stringify(members),
      dataType: "json"
    }).then((function(success) {
      Ember.Logger.log('Ajax: success');
      onSuccess(members, success, alert, _this);
    }), function(error) {
      Ember.Logger.log('Ajax: error');
      onError(members, error, alert, _this);
    });
  },

  import: function(refsetPublicId, formElement, fileType){
    Ember.Logger.log('Ajax: Import');
    return Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        url: ENV.APP.apiBaseUrl + '/' + refsetPublicId + '/members?type=file',
        type: "POST",
        processData: false,
        contentType: false,
        data: new window.FormData(formElement)
      }).then((function(success) {
        Ember.Logger.log('Ajax: success');
      }), function(error) {
        Ember.Logger.log('Ajax: error');
        return toEmberObject(JSON.parse(error.responseText)); 
      }));
    });
  },

  getMember: function(refsetPublicId, memberId, _this){
    Ember.Logger.log('Ajax: Get members for refset ' + refsetPublicId + " with member id " + memberId);
    return Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8"
        },
        url: ENV.APP.apiBaseUrl + "/" + refsetPublicId + "/members/" + memberId,
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

  getMembers: function(refsetPublicId, sortBy, sortOrder, filter, pageIndex, pageSize, _this) {
    Ember.Logger.log('Ajax: Get members for refset ' + refsetPublicId);
    return Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8"
        },
        url: ENV.APP.apiBaseUrl + "/" + refsetPublicId + "/members?sortBy=" + sortBy + "&sortOrder=" + sortOrder + "&filter=" + filter + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize,
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
});

export default Member;
import Alert from 'appkit/models/alert';
import toEmberObject from 'appkit/utils/to_ember_object';
import baseUrl from 'appkit/utils/baseurl';


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
      url: baseUrl() + "/" + refsetPublicId + "/members/" + member.get('publicId'),
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
      url: baseUrl() + "/" + refsetPublicId + "/members?type=list",
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

  import: function(refsetPublicId, formElement, fileType, alert, onSuccess, onError, _this){
    Ember.Logger.log('Ajax: Import');
    $.ajax({
      url: baseUrl() + '/' + refsetPublicId + '/members?type=file',
      type: "POST",
      processData: false,
      contentType: false,
      data: new window.FormData(formElement)
    }).then((function(success) {
      Ember.Logger.log('Ajax: success');
      onSuccess(success, alert, _this);
    }), function(error) {
      Ember.Logger.log('Ajax: error');
      onError(error, alert, _this);
    });
  },


  //FIXME: Need to return a promise here, but that will break the cache handling in the route...
  getMembers: function(refsetPublicId, sortBy, sortOrder, filter, pageIndex, pageSize, _this) {
    Ember.Logger.log('Ajax: Get members for refset ' + refsetPublicId);
    return Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8"
        },
        url: baseUrl() + "/" + refsetPublicId + "/members?sortBy=" + sortBy + "&sortOrder=" + sortOrder + "&filter=" + filter + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize,
        type: "GET",
        data: '',
        dataType: "json"
      }).then((function(success) {
        Ember.Logger.log('Ajax: success');
        //var page = Ember.Object.create();
        //page.set('totalSize', success.totalSize);
        //page.set('members', Ember.A(toEmberObject(success).get('members')));
        //return page;
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
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

  delete: function(refsetPublicId, member, targetModel, alert, onSuccess, onError, _this){
    Ember.Logger.log('Ajax: delete member');
    Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
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
        onSuccess(member, targetModel, success, alert, _this);
      }), function(error) {
        Ember.Logger.log('Ajax: error');
        onError(member, error, alert, _this);
      }));
    });
  },
  
  addMembers: function(refsetPublicId, members, targetModel, alert, onSuccess, onError, _this) {
    Ember.Logger.log('Ajax: add member');
    Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
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
        onSuccess(members, targetModel, success, alert, _this);
      }), function(error) {
        Ember.Logger.log('Ajax: error');
        onError(members, error, alert, _this);
      }));
    });
  },

  import: function(refsetPublicId, formElement, fileType, alert, onSuccess, onError, _this){
    Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
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
      }));
    });
  },


  getMembers: function(refsetPublicId, sortBy, sortOrder, _this) {
    var members = Ember.A();
    Ember.Logger.log('GETing members for refset for: ' + refsetPublicId);
    Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8"
        },
        url: baseUrl() + "/" + refsetPublicId + "/members?sortBy=" + sortBy + "&sortOrder=" + sortOrder,
        type: "GET",
        data: '',
        dataType: "json"
      }).then((function(success) {
        //Ember.Logger.log('success: ' + JSON.stringify(success));
        var returned = toEmberObject(success);
        //Ember.Logger.log('members found and parsed: ' + JSON.stringify(returned));
        members.pushObjects(returned.get('members'));
      }), function(error) {
        Ember.Logger.log('fail: ' + JSON.stringify(error));
        _this.set('response', toEmberObject(JSON.parse(error.responseText)));
      }));
    });
    return members;
  },   
});

export default Member;
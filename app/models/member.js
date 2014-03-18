import toEmberObject from 'appkit/utils/to_ember_object';
import toType from 'appkit/utils/to_type';

var baseUrl = 'https://refset-api.snomedtools.info/refsets';
//var baseUrl = 'http://localhost:8080/refsets';

var Member = Ember.Object.extend({
  publicId:  '',
  title:     '',
  module:    '',
  component: '', 
  active:    '',
  effective: ''
});

 
Member.reopenClass({   
  addMembers: function(members, refsetPublicId, alert, _this) {
    var response = Ember.Object.create();
    Ember.Logger.log('Saving members to refset: ' + refsetPublicId);
    Ember.Logger.log('Payload is: ' + JSON.stringify(members));
    Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
                  "Content-Type": "application/json; charset=utf-8"
        },
        url: baseUrl + "/" + refsetPublicId + "/members?type=list",
        type: "POST",
        data: JSON.stringify(members),
        dataType: "json"
      }).then((function(success) {
        Ember.Logger.log('success: ' + JSON.stringify(success));
        alert.set('status', 'SUCCESS');
        alert.set('message', "Successfully added new members");
        _this.transitionToRoute('members');
      }), function(error) {
        Ember.Logger.log('fail: ' + JSON.stringify(error));
        var returned = toEmberObject(JSON.parse(error.responseText));
        _this.set('error', toEmberObject(JSON.parse(error.responseText)));
        alert.set('status', 'FAIL');
        alert.set('message', "Failed updating members");
      }));
    });
    return response;
  },
  import: function(fileType, refsetPublicId, alert, _this){
    var result;

    var form = document.getElementById('import-file-form');
    var formData = new window.FormData(form);
    var fileInput = document.getElementById('import-file');
    var file = fileInput.files[0];
    
    if (file !== undefined) {
      formData.append('file', file);
    }
    
    if (fileType !== undefined) {
      formData.append('fileType', fileType);
    }
    
    result = Ember.Object.create({});
    Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        url: baseUrl + '/' + refsetPublicId + '/members?type=file',
        type: "POST",
        processData: false,
        contentType: false,
        data: formData
      }).then((function(success) {
        Ember.Logger.log('success: ' + JSON.stringify(success));
        alert.set('status', 'SUCCESS');
        alert.set('message', "Successfully imported file");
        _this.transitionToRoute('members');
      }), function(error) {
        var parsed;
        Ember.Logger.log('fail: ' + JSON.stringify(error));
        parsed = toEmberObject(JSON.parse(error.responseText));
        Ember.Logger.log('after toEmber: ' + JSON.stringify(parsed));
        return result.setProperties(parsed);
      }));
    });
    return result;    
  },  
  getMembers: function(refsetPublicId, _this) {
    var members = Ember.A();
    Ember.Logger.log('GETing members for refset for: ' + refsetPublicId);
    Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8"
        },
        url: baseUrl + "/" + refsetPublicId + "/members",
        type: "GET",
        data: '',
        dataType: "json"
      }).then((function(success) {
        Ember.Logger.log('success: ' + JSON.stringify(success));
        var returned = toEmberObject(success);
        Ember.Logger.log('members found and parsed: ' + JSON.stringify(returned));
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
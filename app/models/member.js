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
        url: baseUrl + "/" + refsetPublicId + "/members",
        type: "POST",
        data: JSON.stringify(members),
        dataType: "json"
      }).then((function(success) {
        Ember.Logger.log('success: ' + JSON.stringify(success));
        //var returned = toEmberObject(success.refsetPlan);
        //response.setProperties(returned);
        alert.set('status', 'SUCCESS');
        alert.set('message', "Successfully added new members");
      }), function(error) {
        Ember.Logger.log('fail: ' + JSON.stringify(error));
        var returned = toEmberObject(JSON.parse(error.responseText));
        _this.set('response', toEmberObject(JSON.parse(error.responseText)));
        alert.set('status', 'FAIL');
        alert.set('message', "Failed updating members");
      }));
    });
    return response;
  }
});

export default Member;
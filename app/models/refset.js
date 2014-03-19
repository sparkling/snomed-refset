import toEmberObject from 'appkit/utils/to_ember_object';
import toType from 'appkit/utils/to_type';
import baseUrl from 'appkit/utils/baseurl';

//var baseUrl = 'https://refset-api.snomedtools.info/refsets';
//var baseUrl = 'http://localhost:8080/refsets';

var Refset = Ember.Object.extend({
  source:            '',
  type:              '',
  title:             '',
  description:       '',
  publicId:          '',
  snomedReleaseDate: '',
  snomedExtension:   '',
  refsetConcept:     '',
  moduleConcept:     '' 

});
 
Refset.reopenClass({
  loadRefset: function(publicId, _this) {
    return Ember.Deferred.promise(function(p) {
      var refset;
      return p.resolve($.getJSON(baseUrl() + '/' + publicId).then(function(res) {
        refset = Ember.Object.create(res);
        Ember.Logger.log("res: " + res);
        _this.set('refset', refset);
        return refset;
      }));
    });
  },
  getConcepts: function(refset, _this) {
    var concepts = Ember.A();
    Ember.Logger.log('GETing concepts for: ' + refset.publicId);
    Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8"
        },
        url: baseUrl() + "/" + refset.publicId + "/concepts.json",
        type: "GET",
        data: '',
        dataType: "json"
      }).then((function(success) {
        Ember.Logger.log('success: ' + JSON.stringify(success));
        var returned = toEmberObject(success);
        Ember.Logger.log('concepts found and parsed: ' + JSON.stringify(returned.get('concepts')));
        concepts.pushObjects(returned.get('concepts'));
      }), function(error) {
        Ember.Logger.log('fail: ' + JSON.stringify(error));
        _this.set('conceptsResponse', toEmberObject(JSON.parse(error.responseText)));
      }));
    });
    return concepts;
  }, 
   getPlan: function(refset, _this) {
    var plan = Ember.Object.create();
    Ember.Logger.log('GETing plan for: ' + refset.publicId);
    Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8"
        },
        url: baseUrl() + "/" + refset.publicId + "/plan.json",
        type: "GET",
        data: '',
        dataType: "json"
      }).then((function(success) {
        //Ember.Logger.log('success: ' + JSON.stringify(success));
        var returned = toEmberObject(success);
        Ember.Logger.log('returned plan has rules of type: ' + Ember.typeOf(returned.get('rules')));
        //Ember.Logger.log('plan found and parsed: ' + JSON.stringify(returned));
        plan.setProperties(returned);
      }), function(error) {
        Ember.Logger.log('fail: ' + JSON.stringify(error));
        _this.set('planResponse', toEmberObject(JSON.parse(error.responseText)));
      }));
    });
    return plan;
  },    
  savePlan: function(plan, refsetPublicId, alert) {
    var response = Ember.Object.create();
    Ember.Logger.log('Saving plan: ' + JSON.stringify(plan));
    Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
                  "Content-Type": "application/json; charset=utf-8"
        },
        url: baseUrl() + "/" + refsetPublicId + "/plan",
        type: "PUT",
        data: JSON.stringify(plan),
        dataType: "json"
      }).then((function(success) {
        Ember.Logger.log('success: ' + JSON.stringify(success));
        var returned = toEmberObject(success.refsetPlan);
        response.setProperties(returned);
        alert.set('status', 'SUCCESS');
        alert.set('message', "Successfully updated rules");
      }), function(error) {
        Ember.Logger.log('fail: ' + JSON.stringify(error));
        var returned = toEmberObject(JSON.parse(error.responseText));
        response.setProperties(returned.get('refsetPlan'));
        alert.set('status', 'FAIL');
        alert.set('message', "Failed updating rules");
      }));
    });
    return response;
  },
  validatePlan: function(plan) {
    var response = Ember.Object.create();
    Ember.Logger.log('Validating plan: ' + JSON.stringify(plan));
    Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
                  "Content-Type": "application/json; charset=utf-8"
        },
        url: baseUrl() + "/validate",
        type: "PUT",
        data: JSON.stringify(plan),
        dataType: "json"
      }).then((function(success) {
        Ember.Logger.log('success: ' + JSON.stringify(success));
        var returned = toEmberObject(success);
        response.setProperties(returned);
      }), function(error) {
        Ember.Logger.log('fail: ' + JSON.stringify(error));
        var returned = toEmberObject(JSON.parse(error.responseText));
        response.setProperties(returned);
        //_this.set('validation', toEmberObject(JSON.parse(error.responseText)));
      }));
    });
    return response;
  },   
});

export default Refset;
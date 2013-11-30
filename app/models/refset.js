var Refset = Ember.Object.extend({});
//var baseUrl = 'http://refset.snomedtools.com/';
var baseUrl = 'http://localhost:8080/refsets/';

var toType = function(obj) {
  return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};

var toEmberObject = function(plainObject) {
  var data, i, key, result, type, value;
  Ember.Logger.log('********************************************');
  Ember.Logger.log('toEmber: ' + JSON.stringify(plainObject));
  Ember.Logger.log('toEmber type: ' + Ember.typeOf(plainObject));
  Ember.Logger.log('********************************************');
  if (!plainObject) {
    return plainObject;
  }
  data = {};
  for (key in plainObject) {
    value = plainObject[key];
    type = Ember.typeOf(value);
    Ember.Logger.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
    Ember.Logger.log('key: ' + JSON.stringify(key));
    Ember.Logger.log('value: ' + JSON.stringify(value));
    Ember.Logger.log('emberType (value): ' + type);
    Ember.Logger.log('toType (value): ' + toType(value));
    if (type === "array") {
      var emberArray = Ember.A();
      i = 0;
      Ember.Logger.log('value.length: ' + value.length);
      while (i < value.length) {
        if (Ember.typeOf(value[i]) === 'object') {
          Ember.Logger.log('pushing: toEmberObject(' + value[i] + ')');
          emberArray.pushObject(toEmberObject(value[i]));
        } else {
          Ember.Logger.log('pushing: ' + value[i]);
          emberArray.pushObject(value[i]);
        }
        ++i;
      }
      Ember.Logger.log('WAAAH! End of array! key: ' + key + ', emberArray type is: ' + emberArray.constructor.toString());
      Ember.Logger.log('Ember array type: ' + Ember.typeOf(Ember.A()));
      data[key] = emberArray;
    } else if (type === "object") {
      data[key] = toEmberObject(value);
    } else {
      if (type === "string" || type === "number" || type === "boolean") {
        data[key] = value;
      }
    }
  }
  result = Ember.Object.create(data);
  return result;
};

Refset.reopenClass({
  loadRefset: function(publicId, _this) {
    return Ember.Deferred.promise(function(p) {
      var refset;
      refset = _this.get('refset');
      if (refset != null) {
        return p.resolve(refset);
      }
      return p.resolve($.getJSON(baseUrl + 'api/refsets/' + publicId).then(function(res) {
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
        url: baseUrl + "api/refsets/" + refset.publicId + "/concepts.json",
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
        url: baseUrl + "api/refsets/" + refset.publicId + "/plan.json",
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
});

export default Refset;
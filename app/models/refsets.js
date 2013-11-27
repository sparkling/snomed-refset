var baseUrl = 'http://refset.snomedtools.com/';

var toType = function(obj) {
  return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};

var toEmberObject = function(plainObject) {
  var data, emberArray, i, key, result, type, value;
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
      emberArray = Ember.A();
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

var Refsets = Ember.Object.extend({
  concepts: 'concepts-not-set'
});

Refsets.reopenClass({
  loadRefsets: function(_this) {
    Ember.Logger.log('Do request for refsets');
    return Ember.Deferred.promise(function(p) {
      var refsets;
      refsets = _this.get('controller.model');
      if (refsets != null) {
        Ember.Logger.log('Found refsets in cache');
        return p.resolve(refsets);
      }
      return p.resolve($.getJSON(baseUrl + 'api/refsets').then(function(res) {
        Ember.Logger.log('Json request returned');
        return res.map(function(i) {
          var x = Ember.Object.create(i);
          Ember.Logger.log('Created object');
          return x;
        });
      }));
    });
  },
  createRefset: function(refset, _this) {
    var result;
    Ember.Logger.log('POSTing: ' + JSON.stringify(refset));
    result = Ember.Object.create({});
    Ember.Deferred.promise(function(p) {

      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8"
        },
        url: baseUrl + "api/refsets",
        type: "POST",
        data: JSON.stringify(refset),
        dataType: "json"
      }).then((function(success) {
        var parsed;
        Ember.Logger.log('success: ' + JSON.stringify(success));
        Ember.Logger.log('refset: ' + JSON.stringify(success.refset));
        var jsParsed = success.refset;
        Ember.Logger.log('JSON parsed: ' + JSON.stringify(jsParsed));
        var refset = toEmberObject(jsParsed);
        Ember.Logger.log('after toEmber: ' + JSON.stringify(refset));
        //return result.setProperties(parsed);
        //This should be passed in as a success function instead
        //Does not belong here
        _this.get('controllers.refsets.model').pushObject(refset);
        _this.transitionToRoute('refset.plan', refset);
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
  deleteRefset: function(refset, _this){
    Ember.Logger.log('DELETEing: ' + JSON.stringify(refset));
    var result = Ember.Object.create({});

    Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8"
        },
        url: baseUrl + "api/refsets/" + refset.get('publicId'),
        type: "DELETE",
        data: '',
        dataType: "json"
      }).then((function(success) {
        Ember.Logger.log('success: ' + JSON.stringify(success));
        _this.get('model').removeObject(refset);
        result.setProperties(toEmberObject(success));
      }), function(error) {
        Ember.Logger.log('fail: ' + JSON.stringify(error));
        result.setProperties(toEmberObject(JSON.parse(error.responseText)));
      }));
    });    
  }
});

Ember.Logger.log('created Refsets model');

export default Refsets;
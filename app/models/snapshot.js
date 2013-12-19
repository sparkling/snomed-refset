var baseUrl = 'http://api.sparklingideas.co.uk/refsets';
//var baseUrl = 'http://localhost:8080/refsets';

var Snapshot = Ember.Object.extend({
  title: '',
  decsription: '',
  publicId: ''
});


var toType = function(obj) {
  return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
};
 
var toEmberObject = function(plainObject) {
  var data, i, key, result, type, value;
  //Ember.Logger.log('********************************************');
  //Ember.Logger.log('toEmber: ' + JSON.stringify(plainObject));
  //Ember.Logger.log('toEmber type: ' + Ember.typeOf(plainObject));
  //Ember.Logger.log('********************************************');
  if (!plainObject) {
    return plainObject;
  }
  data = {};
  for (key in plainObject) {
    value = plainObject[key];
    type = Ember.typeOf(value);
    //Ember.Logger.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
    //Ember.Logger.log('key: ' + JSON.stringify(key));
    //Ember.Logger.log('value: ' + JSON.stringify(value));
    //Ember.Logger.log('emberType (value): ' + type);
    //Ember.Logger.log('toType (value): ' + toType(value));
    if (type === "array") {
      var emberArray = Ember.A();
      i = 0;
      //Ember.Logger.log('value.length: ' + value.length);
      while (i < value.length) {
        if (Ember.typeOf(value[i]) === 'object') {
          //Ember.Logger.log('pushing: toEmberObject(' + value[i] + ')');
          emberArray.pushObject(toEmberObject(value[i]));
        } else {
          //Ember.Logger.log('pushing: ' + value[i]);
          emberArray.pushObject(value[i]);
        }
        ++i;
      }
      //Ember.Logger.log('WAAAH! End of array! key: ' + key + ', emberArray type is: ' + emberArray.constructor.toString());
      //Ember.Logger.log('Ember array type: ' + Ember.typeOf(Ember.A()));
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

Snapshot.reopenClass({
  snapit: function(snapshot, refset, _this) {
    var result;
    Ember.Logger.log('POSTing: ' + JSON.stringify(snapshot));
    result = Ember.Object.create({});
    Ember.Deferred.promise(function(p) {

      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8"
        },
        url: baseUrl + '/' + refset.get('publicId') + '/snapit',
        type: "POST",
        data: JSON.stringify(snapshot),
        dataType: "json"
      }).then((function(success) {
        var parsed;
        Ember.Logger.log('success: ' + JSON.stringify(success));
        Ember.Logger.log('snapshot: ' + JSON.stringify(success.snapshot));
        var jsParsed = success.snapshot;
        Ember.Logger.log('JSON parsed: ' + JSON.stringify(jsParsed));
        var snapshot = toEmberObject(jsParsed);
        Ember.Logger.log('after toEmber: ' + JSON.stringify(snapshot));
        //return result.setProperties(parsed);
        //This should be passed in as a success function instead
        //Does not belong here
        //_this.get('controllers.concepts.model').pushObject(snapshot);
        //_this.transitionToRoute('plan.edit', snapshot);
        $('#snapshot').modal('hide');
        _this.get('controllers.refset/snapshots.model').pushObject(snapshot);
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
  getSnapshots: function(refset, _this) {
    Ember.Logger.log('getting all snapshots');
    return Ember.Deferred.promise(function(p) {
      var snapshots;
      snapshots = _this.get('controller.model');
      if (snapshots != null) {
        Ember.Logger.log('Found snapshots in cache');
        return p.resolve(snapshots);
      }
      return p.resolve($.getJSON(baseUrl + '/' + refset.get('publicId') + '/snapshots').then(function(res) {
        Ember.Logger.log('Json request returned with ' + JSON.stringify(res));
        return res.map(function(i) {
          var x = Ember.Object.create(i);
          Ember.Logger.log('Created object');
          return x;
        });
      }));
    });
  },  
});

export default Snapshot;
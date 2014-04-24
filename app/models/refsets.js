import toEmberObject from 'appkit/utils/to_ember_object';
import toType from 'appkit/utils/to_type';
import baseUrl from 'appkit/utils/baseurl';

//var baseUrl = 'https://refset-api.snomedtools.info/refsets';
//var baseUrl = 'http://localhost:8080/refsets';
 
var Refsets = Ember.Object.extend({
  concepts: 'concepts-not-set'
});

Refsets.reopenClass({

  loadRefsets: function(sortBy, sortOrder, filter, pageIndex, pageSize) {
    Ember.Logger.log('Ajax: Get all refsets');
    return Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8"
        },
        url: baseUrl() + "?sortBy=" + sortBy + "&sortOrder=" + sortOrder + "&filter=" + filter + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize,
        type: "GET",
        data: '',
        dataType: "json"
      }).then((function(success) {
        Ember.Logger.log('Ajax: success');
        return toEmberObject(success);
      }), function(error) {
        Ember.Logger.log('Ajax: error');
        Ember.Logger.log('fail: ' + JSON.stringify(error));
        return toEmberObject(JSON.parse(error.responseText));
      }));
    });
  },


//  loadRefsets: function(_this, sortBy, sortOrder) {
//    Ember.Logger.log('Do request for refsets');
//    return Ember.Deferred.promise(function(p) {
//      var refsets;
//      //refsets = _this.get('controller.model');
//      //if (refsets != null) {
//      //  Ember.Logger.log('Found refsets in cache');
//      //  return p.resolve(refsets);
//      //}
//      return p.resolve($.getJSON(baseUrl() + "?sortBy=" + sortBy + "&sortOrder=" + sortOrder).then(function(res) {
//        Ember.Logger.log('Json request returned');
//        return res.map(function(i) {
//          var x = Ember.Object.create(i);
//          Ember.Logger.log('Created object');
//          return x;
//        });
//      }));
//    });
//  },

  createRefset: function(refset) { 
    Ember.Logger.log('Ajax: create refset');
    return Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8"
        },
        url: baseUrl(),
        type: "POST",
        data: JSON.stringify(refset),
        dataType: "json"
      }).then((function(success) {
        Ember.Logger.log('Ajax: success');
        return toEmberObject(success);
      }), function(error) {
        Ember.Logger.log('Ajax: error');
        Ember.Logger.log('fail: ' + JSON.stringify(error));
        return toEmberObject(JSON.parse(error.responseText));
      }));
    });
  },

///////////////////////////////////////////////////////////
//Moved to Refset - This class should be really be removed
///////////////////////////////////////////////////////////
//  deleteRefset: function(refset, _this){
//    Ember.Logger.log('DELETEing: ' + JSON.stringify(refset));
//    var result = Ember.Object.create({});
//
//    Ember.Deferred.promise(function(p) {
//      return p.resolve($.ajax({
//        headers: {
//          Accept: "application/json; charset=utf-8",
//          "Content-Type": "application/json; charset=utf-8"
//        },
//        url: baseUrl() + '/' + refset.get('publicId'),
//        type: "DELETE",
//        data: '',
//        dataType: "json"
//      }).then((function(success) {
//        Ember.Logger.log('success: ' + JSON.stringify(success));
//        _this.get('model').removeObject(refset);
//        result.setProperties(toEmberObject(success));
//      }), function(error) {
//        Ember.Logger.log('fail: ' + JSON.stringify(error));
//        result.setProperties(toEmberObject(JSON.parse(error.responseText)));
//      }));
//    });
//  }
});

Ember.Logger.log('created Refsets model');

export default Refsets;
import toEmberObject from '../utils/to_ember_object';

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

 loadRefsets: function(sortBy, sortOrder, filter, pageIndex, pageSize) {
    Ember.Logger.log('Ajax: Get all refsets');
    return Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8"
        },
        url: ENV.APP.apiBaseUrl + "?sortBy=" + sortBy + "&sortOrder=" + sortOrder + "&filter=" + filter + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize,
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

  createRefset: function(refset) { 
    Ember.Logger.log('Ajax: create refset');
    return Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8"
        },
        url: ENV.APP.apiBaseUrl,
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

  delete: function(refset){
    Ember.Logger.log('Ajax: delete refset');
    return Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
                  "Content-Type": "application/json; charset=utf-8"
        },
        url: ENV.APP.apiBaseUrl + "/" + refset.get('publicId'),
        type: "DELETE",
        data: '',
        dataType: "json"
      }).then((function(success) {
        Ember.Logger.log('Ajax: success');
        return success;
      }), function(error) {
        Ember.Logger.log('Ajax: error');
        return error;
      }));
    });
  },

  resurect: function(refset){
    Ember.Logger.log('Ajax: resurect refset');
    return Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
                  "Content-Type": "application/json; charset=utf-8"
        },
        url: ENV.APP.apiBaseUrl + "/" + refset.get('publicId') + "?action=resurect",
        type: "PUT",
        data: '',
        dataType: "json"
      }).then((function(success) {
        Ember.Logger.log('Ajax: success');
        return success;
      }), function(error) {
        Ember.Logger.log('Ajax: error');
        return error;
      }));
    });
  },  

  loadRefset: function(publicId, _this) {
    return Ember.Deferred.promise(function(p) {
      var refset;
      return p.resolve($.getJSON(ENV.APP.apiBaseUrl + '/' + publicId).then(function(res) {
        refset = Ember.Object.create(res);
        Ember.Logger.log("res: " + res);
        _this.set('refset', refset);
        return refset;
      }));
    });
  }
});

export default Refset;
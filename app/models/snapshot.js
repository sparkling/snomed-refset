import toEmberObject from 'appkit/utils/to_ember_object';
import toType from 'appkit/utils/to_type';

//var baseUrl = 'https://refset-api.snomedtools.info/refsets';
var baseUrl = 'http://localhost:8080/refsets';

var Snapshot = Ember.Object.extend({
  title: '',
  description: '',
  publicId: '',
  file: undefined,
  fileType: undefined,
});

Snapshot.reopenClass({

  import: function(snapshot, refset, _this){
    var result;

    var form = document.getElementById('form-id');
    var formData = new window.FormData(form);
    var fileInput = document.getElementById('file-id');
    var file = fileInput.files[0];
    
    if (file !== undefined) {
      formData.append('file', file);
    }
    
    if (snapshot.get('fileType') !== undefined) {
      formData.append('fileType', snapshot.get('fileType'));
    }
    
    //formData.append('our-file', file);
    //formData.append('title', snapshot.get('title'));
    //formData.append('description', snapshot.get('description'));
    //formData.append('publicId', snapshot.get('publicId'));
    //formData.append('fileType', snapshot.get('fileType'));

    Ember.Logger.log('publicId: \'' + snapshot.get('publicId') + '\'');

    result = Ember.Object.create({});
    Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        url: baseUrl + '/' + refset.get('publicId') + '/snapshots',
        type: "POST",
        processData: false,
        contentType: false,
        data: formData
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
        $('#' + _this.get('importModalid')).modal('hide');
        _this.get('model').pushObject(snapshot);
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
        _this.get('controllers.snapshots.model').pushObject(snapshot);
        _this.transitionToRoute('snapshots', refset);
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
  getSnapshot: function(refsetId, snapshotId, _this) {
    var result;
    Ember.Logger.log('Getting snapshot for refset ' + refsetId + " and snapshot " + snapshotId);
    result = Ember.Object.create({});
    Ember.Deferred.promise(function(p) {
      return p.resolve($.ajax({
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "application/json; charset=utf-8"
        },
        url: baseUrl + '/' + refsetId + '/snapshot/' + snapshotId + '.json',
        type: "GET",
        data: '',
        dataType: "json"
      }).then((function(success) {
        Ember.Logger.log('success: ' + JSON.stringify(success));
        Ember.Logger.log('snapshot: ' + JSON.stringify(success));
        var jsParsed = success;
        Ember.Logger.log('JSON parsed: ' + JSON.stringify(jsParsed));
        var snapshot = toEmberObject(jsParsed);
        Ember.Logger.log('after toEmber: ' + JSON.stringify(snapshot));
        //return result.setProperties(parsed);
        //This should be passed in as a success function instead
        //Does not belong here
        //_this.get('controllers.concepts.model').pushObject(snapshot);
        //_this.transitionToRoute('plan.edit', snapshot);
        return result.setProperties(snapshot);
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
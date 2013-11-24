var Refset = Ember.Object.extend({});

Refset.reopenClass({
  loadRefset: function(publicId, _this) {
    return Ember.Deferred.promise(function(p) {
      var refset;
      refset = _this.get('refset');
      if (refset != null) {
        return p.resolve(refset);
      }
      return p.resolve($.getJSON('http://localhost:8080/refsets/api/refsets/' + publicId).then(function(res) {
        refset = Ember.Object.create(res);
        Ember.Logger.log("res: " + res);
        _this.set('refset', refset);
        return refset;
      }));
    });
  }
});

export default Refset;
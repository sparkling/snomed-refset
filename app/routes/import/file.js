export default Ember.Route.extend({

  model: function(){
    var model = Ember.Object.create();
    model.set('fileType', 'USE_EXTENSION');
    return model;
  },
});
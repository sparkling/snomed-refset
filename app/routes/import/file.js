import Member from 'appkit/models/member';

export default Ember.Route.extend({

  model: function(){
    var model = Ember.Object.create();
    model.set('fileType', 'USE_EXTENSION');
    return model;
  },

  //model: function(){
  //  model = Ember.Object.create();
  //  model.set('fileType', 'USE_EXTENSION');
  //  return model;    
  //}

  //afterModel: function(model){
  //  model.set('fileType', 'USE_EXTENSION');
  //}

//  setupController: function (controller, model) {
//    Ember.Logger.log("MODEL: " + model);
//    this._super(controller, model);
//  }
  //  var
  //  this._super(controller, model);
  //}  
});
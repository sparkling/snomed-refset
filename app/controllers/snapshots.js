import Snapshot from 'appkit/models/snapshot';

export default Ember.ArrayController.extend({
  needs: "refset",
  refset: Ember.computed.alias("controllers.refset.model"),
  actions:{
    gosnapshot: function (snapshot){
      var snapshotId = snapshot.get('publicId');
      Ember.Logger.log('Handling gosnapshots with snapshot: ' + JSON.stringify(snapshot));
      //snapshot = Snapshot.getSnapshot(this.get('controllers.refset.model').get('publicId'), snapshotId, this);

      //hm, observations:
      //1. link-to in handlebars does not call the model hook on the router
      //2. I have added this hack (see LinkView extension in app.js): http://goo.gl/AdRSGS
      //3. Using transitionToRoute DOES call the model hook, apparently
      this.transitionToRoute('snapshot', snapshotId); 
    }
  } 
});


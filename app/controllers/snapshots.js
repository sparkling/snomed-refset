import Snapshot from 'appkit/models/snapshot';

export default Ember.ArrayController.extend({
  needs: "refset",
  refset: Ember.computed.alias("controllers.refset.model"),
  importModalid: 'import-snapshot',
  error: '',

  fileTypes: [
    {label:"Auto Detect", id:"USE_EXTENSION"},
    {label:"JSON", id:"JSON"},
    {label:"XML",  id:"XML"},
    //{label:"List", id:"LIST"},
    {label:"RF2",  id:"RF2"},
  ],  
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
    },
    resetImport: function() {
      var fileInput = $('#file-id');
      fileInput.val('');
      var blank = Snapshot.create();
      blank.set('fileType', 'USE_EXTENSION');
      this.set('snapshot', blank);
      this.set('error', '');
    },
    import: function(){
      Ember.Logger.log('Handling event import');
      return this.set('error', Snapshot.import(this.get('snapshot'), this.get('refset'), this));
    }
  }
});


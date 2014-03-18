import Member from 'appkit/models/member';
import Alert from 'appkit/models/alert';

export default Ember.Controller.extend({
  error: '',
  alert: '',
  needs: 'refset',

  fileTypes: [
    {label:"Auto Detect", id:"USE_EXTENSION"},
    {label:"JSON",        id:"JSON"},
    {label:"XML",         id:"XML"},
    {label:"RF2",         id:"RF2"},
  ],    

  actions: { 
    addConcept: function(event){
      if (event.added){
        var m = Member.create();
        m.set('component', event.added.id);
        m.set('title', event.added.title);
        m.set('effective', window.moment().format("YYYYMMDD"));
        this.get('model').pushObject(m);
      }
    },
    import: function(){
      Ember.Logger.log("Attempting to import file");
      var alert = Alert.create();
      Member.import(this.get('model.fileType'), this.get('controllers.refset.model.publicId'), alert, this);
    }  
  }
});
import Member from 'appkit/models/member';
import Alert from 'appkit/models/alert';

export default Ember.ArrayController.extend({
  error: '',
  alert: '',
  needs: 'refset',

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
      var alert = Alert.create();
      Member.addMembers(this.get('model'), this.get('controllers.refset.model.publicId'), alert, this);
    }  
  }
});
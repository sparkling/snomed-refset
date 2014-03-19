import Alert from 'appkit/models/alert';
import Member from 'appkit/models/member';


export default Ember.ArrayController.extend({
  deleteResponse: '',
  needs: 'refset',

  showComponent: true,
  showIdentifier: false,
  showInactive: true,
  showEffective: true,
  showModule: true,

  actions: {
    delete: function(member){
      Ember.Logger.log("deleting member " + JSON.stringify(member));
      var alert = Alert.create();
      this.set('deleteResponse', Member.delete(this.get('controllers.refset.model.publicId'), member, alert, this));
      this.get('model').removeObject(member);      
    }
  }
});
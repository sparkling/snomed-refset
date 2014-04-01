import Version from 'appkit/models/version';
import Alert   from 'appkit/models/alert';
import Member  from 'appkit/models/member';
import baseUrl from 'appkit/utils/baseurl';

export default Ember.ObjectController.extend({
  needs: 'refset',
  alert: '',
  members: '',
  refsetName: Ember.computed.alias('controllers.refset.model.publicId'),
  refset: Ember.computed.alias('controllers.refset.model'),
  showDeleteMember: false,

  //DOWNLOAD LINKS
  downloadJsonUrl: function(){
    return baseUrl() + '/' + this.get('refsetName') + '/members/' + this.get('refsetName') + '.unversioned.json';
  }.property('refsetName'),

  downloadXmlUrl: function(){
    return baseUrl() + '/' + this.get('refsetName') + '/members/' + this.get('refsetName') + '.unversioned.xml';
  }.property('refsetName'),

  downloadRf2Url: function(){
    return baseUrl() + '/' + this.get('refsetName') + '/members/' + this.get('refsetName') + '.unversioned.rf2';
  }.property('refsetName'), 

  //ACTIONS
  actions: {
    sortMembers: function(sortBy, sortOrder){
      Ember.Logger.log('Sorting by ' + sortBy + ' ' + sortOrder);
      this.set('members', 
        Version.getMembers(this.get('refsetName'), this.get('model.snapshot.publicId'), sortBy, sortOrder, this));
    }
  }
});
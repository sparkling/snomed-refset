import Version from 'appkit/models/version';
import Alert   from 'appkit/models/alert';
import Member  from 'appkit/models/member';
import baseUrl from 'appkit/utils/baseurl';

export default Ember.ObjectController.extend({
  needs:            'refset',
  alert:            undefined,
  members:          '',
  refsetName:       Ember.computed.alias('controllers.refset.model.publicId'),
  refset:           Ember.computed.alias('controllers.refset.model'),
  showDeleteMember: false,

  downloadPopupText: function(){
    return 'Download ' + this.get('snapshot.size') + ' members as ...';
  }.property('snapshot.size'),

  //DOWNLOAD LINKS
  downloadJsonUrl: function(){
    return baseUrl() + '/' + this.get('refsetName') + '/version/' + this.get('snapshot.publicId') + '/' + this.get('refsetName') + '.version.' + this.get('publicId') + '.json';
  }.property('refsetName', 'snapshot.publicId'),

  downloadXmlUrl: function(){
    return baseUrl() + '/' + this.get('refsetName') + '/version/' + this.get('snapshot.publicId') + '/' + this.get('refsetName') + '.version.' + this.get('publicId') + '.xml';
  }.property('refsetName', 'snapshot.publicId'),

  downloadRf2Url: function(){
    return baseUrl() + '/' + this.get('refsetName') + '/version/' + this.get('snapshot.publicId') + '/' + this.get('refsetName') + '.version.' + this.get('publicId') + '.rf2';
  }.property('refsetName', 'snapshot.publicId'),  

  //ACTIONS
  actions: {
    sortMembers: function(sortBy, sortOrder){
      Ember.Logger.log('Sorting by ' + sortBy + ' ' + sortOrder);
      this.set('members', 
        Version.getMembers(this.get('refsetName'), this.get('model.snapshot.publicId'), sortBy, sortOrder, this));
    }
  }
});
import Version from 'appkit/models/version';
import Alert from 'appkit/models/alert';
import Member from 'appkit/models/member';
import baseUrl from 'appkit/utils/baseurl';

export default Ember.ObjectController.extend({
  needs: 'refset',
  alert: '',
  members: '',
  refsetName: Ember.computed.alias('controllers.refset.model.publicId'),
  refset: Ember.computed.alias('controllers.refset.model'),
  showDeleteMember: false,

  //DOWNLOAD LINKS
  downloadPopupText: function(){
    return 'Download ' + this.get('size') + ' members as ...';
  }.property('size'),

  downloadJsonUrl: function(){
    return baseUrl() + '/' + this.get('refsetName') + '/version/' + this.get('model.publicId') + '/' + this.get('refsetName') + '.version.' + this.get('publicId') + '.json';
  }.property('refsetName', 'publicId'),

  downloadXmlUrl: function(){
    return baseUrl() + '/' + this.get('refsetName') + '/version/' + this.get('model.publicId') + '/' + this.get('refsetName') + '.version.' + this.get('publicId') + '.xml';
  }.property('refsetName', 'publicId'),

  downloadRf2Url: function(){
    return baseUrl() + '/' + this.get('refsetName') + '/version/' + this.get('model.publicId') + '/' + this.get('refsetName') + '.version.' + this.get('publicId') + '.rf2';
  }.property('refsetName', 'publicId'), 

  //ACTIONS
  actions: {
    sortMembers: function(sortBy, sortOrder){
      Ember.Logger.log('Sorting by ' + sortBy + ' ' + sortOrder);
      this.set('members', Version.getMembers(this.get('refsetName'), this.get('model.publicId'), sortBy, sortOrder, this));
    }
  }
});
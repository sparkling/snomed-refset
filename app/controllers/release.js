import Version from 'appkit/models/version';
import Alert   from 'appkit/models/alert';
import Member  from 'appkit/models/member';
import baseUrl from 'appkit/utils/baseurl';

export default Ember.ObjectController.extend({
  needs:            'refset',
  alert:            '',
  members:          '',
  sortyBy:          undefined, 
  sortOrder:        undefined,  
  showDeleteMember: false,
  pageSize:         10, //how many items are displayed on one page?s


  refsetName:       Ember.computed.alias('controllers.refset.model.publicId'),
  refset:           Ember.computed.alias('controllers.refset.model'),

  //DOWNLOAD LINKS
  downloadPopupText: function(){
    return 'Download ' + this.get('snapshot.size') + ' members as ...';
  }.property('snapshot.size'),

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
      this.set('sortBy', sortBy);
      this.set('sortOrder', sortOrder);
      var _this = this;
      Version.getMembers(this.get('refsetName'), this.get('model.snapshot.publicId'), sortBy, sortOrder, 0, this.get('pageSize'), this).
        then(function(members){
          _this.set('members', members);
        });      
    },

    page: function(page){
      Ember.Logger.log('Displaying page ' + page);
      var _this = this;
      Version.getMembers(this.get('refsetName'), this.get('model.snapshot.publicId'), this.get('sortBy'), this.get('sortOrder'), page - 1, this.get('pageSize'), this).
        then(function(members){
          _this.set('members', members);
        });
    },     
  }
});
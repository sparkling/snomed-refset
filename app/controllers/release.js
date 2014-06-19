import Version from '../models/version';

export default Ember.ObjectController.extend({
  needs:            'refset',
  alert:            '',
  membersPage:      '',
  sortyBy:          undefined, 
  sortOrder:        undefined,  
  filter:           '',
  showDeleteMember: false,
  pageSize:         10, //how many items are displayed on one page?s


  refsetName:       Ember.computed.alias('controllers.refset.model.publicId'),
  refset:           Ember.computed.alias('controllers.refset.model'),

  //DOWNLOAD LINKS
  downloadPopupText: function(){
    return 'Download ' + this.get('snapshot.size') + ' members as ...';
  }.property('snapshot.size'),

  downloadJsonUrl: function(){
    return ENV.APP.apiBaseUrl + '/' + this.get('refsetName') + '/version/' + this.get('snapshot.publicId') + '/' + this.get('refsetName') + '.version.' + this.get('snapshot.publicId') + '.json';
  }.property('refsetName', 'snapshot.publicId'),

  downloadXmlUrl: function(){
    return ENV.APP.apiBaseUrl + '/' + this.get('refsetName') + '/version/' + this.get('snapshot.publicId') + '/' + this.get('refsetName') + '.version.' + this.get('snapshot.publicId') + '.xml';
  }.property('refsetName', 'snapshot.publicId'),

  downloadRf2Url: function(){
    return ENV.APP.apiBaseUrl + '/' + this.get('refsetName') + '/version/' + this.get('snapshot.publicId') + '/' + this.get('refsetName') + '.version.' + this.get('snapshot.publicId') + '.rf2';
  }.property('refsetName', 'snapshot.publicId'),  

  //ACTIONS
  actions: {
    sortMembers: function(sortBy, sortOrder){
      Ember.Logger.log('Sorting by ' + sortBy + ' ' + sortOrder);
      this.set('sortBy', sortBy);
      this.set('sortOrder', sortOrder);
      var _this = this;
      Version.getMembers(this.get('refsetName'), this.get('model.snapshot.publicId'), sortBy, sortOrder, this.get('filter'), 0, this.get('pageSize'), this).
        then(function(membersPage){
          _this.set('membersPage', membersPage);
        });
    },

    changePage: function(page){
      Ember.Logger.log('Displaying page ' + page);
      var _this = this;
      Version.getMembers(this.get('refsetName'), this.get('model.snapshot.publicId'), this.get('sortBy'), this.get('sortOrder'), this.get('filter'), page - 1, this.get('pageSize'), this).
        then(function(membersPage){
          _this.set('membersPage', membersPage);
        });
    },     

    doFilter: function(term){
      Ember.Logger.log('Filter by ' + term);
      this.set('filter', term);
      var _this = this;
      Version.getMembers(this.get('refsetName'), this.get('model.snapshot.publicId'), this.get('sortBy'), this.get('sortOrder'), term, 0, this.get('pageSize'), this).
        then(function(membersPage){
          _this.set('membersPage', membersPage);
        });
    },

  }
});
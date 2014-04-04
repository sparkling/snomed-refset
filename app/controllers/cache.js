import Cache from 'appkit/models/cache';

export default Ember.ObjectController.extend({
  members: '',
  versions: '',
  releases: ''

  //actions: {
  //  dirtyMembersCache: function(){
  //    Ember.Logger.log('Flush members cache');
  //    this.get('members').clear();
  //  },
  //  isMembersEmpty: function(){
  //    return this.get('members').length === 0;
  //  },
  //  populateMembers: function(members){
  //    this.dirtyMembersCache();
  //    Ember.Logger.log('Popuate members cache');
  //    this.get('members').pushObjects(members);
  //  }
  //}
});


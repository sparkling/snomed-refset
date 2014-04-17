export default Ember.Component.extend({
  showDeleteMember: false,
  filter: '',
  members: '',

  //pagination
  displaySetSize: 10,         //how many page indexes are displayed at once?
  totalMembers: '',
  membersPage: '',

  //DISPLAY FIELD SELECTIONS
  showId: false,
  showComponent: true,
  showSctid: true,
  showInactive: true,
  showEffective: true,
  showModule: false,
  resetPagesSwitch: false,


  filterChange: function(){
      Ember.Logger.log('Detected change in filter');
      this.toggleProperty('resetPagesSwitch');
      this.sendAction('doFilter', this.get('filter'));
  }.observes('filter'),

  actions:{
    changePage: function(index){
      this.sendAction('changePage', index);
    },
    delete: function(member){
      Ember.Logger.log('delete member action handled in component');
      this.sendAction('deleteMember', member);
    },
    sort: function(sortBy, sortOrder){
      Ember.Logger.log('sort action handled in component');
      this.toggleProperty('resetPagesSwitch');
      this.sendAction('sortMembers', sortBy, sortOrder);
    }
  }

});
export default Ember.Component.extend({
  showDeleteMember: false,

  //pagination
  displaySetSize: 10,         //how many page indexes are displayed at once?

  //DISPLAY FIELD SELECTIONS
  showComponent: true,
  showSctid: true,
  showInactive: true,
  showEffective: true,
  showModule: false,
  totalItems: null,
  resetPagesSwitch: false,

  actions:{
    selectPage: function(index){
      //Ember.Logger.log('Handling pagination in the members-list');
      this.sendAction('page', index);
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
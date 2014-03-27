export default Ember.Component.extend({

  showDeleteMember: false,

  //DISPLAY FIELD SELECTIONS
  showComponent: true,
  showSctid: true,
  showInactive: true,
  showEffective: true,
  showModule: false,

  actions:{
    delete: function(member){
      Ember.Logger.log('delete member action handled in component');
      this.sendAction('deleteMember', member);
    },
    sort: function(sortBy, sortOrder){
      Ember.Logger.log('sort action handled in component');
      this.sendAction('sortMembers', sortBy, sortOrder);
    }
  }

});
export default Em.Component.extend({
  modalid: 'modal-box-not-set',
  actions: {
    selected: function(selected){
      Ember.Logger.log('SearchBox handling click: ' + JSON.stringify(selected));
      this.sendAction('action', selected);
    },    
    hideModal: function() {
      return this.set("isModalVisible", false);
    }
  }
});

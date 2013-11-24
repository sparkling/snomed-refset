export default Em.Component.extend({
  modalid: 'search-box-not-set',
  actions: {
    selected: function(selected){
      Ember.Logger.log('SearchBox handling click: ' + JSON.stringify(selected));
      Ember.Logger.log('Dismissing modal ' + this.get('modalid'));
      $('#' + this.get('modalid')).modal('hide');
      this.sendAction('action', selected);
    }
  }
});

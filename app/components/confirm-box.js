export default Ember.Component.extend({
    modalid: 'confirm-box-not-set',
    candidate: 'candidate-not-set',
    actions: {
      confirm: function(){
        this.sendAction('action', this.get('candidate'));
        this.set('candidate', '');
      },
      cancel: function(){
        this.set('candidate', '');
        //this.sendAction('action', this.get('candidate'), 'cancel');
      }
    }
});
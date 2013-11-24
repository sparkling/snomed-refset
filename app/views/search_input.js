export default Ember.View.extend({
  templateName: 'search-input',
    keyUp: function(evt) {
      //looks like current controller is textSearchController?
      //Or maybe it bubbles to it?
      Ember.Logger.log('sending search');
      this.get('controller').send('search', this.get('controller.query'));
    }
});
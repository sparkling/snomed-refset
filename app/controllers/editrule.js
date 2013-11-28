export default Ember.ObjectController.extend({
  actions:{
    type: function(type){
      Ember.Logger.log('handling event [type] with value: ' + type);
      this.set("type", type);
    },
  },
  hasType: function() {
    Ember.Logger.log('WAAAAH! Controller');
    return this.get('type') !== '';
  }.property('type'),
  isSetOperation: function(){
    var type = this.get('type');
    return (type === 'union') || (type === 'intersection') || (type === 'difference') || (type === 'symDifference');
  }.property('type')

});
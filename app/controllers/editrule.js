export default Ember.ObjectController.extend({
  needs: ["plan","editrule"],
  plan: Ember.computed.alias("controllers.plan.model"), 
  actions:{
    type: function(type){
      Ember.Logger.log('handling event [type] with value: ' + type);
      this.set("type", type);
    },
    left: function(rule){
      Ember.Logger.log('handling event [left] with value: ' + rule.id);
      this.set("left", rule.id);
    },
    right: function(rule){
      Ember.Logger.log('handling event [right] with value: ' + rule.id);
      this.set("right", rule.id);
    },
    list: function(){
      Ember.Logger.log('NOT handling event [list] with rule: ' + rule.id);
    }    
  },
  leftRule: function(){
    return this.get('controllers.plan.rules').findBy('id', this.get('left'));
  }.property('left'),
  rightRule: function(){
    return this.get('controllers.plan.rules').findBy('id', this.get('right'));
  }.property('right'),
  hasLeft: function() {
    return this.get('left') !== '';
  }.property('left'),  
  hasRight: function() {
    return this.get('right') !== '';
  }.property('right'),    
  hasType: function() {
    return this.get('type') !== '';
  }.property('type'),
  noType: function(){
    return this.get('type') === '';
  }.property('type'),
  isSetOperation: function(){
    var type = this.get('type');
    return (type === 'UNION') || (type === 'INTERSECTION') || (type === 'DIFFERENCE') || (type === 'SYMDIFFERENCE');
  }.property('type'),
  isListOperation: function(){
    var type = this.get('type');
    return (type === 'LIST');
  }.property('type'),

});
export default Ember.ObjectController.extend({
  needs: ["plan"],
  plan: Ember.computed.alias("controllers.plan.model"), 
  isSetOperation: function(){
    var type = this.get('type');
    return (type === 'UNION') || (type === 'INTERSECTION') || (type === 'DIFFERENCE') || (type === 'SYMDIFFERENCE');
  }.property('type'),  
  isListOperation: function(){
    var type = this.get('type');
    return (type === 'LIST');
  }.property('type'),
  isTerminal: function(){
    return this.get('plan.terminal') === this.get('id');
  }.property('refset.terminal'),
  emptyType: function(){
    return (this.get('type') === 'NOT_SET');
  }.property('type') ,
  leftRule: function(){
    return this.get('controllers.plan.rules').findBy('id', this.get('left'));
  }.property('left'),
  rightRule: function(){
    return this.get('controllers.plan.rules').findBy('id', this.get('right'));
  }.property('right'),  
});
export default Ember.ObjectController.extend({
  needs: ["plan","editrule"],
  plan: Ember.computed.alias("controllers.plan.model"), 
  actions:{
    resetType: function(){
      Ember.Logger.log('handling event [edit]');
      this.set('type', '');
    },
    delete: function(){
      Ember.Logger.log('handling event [delete]');
      this.get('plan.rules').removeObject(this.get('model'));
    },
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
      Ember.Logger.log('NOT handling event [list]');
    }
  },
  isEdit: function(){
    Ember.Logger.log('WAAAAH!!' + this.get('controllers.plan.isEdit'));
    return this.get('controllers.plan.isEdit');
  }.property(),
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
  isTerminal: function(){
    Ember.Logger.log('Handling isTerminal');
    Ember.Logger.log('plan.terminal: ' + this.get('plan.terminal'));
    Ember.Logger.log('this rule id: ' + this.get('id'));
    return this.get('plan.terminal') === this.get('id');
  }.property('refset.terminal'),
  emptyType: function(){
    return (this.get('type') === '');
  }.property('type')

});
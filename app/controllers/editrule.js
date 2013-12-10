import Alert from 'appkit/models/alert';

export default Ember.ObjectController.extend({
  needs: ["plan","plan/edit", "editrule"],
  plan: Ember.computed.alias("controllers.plan.model"), 
  planEditController: Ember.computed.alias("controllers.plan/edit"), 
  validationResult: Ember.computed.alias("controllers.plan/edit.validationResult"), 
  fieldErrors: Ember.computed.alias("controllers.plan/edit.validationResult.fieldErrors"), 

  actions:{
    resetType: function(){
      Ember.Logger.log('handling event resetType');
      var alert = Alert.create();
      var rule = this.get('model');
      alert.set('action', 'PARAM_CHANGE');
      alert.set('entity', rule);
      alert.set('paramName', 'type');
      alert.set('paramValue', rule.get('type'));
      
      //var formatted = Ember.Handlebars.helpers.showRule.call(rule);
      alert.set('message', "Succesfully Reset Rule " + rule.get('id'));// + ': ' + formatted);
      
      this.set('type', 'NOT_SET');
      this.get('controllers.plan').set('alert', alert);
      this.get('planEditController').dirty();
    },
    delete: function(){
      Ember.Logger.log('handling event [delete]');
      var rule = this.get('plan.rules').findBy('id', this.get('model.id'));
      var oldIndex = this.get('plan.rules').indexOf(rule, 0);
      this.get('plan.rules').removeObject(rule);
      var alert = Alert.create();
      alert.set('action', 'DELETE');
      alert.set('entity', rule);
      alert.set('collectionIndex', oldIndex);
      alert.set('message', "Succeffully Deleted Rule " + rule.get('id'));
      this.set('controllers.plan.alert', alert);
      this.get('planEditController').dirty();
    },
    type: function(type){
      Ember.Logger.log('handling event [type] with value: ' + type);
      this.set("type", type);
      this.get('planEditController').dirty();
    },
    left: function(rule){
      Ember.Logger.log('handling event [left] with value: ' + rule.id);
      this.set("left", rule.id);
      this.get('planEditController').dirty();
    },
    right: function(rule){
      Ember.Logger.log('handling event [right] with value: ' + rule.id);
      this.set("right", rule.id);
      this.get('planEditController').dirty();
    },
    list: function(){
      Ember.Logger.log('handling event [list]');
    }
  },
  fErrors: function(){
      var errors = this.get('validationResult.fieldErrors');
      var ruleId = this.get('id');
      if (errors === undefined){
        //Ember.Logger.log('No field errors found at all');
        return '';
      }
      if (errors.get(ruleId.toString()) === undefined){
        //Ember.Logger.log('No field errors found for rule ' + ruleId);
        return '';
      }
      Ember.Logger.log('We have a field error for rule ' + ruleId);
      return errors.get(ruleId.toString());

  }.property('validationResult.fieldErrors'),
  isEdit: function(){
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
    return this.get('plan.terminal') === this.get('id');
  }.property('refset.terminal'),
  emptyType: function(){
    return (this.get('type') === 'NOT_SET');
  }.property('type')

});
export default Ember.ObjectController.extend({
  needs: ["plan","editrule"],
  model: Ember.computed.alias("controllers.plan.model"),
  counter: -1,
  selectConceptsModalId: 'selectConceptsModalId',
  editRule: '',
  plan: Ember.computed.alias("controllers.plan.model"), 
  actions:{ 
    undo: function(){
      Ember.Logger.log('Handling undo event in select concepts component');
      
      var alert = this.get('plan.alert');
      Ember.Logger.log('alert: ' + alert);
      if (alert === undefined){
        Ember.Logger.log('alert box is empty. This should not happen. Not handling event');
        return;
      }
      
      var entity = alert.get('entity');
      Ember.Logger.log('entity: ' + entity);
      if (entity === undefined){
        Ember.Logger.log('alert entity is empty. This should not happen. Not handling event');
        return;
      }

      var action = alert.get('action');
      Ember.Logger.log('action: ' + action);  
      if (action === undefined){
        Ember.Logger.log('alert action is empty. This should not happen. Not handling event');
        return;
      }

      var collectionIndex = alert.get('collectionIndex');
      Ember.Logger.log('collectionIndex: ' + collectionIndex); 

      if (action === 'DELETE'){
        if (collectionIndex !== undefined){
          this.get('model.rules').insertAt(collectionIndex, entity);
        }else{
          this.get('model.rules').pushObject(entity);
        }
      } else if (action === 'PARAM_CHANGE'){
        var paramName = alert.get('paramName');
        var paramValue = alert.get('paramValue');
        var newRule = this.get('controllers.plan.rules').findBy('id', entity.get('id'));
        newRule.set(paramName, paramValue);
      } else{
        Ember.Logger.log('Failed to handle undo action ' + action + ' for entity ' + entity);
      }
      this.set('plan.alert', undefined);
    },
    showlist: function(rule){ 
        Ember.Logger.log('Handling showlist event in select concepts component');
        //Ember.Logger.log('Rendering components/select-concepts');
        //this.render('components/select-concepts', { into: 'application', outlet: 'modal' });
        //Ember.Logger.log('Rendering components/select-concepts complete');
        Ember.Logger.log('setting editRule to ' + JSON.stringify(rule));
        this.set('editRule', rule);
        Ember.Logger.log('modal id: ' + this.get('selectConceptsModalId'));
        $('#' + this.get('selectConceptsModalId')).modal('show');
    },    
    addrule: function(){
      Ember.Logger.log('Handling event [addRule]');
      var counter = this.get('counter');
      var rule = Ember.Object.extend({
        id: counter,
        type: '',
        left: '',
        right: '',
        concepts: Ember.A()
      }).create();
      this.set('counter', --counter);
      this.get('model.rules').pushObject(rule);
    },  
    newrule: function(){
      Ember.Logger.log('handling [newrule] in plan.edit');
      var rule = Ember.Object.extend({
        id: '',
        type: '',
        left: '',
        right: '',
        concepts: Ember.A()
      }).create();
      this.get("controllers.editrule").set("model", rule);
    },
    edit: function(rule){
      Ember.Logger.log('handling [edit] in plan.edit with rule: ' + JSON.stringify(rule));
      Ember.Logger.log('model is: ' + JSON.stringify(this.get('model')));
      var rules = this.get('model.rules');
      var i = 0;
      var leftSolved = false;
      var rightSolved = false;
      while (i < rules.length) {
        if (rule.left === rules[i].id){
          Ember.Logger.log('LEFT HIT!!!');
          this.get("controllers.editrule").set("leftRule", rules[i]);          
          leftSolved = true;
        }
        if (rule.right === rules[i].id){
          Ember.Logger.log('RIGHT HIT!!!');
          this.get("controllers.editrule").set("rightRule", rules[i]);          
          rightSolved = true;
        }      
        if (leftSolved && rightSolved)  {
          Ember.Logger.log('DONE!!!');
        }
        ++i;
      }
      Ember.Logger.log('SETTING MODEL!!!');
      this.get("controllers.editrule").set("model", rule);
    }
  }
});


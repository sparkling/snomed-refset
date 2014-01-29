import Refset from 'appkit/models/refset';
import Alert from 'appkit/models/alert';

export default Ember.ObjectController.extend({
  needs: ["plan", "editrule", "refset"],
  model: Ember.computed.alias("controllers.plan.model"),
  counter: -1,
  selectConceptsModalId: 'selectConceptsModalId',
  editRule: '',
  validationResult: '',
  fieldErrors: Ember.computed.alias('validationResult.fieldErrors'),
  globalErrors: Ember.computed.alias('validationResult.globalErrors'),
  plan: Ember.computed.alias("controllers.plan"), 
  refset: Ember.computed.alias("controllers.refset"), 
  isDirty: false,

  isValid: function(){
    Ember.Logger.log('in isInvalid');
    Ember.Logger.log('validationResult: ' + this.get('validationResult'));
    Ember.Logger.log('validationResult.status: ' + this.get('validationResult.status'));
    if (this.get('validationResult.status') !== ''){
      return (this.get('validationResult.status') === 'VALIDATED');
    }
    return false;
  }.property('validationResult.status'),

  dirty: function(){
    Ember.Logger.log('clearing validation result');
    this.set('validationResult', '');
    this.set('isDirty', true);
  },

  actions:{ 
    save: function(){
      var plan = this.get('model');
      Ember.Logger.log('handling save event');
      var publicId = this.get('refset.publicId');
      Ember.Logger.log('public id: ' + publicId);
      var alert = Alert.create();
      alert.set('action', 'SAVE');
      alert.set('entity', plan);
      alert.set('showUndo', false);
      var response = Refset.savePlan(plan, publicId, alert);
      this.set('model', response);
      this.set('controllers.plan.alert', alert);
      this.dirty();
    },
    validate: function(){
      Ember.Logger.log('Handling validate event');
      var response = Refset.validatePlan(this.get('model'));
      this.set('validationResult', response);
    },
    dismiss: function(){
      Ember.Logger.log('Handling dismiss event in select concepts component');
      this.set('plan.alert', '');
    },
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
      this.dirty();
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
      Ember.Logger.log('counter is ' + counter);
      var rule = Ember.Object.extend({
        id: counter,
        type: 'NOT_SET',
        left: '',
        right: '',
        concepts: Ember.A()
      }).create();
      rule.set("id", counter);
      rule.set("type", "NOT_SET");
      rule.set("concepts", Ember.A());
      Ember.Logger.log('Created rule ' + JSON.stringify(rule));
      this.set('counter', --counter);
      this.get('model.rules').pushObject(rule);
      this.dirty();
    }
  }
});


export default Ember.ObjectController.extend({
  needs: ["plan","editrule"],
  model: Ember.computed.alias("controllers.plan.model"),
  counter: -1,
  selectConceptsModalId: 'selectConceptsModalId',
  editRule: '',
  actions:{
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


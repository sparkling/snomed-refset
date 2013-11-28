export default Ember.ObjectController.extend({
  needs: ["plan","editrule"],
  model: Ember.computed.alias("controllers.plan.model"),
  actions:{
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
    }
  }
});


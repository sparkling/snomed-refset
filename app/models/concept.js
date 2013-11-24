export default Ember.Object.extend({
    stylingClass: function(){
      if (this.get('active')){
        return 'active';
      }
      else{
        return 'inactive';
      }
    }.property('active'),
    id: null,
    ontologyId: null,
    title: null,
    active: null,
    effectiveTime: null,
    url: function(){
      return "http://browser.snomedtools.com/version/1/concept/" + this.get('id');
    }.property('id')
  });
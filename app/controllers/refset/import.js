import Member from 'appkit/models/member';
import Alert from 'appkit/models/alert';

export default Ember.ArrayController.extend({
  response: '',
  alert: '',
  needs: 'refset',
  displayTab: 'search',

  showSearchTab: function(){
    return this.get('displayTab') === 'search';
  }.property('displayTab'),
  showFileTab: function(){
    return this.get('displayTab') === 'file';
  }.property('displayTab'),
  showRefsetTab: function(){
    return this.get('displayTab') === 'refset';
  }.property('displayTab'),


  actions: {
    setTabFile: function(){
      this.set('displayTab', 'file');
      $('#search-tab').removeClass('active');
      $('#refset-tab').removeClass('active');
      $('#file-tab').addClass('active');
    },
    setTabRefset: function(){
      this.set('displayTab', 'refset');
      $('#search-tab').removeClass('active');
      $('#refset-tab').addClass('active');
      $('#file-tab').removeClass('active');
    },
    setTabSearch: function(){
      this.set('displayTab', 'search');
      $('#search-tab').addClass('active');
      $('#refset-tab').removeClass('active');
      $('#file-tab').removeClass('active');
    },    
    addConcept: function(event){
      if (event.added){
        var m = Member.create();
        m.set('component', event.added.id);
        m.set('title', event.added.title);
        m.set('effective', window.moment().format("YYYYMMDD"));
        this.get('model').pushObject(m);
      }
    },
    import: function(){
      var alert = Alert.create();
      Member.addMembers(this.get('model'), this.get('controllers.refset.model.publicId'), alert, this);
    }
  }

});
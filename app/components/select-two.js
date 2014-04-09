export default Ember.Component.extend({
  layoutName: 'select2',
  identifier: 'identifier-must-be-set',
  searchType: 'full',
  version_flavour: '',
  version_date: '',
  displayHelp: false,

  isFullSearch: function(){
    return this.get('searchType') === 'full';
  }.property('searchType'),

  isSmartSearch: function(){
    return this.get('searchType') === 'smart';
  }.property('searchType'),

  change: function(event){
    Ember.Logger.log('Sending default action with event ' + event);
    this.sendAction('action', event);
  },

  actions:{
    setFullSearch: function(){
      this.set('searchType', 'full');
      Ember.run.later(this, function() {
        window.Foundation.libs.dropdown.close($('#' + this.get('identifier')));    
      }, 750);
    },

    setSmartSearch: function(){
      this.set('searchType', 'smart');
      Ember.run.later(this, function() {
        window.Foundation.libs.dropdown.close($('#' + this.get('identifier')));    
      }, 750);
    },

    displayHelp: function(){
      this.set('displayHelp', true);
      Ember.run.later(this, function() {
        window.Foundation.libs.dropdown.close($('#' + this.get('identifier')));    
      }, 500);      
    },

    closeHelp: function(){
      this.set('displayHelp', false);
    },
  },


  didInsertElement: function() {
    Ember.run.scheduleOnce('afterRender', this, 'processChildElements');
  },
 
  processChildElements: function() {
    Ember.Logger.log('When: ' + this.get('searchType'));
    var _this = this;
    this.$('.concept-select2').select2({
      width: '100%',
      placeholder: 'Select from Snomed',
      minimumInputLength: 1,
      allowClear: true,
      quietMillis: 100,
      formatResult: function(doc){
        var status = "active";
        if (doc.active === false){
          status = "inactive";
        }

        return '<span class="' + status + '">' + 
                  '<div class="title">' + doc.title + '</div>' + 
                  '<div class="attributes">' + 
                    '<span class="id">' + doc.id + '</span>' + 
                    '<span class="effective">' +  window.moment(doc.effectiveTime, "YYYYMMDD").format('MMMM Do, YYYY') + '</span>' + 
                  '</div>' + 
                '</span>';
        
      },
      formatSelection: function(doc){
        return doc.title;
      },
      ajax: {
          url: "https://solr.sparklingideas.co.uk/solr/concept/select",
          dataType: 'jsonp',
          params: {jsonp: 'json.wrf'},
          data: function (term, page) {
              Ember.Logger.log('In data. Page is ' + page);
              var field = (_this.get('searchType') === 'smart') ? 'title' : 'exact_title';
              var modifiedTerm = term;
              var sort = '';
              if (_this.get('searchType') === 'full'){
                modifiedTerm = modifiedTerm.replace(/\ /g, "\\ ");
                Ember.Logger.log('Original: ' + term + ", modified: " + modifiedTerm);
                modifiedTerm = modifiedTerm + '*';
                sort = 'title_length asc';
              }
              Ember.Logger.log('Field is ' + field + '. Query is ' + modifiedTerm);
              return {
                  //q: field + ':' + modifiedTerm + ' AND active:true',
                  q: field + ':' + modifiedTerm + ' AND active:true AND version_flavour:' + _this.get('version_flavour') + ' AND version_date:' + _this.get('version_date'),
                  start: (page - 1) * 10,
                  sort: sort,
                  rows: 10,
                  wt: 'json',
                  indent: true
              };
          },
          results: function (data, page) {
            Ember.Logger.log('In results. Page is ' + page);
            var more = (page * 10) < data.response.numFound;
            return {results: data.response.docs, more: more};
          }
      },      
    });
  } 
});
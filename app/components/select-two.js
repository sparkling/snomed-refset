export default Ember.Component.extend({
  layoutName: 'select2',

  change: function(event){
    Ember.Logger.log('Sending default action with event ' + event);
    this.sendAction('action', event);
  },

  didInsertElement: function() {
    Ember.run.scheduleOnce('afterRender', this, 'processChildElements');
  },

  processChildElements: function() {
    this.$('.concept-select2').select2({
      width: '100%',
      placeholder: 'Select from Snomed',
      minimumInputLength: 1,
      allowClear: true,
      //multiple: true,
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
              return {
                  q: 'title:' + term,
                  start: (page - 1) * 10,
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
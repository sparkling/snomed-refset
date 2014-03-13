import Concept from 'appkit/models/concept';

export default Ember.View.extend({
  templateName: 'select2',

  change: function(event){
    //alert('change');
    if (event.removed){
      //alert('removed: [' + event.removed.id + ']');
    }
    else{
      var c = Concept.create();
      c.set('id', event.added.id);
      this.set('refsetConcept', c);
      //alert('concept: ' + JSON.stringify(this.get('refsetConcept')));
      //alert('changed to: ' + event.added.text + ' [' + event.added.id + ']');
    }
  },



  didInsertElement: function() {
    Ember.run.scheduleOnce('afterRender', this, 'processChildElements');
  },

  processChildElements: function() {
    //easy dropdown
    //this.$('select.dropdown').easyDropDown({});

    //select2
    this.$('#refset-concept-select').select2({
      width: '100%',
      placeholder: 'Select from Snomed',
      minimumInputLength: 1,
      allowClear: true,
      //multiple: true,
      quietMillis: 100,
      formatResult: function(doc){
        return doc.title;// + '[' + doc.id + ']';
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
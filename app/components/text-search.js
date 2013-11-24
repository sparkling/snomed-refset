import Page from 'appkit/models/page';
import Concept from 'appkit/models/concept';
import SearchResults from 'appkit/models/searchResults';

var tsComponent = Em.Component.extend({
    query: null,
    searchResults: null,
    pages: null,
    currentPage: null,
    maxPageIndexesShown: 5,
    pageSize: 8,
    needs: "searchResults",
    actions:{
      click: function(clicked){
        Ember.Logger.log('TextSearch handling click: ' + JSON.stringify(clicked));
        this.sendAction('action', clicked);
      },
      keyUp: function(evt) {
        Ember.Logger.log('sending search');
        this.get('controller').send('search', this.get('controller.query'));
      },
      search: function(search) {
        
        if (search===""){
          this.get('controllers.searchResults').set('model', null);
          return false;
        }
        
        Ember.Logger.log('received search event "' + search + '"');
        Ember.Logger.log('pagesize is ' + this.get('pageSize'));
        var results = tsComponent.find(search, 1, this.get('pageSize'));
        var _this = this;
        // results is a jquery promise, wait for it to resolve
        // Ember can't resolve it automatically
        results.then(function(results){
          Ember.Logger.log('query returned with ' + results.total + ' results');
          _this.set('searchResults', results);
          _this.buildPages(1, 1);
          Ember.Logger.log('blah3');
        });
        return false;
      },
      pageRequest: function(page){
        Ember.Logger.log('received page request for page ' + page.get('index'));
        //Ember.Logger.log('page ' + page.get('display'));
        var _this = this;
        Ember.Logger.log('disabling page ' + this.get('currentPage.index'));
        this.get('currentPage').set('active', false);
        var results = tsComponent.find(
            this.get('query'), 
            page.index, 
            this.get('pageSize'));
        results.then(function(results){
          _this.set('searchResults', results);
        });
        Ember.Logger.log('setting current page to ' + page.get('index') + ' and making active');
        this.set('currentPage', page);
        page.set('active', true);
        return false;
      },
      firstPage: function(){
        Ember.Logger.log('First page'); 
        this.buildPages(1, 1);
        this.send('pageRequest', this.get('pages.firstObject'));
      },
      previousPage: function(){
        Ember.Logger.log('previous page');
        var page = null;
        if ((this.get('currentPage.index') - 1) % this.get('maxPageIndexesShown') === 0){
          //Assertion: we are at the first displayed page index
          Ember.Logger.log('we are at the first displayed page index');
          if (this.get('currentPage.index') === 1){
            //assertion: we are at the beginning of the list of pages, so loop around to the back.
            Ember.Logger.log('we are at the beginning of the list of pages, so loop around to the back');
            Ember.Logger.log('last page');
            var numberOfPagesOnLastSet = this.get('numberOfPages') % this.get('maxPageIndexesShown');
            Ember.Logger.log('number of pages on last view ' + numberOfPagesOnLastSet);
            Ember.Logger.log('calling buildPages(' + (this.get('numberOfPages') - numberOfPagesOnLastSet) + ', ' + this.get('numberOfPages') + ')');
            this.buildPages(this.get('numberOfPages') - numberOfPagesOnLastSet + 1, numberOfPagesOnLastSet);
            page = this.get('pages.lastObject');
          }
          else{
            //assertion: there are more page indexes to the left / below to display
            Ember.Logger.log('there are more page indexes to the left / below to display');
            var index = this.get('currentPage.index') - this.get('maxPageIndexesShown');
            Ember.Logger.log('buildPages(' + index + ', ' + this.get('maxPageIndexesShown') + ')');
            this.buildPages(index, this.get('maxPageIndexesShown'));
            page = this.get('pages.lastObject');
          }
        }else{
          var index2 = ((this.get('currentPage.index') - 1) % this.get('maxPageIndexesShown')) - 1;
          Ember.Logger.log('we are not at the beginning of the page list');
          Ember.Logger.log('selecting pages.objectAt (' + index2 + ') for page');
          page = this.get('pages').objectAt(index2);
        }
        Ember.Logger.log('change page to index ' + page.get('index'));
        this.send('pageRequest', page);
      },
      nextPage: function(){
        var page = null;
        if ((this.get('currentPage.index') % this.get('maxPageIndexesShown') === 0) || 
          (this.get('currentPage.index') === this.get('numberOfPages'))){
          //Assertion: we are at the last displayed page index
          Ember.Logger.log('we are at the last displayed page index');
          if (this.get('currentPage.index') === this.get('numberOfPages')){
            //assertion: we are at the end of the list of pages, so loop around.
            Ember.Logger.log('we are at the end of the list of pages, so loop around.');
            Ember.Logger.log('First page');
            Ember.Logger.log('buildpages(1, 1)');
            this.buildPages(1, 1);
            page = this.get('pages.firstObject');
          }
          else{
            //Assertion: we are at the last displayed page index
            //assertion: there are more page indexes to display
            Ember.Logger.log('there are more page indexes to display');
            var index = this.get('currentPage.index') + 1;
            Ember.Logger.log('buildPages(' + index + ', 1)');
            this.buildPages(index, 1);
            page = this.get('pages.firstObject');
          }
        }else{
          Ember.Logger.log('we are not at the end of the page list');
          var index3 = this.get('currentPage.index') % this.get('maxPageIndexesShown');
          Ember.Logger.log('getting page: pagespages.objectAt(' + index3 + ')');
          page = this.get('pages').objectAt(index3);
        }
        
        this.send('pageRequest', page);
      },
      lastPage: function(){
        Ember.Logger.log('last page');
        var numberOfPagesOnLastSet = this.get('numberOfPages') % this.get('maxPageIndexesShown');
        Ember.Logger.log('number of pages on last view ' + numberOfPagesOnLastSet);
        Ember.Logger.log('calling buildPages(' + (this.get('numberOfPages') - numberOfPagesOnLastSet) + ', ' + this.get('numberOfPages') + ')');
        this.buildPages(this.get('numberOfPages') - numberOfPagesOnLastSet + 1, numberOfPagesOnLastSet);
        this.send('pageRequest', this.get('pages.lastObject'));
      }
    },


    totalPageItems: function(){
      return this.get('searchResults.total');
    }.property('searchResults'),
    
    numberOfPages: function(){
      return Math.ceil(this.get('searchResults.total') / this.get('pageSize'));
    }.property('searchResults'),

    buildPages: function(startAtPageIndex, activeIndex){
      //Build Page Index
      Ember.Logger.log('Building pages with startAtPageIndex: ' + startAtPageIndex + ", activeIndex: " + activeIndex);
      var newPages = Ember.A();
      this.set('pages', newPages);
      var numberOfPages = this.get('numberOfPages');
      var maxIndex = startAtPageIndex + this.get('maxPageIndexesShown') - 1;
      Ember.Logger.log('building pages from ' + startAtPageIndex + ' to max ' + maxIndex + ' out of total ' + numberOfPages);
      Ember.Logger.log('number of pages are ' + numberOfPages);
      for (var i=startAtPageIndex; i <= numberOfPages && i <= maxIndex; i++){
        var page = Page.create();
        page.active = false;
        page.index = i;
        newPages.pushObject(page);
      }
      Ember.Logger.log('setting current page to ' + (activeIndex) + ' and making active');
      this.set('currentPage', newPages.objectAt(activeIndex - 1));
      this.get('currentPage').set('active', true);
    },
    shouldDisplayNavigation: function(){
      var mypages = this.get('pages'); 
      if (mypages != null){
        if (mypages.length > 1) return true;
      }else{
        return false;
      }
    }.property('pages'),
    displayWidthStyling: function(){
      var itemWidth = 4;
      return 'width: ' + ((4 * itemWidth) + (this.get('pages.length') * itemWidth)) + 'em;';
    }.property('pages')
  });

  tsComponent.reopenClass({
    find: function(searchString, pageIndex, pageSize){
      Ember.Logger.log('find(searchString: \'' + searchString + '\', pageIndex: ' + pageIndex + ', pageSize: ' + pageSize + ')');
      return Ember.Deferred.promise(function(p) {
        var startIndex = (pageIndex - 1) * pageSize;
        p.resolve($.getJSON("http://solr.snomedtools.com/solr/concept/select?q=title:" + searchString + "&start=" + startIndex + "&rows=" + pageSize + "&wt=json&indent=true&json.wrf=?")
          .then(function(solr) {
              var returned = SearchResults.create();
              returned.set('total', solr.response.numFound);
              returned.set('start', solr.response.start);
              var concepts = Ember.A();
              solr.response.docs.forEach(function (doc) {
                var concept = Concept.create();
                concept.id = doc.id;
                concept.ontologyId = doc.ontology_id;
                concept.title = doc.title;
                concept.active = doc.active;
                concept.effectiveTime= doc.effectiveTime;
                concepts.pushObject(concept);
              });
              returned.set('concepts',concepts);
              Ember.Logger.log('returned ' + returned.get('total') + ' records');
              return returned;
          }) //then
        );//resolve
      });//deferred promise
    },//find
  });//reopen

export default tsComponent;
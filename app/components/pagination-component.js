import Page from 'appkit/models/page';

export default Em.Component.extend({
  pageSize:       10,         //how many items are displayed on one page?
  displaySetSize: 10,         //how many page indexes are displayed at once?
  //totalItems:     null,       //how many items are displayed overall?
  currentPage:    null,       //what is the current page being displayed
  pages:          Ember.A(),  //an array of all the indexes currently being displayed
  resetSwitch:    false,      //Toggle this switch to reset the page to 1
  totalMembers:      '',

  resetPages: function(){
    this.createPages(1);
  }.observes("totalMembers"),

  initPages: function(){
    this.createPages(1);
  }.on("init"),

  shouldDisplayPagination: function(){
    return this.get('lastPage') > 1;
  }.property('lastPage'),

  shouldDisplaySetNavs: function(){
    return this.get('lastPage') > this.get('displaySetSize');
  }.property('lastPage', 'displaySetSize'),

  reset: function(){
    this.createPages(1);
  }.observes('resetSwitch'),

  //what is the last page in the total set of pages?
  lastPage: function(){
    var numberOfDisplaySets = Math.floor(this.get('totalMembers') / this.get('pageSize'));
    if (this.get('totalMembers') % this.get('pageSize') > 0){
      numberOfDisplaySets = numberOfDisplaySets + 1;
    }
    return numberOfDisplaySets;
  }.property('totalMembers', 'pageSize'),

  lastPageDisplayed: function(){
    return this.get('pages.lastObject.index');
  }.property('pages.@each'),

  firstPageDisplayed: function(){
    return this.get('pages.firstObject.index');
  }.property('pages.@each'),

  createPages: function(startIndex, pages){
    Ember.Logger.log('Creating pages from start index ' + startIndex);
    //this.get('pages').clear();

    var newPages = Ember.A();

    //create the first page
    var firstPageDisplayed = Page.create();
    firstPageDisplayed.set('active', true);
    firstPageDisplayed.set('index', startIndex);
    newPages.pushObject(firstPageDisplayed);        
    this.set('currentPage', firstPageDisplayed);

    //then create the rest
    for (var i = startIndex + 1; (i <= this.get('lastPage')) && (i < startIndex + this.get('displaySetSize')); i++){
      var page = Page.create();
      page.set('active', false);
      page.set('index', i);
      newPages.pushObject(page);
    }
    this.set('pages', newPages);
  },

  actions: {
    nextPage: function(){
      if (this.get('lastPageDisplayed') < this.get('lastPage')){
        //assertion: we are not at the last page overall, we can proceed.
        var startIndex = this.get('lastPageDisplayed') + 1;
        this.createPages(startIndex);
        this.sendAction('changePage', startIndex);
      }
    },
    lastPage: function(){
      //alert('lastPageDisplayed: ' + this.get('lastPageDisplayed') + ', lastPage: ' + this.get('lastPage'))
      if (this.get('lastPageDisplayed') < this.get('lastPage')){
        //assertion: we are not at the last page overall, we can proceed.
        //Calculate the starting index of the pages display.
        var startIndex = this.get('lastPage') - (this.get('totalMembers') % this.get('pageSize'));
        //alert('lastPage: ' + this.get('lastPage') + ', remainder: ' + (this.get('totalItems') % this.get('pageSize')) + ', startIndex: ' + startIndex);
        this.createPages(startIndex);
        this.sendAction('changePage', startIndex);
      }
    },
    previousPage: function(){
      if (this.get('firstPageDisplayed') > 1){
        //assertion: we are not at the first page overall, we can proceed.
        var startIndex = this.get('firstPageDisplayed') - this.get('displaySetSize');
        this.createPages(startIndex);
        this.sendAction('changePage', startIndex);
      }
    },
    firstPage: function(){
      if (this.get('firstPageDisplayed') > 1){
        this.createPages(1);
        this.sendAction('changePage', 1);
      }
    },
    selectPage: function(selected){
      Ember.Logger.log('Selected page: ' + selected.get('index'));
      selected.set('active', true);
      this.set('currentPage.active', false);
      this.set('currentPage', selected);
      this.sendAction('changePage', selected.get('index'));
    }
  }
});

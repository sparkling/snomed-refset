var Router = Ember.Router.extend();

Router.map(function() {
  this.resource('refsets', {path:'/'});
  this.resource('create',  {path:'/create'}, function(){});
  this.resource('refset',  {path:'/:publicId'}, function(){
    this.resource('members',   {path:''});
    this.resource('import',    {path:'import'}, function(){
      this.route('file',         {path:'file'});
      this.route('search',       {path:'search'});
      this.route('refset',       {path:'refset'});
    });    
    this.resource('versions',  {path:'versions'});
    this.resource('version',   {path:'version/:versionPublicId'});
    this.resource('releases',  {path:'releases'});
    this.resource('release',   {path:'release/:releasePublicId'}); 
    this.resource('details',   {path:'details'});
    this.resource('member',    {path:'member/:memberPublicId'}); 
    this.resource('plan',  {path:'plan'}, function(){
      this.route('edit',      {path:'edit'});
      this.route('show',      {path:'show'});
      this.route('concepts',  {path:'concepts'});
    }); 
  });
});

Router.reopen({
  location: 'history'
});

export default Router;

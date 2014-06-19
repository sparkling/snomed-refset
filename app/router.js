var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
  this.resource('login', {path:'/login'}); 
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
    this.resource('member',    {path:'member/:memberPublicId'});
  });
});

export default Router;

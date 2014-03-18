var Router = Ember.Router.extend();

Router.map(function() {
  this.resource('refsets', {path:'/'});
  this.resource('create',  {path:'/create'}, function(){});
  this.resource('refset',  {path:'/:publicId'}, function(){
    this.resource('import',    {path:'import'}, function(){
      this.route('file',         {path:'file'});
      this.route('search',       {path:'search'});
      this.route('refset',       {path:'refset'});
    });
    this.resource('members',   {path:'members'});
    this.resource('versions',  {path:'versions'});
    this.resource('releases',  {path:'releases'});
    this.resource('details',   {path:'details'});
    this.resource('member',    {path:'member'}, function(){
      this.route('index',        {path:':memberId'});
    });
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

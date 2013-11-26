var Router = Ember.Router.extend();

Router.map(function() {
  this.resource('refsets', {path:'/'});
  this.resource('create',  {path:'/create'}, function(){});
  this.resource('refset',  {path:'/:publicId'}, function(){
    this.route('concepts',  {path:''});
    this.route('plan',  {path:'plan'});
  });
});

Router.reopen({
  location: 'history'
});

export default Router;

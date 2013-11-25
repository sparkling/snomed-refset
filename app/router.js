var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.resource('refsets', {path:'/' }, function(){
    this.route('index',  {path:''});
  });
  this.resource('create',  {path:'/create'}, function(){
    this.route('index',  {path:''});
  });
  this.resource('refset',  {path:'/:publicId'}, function(){
    this.route('concepts',  {path:'/'});
    this.route('plan',  {path:'plan'});
  });

});

Router.reopen({
  location: 'history'
});

export default Router;

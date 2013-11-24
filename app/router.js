var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.resource('refsets', {path:'/' });
  this.resource('create',  {path:'/create'});  
  this.resource('refset',  {path:'/:publicId'}, function(){
    this.route('edit');
  });
});

Router.reopen({
  location: 'history'
});

export default Router;

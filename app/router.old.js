var Router = Ember.Router.extend();

Router.map(function() {
  this.resource('refsets', {path:'/'});
  this.resource('create',  {path:'/create'}, function(){});
  this.resource('refset',  {path:'/:publicId'}, function(){
    this.resource('plan',  {path:'plan'}, function(){
      this.route('edit',  {path:'edit'});
      this.route('show',  {path:'show'});
      this.route('concepts',  {path:'concepts'});
    });
    this.resource('snapshots',  {path:'snapshots'});
    this.resource('snapshot',  {path:'snapshot'}, function(){
      this.route('index',  {path:':snapshotId'});
    });    
  });
});

Router.reopen({
  location: 'history'
});

export default Router;

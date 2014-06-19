import Refset from '../models/refset';
import Alert from '../models/alert';

export default Ember.ObjectController.extend({
  alert:            '',
  sortBy:           '', 
  sortOrder:        '',
  filter:           '',
  pageSize:         10, 
  displaySetSize:   10,  
  resetPagesSwitch: false,

  filterChange: function(){
      Ember.Logger.log('Filter by ' + this.get('filter'));
      this.toggleProperty('resetPagesSwitch');
      var _this = this;
      Refset.loadRefsets(this.get('sortBy'), this.get('sortOrder'), this.get('filter'), 0, this.get('pageSize')).
        then(function(page){
          _this.set('model', page);
        });
  }.observes('filter'),

  actions: {

    sort: function(sortBy, sortOrder){
      Ember.Logger.log('Sorting by ' + sortBy + ' ' + sortOrder);
      this.set('sortBy', sortBy);
      this.set('sortOrder', sortOrder);
      var _this = this;
      Refset.loadRefsets(sortBy, sortOrder, this.get('filter'), 0, this.get('pageSize')).
        then(function(page){
          _this.set('model', page);
        });
    },

    changePage: function(index){
      Ember.Logger.log('Displaying page ' + index);
      //alert('sortBy: ' + this.get('sortBy') + ', sortOrder: ' + this.get('sortOrder') + ', filter: ' + this.get('filter'));
      var _this = this;
      Refset.loadRefsets(this.get('sortBy'), this.get('sortOrder'), this.get('filter'), index - 1, this.get('pageSize')).
        then(function(page){
          //alert('new model:' + JSON.stringify(page));
          _this.set('model', page);
        });
    },    

    delete: function(refset){
      Ember.Logger.log("Delete: refset " + JSON.stringify(refset));
      var alert = Alert.create();
      this.set('alert', alert);

      //BUILD ARGUMENTS FOR UNDO FUNCTION
      var undoArgs = Ember.A();
      undoArgs.pushObject(refset);
      undoArgs.pushObject(this);
      alert.set('arguments', undoArgs);

      //CREATE AND SET UNDO FUNCTION
      alert.set('undofunction', function(undoArgs, undoAlert){
        var deletedRefset = undoArgs.objectAt(0);
        var _this         = undoArgs.objectAt(1);
        Ember.Logger.log('Undo: Adding refset ' + deletedRefset.get('publicId') + 'back in');
        
        Refset.resurect(deletedRefset).then(
          function(success){
            Ember.Logger.log('Undo: success');
            undoAlert.set('isError', false);
            undoAlert.set('showUndo', false);
            undoAlert.set('message', "Added back refset '" + refset.get('publicId') + "'");
            Refset.loadRefsets(_this.get('sortBy'), _this.get('sortOrder'), _this.get('filter'), 0, _this.get('pageSize')).
              then(function(page){
                _this.set('model', page);
              });              
          },
          function(error){
            Ember.Logger.log('Undo: error');
            undoAlert.set('isError', true);
            undoAlert.set('message', 'Unable to add back refset ' + refset.get('publicId') + '. Message was: ' + error.responseText);
          }
        );
      });

      //DO IT
      var _this = this;
      Refset.delete(refset).then(
        function(success){
          Ember.Logger.log('Delete: success');
          alert.set('isError', false);
          alert.set('message', "Removed refset '" + refset.get('publicId') + "'");
          Refset.loadRefsets(_this.get('sortBy'), _this.get('sortOrder'), _this.get('filter'), 0, _this.get('pageSize')).
            then(function(page){
              _this.set('model', page);
            });                 
        },
        function(error){
          Ember.Logger.log('Delete: error');
          alert.set('isError', true);
          alert.set('message', 'Unable to delete refset ' + refset.get('publicId') + '. Message was: ' + error.responseText);          
        }
      );
    }
  }
});


import Tag from 'appkit/models/tag';
import Alert from 'appkit/models/alert';
import toEmberObject from 'appkit/utils/to_ember_object';

export default Ember.ObjectController.extend({
  needs: ['refset'],
  alert:        undefined,
  
  sortBy:           '',
  sortOrder:        '',
  filter:           '',
  pageSize:         10, 
  currentPageIndex:  0,
  displaySetSize:   10,
  resetPagesSwitch: false,

  refset:       Ember.computed.alias('controllers.refset.model'),
  refsetName:   Ember.computed.alias('controllers.refset.model.publicId'),
  releasesPage: Ember.computed.alias('controllers.refset.releasesPage'),  

  filterChange: function(){
      Ember.Logger.log('Filter by ' + this.get('filter'));
      this.toggleProperty('resetPagesSwitch');
      var _this = this;
      Tag.getTags(this.get('refsetName'), this.get('sortBy'), this.get('sortOrder'), this.get('filter'), 0, this.get('pageSize'), this).
        then(function(page){
          _this.set('controllers.refset.releasesPage', page);
        });

  }.observes('filter'),  

  actions:{

    changePage: function(index){
      Ember.Logger.log('Displaying page ' + index);
      this.set('currentPageIndex', index);
      var _this = this;
      Tag.getTags(this.get('refsetName'), this.get('sortBy'), this.get('sortOrder'), this.get('filter'), index - 1, this.get('pageSize'), this).
        then(function(page){
          _this.set('controllers.refset.releasesPage', page);
        });
    },

    sort: function(sortBy, sortOrder){
      Ember.Logger.log('Sorting by ' + sortBy + ' ' + sortOrder);
      this.set('sortBy', sortBy);
      this.set('sortOrder', sortOrder);
      var _this = this;
      Tag.getTags(this.get('refsetName'), sortBy, sortOrder, this.get('filter'), 0, this.get('pageSize'), this).
        then(function(page){
          _this.set('controllers.refset.releasesPage', page);
        });
    },    

    delete: function(release){
      Ember.Logger.log("Deleting release");
      var alert = Alert.create();
      this.set('alert', alert);

      //BUILD ARGUMENTS FOR UNDO FUNCTION
      var undoArgs = Ember.A();
      undoArgs.pushObject(this.get('refsetName'));
      undoArgs.pushObject(release);
      undoArgs.pushObject(this);
      alert.set('arguments', undoArgs);

      //CREATE UNDO FUNCTION
      alert.set('undofunction', function(undoArgs, undoAlert){
        var refsetName     = undoArgs.objectAt(0);
        var deletedRelease = undoArgs.objectAt(1);
        var _this          = undoArgs.objectAt(2);

        Ember.Logger.log('UNDO: Adding back release ' + deletedRelease.get('publicId'));

        //UNDO: SUCCESS
        var onSuccess = function(release, success, undoAlert, _this){
          Ember.Logger.log('Undo: success');
          undoAlert.set('isError', false);
          undoAlert.set('showUndo', false);
          undoAlert.set('message', "Added back release with id '" + release.get('publicId') + "'");

          Tag.getTags(_this.get('refsetName'), _this.get('sortBy'), _this.get('sortOrder'), _this.get('filter'), _this.get('currentPageIndex'), _this.get('pageSize'), _this).
            then(function(page){
              _this.set('controllers.refset.releasesPage', page);
            });
        };
        
        //UNDO: ERROR
        var onError = function(release, error, undoAlert, _this){
          Ember.Logger.log('Undo: error');
          undoAlert.set('isError', true);
          undoAlert.set('message', 'Unable to add back release ' + release.get('publicId') + 
            '. Message was: ' + error.responseText);
        };

        //UNDO: DO IT
        Ember.Logger.log('Undo: Adding release back in');
        Tag.createTag(_this.get('refsetName'), deletedRelease, alert, onSuccess, onError, _this);
      });

      //ON SUCCESS
      var onSuccess = function(release, success, alert, _this){
        Ember.Logger.log('Delete: success');
        alert.set('isError', false);
        alert.set('message', "Removed release with name '" + release.get('title') + "'");
        Tag.getTags(_this.get('refsetName'), _this.get('sortBy'), _this.get('sortOrder'), _this.get('filter'), _this.get('currentPageIndex'), _this.get('pageSize'), _this).
          then(function(page){
            _this.set('controllers.refset.releasesPage', page);
          });
      };

      //ON ERROR
      var onError = function(release, error, alert, _this){
        Ember.Logger.log('Delete: error');
        alert.set('isError', true);
        alert.set('message', "Unable to delete release with name '" + release.get('title') + 
          "'. Message was: " + error.responseText);
      };

      //DO IT
      Tag.deleteTag(this.get('refsetName'), release, alert, onSuccess, onError, this);
    }
  }
});
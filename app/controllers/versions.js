import Tag from 'appkit/models/tag';
import Version from 'appkit/models/version';
import Alert from 'appkit/models/alert';
import toEmberObject from 'appkit/utils/to_ember_object';

export default Ember.ObjectController.extend({
  needs: ['refset', 'cache'],
  
  release:          undefined,
  alert:            undefined,
  error:            undefined,

  sortyBy:          undefined, 
  sortOrder:        undefined,
  filter:           '',
  pageSize:         10, 
  displaySetSize:   10,
  resetPagesSwitch: false,

  refset:       Ember.computed.alias('controllers.refset.model'),
  refsetName:   Ember.computed.alias('controllers.refset.model.publicId'),
  versionsPage: Ember.computed.alias('controllers.cache.versionsPage'),

  filterChange: function(){
      Ember.Logger.log('Filter by ' + this.get('filter'));
      this.toggleProperty('resetPagesSwitch');
      var _this = this;
      Version.getVersions(this.get('refsetName'), this.get('sortBy'), this.get('sortOrder'), this.get('filter'), 0, this.get('pageSize'), this).
        then(function(page){
          _this.set('controllers.cache.versionsPage', page);
        });

  }.observes('filter'),  

  actions: {
    
    createReleaseSetVersionPublicId: function(version){
      var release = Tag.create();
      release.set('refsetPublicId', this.get('refsetName'));
      release.set('snapshot', version);
      this.set('error', undefined);
      this.set('release', release);
    },

    cancelReleaseModal: function(){
      $('#createRelease').foundation('reveal', 'close'); 
    },

    changePage: function(index){
      Ember.Logger.log('Displaying page ' + index);
      var _this = this;
      Version.getVersions(this.get('refsetName'), this.get('sortBy'), this.get('sortOrder'), this.get('filter'), index - 1, this.get('pageSize'), this).
        then(function(page){
          _this.set('controllers.cache.versionsPage', page);
        });
    },

    sort: function(sortBy, sortOrder){
      Ember.Logger.log('Sorting by ' + sortBy + ' ' + sortOrder);
      this.set('sortBy', sortBy);
      this.set('sortOrder', sortOrder);
      var _this = this;
      Version.getVersions(this.get('refsetName'), sortBy, sortOrder, this.get('filter'), 0, this.get('pageSize'), this).
        then(function(page){
          _this.set('controllers.cache.versionsPage', page);
        });
    },    

    createRelease: function(){
      Ember.Logger.log('Creating release for ' + this.get('release.snapshot.publicId'));
      var alert = Alert.create();

      //ON SUCCESS
      var onSuccess = function(tag, successResponse, alert, _this){
        _this.set('alert', alert);
        alert.set('showUndo', false);
        alert.set('isError', false);

        _this.set('controllers.cache.releasesPage', '');

        //Goto
        alert.set('showGoto', true);
        alert.set('gotoTitle', "Go to '" + tag.get('publicId') + "'");
        alert.set('isDynamicGotoRoute', true);
        alert.set('gotoDynamicParam', tag.get('publicId'));
        alert.set('gotoTransition', 'release');

        alert.set('message', "Successfully created new release for version '" + _this.get('release.snapshot.title') + "'");
        $('#createRelease').foundation('reveal', 'close');
      };
      //ON ERROR
      var onError = function(tag, errorResponse, alert, _this){
        _this.set('error', toEmberObject(JSON.parse(errorResponse.responseText)));
      };
      Tag.createTag(this.get('refsetName'), this.get('release'), alert, onSuccess, onError, this);

      setTimeout(function(){
          Em.$(document).foundation();
      }, 250);
    }
  }
});
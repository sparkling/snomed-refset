import Member from 'appkit/models/member';
import Version from 'appkit/models/version';

export default Ember.Route.extend({
  needs: 'refset',

  setupController: function (controller, model) {
    Ember.Logger.log("Loading members for refset " + this.modelFor('refset').get('publicId'));
    
    controller.set('members', 
      Member.getMembers(this.modelFor('refset').get('publicId'), "component.fullySpecifiedName", "ASC", this));
    
    controller.set('version', Version.create());

    controller.set('alert', '');

    controller.set('model', model);
  }
});
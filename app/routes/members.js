import Member from 'appkit/models/member';

export default Ember.Route.extend({
  needs: 'refset',

  setupController: function (controller, model) {
    Ember.Logger.log("Loading members for refset " + this.modelFor('refset').get('publicId'));
    controller.set('model', Member.getMembers(this.modelFor('refset').get('publicId'), this));
  }
});
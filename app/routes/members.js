import Member from 'appkit/models/member';

export default Ember.Route.extend({
  needs: 'refset',

  model: function(args) {
    Ember.Logger.log("Loading members for refset " + this.modelFor('refset').get('publicId'));
    return Member.getMembers(this.modelFor('refset').get('publicId'), this);
    //return '';
  }
});
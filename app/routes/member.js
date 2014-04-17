import Member from 'appkit/models/member';

export default Ember.Route.extend({

  model: function(params) {
    return Member.getMember(this.modelFor('refset').get('publicId'), params.memberPublicId, this);
  },

  serialize: function(model) {
    return { memberPublicId: model.get('publicId') };
  }
});
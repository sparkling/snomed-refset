import Authenticated from 'appkit/routes/authenticated';
import Member from 'appkit/models/member';

export default Authenticated.extend({

  model: function(params) {
    return Member.getMember(this.modelFor('refset').get('publicId'), params.memberPublicId, this);
  },

  serialize: function(model) {
    return { memberPublicId: model.get('publicId') };
  }
});
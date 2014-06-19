import Authenticated from './authenticated';
import Member from '../models/member';

export default Authenticated.extend({

  model: function(params) {
    return Member.getMember(this.modelFor('refset').get('publicId'), params.memberPublicId, this);
  },

  serialize: function(model) {
    return { memberPublicId: model.get('publicId') };
  }
});
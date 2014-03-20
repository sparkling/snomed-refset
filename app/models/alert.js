export default Ember.Object.extend({
  message: undefined,
  entity: undefined,
  action: undefined,
  collectionIndex: undefined,
  paramName: undefined,
  paramValue: undefined,
  status: undefined,

  showUndo: true,
  undofunction: '',
  arguments: '', 
  type: 'warning'


});
export default Ember.Object.extend({
  message:          null,
  entity:           null,
  action:           null,
  collectionIndex:  null,
  paramName:        null,
  paramValue:       null,
  status:           null,
  showUndo:         true,
  undofunction:     null,
  arguments:        null, 
  type:             'warning',
  onceSticky:       false
});
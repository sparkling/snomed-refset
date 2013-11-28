export default Ember.Handlebars.makeBoundHelper(function(type) {
  if (type === 'union') return "Union";
  if (type === 'intersection') return "Intersection";
  if (type === 'difference') return "Difference";
  if (type === 'symDifference') return "Symmetric Difference";
  if (type === 'list') return "List of Concepts";
  if (type === 'import') return "Import Snapshot";
  return type;
});

export default Ember.Handlebars.makeBoundHelper(function(type) {
  if (type === 'UNION') return "Union";
  if (type === 'INTERSECTION') return "Intersection";
  if (type === 'DIFFERENCE') return "Difference";
  if (type === 'SYMDIFFERENCE') return "Symmetric Difference";
  if (type === 'list') return "List of Concepts";
  if (type === 'import') return "Import Snapshot";
  return type;
});

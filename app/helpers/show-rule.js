export default Ember.Handlebars.makeBoundHelper(function(rule) {
  if (rule.get('type') === 'LIST'){
    return new window.Handlebars.SafeString("<span>" + rule.get('id') + "</span><span style=\"color: grey; padding-left: 1em\">" + rule.get('concepts').length + " concepts</span>");
  }
  else if (rule.get('type') === 'UNION'){
    return new window.Handlebars.SafeString("<span>" + rule.get('id') + "</span>&nbsp;&nbsp; Rule " + rule.get('left') + " Union Rule " + rule.get('right'));
  }
  else if (rule.get('type') === 'DIFFERENCE'){
    return new window.Handlebars.SafeString("<span>" + rule.get('id') + "</span>&nbsp;&nbsp; Rule " + rule.get('left') + " Difference Rule " + rule.get('right'));
  }
  else if (rule.get('type') === 'SYMMETRIC'){
    return new window.Handlebars.SafeString("<span>" + rule.get('id') + "</span>&nbsp;&nbsp; Rule " + rule.get('left') + " Symmetric Difference Rule " + rule.get('right'));
  }
  else if (rule.get('type') === 'INTERSECTION'){
        return new window.Handlebars.SafeString("<span>" + rule.get('id') + "</span>&nbsp;&nbsp; Rule " + rule.get('left') + " Intersection Rule " + rule.get('right'));
  }
});
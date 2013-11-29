export default Ember.Handlebars.makeBoundHelper(function(rule) {
  if (rule.get('type') === 'LIST'){
    return new window.Handlebars.SafeString("<span style=\"color: lightgrey\">" + rule.get('id') + "</span>&nbsp;&nbsp; List <span style=\"padding-left: 0.5em;color:grey\">[" + rule.get('concepts').length + "]</span>");
  }
  else if (rule.get('type') === 'UNION'){
    return new window.Handlebars.SafeString("<span style=\"color: lightgrey\">" + rule.get('id') + "</span>&nbsp;&nbsp; Rule " + rule.get('left') + " Union Rule " + rule.get('right'));
  }
  else if (rule.get('type') === 'DIFFERENCE'){
    return new window.Handlebars.SafeString("<span style=\"color: lightgrey\">" + rule.get('id') + "</span>&nbsp;&nbsp; Rule " + rule.get('left') + " Difference Rule " + rule.get('right'));
  }
  else if (rule.get('type') === 'SYMMETRIC'){
    return new window.Handlebars.SafeString("<span style=\"color: lightgrey\">" + rule.get('id') + "</span>&nbsp;&nbsp; Rule " + rule.get('left') + " Symmetric Difference Rule " + rule.get('right'));
  }
  else if (rule.get('type') === 'INTERSECTION'){
        return new window.Handlebars.SafeString("<span style=\"color: lightgrey\">" + rule.get('id') + "</span>&nbsp;&nbsp; Rule " + rule.get('left') + " Intersection Rule " + rule.get('right'));
  }
});
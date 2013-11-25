export default Ember.Handlebars.makeBoundHelper(function(rule) {
  if (rule.get('type') === 'LIST'){
    return new window.Handlebars.SafeString("<span style=\"color: lightgrey\">" + rule.get('id') + "</span>&nbsp;&nbsp;&nbsp;&nbsp; <strong>List</strong> <span style=\"padding-left: 0.5em;color:grey\">[" + rule.get('concepts').length + "]</span>");
  }
  else if (rule.get('type') === 'UNION'){
    return new window.Handlebars.SafeString("<span style=\"color: lightgrey\">" + rule.get('id') + "</span>&nbsp;&nbsp;&nbsp;&nbsp; <strong></strong>Rule " + rule.get('left') + " <strong>Union</strong> Rule " + rule.get('right'));
  }
  else if (rule.get('type') === 'DIFFERENCE'){
    return new window.Handlebars.SafeString("<span style=\"color: lightgrey\">" + rule.get('id') + "</span>&nbsp;&nbsp;&nbsp;&nbsp; <strong></strong>Rule " + rule.get('left') + " <strong>Difference</strong> Rule " + rule.get('right'));
  }
  else if (rule.get('type') === 'SYMMETRIC'){
    return new window.Handlebars.SafeString("<span style=\"color: lightgrey\">" + rule.get('id') + "</span>&nbsp;&nbsp;&nbsp;&nbsp; <strong></strong>Rule " + rule.get('left') + " <strong>Symmetric Difference</strong> Rule " + rule.get('right'));
  }
  else if (rule.get('type') === 'INTERSECTION'){
        return new window.Handlebars.SafeString("<span style=\"color: lightgrey\">" + rule.get('id') + "</span>&nbsp;&nbsp;&nbsp;&nbsp; <strong></strong>Rule " + rule.get('left') + " <strong>Intersection</strong> Rule " + rule.get('right'));
  }
});
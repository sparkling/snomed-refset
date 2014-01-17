export default function toEmberObject(plainObject) {
  var data, i, key, result, type, value;
  //Ember.Logger.log('********************************************');
  //Ember.Logger.log('toEmber: ' + JSON.stringify(plainObject));
  //Ember.Logger.log('toEmber type: ' + Ember.typeOf(plainObject));
  //Ember.Logger.log('********************************************');
  if (!plainObject) {
    return plainObject;
  }
  data = {};
  for (key in plainObject) {
    value = plainObject[key];
    type = Ember.typeOf(value);
    //Ember.Logger.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
    //Ember.Logger.log('key: ' + JSON.stringify(key));
    //Ember.Logger.log('value: ' + JSON.stringify(value));
    //Ember.Logger.log('emberType (value): ' + type);
    //Ember.Logger.log('toType (value): ' + toType(value));
    if (type === "array") {
      var emberArray = Ember.A();
      i = 0;
      //Ember.Logger.log('value.length: ' + value.length);
      while (i < value.length) {
        if (Ember.typeOf(value[i]) === 'object') {
          //Ember.Logger.log('pushing: toEmberObject(' + value[i] + ')');
          emberArray.pushObject(toEmberObject(value[i]));
        } else {
          //Ember.Logger.log('pushing: ' + value[i]);
          emberArray.pushObject(value[i]);
        }
        ++i;
      }
      //Ember.Logger.log('WAAAH! End of array! key: ' + key + ', emberArray type is: ' + emberArray.constructor.toString());
      //Ember.Logger.log('Ember array type: ' + Ember.typeOf(Ember.A()));
      data[key] = emberArray;
    } else if (type === "object") {
      data[key] = toEmberObject(value);
    } else {
      if (type === "string" || type === "number" || type === "boolean") {
        data[key] = value;
      }
    }
  }
  result = Ember.Object.create(data);
  return result;
}
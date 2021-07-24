import Vue from 'vue';

Vue.filter('objectKey', function (value, object, key = 'label') {
  if (!value) return '';
  const data = object[value];
  return data ? data[key] : value;
});

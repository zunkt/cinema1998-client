import Vue from 'vue';
import VeeValidate, {Validator} from 'vee-validate';

Validator.extend('phone', value => {
  const regex = /^(03|05|07|08|09)+([0-9]{8})\b/g;
  return regex.test(value);
});

Vue.use(VeeValidate);

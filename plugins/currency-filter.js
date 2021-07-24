import Vue from 'vue';
import VueCurrencyFilter from 'vue-currency-filter';
Vue.use(VueCurrencyFilter, [
	{
		// default name 'currency'
		symbol: '',
		thousandsSeparator: '.',
		fractionCount: 0,
		fractionSeparator: ',',
		symbolPosition: 'front',
		symbolSpacing: true
	},
	{
		name: 'propertyPrice',
		symbol: 'TỶ',
		thousandsSeparator: '.',
		fractionCount: 3,
		fractionSeparator: ',',
		symbolPosition: 'back',
		symbolSpacing: true
	},
  {
    name: 'propertyArea',
    symbol: '',
    thousandsSeparator: '.',
    fractionCount: 2,
    fractionSeparator: ',',
    symbolPosition: 'back',
    symbolSpacing: true
  }
]);

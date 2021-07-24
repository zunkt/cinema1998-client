import Vue from 'vue';
import { last, slice } from 'lodash';

Vue.prototype.$resizeImage = (fileName, size) => {
  if(!fileName) return ""
	const fileN = last(fileName.split('/'));
	const fileF = slice(fileName.split('/'), 0, -1).join('/');
	return `${fileF}/thumbs/${fileN.split('.')[0]}${size ? `_${size}` : ''}.${fileN.split('.')[1]}`;
};

Vue.prototype.$resizeImage1280x720 = fileName => {
  if(!fileName) return ""
	const fileN = last(fileName.split('/'));
	const fileF = slice(fileName.split('/'), 0, -1).join('/');
	return `${fileF}/thumbs/${fileN.split('.')[0]}_1280x720.${fileN.split('.')[1]}`;
};

Vue.prototype.$resizeImage1920x720 = fileName => {
  if(!fileName) return ""
	const fileN = last(fileName.split('/'));
	const fileF = slice(fileName.split('/'), 0, -1).join('/');
	return `${fileF}/thumbs/${fileN.split('.')[0]}_1920x720.${fileN.split('.')[1]}`;
};

Vue.prototype.$resizeImage631x355 = fileName => {
  if(!fileName) return ""
	const fileN = last(fileName.split('/'));
	const fileF = slice(fileName.split('/'), 0, -1).join('/');
	return `${fileF}/thumbs/${fileN.split('.')[0]}_631x355.${fileN.split('.')[1]}`;
};

Vue.prototype.$resizeImage100x100 = fileName => {
  if(!fileName) return ""
	const fileN = last(fileName.split('/'));
	const fileF = slice(fileName.split('/'), 0, -1).join('/');
	return `${fileF}/thumbs/${fileN.split('.')[0]}_100x100.${fileN.split('.')[1]}`;
};

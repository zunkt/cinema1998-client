import Vue from 'vue';
import ElementUI from 'element-ui';
import '@/assets/theme/index.css';
import '@/assets/theme/custom.css';
import locale from 'element-ui/lib/locale/lang/vi';

export default () => {
  Vue.use(ElementUI, { locale });
};

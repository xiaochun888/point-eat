// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import cssVars from 'css-vars-ponyfill'; //IE 9+, Edge 12+, Chrome 19+, Firefox 6+, Safari 6+
import '@/assets/js/ie.fix.js';
import 'babel-polyfill'; //Object.assign, Promise for IE

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/assets/style/font-size-responsive.css';
import '@/assets/icon/fontello/css/fontello.css';
import 'animate.css';

import i18nVuex from 'vuex-i18n';

import store from './store/store';
import storePlugin from './store/storePlugin';
Vue.use(storePlugin);
Vue.use(i18nVuex.plugin, store);

Vue.config.productionTip = false;

cssVars();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

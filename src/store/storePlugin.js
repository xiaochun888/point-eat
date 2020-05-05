import store from './store.js';

export default {
  store,
  install (Vue /*options*/) {
    /* state store*/
    Vue.prototype.$store = store;
  }
};

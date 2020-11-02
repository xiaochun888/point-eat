import gridContainer from './gridContainer.vue';
import gridBox from './gridBox.vue';

export default {
  install(Vue) {
    Vue.component('grid-box', gridBox);
    Vue.component('grid-container', gridContainer);
  }
};

export { gridBox, gridContainer };

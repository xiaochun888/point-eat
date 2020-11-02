import Vue from 'vue';
import Router from 'vue-router';
import pointEat from '@/components/products/pointEat';
import aboutUs from '@/components/aboutUs';
// const pointEat = () => import(/* webpackChunkName: "pointEat" */ '@/components/products/pointEat');
// const aboutUs = () => import(/* webpackChunkName: "aboutUs" */ '@/components/aboutUs');

Vue.use(Router);

export default new Router({
  mode: 'history', /**hash: independent of websever; history: dependent on webserver */
  routes: [
    {
      path: '/',
      name: 'New product',
      component: pointEat
    },
    {
      path: '/aboutus',
      name: 'About us',
      component: aboutUs
    },
    /**History mode avoids 404 error */
    { path: '*', component: aboutUs }
  ]
});

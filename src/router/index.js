import Vue from 'vue';
import Router from 'vue-router';
import restoOnline from '@/components/products/restoOnline';
import aboutUs from '@/components/aboutUs';
// const restoOnline = () => import(/* webpackChunkName: "restoOnline" */ '@/components/products/restoOnline');
// const aboutUs = () => import(/* webpackChunkName: "aboutUs" */ '@/components/aboutUs');

Vue.use(Router);

export default new Router({
  mode: 'history', /**hash: independent of websever; history: dependent on webserver */
  routes: [
    {
      path: '/',
      name: 'Products',
      component: restoOnline
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

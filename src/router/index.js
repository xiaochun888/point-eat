import Vue from 'vue';
import Router from 'vue-router';
import exhibition from '@/components/products/exhibition';
import legalNotices from '@/components/legalNotices';
import cookiesPolicy from '@/components/cookiesPolicy';
import priceMini from '@/components/priceMini';

Vue.use(Router);

export default new Router({
  mode: 'history', /**hash: independent of websever; history: dependent on webserver */
  routes: [
    {
      path: '/',
      name: 'Exhibition',
      component: exhibition
    },
    {
      path: '/priceMini',
      name: 'Price',
      component: priceMini
    },
    {
      path: '/legalNotices',
      name: 'Legal Notices',
      component: legalNotices
    },
    {
      path: '/cookiesPolicy',
      name: 'Cookies policy',
      component: cookiesPolicy
    },
    /**History mode avoids 404 error */
    { path: '*', component: exhibition }
  ]
});

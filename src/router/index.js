import Vue from 'vue';
import Router from 'vue-router';
import pointEat from '@/components/products/pointEat';
import aboutUs from '@/components/aboutUs';
import contactUs from '@/components/contactUs';
import recruitment from '@/components/recruitment';
import legalNotices from '@/components/legalNotices';
import termsOfUse from '@/components/termsOfUse';
import cookiesPolicy from '@/components/cookiesPolicy';
import priceMini from '@/components/priceMini';

Vue.use(Router);

export default new Router({
  mode: 'history', /**hash: independent of websever; history: dependent on webserver */
  routes: [
    {
      path: '/',
      name: 'Our solutions',
      component: pointEat
    },
    {
      path: '/priceMini',
      name: 'Price mini',
      component: priceMini
    },
    {
      path: '/contactUs',
      name: 'Contact us',
      component: contactUs
    },
    {
      path: '/recruitment',
      name: 'Recruitment',
      component: recruitment
    },
    {
      path: '/legalNotices',
      name: 'Legal Notices',
      component: legalNotices
    },
    {
      path: '/termsOfUse',
      name: 'Terms Of use',
      component: termsOfUse
    },
    {
      path: '/cookiesPolicy',
      name: 'Cookies policy',
      component: cookiesPolicy
    },
    /**History mode avoids 404 error */
    { path: '*', component: aboutUs }
  ]
});

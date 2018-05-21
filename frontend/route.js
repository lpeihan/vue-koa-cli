import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/index';
import Signup from './components/signup';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ]
});

import Vue from 'vue';

import App from './app';
import store from './vuex/store';
import router from './route';
import './utils/axios';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

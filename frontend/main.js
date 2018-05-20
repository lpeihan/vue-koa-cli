import Vue from 'vue';

import App from './app';
import router from './route';
import './utils/axios';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

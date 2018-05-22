import Vue from 'vue';
import axios from 'axios';

import store from '../vuex/store';

axios.defaults.baseURL = 'api';

axios.interceptors.response.use(function (response) {
  store.dispatch('setUser');
  return response;
}, function (error) {
  return Promise.reject(error);
});

Vue.prototype.$http = axios;

import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import auth from './modules/auth';
import messages from './modules/messages';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    messages
  },

  plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : []
});

store.dispatch('setUser');

export default store;

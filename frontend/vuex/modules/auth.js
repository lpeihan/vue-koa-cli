import isEmpty from 'lodash/isEmpty';
import axios from 'axios';

import pkg from '../../../package.json';
import { getCookie } from '../../utils';

const state = {
  user: {},
  isAuthenticated: false
};

const getters = {};

const mutations = {
  setUser(state, user) {
    state.user = user || {};
    state.isAuthenticated = !isEmpty(state.user);
  }
};

const actions = {
  signup({ commit }, user) {
    return axios.post('users/signup', user);
  },
  login({ commit }, user) {
    return axios.post('users/login', user);
  },
  logout({ commit }) {
    return axios.delete('/users/logout');
  },
  setUser({ commit }) {
    let user;
    try {
      user = JSON.parse(getCookie(`${pkg.name}.user`));
    } catch (err) {};
    commit('setUser', user);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

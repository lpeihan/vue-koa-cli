import shortid from 'shortid';
import findIndex from 'lodash/findIndex';
import assign from 'lodash/assign';

const state = {
  messages: []
};

const getters = {};

const mutations = {
  addMessage(state, message) {
    state.messages.push(message);
  },
  removeMessage(state, id) {
    const index = findIndex(state.messages, { id });
    if (index >= 0) {
      state.messages = [
        ...state.messages.slice(0, index),
        ...state.messages.slice(index + 1)
      ];
    }
  }
};

const actions = {
  addMessage({ commit }, message) {
    const id = shortid.generate();
    commit('addMessage', assign({ id, type: 'success' }, message));
    setTimeout(() => {
      commit('removeMessage', id);
    }, 2000);
  },
  removeMessage({ commit }, id) {
    commit('removeMessage', id);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};

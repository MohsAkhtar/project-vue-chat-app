import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// create a state that holds data
const state = {
  currentUser: null,
  currentChannel: null
};

// update state through mutations
const mutations = {
  SET_USER(state, user) {
    state.currentUser = user;
  },
  SET_CURRENT_CHANNEL(state, channel) {
    state.currentChannel = channel;
  }
};

// create actions for mutations with necessary data
const actions = {
  setUser(state, user) {
    state.commit('SET_USER', user);
  },
  setChannel(state, channel) {
    state.commit('SET_CURRENT_CHANNEL', channel);
  }
};

// get data from state
const getters = {
  currentUser: state => state.currentUser,
  currentChannel: state => state.currentChannel
};

// create vuex store
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

export default store;

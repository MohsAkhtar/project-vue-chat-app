import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// create a state that holds data
const state = {
  // test data
  currentUser: null
};

// update state through mutations
const mutations = {
  SET_USER(state, user) {
    state.currentUser = user;
  }
};

// create actions for mutations with necessary data
const actions = {
  setUser({ commit }, user) {
    commit('SET_USER', user);
  }
};

// get data from state
const getters = {
  currentUser: state => state.currentUser
};

// create vuex store
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

export default store;

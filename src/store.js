import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// create a state that holds data
const state = {
  // test data
  currentUser: 'Mohs Akhtar'
};

// update state through mutations
const mutations = {};

// create actions for mutations with necessary data
const actions = {};

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

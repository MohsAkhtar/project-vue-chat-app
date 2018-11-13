// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import firebase from 'firebase/app';
import store from './store';
import auth from 'firebase/auth';

Vue.config.productionTip = false;

//Initialize Firebase
var config = {
  apiKey: 'AIzaSyAIrpp-PEWA-31mIFDUmnYeDG_bMvjhm8w',
  authDomain: 'vue-chat-app-5944d.firebaseapp.com',
  databaseURL: 'https://vue-chat-app-5944d.firebaseio.com',
  projectId: 'vue-chat-app-5944d',
  storageBucket: 'vue-chat-app-5944d.appspot.com',
  messagingSenderId: '26662371447'
};
firebase.initializeApp(config);

// making available on window object so we don't need to import on each component
window.firebase = firebase;

// keep user logged in through firebase auth
const unsubscribe = firebase.auth().onAuthStateChanged(user => {
  // dispatch user
  store.dispatch('setUser', user);

  // executing Vue instance here
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  });

  // Each time auth state changes from log in to log out new Vue instance executes and this entire method executes itself
  // recursion - this function calls itself on auth state changes
  unsubscribe();
});

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import firebase from 'firebase';

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

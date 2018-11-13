import Vue from 'vue';
import Router from 'vue-router';

import Chat from '../pages/Chat.vue';
import Login from '../pages/Login.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'chat',
      component: Chat
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ],
  mode: 'history'
});

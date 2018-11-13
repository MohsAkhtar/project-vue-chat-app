import Vue from 'vue';
import Router from 'vue-router';

import Chat from '../pages/Chat.vue';
import Login from '../pages/Login.vue';
import auth from 'firebase/auth';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'chat',
      component: Chat,
      beforeEnter: (to, from, next) => {
        if (!firebase.auth.current) {
          next('/login');
        } else {
          next();
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ],
  mode: 'history'
});

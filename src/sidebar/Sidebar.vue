<template>
  <div>
          <h2 class="text-light">#VUE CHAT#</h2>
          <hr style="border: 1px solid #333">

          <span>
            <img class="rounded-circle mt-2" height="30" :src="currentUser.photoURL"/>
            <span class="text-light">{{ currentUser.displayName }} </span>
          </span>

          <hr style="border: 1px solid #333">
          <button @click="logout" class="btn btn-outline-light" >Logout</button>

          <hr style="border: 1px solid #333">
          <channels></channels>

          <users></users>
  </div>
</template>

<script>
import auth from 'firebase/auth';
import database from 'firebase/database';
import { mapGetters } from 'vuex';
import Channels from './Channels';
import Users from './Users';

export default {
  name: 'sidebar',

  components: { Channels, Users },

  data() {
    return {
      // to remove from sidebar when user logs off including this here
      presenceRef: firebase.database().ref('presence')
    };
  },

  computed: {
    ...mapGetters(['currentUser'])
  },

  methods: {
    logout() {
      this.presenceRef.child(this.currentUser.uid).remove(); // remove presence on log out
      firebase.auth().signOut();
      this.$store.dispatch('setUser', null);
      this.$router.push('/login');
    }
  }
};
</script>


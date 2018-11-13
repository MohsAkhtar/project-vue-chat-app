<template>
  <div>
    <div class="jumbotron bg-primary text-white text-center">
      <h2 class="lead display-3">#VUE CHAT</h2>
      <p> Realtime communication at it's best</p>
    </div>

    <div class="alert alert-info text-center" v-if="loading">Processing</div>

    <div class="alert alert-danger text-center" v-if="hasErrors">
      <div v-for="error in errors">{{ error }}</div>
    </div>

    <div class="container-fluid">
    <div class="row">
      <div class="col text-center">
        <button @click="loginWithGoogle" class="btn btn-outline-danger btn-lg">Login With Google</button>
      </div>
    </div>
    <div class="row">
      <div class="col text-center mt-5">
        <button @click="loginWithTwitter" class="btn btn-outline-info btn-lg">Login With Twitter</button>
      </div>
    </div>
  </div>
  </div>

</template>

<script>
import auth from 'firebase/auth';
import database from 'firebase/database';
export default {
  name: 'login',

  data() {
    return {
      errors: [],
      loading: false,
      usersRef: firebase.database().ref('users')
    };
  },

  // computed properties can be used like regular properties
  // they can do computations behind the scenes
  computed: {
    hasErrors() {
      return this.errors.length > 0;
    }
  },

  methods: {
    loginWithGoogle() {
      // loading set to true
      this.loading = true;
      // clear old errors
      this.errors = [];

      firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(response => {
          // pass user to save in db
          this.saveUserToUsersRef(response.user);

          // dispatch setUser action
          this.$store.dispatch('setUser', response.user);

          //then redirect user to '/' page
          this.$router.push('/');
        })
        .catch(error => {
          this.errors.push(error.message);

          // set loading to false
          this.loading = false;
        });
    },

    // save user to databse
    saveUserToUsersRef(user) {
      return this.usersRef.child(user.uid).set({
        name: user.displayName,
        avatar: user.photoURL
      });
    },

    loginWithTwitter() {
      // loading set to true
      this.loading = true;
      // clear old errors
      this.errors = [];

      firebase
        .auth()
        .signInWithPopup(new firebase.auth.TwitterAuthProvider())
        .then(response => {
          // dispatch setUser action
          this.$store.dispatch('setUser', response.user);

          //then redirect user to '/' page
          this.$router.push('/');
        })
        .catch(error => {
          this.errors.push(error.message);

          // set loading to false
          this.loading = false;
        });
    }
  }
};
</script>

<style>
.jumbotron {
  border-radius: 0% !important;
}
</style>

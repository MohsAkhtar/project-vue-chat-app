<template>
  <div>
    <div class="jumbotron bg-primary text-white text-center">
      <h2 class="lead display-3">#VUE CHAT</h2>
      <p> Realtime communication at it's best</p>
    </div>
    <div class="container-fluid">
    <div class="row">
      <div class="col text-center">
        <button @click="loginWithGoogle" class="btn btn-outline-danger btn-lg">Login With Google</button>
      </div>
    </div>
    <div class="row">
      <div class="col text-center mt-5">
        <button class="btn btn-outline-info btn-lg">Login With Twitter</button>
      </div>
    </div>
  </div>
  </div>

</template>

<script>
import auth from 'firebase/auth';
export default {
  name: 'login',

  methods: {
    loginWithGoogle() {
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
  }
};
</script>

<style>
.jumbotron {
  border-radius: 0% !important;
}
</style>

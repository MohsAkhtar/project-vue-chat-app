<template>
  <div>
    <div class="messageForm">
      <form @submit.prevent="sendMessage">
        <div class="input-group mb-3">
          <input v-model.trim="message" type="message" id="message" placeholder="Write something" class="form-control mt-3" autofocus>


          <div class="input-group-append">
            <button @click="sendMessage" type="button" class="btn btn-primary mt-3">&nbsp; Send &nbsp;</button>

            <button type="button" class="btn btn-warning mt-3">Upload</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import auth from 'firebase/auth';

export default {
  name: 'message-form',

  data() {
    return {
      message: '',
      errors: []
    };
  },

  computed: {
    ...mapGetters(['currentChannel', 'currentUser'])
  },

  methods: {
    sendMessage() {
      // construct new message
      let newMessage = {
        content: this.message,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: {
          name: this.currentUser.displayName,
          avatar: this.currentUser.photoURL,
          id: this.currentUser.uid
        }
      };

      // use some form validation
      if (this.currentChannel !== null) {
        if (this.message.length > 0) {
          // '$parent' refers to parent component (Messages)
          // Using current channel id for message id's
          // Note: push() actually gives an item its own unique id in fb database
          this.$parent.messagesRef
            .child(this.currentChannel.id)
            .push()
            .set(newMessage)
            .then(() => {
              // next tick  used to autoscroll with message updates here
              this.$nextTick(() => {
                $('html, body').scrollTop($(document).height());
              });
            })
            .catch(error => {
              this.errors.push(error.message);
            });

          // reset message
          this.message = '';
        }
      }
    }
  }
};
</script>

<style scoped>
.messageForm {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 67%;
  z-index: 100;
  color: white;
  text-align: center;
  margin-bottom: -16px;
  margin-left: 33.3%;
}

input,
button {
  height: 50px;
}
</style>

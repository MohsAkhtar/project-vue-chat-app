<template>
  <div>
<!--Show Single Message -->
    <single-message :messages="messages"></single-message>

    <!-- Show Message Form -->
    <message-form></message-form>
  </div>
</template>

<script>
import SingleMessage from './SingleMessage';
import MessageForm from './MessageForm';
import database from 'firebase/database';
import { mapGetters } from 'vuex';

export default {
  name: 'messages',

  components: { SingleMessage, MessageForm },

  data() {
    return {
      messagesRef: firebase.database().ref('messages'),
      messages: [],
      channel: ''
    };
  },

  computed: {
    ...mapGetters(['currentChannel'])
  },

  watch: {
    // watching here so messages are updated asynchronously
    currentChannel: function() {
      // if current channel changes, watch for all messages
      this.messages = [];
      this.addListeners();
      this.channel = this.currentChannel;
    }
  },

  methods: {
    addListeners() {
      // Listen to child added events on current channel
      this.messagesRef
        .child(this.currentChannel.id)
        .on('child_added', snapshot => {
          this.messages.push(snapshot.val());

          // scroll to top
          this.$nextTick(() => {
            $('html, body').scrollTop($(document).height());
          });
        });
    },

    detachListeners() {
      // stop listening on detach
      if (this.channel !== null) {
        this.messagesRef.child(this.channel.id).off();
      }
    },

    beforeDestroy() {
      this.detachListeners();
    }
  }
};
</script>

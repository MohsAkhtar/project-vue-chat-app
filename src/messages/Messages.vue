<template>
  <div>
<!--Show Single Message -->
    <single-message></single-message>

    <!-- Show Message Form -->
    <message-form></message-form>
  </div>
</template>

<script>
import SingleMessage from './SingleMessage';
import MessageForm from './MessageForm';
export default {
  name: 'messages',

  components: { SingleMessage, MessageForm }
};
</script>

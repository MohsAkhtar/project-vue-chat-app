<template>
  <div>
    <div class="mt-3">
      <div v-for="message in messages" :key="message.id">
        <div class="media">
          <img :src="message.user.avatar" height="50" alt="" class="align-self-start mr-3">

          <div class="media-body">
            <h6 class="mt-0">
              <a href="#">{{ message.user.name }}</a> - {{ message.timestamp | fromNow }}
            </h6>
            <p>{{ message.content }} </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
  name: 'single-message',
  props: ['messages'],

  computed: {
    ...mapGetters(['currentUser'])
  },

  // moment package is used to format date
  filters: {
    fromNow(value) {
      return moment(value).fromNow();
    }
  }
};
</script>

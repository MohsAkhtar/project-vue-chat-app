<template>
  <div>
    <button @click="openModal" class="btn btn-outline-primary">Add Channel</button>

    <!-- Show List of all Channels -->
    <div class="mt-4">
      <button v-for="channel in channels"
      :key="channel.id"
      class="list-group-item list-group-item-action"
      type="button"
      :class="{'active': setActiveChannel(channel)}"
      @click="changeChannel(channel)">
        {{ channel.name }}
      </button>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="channelModal">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title text-dark">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <form>
              <div class="form-group">
                <input v-model="new_channel" type="text" id="new_channel" name="new_channel" placeholder="Channel Name" class="form-control">
              </div>
            </form>

            <!-- errors -->
            <ul class="list-group" v-if="hasErrors">
              <li class="list-group-item text-danger" v-for="error in errors">
                {{ error }}
              </li>
            </ul>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button @click="addChannel" type="button" class="btn btn-primary">Add Channel</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import database from 'firebase/database';
import { mapGetters } from 'vuex';

export default {
  name: 'channels',

  data() {
    return {
      new_channel: '',
      errors: [],
      channelsRef: firebase.database().ref('channels'),
      channels: [],
      channel: null
    };
  },

  computed: {
    ...mapGetters(['currentChannel']),

    hasErrors() {
      return this.errors.length > 0;
    }
  },

  methods: {
    openModal() {
      $('#channelModal')
        .appendTo('body')
        .modal('show');
    },

    // add a channel
    addChannel() {
      this.errors = [];
      // get key to the newly created channel
      let key = this.channelsRef.push().key;
      console.log('newly created channel key: ', key);
      //minimum info needed to create a new channel
      let newChannel = { id: key, name: this.new_channel };
      // create new channel in fb database
      this.channelsRef
        .child(key)
        .update(newChannel)
        .then(() => {
          // reset new_channel value after it is created
          this.new_channel = '';
          // and hide modal
          $('#channelModal').modal('hide');
        })
        .catch(error => {
          this.errors.push(error.message);
        });
    },

    addListeners() {
      //'child_added' event is used to retrieve a list of items from db
      // it is triggered once for each existing child and then again every time a new child is added to specific path
      this.channelsRef.on('child_added', snapshot => {
        //console.log('listening channelsRef on child_added: ', snapshot.val());
        this.channels.push(snapshot.val());

        // set current channel
        if (this.channels.length > 0) {
          // set first channel in array to current channel
          this.channel = this.channels[0];
          // dispatch current channel to Vuex store
          this.$store.dispatch('setChannel', this.channel);
        }
      });
    },

    // method to differentiate which channels are active
    setActiveChannel(channel) {
      return channel.id === this.currentChannel.id;
    },

    // change channel (used on click)
    changeChannel(channel) {
      this.$store.dispatch('setChannel', channel);
    },

    detachListeners() {
      // turn off listening on component destroy
      this.channelsRef.off();
    }
  },

  mounted() {
    this.addListeners();
  },

  beforeDestroy() {
    this.detachListeners();
  }
};
</script>

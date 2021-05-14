<template>
  <div>
    <div>
      {{ user.name }}
      {{ user.email }}
    </div>
    <div>
      <form v-on:submit.prevent="sendMessage">
        <input v-model="message" type="text">
      </form>
    </div>
    <div v-for="message in messages" v-bind:key="message._id">
      [{{ message._id }}] {{ message.content }}
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import messageApi from "@/api/messageApi";

export default {
  name: "Chat",
  data() {
    return {
      message: undefined,
      messages: [],
    }
  },
  methods: {
    sendMessage() {
      messageApi
          .create(this.message)
          .then(() => {
            this.message = undefined;
          });
    }
  },
  created() {
    messageApi.fetchAll().then(res => {
      this.messages = res.data;
    });
  },
  computed: {
    ...mapState([
        'user'
    ])
  }
}
</script>
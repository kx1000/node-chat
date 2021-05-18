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
      <b>{{ message.userId.name }}</b> ({{ message.userId.email }}): {{ message.content }}
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import messageApi from "@/api/messageApi";

export default {
  name: "Chat",
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    customEmit: function (data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)', data)
    }
  },
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
      console.log(this.messages);
    });
  },
  computed: {
    ...mapState([
        'user'
    ])
  }
}
</script>
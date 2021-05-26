<template>
  <div>
    <div>
      {{ user.name }}
      {{ user.email }}
      <button @click="signOut">sign out</button>
    </div>
    <div>
      <form v-on:submit.prevent="sendMessage">
        <input v-model="message" type="text">
      </form>
    </div>
    <div v-for="message in messages" v-bind:key="message._id">
      [{{ message.createdAt }}]<b>{{ message.userId.name }}</b> ({{ message.userId.email }}): {{ message.content }}
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import messageApi from "@/api/messageApi";
import securityApi from "@/api/securityApi";

export default {
  name: "Chat",
  sockets: {
    postMessage: function (data) {
      this.messages.unshift(data);
    }
  },
  data() {
    return {
      message: undefined,
      messages: [],
    }
  },
  methods: {
    ...mapActions([
        'fetchCurrentUser'
    ]),
    sendMessage() {
      messageApi
          .create(this.message)
          .then(() => {
            this.message = undefined;
          });
    },
    async signOut() {
      await this.$gAuth.signOut();
      await securityApi.logout();
      await this.$router.push({name: 'login'});
    }
  },
  created() {
    messageApi.fetchAll().then(res => {
      this.messages = res.data;
    });

    if (0 === Object.keys(this.user).length) {
      this.fetchCurrentUser();
    }
  },
  computed: {
    ...mapState([
        'user'
    ])
  }
}
</script>
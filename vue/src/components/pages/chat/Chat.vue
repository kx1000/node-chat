<template>
  <div>
    chat
    {{ user.name }}
    {{ user.email }}
    <div v-for="message in messages" v-bind:key="message._id">
      [{{ message._id }}] {{ message.body }}
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
      messages: [],
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
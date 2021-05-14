<template>
  <div>
    chat
    {{ user.name }}
    {{ user.email }}
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Chat",
  created() {
    // todo fetch messages
  },
  computed: {
    ...mapState([
        'user'
    ])
  }
}
</script>
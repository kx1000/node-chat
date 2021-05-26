<template>
  <div>
    <button @click="signIn">
      Google Sign In
    </button>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
import securityApi from "@/api/securityApi";

export default {
  name: "GoogleAuthButton",
  methods: {
    ...mapMutations([
        'SET_USER'
    ]),
    async signIn() {
      try {
        const googleUser = await this.$gAuth.signIn();
        const token = googleUser.getAuthResponse().id_token;
        const response = await securityApi.googleLoginByToken(token);
        const user = response.data;
        this.SET_USER(user);
        await this.$router.push({name: 'chat'});
      } catch (err) {
        console.log('Error: ', err);
      }
    },
  },
}
</script>
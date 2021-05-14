<template>
  <div>
    <button v-if="!isSignIn" @click="signIn">
      Sign In
    </button>
    <button v-else @click="signOut">
      Sign Out
    </button>
  </div>
</template>

<script>
import userApi from "@/api/userApi";

export default {
  name: "Login",
  data() {
    return {
      isSignIn: false,
    }
  },
  methods: {
    async signIn() {
      try {
        const googleUser = await this.$gAuth.signIn();
        const token = googleUser.getAuthResponse().id_token;
        console.log(token);
        await userApi.loginByToken(token);
        // todo request to node with token
      } catch (err) {
        console.log('Error: ', err);
      }
    },
    async signOut() {
      const response = await this.$gAuth.signOut();
      // todo request to node
      console.log(response);
    },
  },
}
</script>

<style scoped>

</style>
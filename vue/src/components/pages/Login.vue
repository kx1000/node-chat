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
import {mapMutations} from "vuex";

export default {
  name: "Login",
  data() {
    return {
      isSignIn: false,
    }
  },
  methods: {
    ...mapMutations([
        'SET_USER'
    ]),
    async signIn() {
      try {
        const googleUser = await this.$gAuth.signIn();
        const token = googleUser.getAuthResponse().id_token;
        const response = await userApi.loginByToken(token);
        const user = response.data;
        this.SET_USER(user);
        await this.$router.push({name: 'chat'});
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
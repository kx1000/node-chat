<template>
  <div>
    <button @click="signIn">
      Sign In
    </button>
  </div>
</template>

<script>
import userApi from "@/api/userApi";
import {mapMutations} from "vuex";

export default {
  name: "Login",
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
  },
}
</script>
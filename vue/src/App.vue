<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button v-if="!isSignIn" @click="signIn">
      Sign In
    </button>
    <button v-else @click="signOut">
      Sign Out
    </button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import userApi from './api/userApi'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

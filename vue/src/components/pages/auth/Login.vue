<template>
  <form v-on:submit.prevent="login">
    <h2 class="text-center">Login</h2>
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
    <div class="form-group">
      <input type="email" class="form-control" placeholder="Email" v-model="email">
    </div>
    <div class="form-group">
      <input type="password" class="form-control" placeholder="Password" v-model="password">
    </div>
    <div class="form-group">
      <button class="btn btn-success btn-block">
        Login
      </button>
    </div>
    <google-auth-button />
    <div class="text-center">
      <router-link :to="{name: 'register'}" class="form-group">
        Create a new account
      </router-link>
    </div>
  </form>
</template>

<script>
import GoogleAuthButton from "@/components/pages/auth/GoogleAuthButton";

export default {
  name: "Login",
  components: {
    GoogleAuthButton,
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {

    }
  }
}
</script>

<style scoped>

</style>
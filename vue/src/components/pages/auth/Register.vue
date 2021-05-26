<template>
  <div class="d-flex justify-content-center">
    <form v-on:submit.prevent="register">
      <h2 class="text-center">Register</h2>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Nickname" v-model="userDto.name">
        <field-error :formError="formError" field="name" />
      </div>
      <div class="form-group">
        <input type="email" class="form-control" placeholder="Email" v-model="userDto.email">
        <field-error :formError="formError" field="email" />
      </div>
      <div class="form-group">
        <input type="password" autocomplete="new-password" class="form-control" placeholder="Password" v-model="userDto.plainPassword">
        <field-error :formError="formError" field="plainPassword" />
        <field-error :formError="formError" field="password" />
      </div>
      <div class="form-group">
        <button class="btn btn-success btn-block">
          Register
        </button>
      </div>
      <google-auth-button />
      <div class="text-center">
        <router-link :to="{name: 'login'}">
          Login
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import userApi from "@/api/userApi";
import securityApi from "@/api/securityApi";
import GoogleAuthButton from "@/components/pages/auth/GoogleAuthButton";
import FieldError from "@/components/common/FieldError";

export default {
  name: "Register",
  components: {FieldError, GoogleAuthButton},
  data() {
    return {
      userDto: {},
      formError: undefined,
    }
  },
  methods: {
    register() {
      userApi
          .create(this.userDto)
          .then(() => {
            securityApi
                .jwtLogin(this.userDto.email, this.userDto.plainPassword)
                .then(() => {
                  this.$router.push({name: 'chat'});
                });
          })
          .catch(error => this.formError = error);
    }
  }
}
</script>
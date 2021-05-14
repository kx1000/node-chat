import Vue from 'vue'
import App from './App.vue'
import GAuth from 'vue-google-oauth2'
import axios from "axios";
import VueRouter from 'vue-router';
import {routes} from "./routes";
import Vuex from 'vuex'
import store from "@/store";

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(GAuth, {
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  scope: 'profile email',
  prompt: 'select_account'
})

const router = new VueRouter({routes});

axios.defaults.withCredentials = true;
axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401 && router.currentRoute.name !== 'login') {
    console.log('Required login');
    router.push({name: 'login'});
  }

  return Promise.reject(error);
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

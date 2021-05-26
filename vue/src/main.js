import Vue from 'vue'
import App from './App.vue'
import GAuth from 'vue-google-oauth2'
import axios from "axios";
import VueRouter from 'vue-router';
import {routes} from "./routes";
import Vuex from 'vuex'
import store from "@/store";
import VueSocketIO from 'vue-socket.io';

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(GAuth, {
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  scope: 'profile email',
  prompt: 'select_account'
})

const router = new VueRouter({routes});

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_BACKEND_API_URL;
axios.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401 && router.currentRoute.name !== 'login') {
    console.log('Required auth');
    router.push({name: 'login'});
  }

  return Promise.reject(error);
});

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  connection: process.env.VUE_APP_BACKEND_API_URL,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
}));

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

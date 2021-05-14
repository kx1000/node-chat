import Vue from 'vue'
import App from './App.vue'
import GAuth from 'vue-google-oauth2'
import axios from "axios";
import VueRouter from 'vue-router';
import {routes} from "./routes";

axios.defaults.withCredentials = true;

const gauthOption = {
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)
Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({routes});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

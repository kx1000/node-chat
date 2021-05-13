import Vue from 'vue'
import App from './App.vue'
import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '327574668093-73i9v7amsb599gnqhoi97erkhpf6ea8p.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

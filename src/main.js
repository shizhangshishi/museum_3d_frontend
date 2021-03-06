import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import router from './router'
Vue.config.productionTip = false

const axios = require('axios');

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')

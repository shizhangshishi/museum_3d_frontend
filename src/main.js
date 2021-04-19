import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import router from './router'

Vue.config.productionTip = false

const axios = require('axios');

axios.interceptors.request.use(
  config => {
    if(store.state.token) {
      config.headers.Authorization = `Bearer ${store.state.token}`;
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')

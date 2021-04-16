"use strict";

import Vue from 'vue';
import axios from 'axios';
import store from '../store/index'
import router from '../router/index'

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL = '/api';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = "application/json;charset=UTF-8";
let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    if (localStorage.getItem('token')) {
      // 判断是否有token，若存在，每个http header加上token
      config.headers.Authentication = `${JSON.parse(localStorage.getItem('token')).name}`;
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    if (error) {
      if (error.response.status === 405) {
        // 身份认证有误
        // 清除token 如果不是register/login, 跳转至login
        store.commit('logout');
        router.currentRoute.path !== '/login' &&
        router.currentRoute.path !== '/register' &&
        router.replace({
          path: '/login',
          query: {redirect: router.currentRoute.path}
        });
      } else if (error.response.config.method === 'get') {
        // 使用 get 方法时出错，跳转到错误页面
        router.push({path: '/error/' + error.response.status});
      }
    }
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;

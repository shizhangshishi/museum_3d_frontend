import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import Home from '@/views/Home.vue'
import Login from '@/views/Login';
import Register from '@/views/Register';
import Info from '@/views/Info';
import Museum from '@/views/Museum';
import Error from '@/views/Error';

import Test from '@/views/Test'
import TestMuseum from "@/views/TestMuseum";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/info',
    name: 'Info',
    component: Info,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/museum',
    name: 'Museum',
    component: Museum,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/error/:id',
    name: 'Error',
    component: Error
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/test-museum',
    name: 'TestMuseum',
    component: TestMuseum
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 前端登录拦截
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth) && !store.state.token) {
    next({
      path: '/login',
      query: {redirect: to.fullPath} // 登录成功之后重新跳转到该路由
    });
  }
  else {
    next();
  }
});
export default router

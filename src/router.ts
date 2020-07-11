import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "@/reatomic/dashboard/Dashboard.vue";

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      component: Dashboard,
    }
  ]
})

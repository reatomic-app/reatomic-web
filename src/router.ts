import Vue from 'vue'
import VueRouter from 'vue-router'

import { Projects, projectRoutes } from "@/reatomic/projects";
import { dashboardRoutes } from "@/reatomic/dashboard";

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/dashboard'
    },
    ...dashboardRoutes,
    {
      path: "/projects",
      component: Projects,
      children: projectRoutes,
    },
  ]
})

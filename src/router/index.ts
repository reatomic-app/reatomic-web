import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue';
import ProjectView from '@/views/ProjectView.vue';
import ExperimentView from '@/views/ExperimentView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: "Reatomic" }
    },
    {
      path: '/project/:id',
      name: 'project',
      component: ProjectView,
      props: true,
      meta: { title: "Reatomic" }
    },
    {
      path: '/project/:id/experiment/:experimentId',
      name: 'experiment',
      component: ExperimentView,
      props: true,
      meta: { title: "Reatomic" }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
  strict: true,
  sensitive: true
})

export default router

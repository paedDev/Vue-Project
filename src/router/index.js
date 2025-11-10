import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import JobsView from '@/views/JobsView.vue'
import NotFound from '@/views/NotFound.vue'
import JobViews from '@/views/JobViews.vue'
import AddJobView from '@/views/AddJobView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: JobsView,
    },
    {
      path: '/jobs/add',
      name: 'job-add',
      component: AddJobView,
    },
    {
      path: '/jobs/:id',
      name: 'jobs-details',
      component: JobViews,
    },

    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})
export default router

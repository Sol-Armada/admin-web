// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/UserStore'

const routes = [
  {
    path: '/',
    name: 'Root',
    component: () => import('@/layouts/default/View.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
      },
      {
        path: '/ranks',
        name: 'Ranks',
        component: () => import(/* webpackChunkName: "ranks" */ '@/views/Ranks.vue'),
      },
      {
        path: '/events',
        name: 'Events',
        component: () => import(/* webpackChunkName: "events" */ '@/views/events/Index.vue'),
      },
      {
        path: '/events/new',
        name: 'New',
        component: () => import(/* webpackChunkName: "eventsEdit" */ '@/views/events/Edit.vue'),
      },
      {
        path: '/events/edit',
        name: 'Edit',
        component: () => import(/* webpackChunkName: "eventsEdit" */ '@/views/events/Edit.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/layouts/default/Login.vue'),
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from) => {
  const userStore = useUserStore();

  if (userStore.isLoggedIn() && (to.name === 'Login' || to.name === 'Root')) {
    return { name: 'Dashboard' }
  }

  // check if user is authenticated
  if (!userStore.isLoggedIn() && to.name !== 'Login') {
    return { name: 'Login' }
  }

  return true
})

export default router

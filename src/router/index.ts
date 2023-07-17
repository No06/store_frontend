import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/RouterView.vue'),
      children: [
        {
          path: '/',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('../views/ProfileView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
  ]
})

const excludePaths = new Set([
  "/login"
])
router.beforeEach((to, from, next) => {
  if (!excludePaths.has(to.path) && localStorage.getItem("token") == null) {
    next("/login")
  } else {
    next()
  }
})

export default router

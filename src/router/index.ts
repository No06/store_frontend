import axios from 'axios'
import { createRouter, createWebHistory } from 'vue-router'
import { useTokenStore } from '@/stores/token';

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
  "/login",
  "/"
])
const tokenCheckExcludePaths = new Set([
  "/login"
])
router.beforeEach((to, from, next) => {
  const tokenStore = useTokenStore()
  if (!excludePaths.has(to.path) && tokenStore.token == null) {
    next("/login")
    return
  }
  if (!tokenCheckExcludePaths.has(to.path) && tokenStore.token != null) {
    axios.get("http://localhost:8080/auth/checkToken", {
      headers: {
        token: tokenStore.token
      }
    })
    .then(resp => {
      if (!resp.data) {
        tokenStore.remove()
      } 
    })
  }
  next()
})

export default router

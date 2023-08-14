import axios from 'axios'
import { createRouter, createWebHistory } from 'vue-router'
import { useTokenStore } from '@/stores/token';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			component: () => import('@/views/RouterView.vue'),
			children: [
				{
					path: '',
					component: () => import('@/views/HomeView.vue'),
				},
				{
					path: '/profile',
					component: () => import('@/views/ProfileView.vue')
				},
				{
					path: '/admin',
					component: () => import('@/views/AdminView/AdminView.vue'),
					children: [
						{
							path: '',
							redirect: '/admin/product-manager'
						},
						{
							path: 'product-manager',
							component: () => import('@/views/AdminView/ProductManager.vue')
						},
						{
							path: 'order',
							component: () => import('@/views/AdminView/OrderView.vue')
						}
					]
				},
				{
					path: "/collections/all-products",
					component: () => import('@/views/CollectionsView.vue'),
					props: {
						url: "http://localhost:8080/product/getAll"
					}
				}
			]
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/LoginView.vue')
		},
	]
})

// 访问前需要登录的路由（敏感页面）
const needTokenPaths = new Set([
	"/profile",
	"/admin"
])
// 不进行token校验的路由
const tokenCheckExcludePaths = new Set([
	"/login"
])
function getParentPath(path: string) {
	return "/" + path.split("/")[1]
}
router.beforeEach(async (to, from, next) => {
	const tokenStore = useTokenStore()

	if (!tokenCheckExcludePaths.has(getParentPath(to.path)) && tokenStore.token != null) {
		await axios.get("http://localhost:8080/auth/checkToken", {
			headers: {
				token: tokenStore.token
			}
		})
		.then(resp => {
			if (!resp.data) {
				tokenStore.remove()
			}
		})
		.catch(tokenStore.remove)
	}
	if (needTokenPaths.has(getParentPath(to.path)) && tokenStore.token == null) {
		next("/login")
		return
	}
	next()
})

export default router

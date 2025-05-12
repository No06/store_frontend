import { createRouter, createWebHistory } from 'vue-router'
import { useTokenStore } from '@/stores/token_store';
import { checkToken, url } from '@/utils/axios';

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
							redirect: '/admin/goods-manage'
						},
						{
							path: 'goods-manage',
							component: () => import('@/views/AdminView/GoodsManage.vue')
						},
						{
							path: 'carousel-manage',
							component: () => import('@/views/AdminView/CarouselManage.vue')
						},
						{
							path: 'goods-category-manage',
							component: () => import('@/views/AdminView/GoodsCategoryManage.vue')
						},
						{
							path: 'user-manage',
							component: () => import('@/views/AdminView/UserManage.vue')
						},
						{
							path: 'order',
							component: () => import('@/views/AdminView/OrderView.vue')
						}
					]
				},
				{
					path: "/collections/all-goods",
					component: () => import('@/views/CollectionsView.vue'),
					props: {
						url: url+"/goods/getAllBySpec"
					}
				},
				{
					path: "/goods/:id",
					component: () => import('@/components/CollectionsView/GoodsView.vue')
				},
				{
					path: "/cart",
					component: () => import('@/views/CartView.vue')
				},
				{
					path: "/order",
					component: () => import("@/views/OrderView.vue"),
				},
				{
					path: "/user-address",
					component: () => import("@/views/UserAddressView.vue")
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
	"/admin",
	"/cart",
	"/user-address"
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
	const token = tokenStore.token
	// 如果不是/login页面并且存有token，则验证token有效性
	if (!tokenCheckExcludePaths.has(getParentPath(to.path)) && token != null) {
		await checkToken().catch(tokenStore.remove)
		next()
		return
	}
	// 必须需要token才可以进入的页面
	if (needTokenPaths.has(getParentPath(to.path)) && token == null) {
		next("/login")
		return
	}
	next()
})

export default router

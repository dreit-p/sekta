import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/home.vue'
import store from './store/'

Vue.use(VueRouter)

const scrollBehavior = (to, from, savedPosition) => {
	if (savedPosition) {
		// savedPosition is only available for popstate navigations.
		return savedPosition
	} else {
		const position = {}
		// new navigation.
		// scroll to anchor by returning the selector
		if (to.hash) {
			position.selector = to.hash
		}
		// check if any matched route config has meta that requires scrolling to top
		if (to.matched.some(m => m.meta.scrollToTop)) {
			// cords will be used if no selector is provided,
			// or if the selector didn't match any element.
			position.x = 0
			position.y = 0
		}
		// if the returned position is falsy or an empty object,
		// will retain current scroll position.
		return position
	}
}


const Router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	scrollBehavior,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () =>
				import ( /* webpackChunkName: "about" */ './views/template.vue')
		},
		{
			path: '/gift-cert',
			name: 'gift-cert',
			component: () =>
				import ( /* webpackChunkName: "about" */ './views/certificates.vue')
		},
		{
			path: '/contacts',
			name: 'contacts',
			component: () =>
				import ('./views/contacts.vue')
		},
		{
			path: '/jobs',
			name: 'jobs',
			component: () =>
				import ('./views/jobs.vue')
		},
		{
			path: '/success-message',
			name: 'success-message',
			component: () =>
				import ('./views/success-message.vue')
		},
		{
			path: '/requisites',
			name: 'requisites',
			component: () =>
				import ('./views/requisites.vue')
		},
		{
			path: '/online',
			component: {
				name: 'router-wrapper',
				template: `<router-view></router-view>`
			},
			children: [
				{
					path: '/',
					component: () =>
						import ('./views/courses/main.vue'),
				},
				{
					path: 'evo',
					component: () =>
						import ( /* webpackChunkName: "courses" */ './views/courses/evolution.vue'),
					meta: { scrollToTop: true }
				},
				{
					path: 's60days',
					// name: 's60-women',
					component: () =>
						import ( /* webpackChunkName: "courses" */ './views/courses/s60-women.vue'),
					meta: { scrollToTop: true }
				},
				{
					path: 'accu',
					component: () =>
						import ( /* webpackChunkName: "courses" */ './views/courses/accu.vue'),
					meta: { scrollToTop: true }
				},
				{
					path: 's60days-men',
					// name: 's60-men',
					component: () =>
						import ( /* webpackChunkName: "courses" */ './views/courses/s60-men.vue'),
					meta: { scrollToTop: true }
				},
				{
					path: 'sektacare',
					name: 'SektaCare',
					component: () =>
						import ( /* webpackChunkName: "courses" */ './views/courses/sektacare.vue'),
					meta: { scrollToTop: true }
				},
				{
					path: 'pregnant',
					name: 'pregnant',
					component: () =>
						import ( /* webpackChunkName: "courses" */ './views/courses/pregnant.vue'),
					meta: { scrollToTop: true }
				},
				{
					path: 'sektavip',
					name: 'sektavip',
					component: () =>
						import ( /* webpackChunkName: "courses" */ './views/courses/vip.vue'),
					meta: { scrollToTop: true }
				},
				{
					path: 'sektamama',
					name: 'SektaMama',
					component: () =>
						import ( /* webpackChunkName: "courses" */ './views/courses/sektamama.vue'),
					meta: { scrollToTop: true }
				},
			]
		},
		{
			path: '/gym',
			// name: 'gym',
			component: {
				name: 'router-wrapper',
				template: `<router-view></router-view>`
			},
			children: [
				{
					path: '/',
					component: () =>
						import ('./views/gym/main.vue'),
				},
				{
					path: 'moscow',
					name: 'gym-moscow',
					component: () =>
						import ( /* webpackChunkName: "gym" */ './views/gym/moscow.vue'),
				},
				{
					path: 'saint-pitersburg',
					name: 'gym-saint-pitersburg',
					component: () =>
						import ( /* webpackChunkName: "gym" */ './views/gym/saint-pitersburg.vue'),
				},
			]
		},
		{
			path: '/camp',
			name: 'camp',
			component: () =>
				import ( /* webpackChunkName: "gym" */ './views/camp.vue'),
		},
		{
			path: '/sektabullet',
			name: 'bullet',
			component: () =>
				import ( /* webpackChunkName: "gym" */ './views/bullet.vue'),
		},
		{
			path: '/personal',
			meta: { requiresAuth: true, layout: 'personal' },
			component: {
				name: 'router-wrapper',
				template: `<router-view></router-view>`
			},
			children: [
				{
					path: 'details',
					meta: { requiresAuth: true, layout: 'personal' },
					component: () =>
						import ('./views/personal/details.vue'),
				},
				{
					path: '',
					name: 'personal',
					meta: { requiresAuth: true, layout: 'personal' },
					component: () =>
						import ('./views/personal/main.vue'),
				},
				{
					path: 'details',
					meta: { requiresAuth: true, layout: 'personal' },
					component: () =>
						import ('./views/personal/details.vue'),
				},
				{
					path: 'success-order',
					meta: { requiresAuth: true, layout: 'personal' },
					component: () =>
						import ('./views/personal/success_order.vue'),
				},
				{
					path: 'order',
					meta: { requiresAuth: true, layout: 'personal' },
					component: () =>
						import ('./views/personal/order.vue'),
				},
			]
		},
		{
			path: '/sektamerch',
			name: 'sektamerch',
			component: () =>
				import ('./views/sektamerch.vue'),
		},
		{
			// 404
			path: '*',
			component: () =>
				import ('./views/404.vue'),
		},
		{ path: '/evo', redirect: '/online-courses/evo' }
	]
})

Router.beforeEach((to, from, next) => {

	if (to.matched.some(record => record.meta.requiresAuth)) {
		// этот путь требует авторизации, проверяем залогинен ли
		// пользователь, и если нет, перенаправляем на страницу логина
		if (!store.state.user.token) {
			next({
				path: '/login',
				query: { redirect: to.fullPath }
			})
		} else {
			next()
		}
	} else {
		next() // всегда так или иначе нужно вызвать next()!
	}
})

export default Router

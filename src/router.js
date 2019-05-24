import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/home.vue'

Vue.use(VueRouter)

const Router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	scrollBehavior: (to, from, savedPosition) => new Promise((resolve) => {
		if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
		const position = savedPosition || {x:0, y:0};
		if (!savedPosition) {
			if (to.hash) {
				position.selector = to.hash;
			}
			if (to.matched.some((m) => m.meta.scrollToTop)) {
				position.x = 0;
				position.y = 0;
			}
		}
		Router.app.$root.$once('triggerScroll', () => {
			Router.app.$nextTick(() => resolve(position));
		});
	}),
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
			component: () => import(/* webpackChunkName: "about" */ './views/template.vue')
		},
		{
			path: '/gift-cert',
			name: 'gift-cert',
			component: () => import(/* webpackChunkName: "about" */ './views/certificates.vue')
		},
		{
			path: '/contacts',
			name: 'contacts',
			component: () => import('./views/contacts.vue')
		},
		{
			path: '/jobs',
			name: 'jobs',
			component: () => import('./views/jobs.vue')
		},
		{
			path: '/success-message',
			name: 'success-message',
			component: () => import('./views/success-message.vue')
		},
		{
			path: '/requisites',
			name: 'requisites',
			component: () => import('./views/requisites.vue')
		},
		{
			path: '/online-courses',
			component: {
				name: 'router-wrapper',
				template: `<router-view></router-view>`
			},
			children: [
				{
					path: '/',
					component: () => import('./views/courses/main.vue'),
				},
				{
					path: 's60days',
					// name: 's60-women',
					component: () => import(/* webpackChunkName: "courses" */ './views/courses/s60-women.vue')
				},
				{
					path: 'accu',
					component: () => import(/* webpackChunkName: "courses" */ './views/courses/accu.vue')
				},
				{
					path: 's60days-men',
					// name: 's60-men',
					component: () => import(/* webpackChunkName: "courses" */ './views/courses/s60-men.vue')
				},
				{
					path: 'sektacare',
					name: 'SektaCare',
					component: () => import(/* webpackChunkName: "courses" */ './views/courses/sektacare.vue')
				},
				{
					path: 'pregnant',
					name: 'pregnant',
					component: () => import(/* webpackChunkName: "courses" */ './views/courses/pregnant.vue')
				},
				{
					path: 'sektavip',
					name: 'sektavip',
					component: () => import(/* webpackChunkName: "courses" */ './views/courses/vip.vue')
				},
				{
					path: 'sektamama',
					name: 'SektaMama',
					component: () => import(/* webpackChunkName: "courses" */ './views/courses/sektamama.vue')
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
					component: () => import('./views/gym/main.vue'),
				},
				{
					path: 'moscow',
					name: 'gym-moscow',
					component: () => import(/* webpackChunkName: "gym" */ './views/gym/moscow.vue'),
				},
				{
					path: 'saint-pitersburg',
					name: 'gym-saint-pitersburg',
					component: () => import(/* webpackChunkName: "gym" */ './views/gym/saint-pitersburg.vue'),
				},
			]
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
					path: '',
					meta: { requiresAuth: true, layout: 'personal' },
					component: () => import('./views/personal/main.vue'),
				},
				{
					path: 'success-order',
					meta: { requiresAuth: true, layout: 'personal' },
					component: () => import('./views/personal/success_order.vue'),
				},
				{
					path: 'order',
					meta: { requiresAuth: true, layout: 'personal' },
					component: () => import('./views/personal/order.vue'),
				},
			]
		},
		{
			// 404
			path: '*',
			component: () => import('./views/404.vue'),
		}
	]
})

Router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		// этот путь требует авторизации, проверяем залогинен ли
		// пользователь, и если нет, перенаправляем на страницу логина
		// if (!auth.loggedIn()) {
		if (false) {
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

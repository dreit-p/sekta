import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/home.vue'
import store from './store/'


Vue.use(VueRouter)

const scrollBehavior = (to, from, savedPosition) => new Promise((resolve) => {
	if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
	const position = savedPosition || { x: 0, y: 0 };
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
})


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
			path: '/aboutus',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () =>
				import('./views/about-us.vue')
		},
		{
			path: '/certificates',
			name: 'certificates',
			component: () =>
				import('./views/certificates.vue')
		},
		{
			path: '/results',
			name: 'results',
			component: () => import('./views/results.vue')
		},
		{
			path: '/kontakty',
			name: 'contacts',
			component: () =>
				import('./views/contacts.vue')
		},
		{
			path: '/vacancies',
			name: 'jobs',
			component: () =>
				import('./views/jobs.vue')
		},
		{
			path: '/success-message',
			name: 'success-message',
			component: () =>
				import('./views/success-message.vue')
		},
		{
			path: '/requisites',
			name: 'requisites',
			component: () =>
				import('./views/requisites.vue')
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
					name: 'online',
					component: () =>
						import('./views/courses/main.vue'),
				},
				{
					path: 'evo',
					name: 'sektaevo',
					component: () =>
						import( /* webpackChunkName: "courses" */ './views/courses/evolution.vue')
				},
				{
					path: 's60days',
					name: 's60-women',
					component: () =>
						import( /* webpackChunkName: "courses" */ './views/courses/s60-women.vue')
				},
				{
					path: 'sektamen',
					name: 's60-men',
					component: () =>
						import( /* webpackChunkName: "courses" */ './views/courses/s60-men.vue')
				},
				{
					path: 'sektacare',
					name: 'sektacare',
					component: () =>
						import( /* webpackChunkName: "courses" */ './views/courses/sektacare.vue')
				},
				{
					path: 'energyboost',
					name: 'energyboost',
					component: () =>
						import( /* webpackChunkName: "courses" */ './views/courses/energy-boost.vue'),
					meta: { scrollToTop: true }
				},
				{
					path: 'pregnancy',
					name: 'pregnant',
					component: () =>
						import( /* webpackChunkName: "courses" */ './views/courses/pregnant.vue')
				},
				{
					path: 'sektavip',
					name: 'sektavip',
					component: () =>
						import( /* webpackChunkName: "courses" */ './views/courses/vip.vue')
				},
				{
					path: 'smama',
					name: 'sektamama',
					component: () =>
						import( /* webpackChunkName: "courses" */ './views/courses/sektamama.vue')
				},
			]
		},
		{
			path: '/gym',
			component: {
				name: 'router-wrapper',
				template: `<router-view></router-view>`
			},
			children: [
				{
					path: '/',
					name: 'gym-main',
					component: () =>
						import('./views/gym/main.vue'),
				},
				{
					path: ':city',
					name: 'gym',
					component: () =>
						import( /* webpackChunkName: "gym" */ './views/gym/gym.vue'),
				}
			]
		},
		{
			path: '/camp',
			name: 'camp',
			component: () =>
				import( /* webpackChunkName: "gym" */ './views/camp.vue'),
		},
		{
			path: '/sektabullet',
			name: 'sektabullet',
			component: () =>
				import( /* webpackChunkName: "gym" */ './views/bullet.vue'),
		},
		{
			path: '/sektamerch',
			name: 'sektamerch',
			component: () =>
				import('./views/sektamerch.vue'),
		},
		{
			path: '/accuchek',
			name: 'accuchek',
			component: import('./views/courses/accu.vue'),
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
						import('./views/personal/details.vue'),
				},
				{
					path: '',
					name: 'personal',
					meta: { requiresAuth: true, layout: 'personal' },
					component: () =>
						import('./views/personal/main.vue'),
				},
				{
					path: 'details',
					meta: { requiresAuth: true, layout: 'personal' },
					component: () =>
						import('./views/personal/details.vue'),
				},
				{
					path: 'success-order',
					meta: { requiresAuth: true, layout: 'personal' },
					component: () =>
						import('./views/personal/success_order.vue'),
				},
				{
					path: 'order',
					meta: { requiresAuth: true, layout: 'personal' },
					component: () =>
						import('./views/personal/order.vue'),
				},
			]
		},
		{
			path: '/table',
			meta: { layout: 'empty' },
			component: () =>
					import('./views/table/main.vue')
		},
		{
			path: '/password-recovery',
			name: 'password-recovery',
			component: () =>
				import('./views/personal/password-recovery.vue'),
		},
		{
			// 404
			path: '*',
			component: () =>
				import('./views/404.vue'),
		},
		{
			path: '/login',
			name: 'login',
			component: Home
		},
		//Old site redirects
		{ path: '/evo', redirect: { name: 'sektaevo' } },
		{ path: '/courses/smama', redirect: { name: 'sektamama' } },
		{ path: '/courses/sektacare', redirect: { name: 'sektacare' } },
		{ path: '/courses/pregnancy', redirect: { name: 'pregnant' } },
		{ path: '/courses/sektavip', redirect: { name: 'sektavip' } },
		{ path: '/cities/moskva', redirect: { path: '/gym/moskva' } },
		{ path: '/cities/sankt-peterburg', redirect: { path: '/gym/sankt-peterburg' } },
		{ path: '/certificates/gift', redirect: { name: 'certificates' } },
		{ path: '/informacziya/kontakty', redirect: { name: 'contacts' } },
		{ path: '/informacziya/presskit', redirect: { name: 'about' } },
		{ path: '/informacziya/vacancies', redirect: { name: 'jobs' } },
		{ path: '/online-repayment', redirect: { name: 'online' } },
		{ path: '/repayment', redirect: { name: 'gym-main' } },
	]
})

Router.beforeEach((to, from, next) => {
	// перед каждым переходом обновляем токен в куках
	document.cookie = `api_token=${store.state.user.token}; domain=${process.env.VUE_APP_COOKIE_DOMAIN}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;

	if (to.matched.some(record => record.meta.requiresAuth)) {
		// этот путь требует авторизации, проверяем залогинен ли
		// пользователь, и если нет, перенаправляем на страницу логина
		if (!store.state.user.token) {
			next({
				path: '/login',
				query: { redirect: to.name }
			})
		} else {
			next()
		}
	} else {
		next() // всегда так или иначе нужно вызвать next()!
	}
})

export default Router

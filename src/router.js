import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
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
			// 404
			path: '*',
			component: {
				template: `<span><center>404</center></span>`
			}
		}
	]
})

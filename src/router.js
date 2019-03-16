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
			path: '/sektacare',
			name: 'SektaCare',
			component: () => import('./views/courses/sektacare.vue')
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
					component: () => import('./views/gym/index.vue'),
				},
				{
					path: 'moscow',
					name: 'gym-moscow',
					component: () => import('./views/gym/moscow.vue'),
				},
				{
					path: 'saint-pitersburg',
					name: 'gym-saint-pitersburg',
					component: () => import('./views/gym/saint-pitersburg.vue'),
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

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		appStates: {
			isOpenedMenu: false,
		},
		mainLinks: [
			{
				link: '/about-us',
				name: 'О проекте'
			},
			{
				link: '/articles',
				name: 'Наши статьи'
			},
			{
				link: '/results',
				name: 'Результаты'
			},
			{
				link: '/contacts',
				name: 'Контакты'
			},
		],
		additionalLinks: [
			{
				link: '/online-courses',
				name: 'Онлайн курсы',
				subLinks: [
					{
						link: '/s60days',
						name: 'Курс #s60days'
					},
					{
						link: '/for-mums',
						name: 'Курс для мам'
					},
					{
						link: '/sektalite',
						name: 'Курс #sektalite'
					},
					{
						link: '/vip-course',
						name: 'VIP программа'
					},
					{
						link: '/for-pregnant',
						name: 'Курсы для беременных'
					},
					{
						link: '/s60days-men',
						name: 'Курс #s60days для мужчин'
					},
				]
			},
			{
				link: '/gym',
				name: 'Тренировки в зале',
				subLinks: [
					{
						link: '/gym-moscow',
						name: 'Москва'
					},
					{
						link: '/gym-saint-petersburg',
						name: 'Санкт-Петербург'
					}
				]
			},
			{
				link: '/camp',
				name: 'Летний лагерь'
			},
			{
				link: '/gift-cert',
				name: 'Подарочный сертификат'
			}
		]
	},
	mutations: {
		setMenuState (state, payload) {
			state.appStates.isOpenedMenu = payload;
		}
	},
	actions: {
		setMenuState ({commit}, payload) {
			if (payload) {
				document.getElementsByTagName('body')[0].classList.add('menu-is-opened');
			} else {
				document.getElementsByTagName('body')[0].classList.remove('menu-is-opened');
			}
			commit('setMenuState', payload);
		}
	}
})

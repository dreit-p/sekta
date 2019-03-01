import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		appStates: {
			isOpenedMenu: false,
			isOpenedModal: false,
			isScrollLocked: false,
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
		},
		setModalState (state, payload) {
			state.appStates.isOpenedModal = payload;
		},
		setScrollLock (state, payload) {
			state.appStates.isScrollLocked = payload;
		}
	},
	actions: {
		setMenuState ({dispatch, commit}, payload) {
			dispatch('lockScroll', payload);
			commit('setMenuState', payload);
		},
		setModalState ({dispatch, commit}, payload) {
			dispatch('lockScroll', payload);
			commit('setModalState', payload);
		},
		lockScroll ({commit}, payload) {
			if (payload) {
				document.getElementsByTagName('body')[0].classList.add('scroll-locked');
			} else {
				document.getElementsByTagName('body')[0].classList.remove('scroll-locked');
			}
			commit('setScrollLock', payload);
		},
	}
})

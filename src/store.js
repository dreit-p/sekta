import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

export default new Vuex.Store({
	plugins: [createPersistedState({
		paths: ['inputs'],
	})],
	state: {
		appStates: {
			isOpenedMenu: false,
			isScrollLocked: false,
			formModal: {
				isOpened: false,
				type: 'login'
			}
		},
		inputs: {},
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
						link: '/SektaCare',
						name: 'Курс #SektaCare'
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
						link: '/gym/moscow',
						name: 'Москва'
					},
					{
						link: '/gym/saint-pitersburg',
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
		setModalState (state, modalState) {
			state.appStates.formModal.isOpened = modalState;
		},
		setModalType (state, modalType) {
			state.appStates.formModal.type = modalType;
		},
		setScrollLock (state, payload) {
			state.appStates.isScrollLocked = payload;
		},
		setInputData(state, {name, data}) {
			state.inputs[name] = data;
		}
	},
	actions: {
		setMenuState ({dispatch, commit}, payload) {
			dispatch('lockScroll', payload);
			commit('setMenuState', payload);
		},
		setModalState ({dispatch, commit}, {modalState, type}) {
			if (modalState !== undefined) {
				dispatch('lockScroll', modalState);
				commit('setModalState', modalState);
			}
			if (type !== undefined) {
				commit('setModalType', type);
			}
		},
		lockScroll ({commit}, payload) {
			if (payload) {
				let scrollWidth = window.innerWidth - document.documentElement.clientWidth;
				document.getElementsByTagName('body')[0].classList.add('scroll-locked');
				document.getElementsByTagName('body')[0].style.overflowX = 'hidden';
				document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
				document.getElementsByTagName('body')[0].style.paddingRight = scrollWidth + 'px';
			} else {
				document.getElementsByTagName('body')[0].classList.remove('scroll-locked');
				document.getElementsByTagName('body')[0].style.overflowX = 'auto';
				document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
				document.getElementsByTagName('body')[0].style.paddingRight = 0;
			}
			commit('setScrollLock', payload);
		}
	}
})

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

export default new Vuex.Store({
	plugins: [createPersistedState({
		paths: ['inputs', 'user'],
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
						link: '/online-courses/s60days',
						name: 'Курс #s60days'
					},
					{
						link: '/online-courses/sektamama',
						name: 'Курс для мам'
					},
					{
						link: '/online-courses/SektaCare',
						name: 'Курс #SektaCare'
					},
					{
						link: '/online-courses/vip-course',
						name: 'VIP программа'
					},
					{
						link: '/online-courses/for-pregnant',
						name: 'Курсы для беременных'
					},
					{
						link: '/online-courses/s60days-men',
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
		],
		user: {
			location: null,
		}
	},
	mutations: {
		setMenuState (state, payload) {
			state.appStates.isOpenedMenu = payload;
		},
		setFormModalState (state, modalState) {
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
		},
		setUserInfo(state, {type, data}) {
			state.user[type] = data;
		},
	},
	actions: {
		setMenuState ({dispatch, commit}, payload) {
			dispatch('lockScroll', payload);
			commit('setMenuState', payload);
		},
		setFormModalState ({dispatch, commit}, {modalState, type}) {
			if (modalState !== undefined) {
				dispatch('lockScroll', modalState);
				commit('setFormModalState', modalState);
			}
			if (type !== undefined) {
				commit('setModalType', type);
			}
		},
		lockScroll ({commit}, payload) {
			let body = document.getElementsByTagName('body')[0];
			if (payload) {
				let scrollWidth = window.innerWidth - document.documentElement.clientWidth;
				body.classList.add('scroll-locked');
				body.style.overflowX = 'hidden';
				body.style.overflowY = 'hidden';
				body.style.paddingRight = scrollWidth + 'px';
			} else {
				body.classList.remove('scroll-locked');
				body.style.overflowX = 'auto';
				body.style.overflowY = 'scroll';
				body.style.paddingRight = 0;
			}
			commit('setScrollLock', payload);
		},
		requestIPInfo ({commit}) {
			return axios
				.get('https://api.ipgeolocation.io/ipgeo?apiKey=f286a2fe90004550aeadbf0a8ff240d9')
				.then(response => {
						// console.log(response);
						commit('setUserInfo', {type: 'location', data: response.data.state_prov});
					})
				.catch(error => console.log(error));
		},
		updateUserLocation ({state, dispatch}) {
			if (!state.user.location) {
				dispatch('requestIPInfo');
			}
			return state.user.location;
		},
	},
})

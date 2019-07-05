import axios from 'axios'

const TEST_URL = `http://api.sektaschool.ru.dev.immelman.ru`;

export default {
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
	updateUserLocation ({state, dispatch}) {
		if (!state.user.location) {
			dispatch('requestIPInfo');
		}
		return state.user.location;
	},
	requestOnlineCourses({ commit }) {
		return new Promise((resolve)=>{
			return axios
				.get(`${TEST_URL}/api/online-courses`)
				.then(response => {
					commit('setOnlineCourses', response.data.data);
					resolve();
				})
				.catch(error => console.error(error));
		});
	},
	requestIPInfo({ commit }) {
		return axios
			.get(`${TEST_URL}/api/define-city`)
			.then(response => {
				commit('setCity', { city: response.data.data });
			})
			.catch(error => console.error(error));
	},
	updateOnlineCourses({ state, dispatch }) {
		return new Promise((resolve)=>{
			if (state.onlineCourses === null) {
				dispatch('requestOnlineCourses').then(()=>{
					resolve();
				});
			} else {
				resolve();
			}
		})
	},
	updateCity({ state, dispatch }) {
		if (!state.user.cityId) {
			dispatch('requestIPInfo');
		}
	}
}
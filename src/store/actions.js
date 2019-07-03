import axios from 'axios'

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
}
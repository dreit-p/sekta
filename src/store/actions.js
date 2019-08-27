import router from '@/router'
import api from '../assets/api'

export default {
	setFormModalState({ dispatch, commit }, { modalState, type }) {
		if (modalState !== undefined) {
			dispatch('lockScroll', modalState);
			commit('setFormModalState', modalState);
		}
		if (type !== undefined) {
			commit('setModalType', type);
		}
	},
	lockScroll({ commit }, payload) {
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
	updateUserLocation({ state, dispatch }) {
		if (!state.user.location) {
			dispatch('requestIPInfo');
		}
		return state.user.location;
	},
	requestOnlineCourses({ commit }) {
		return new Promise((resolve) => {
			return api.online.getCourses()
				.then(response => {
					commit('setOnlineCourses', response.data.data);
					resolve();
				})
				.catch(error => console.error(error));
		});
	},
	requestIPInfo({ commit }) {
		return api.defineCity()
			.then(response => {
				commit('setCity', response.data.data.id);
			})
			.catch(error => console.error(error));
	},
	authRequest({ commit }, { email, password }) {
		return api.auth.onlyLogin(email, password)
			.then(resp => {
				commit('setAuthToken', resp.data.token)
				return resp
			})
			.catch(err => {
				throw err.response;
			});
	},
	sendGymOrder({ state }, data) {
		return api.gym.createOrder(data)
			.then(resp => {
				return resp
			})
			.catch(err => {
				throw err.response;
			});
	},
	sendOnlineOrder({ state }, data) {
		return api.online.createOrder(data)
			.then(resp => {
				return resp
			})
			.catch(err => {
				throw err.response;
			});
	},
	reqGymPayment({ state }, { gymOrderId, price_id, promocode }) {
		return api.gym.createPayment(gymOrderId, {price_id, promocode})
			.then(resp => {
				return resp
			})
			.catch(err => {
				throw err.response;
			});
	},
	reqOnlinePayment({ state }, { orderId, price_id, promocode }) {
		return api.online.createPayment(orderId, {price_id, promocode})
			.then(resp => {
				return resp
			})
			.catch(err => {
				throw err.response;
			});
	},
	reqCertPrices({state}) {
		return api.certs.getCertificates()
			.then(resp=>{
				return resp
			})
			.catch(err=>{
				throw err.response;
			});
	},
	sendCertOrder({ state }, data) {
		return api.certs.createOrder(data)
			.then(resp => {
				return resp
			})
			.catch(err => {
				throw err.response;
			});
	},
	reqCertPayment({ state }, { orderId, price_id, promocode }) {
		return api.certs.createPayment(orderId, {price_id, promocode})
			.then(resp => {
				return resp
			})
			.catch(err => {
				throw err.response;
			});
	},
	regRequest({ dispatch }, data) {
		return api.auth.register(data)
			.then(() => {
				return dispatch('authRequest', data).then(authResp => authResp);
			})
			.catch(regErr => {
				throw regErr.response;
			});
	},
	userDetailsRequest({ state, dispatch, commit }) {
		return api.personal.getDetails()
			.then((resp) => {
				commit('setUserInfo', resp.data.data)
				return resp;
			})
			.catch(requestError => {
				if (requestError.response.status == 403) {
					dispatch('logOut');
				}
				throw requestError.response;
			});
	},
	userDetailsPosting({ state, dispatch }, data) {
		return api.personal.updateDetails(data)
			.then(() => {
				return dispatch('userDetailsRequest').then(authResp => authResp);
			})
			.catch(postingErr => {
				throw postingErr.response;
			});
	},
	logOut({ state, commit }) {
		if (state.user.token) {
			return api.auth.logout()
				.then(() => {
					commit('setUserInfo', null)
					commit('setAuthToken', null)
					router.push({ name: 'home' });
				})
		}
	},
	reqDiscountedPrice(context, { price_id, code }) {
		if (!price_id || !code) {
			return;
		}

		return api.getPriceWithPromocode(price_id, code)
			.then((resp) => {
				return resp.data;
			})
			.catch(requestError => {
				throw requestError.response;
			});
	},
	updateOnlineCourses({ state, dispatch }) {
		return new Promise((resolve) => {
			if (state.onlineCourses === null) {
				dispatch('requestOnlineCourses').then(() => {
					resolve();
				});
			} else {
				resolve();
			}
		})
	},
	updateCity({ state, dispatch }) {
		dispatch('requestIPInfo');
	}
}

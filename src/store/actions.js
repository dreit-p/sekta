import axios from 'axios'
import router from '@/router'

const TEST_URL = `http://api.sektaschool.ru.dev.immelman.ru`;

const postReq = (path, data) => {
	return axios({
		url: `${TEST_URL}${path}`,
		data: data,
		method: 'POST'
	})
		.then(resp=>resp)
		.catch(err => {
			console.warn(path, ': ', err);
			throw err;
		})
}
const getReq = (path, data) => {
	return axios({
		url: `${TEST_URL}${path}`,
		params: data,
		method: 'get'
	})
		.then(resp=>resp)
		.catch(err => {
			console.warn(path, ': ', err);
			throw err;
		})
}

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
	authRequest({ commit }, {email, password}) {
		return postReq('/api/auth/login', {email, password})
			.then(resp=>{
				commit('setUserInfo', { type: 'token', data: resp.data.token })
				axios.defaults.headers.common = {'Authorization': `Bearer ${resp.data.token}`}
				return resp
			})
			.catch(err=>{
				throw err.response;
			});
	},
	regRequest({ dispatch }, data) {
		return postReq('/api/register', data)
			.then(()=>{
				return dispatch('authRequest', data).then(authResp=>authResp);
			})
			.catch(regErr=>{
				throw regErr.response;
			});
	},
	userDetailsRequest({ state, dispatch, commit }) {
		axios.defaults.headers.common = {'Authorization': `Bearer ${state.user.token}`}
		return getReq('/api/personal/details')
			.then((resp)=>{
				commit('setUserInfo', { type: 'info', data: resp.data.data })
				return resp;
			})
			.catch(requestError=>{
				if (requestError.response.status == 403) {
					dispatch('logOut');
				}
				throw requestError.response;
			});
	},
	userDetailsPosting({ state, dispatch }, data) {
		axios.defaults.headers.common = {'Authorization': `Bearer ${state.user.token}`}
		return postReq('/api/personal/details', data)
			.then(()=>{
				return dispatch('userDetailsRequest').then(authResp=>authResp);
			})
			.catch(postingErr=>{
				throw postingErr.response;
			});
	},
	logOut({state, commit}) {
		if (state.user.token) {
			return postReq('/api/auth/logout', {api_token: state.user.token})
				.then(()=>{
					commit('setUserInfo', { type: 'info', data: null })
					commit('setUserInfo', { type: 'token', data: '' })
					axios.defaults.headers.common = {}
					router.push({name: 'home'});
				})
		}
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

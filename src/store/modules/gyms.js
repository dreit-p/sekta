import axios from 'axios'

const TEST_URL = `http://api.sektaschool.ru.dev.immelman.ru`;

// const postReq = (path, data) => {
// 	return axios({
// 		url: `${TEST_URL}${path}`,
// 		data: data,
// 		method: 'POST'
// 	})
// 		.then(resp=>resp)
// 		.catch(err => {
// 			console.warn(path, ': ', err);
// 			throw err;
// 		})
// }
const getReq = (path, data) => {
	return axios({
		url: `${TEST_URL}${path}`,
		params: data,
		method: 'get'
	})
		.then(resp => resp)
		.catch(err => {
			console.warn(path, ': ', err);
			throw err;
		})
}

let state = {
	courses: [],
	practices: [],
	gyms: [],
};

let actions = {
	reqCourses({ commit }, cityId) {
		if (!cityId) {
			return;
		}
		return getReq(`/api/cities/${cityId}/gym-courses`)
			.then((resp) => {
				commit('setCourses', resp.data.data);
				return resp;
			})
			.catch(requestError => {
				throw requestError.response;
			});
	},
	reqGyms({ commit }, { cityId, courseID }) {
		if (!cityId || !courseID) {
			return;
		}

		return getReq(`/api/cities/${cityId}/gym-courses/${courseID}/gyms`)
			.then((resp) => {
				commit('setGyms', resp.data.data);
				return resp;
			})
			.catch(requestError => {
				throw requestError.response;
			});
	},
	reqPractices({ commit }, { gymID, courseID }) {
		if (!gymID || !courseID) {
			return;
		}

		return getReq(`/api/gyms/${gymID}/gym-courses/${courseID}/practices`)
			.then((resp) => {
				commit('setPractices', resp.data.data);
				return resp;
			})
			.catch(requestError => {
				throw requestError.response;
			});
	},
};


let mutations = {
	setCourses(state, payload) {
		state.courses = payload;
	},
	setPractices(state, payload) {
		state.practices = payload;
	},
	setGyms(state, payload) {
		state.gyms = payload;
	},
};

export default {
	namespaced: true,
	state,
	actions,
	mutations,
}

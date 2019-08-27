import api from '../../assets/api'

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
		return api.gym.getCoursesByCity(cityId)
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
		return api.gym.getGymsByCityAndCourse(cityId, courseID)
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
		return api.gym.getVisitsWithPracticesByGymAndCourse(gymID, courseID)
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

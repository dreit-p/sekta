import Vue from 'vue'

export default {
	setAuthToken(state, token) {
		state.user.token = token;
	},
	setFormModalState(state, modalState) {
		state.appStates.formModal.isOpened = modalState;
	},
	setModalType(state, modalType) {
		state.appStates.formModal.type = modalType;
	},
	setScrollLock(state, payload) {
		state.appStates.isScrollLocked = payload;
	},
	setInputData(state, { name, data }) {
		Vue.set(state.inputs, name, data)
	},
	setUserInfo(state, userInfo) {
		Vue.set(state.user, 'info', userInfo)
	},
	setCity(state, cityId) {
		state.user.cityId = cityId;
	},
	setOnlineCourses(state, data) {
		state.onlineCourses = data;
	}
}

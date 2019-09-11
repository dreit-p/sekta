import Vue from 'vue'

export default {
	setAuthToken(state, token) {
		// Here token sets & resets if user logout
		document.cookie = `api_token=${token}; domain=${window.location.hostname}; path=/; expires=2147483647`;
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
	},
	setCookieNotificationState(state, data) {
		state.isCookieMsgShowed = data;
	}
}

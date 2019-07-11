import Vue from 'vue'

export default {
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
	setUserInfo(state, { type, data }) {
		Vue.set(state.user, type, data)
	},
	setCity(state, { city }) {
		state.user.cityId = city.id;
	},
	setOnlineCourses(state, data) {
		state.onlineCourses = data;
	}
}
export default {
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
}
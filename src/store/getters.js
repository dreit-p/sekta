// import store from '@/store/'

export default {
	isUserAuth(state) {
		return !!state.user.token
	},
	isOpenedModal(state, getters) {
		return state.appStates.formModal.isOpened;
	},
}

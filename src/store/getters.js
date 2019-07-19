// import store from '@/store/'

export default {
	isUserAuth(state) {
		return !!state.user.token
	},
	isOpenedModal(state) {
		return state.appStates.formModal.isOpened;
	},
}

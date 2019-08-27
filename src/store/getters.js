// import store from '@/store/'

export default {
	authToken(state) {
		return state.user.token
	},
	isUserAuth(state) {
		return !!state.user.token
	},
	isOpenedModal(state) {
		return state.appStates.formModal.isOpened;
	},
	getUserCity(state) {
		if (state.user.cityId) {
			return state.user.cityId;
		}
		return state.user.info ? state.user.info.city.id : undefined;
	},
}

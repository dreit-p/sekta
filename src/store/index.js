import Vue from 'vue'
import Vuex from 'vuex'
import header from './modules/header'
import createPersistedState from 'vuex-persistedstate'

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex)

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	plugins: [createPersistedState({
		paths: [
			'inputs',
			'user'
		],
	})],
	modules: {
		header
	},
	state: {
		appStates: {
			isScrollLocked: false,
			formModal: {
				isOpened: false,
				type: 'login'
			}
		},
		inputs: {},
		user: {
			token: '',
			info: null,
			cityId: null,
		},
		onlineCourses: null,
	},
	actions,
	getters,
	mutations,
})

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import 'normalize.css'
import '@/assets/common.css'

import AsyncComputed from 'vue-async-computed'
Vue.use(AsyncComputed)

/*=================================
=            Validator            =
=================================*/

import VeeValidate, { Validator } from 'vee-validate';
import ru from 'vee-validate/dist/locale/ru.js';

const config = {
	aria: true,
	classNames: {
		valid: 'is-valid',
		invalid: 'is-invalid'
	},
	classes: true,
	delay: 500,
	dictionary: null,
	errorBagName: 'errors', // change if property conflicts
	events: 'input|blur|change',
	fieldsBagName: 'fields',
	i18n: null, // the vue-i18n plugin instance
	i18nRootKey: 'validations', // the nested key under which the validation messages will be located
	inject: true,
	locale: 'ru',
	validity: false
};

Vue.use(VeeValidate, config);
Validator.localize('ru', ru);

/*=====  End of Validator  ======*/

import VueMeta from 'vue-meta'
Vue.use(VueMeta)
import VueHead from 'vue-head'
Vue.use(VueHead)

if (process.env.NODE_ENV === 'production') {
	Vue.config.devtools = false
	Vue.config.productionTip = false
}

window.vm = new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')

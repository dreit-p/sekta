<template lang="pug">
.content.recovery

	p.heavy-text Восстановление пароля

	form
		app-input(
			placeholder='e-mail'
			data-vv-as='E-mail'
			v-model.trim='email'
			v-validate='"required|email"'
			:error='errors.first("email") || backError'
			:class="{ 'error': errors.has('email') || backError, 'success': fields.email && fields.email.valid && !backError}"
			name='email'
			type='email'
			@input="inputHandler")
		p {{apiMessage}}
		green-btn(:disabled="isLoading" @click.prevent="sendPasswordRecovery")
			| Получить ссылку
</template>

<script>
import api from '../../../../assets/api/index.js'
/*=====================================
=            define inputs            =
=====================================*/

let globalInputs = {
	names: ['email'],
	list: {}
};

for (var i = 0; i < globalInputs.names.length; i++) {
	let name = globalInputs.names[i];
	globalInputs.list[name] = {
		get () {
			return this.$store.state.inputs[name]
		},
		set (value) {
			this.$store.commit('setInputData', {name: name, data: value})
		}
	};
}

/*=====  End of define inputs  ======*/

export default {
	name: 'FormRecovery',
	components: {
		AppInput: () => import('@/components/form/input.vue'),
		GreenBtn: () => import('@/components/form/green-btn.vue'),
	},
	computed: {
		...globalInputs.list
	},
	data () {
		return {
			isLoading: false,
			backError: '',
			apiMessage: ''
		}
	},
	methods: {
		inputHandler() {
			this.backError = '',
			this.isLoading = false,
			this.apiMessage = ''
		},
		sendPasswordRecovery() {
			this.isLoading = true
			api.requestPasswordRecovery(this.email).then(res => {
				this.apiMessage = res.data.message
			},
			rej => {
				this.backError = rej.response.data.message
			})
		},
	}
}
</script>

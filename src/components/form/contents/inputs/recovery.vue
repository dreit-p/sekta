<template lang="pug">
.content.recovery

	p.heavy-text Восстановление пароля

	form
		app-input(
			placeholder='e-mail'
			data-vv-as='E-mail'
			v-model.trim='email'
			v-validate='"required|email"'
			:error='errors.first("email")'
			:class="{ 'error': errors.has('email'), 'success': fields.email && fields.email.valid}"
			name='email'
			type='email')

		green-btn(@click.prevent)
			| Получить ссылку
</template>

<script>

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
		}
	},
}
</script>

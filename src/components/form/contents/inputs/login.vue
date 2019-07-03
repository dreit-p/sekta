<template lang="pug">
.content.login

	p.heavy-text Вход

	app-input(
		placeholder='e-mail'
		data-vv-as='E-mail'
		v-model.trim='email'
		v-validate='"required|email"'
		:error='errors.first("email")'
		:class="{ 'error': errors.has('email'), 'success': fields.email && fields.email.valid}"
		ref='asdasd'
		name='email'
		type='email')

	app-input(
		placeholder='Пароль'
		data-vv-as='Пароль'
		v-model.trim='password'
		v-validate='"required"'
		type='password'
		:class="{ 'error': errors.has('password'), 'success': fields.password && fields.password.valid}"
		:error='errors.first("password")'
		name='password')

	a(href='#', @click.prevent='setFormModalState({type:"recovery"})') Восстановить пароль

	green-btn(@click.prevent)
		| Войти
</template>

<script>

/*=====================================
=            define inputs            =
=====================================*/

let globalInputs = {
	names: ['email', 'password'],
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
	name: 'FormLogin',
	components: {
		AppInput: () => import('@/components/form/input.vue'),
		AppCheckbox: () => import('@/components/form/checkbox.vue'),
		GreenBtn: () => import('@/components/form/green-btn.vue'),
	},
	computed: {
		...globalInputs.list
	},
	methods: {
		setFormModalState(data) {
			return this.$parent.setFormModalState(data);
		}
	},
	data () {
		return {
		}
	},
}
</script>
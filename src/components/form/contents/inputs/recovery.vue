<template lang="pug">
.content.recovery

	p.heavy-text Восстановление пароля

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

	button.green-btn(@click.prevent)
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
		console.log(name);
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
		name: 'form-recovery',
		components: {
			AppInput: () => import('@/components/form/input.vue'),
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
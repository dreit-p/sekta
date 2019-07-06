<template lang="pug">
.content.register

	p.heavy-text Давайте знакомиться

	app-input(
		placeholder='Имя'
		data-vv-as='Имя'
		v-model.trim='firstname'
		v-validate='"required"'
		:class="{ 'error': errors.has('firstname'), 'success': fields.firstname && fields.firstname.valid}"
		:error='errors.first("firstname")'
		name='firstname')

	app-input(
		placeholder='Фамилия'
		data-vv-as='Фамилия'
		v-model.trim='lastname'
		v-validate='"required"'
		:class="{ 'error': errors.has('lastname'), 'success': fields.lastname && fields.lastname.valid}"
		:error='errors.first("lastname")'
		name='lastname')

	app-input(
		placeholder='e-mail'
		data-vv-as='e-mail'
		v-model.trim='email'
		v-validate='"required|email"'
		:error='errors.first("email")'
		:class="{ 'error': errors.has('email'), 'success': fields.email && fields.email.valid}"
		ref='sameEmail'
		name='email'
		type='email')

	app-input(
		placeholder='e-mail еще раз'
		data-vv-as='Повтор e-mail'
		caption='Вы не представляете, как часто люди ошибаются :)'
		v-model.trim='emailRepeat'
		:class="{ 'error': errors.has('emailRepeat'), 'success': fields.emailRepeat && fields.emailRepeat.valid}"
		v-validate='"required|email|confirmed:sameEmail"'
		:error='errors.first("emailRepeat")'
		name='emailRepeat'
		type='email')


	app-input(
		placeholder='придумайте пароль'
		data-vv-as='пароль'
		v-model.trim='password'
		v-validate='"required|alpha_dash:en"'
		:error='errors.first("password")'
		:class="{ 'error': errors.has('password'), 'success': fields.password && fields.password.valid}"
		ref='samePassword'
		name='password'
		caption='Только латинские символы и цифры'
		type='password')

	app-input(
		placeholder='пароль еще раз'
		data-vv-as='Повтор пароля'
		v-model.trim='passwordRepeat'
		:class="{ 'error': errors.has('passwordRepeat'), 'success': fields.passwordRepeat && fields.passwordRepeat.valid}"
		v-validate='"required|alpha_dash:en|confirmed:samePassword"'
		:error='errors.first("passwordRepeat")'
		name='passwordRepeat'
		type='password')

	app-checkbox(
		name='isAdult'
		data-vv-as='есть 18 лет'
		v-model.trim='isAdult'
		v-validate='"required:true"'
		:required='true'
		:class="{ 'error': errors.has('isAdult'), 'success': fields.isAdult && fields.isAdult.valid}"
		:error='errors.first("isAdult")'
	) Мне есть 18 лет

	app-checkbox(
		name='termsAgree'
		data-vv-as='обработка персональных данных'
		v-model.trim='termsAgree'
		v-validate='"required:true"'
		:required='true'
		:class="{ 'error': errors.has('termsAgree'), 'success': fields.termsAgree && fields.termsAgree.valid}"
		:error='errors.first("termsAgree")'
	)
		| Ознакомлен и согласен с условиями 
		a(href='#') обработки персональных данных

	app-checkbox(
		name='spamAgree'
		data-vv-as='получение информационных писем'
		v-model.trim='spamAgree'
	) Хочу получать информационные письма

	green-btn(@click.prevent)
		| Далее
</template>
<script>

/*=====================================
=            define inputs            =
=====================================*/

let globalInputs = {
	names: ['email', 'password', 'firstname', 'lastname'],
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
	name: 'FormRegister',
	components: {
		AppInput: () => import('@/components/form/input.vue'),
		AppCheckbox: () => import('@/components/form/checkbox.vue'),
		GreenBtn: () => import('@/components/form/green-btn.vue'),
	},
	computed: {
		...globalInputs.list
	},
	data () {
		return {
			emailRepeat: '',
			passwordRepeat: '',
			isAdult: false,
			termsAgree: false,
			spamAgree: false,
		}
	},
}
</script>
<template lang="pug">
.content.register

	p.heavy-text Запишись сейчас

	app-dropdown(
		placeholder='Выберите курс'
		data-vv-as='Курс'
		:options='course_options'
		name='course')

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
		placeholder="Отчество"
	)

	app-input(
		placeholder='e-mail'
		data-vv-as='e-mail'
		v-model.trim='email'
		v-validate='"required|email"'
		:error='errors.first("email")'
		:class="{ 'error': errors.has('email'), 'success': fields.email && fields.email.valid}"
		ref='asdasd'
		name='email'
		type='email')

	app-input(
		placeholder='Телефон'
		data-vv-as='Телефон'
	)

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

	green-btn(@click.prevent)
		| Оплатить
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
		name: 'camp-form',
		components: {
			AppInput: () => import('@/components/form/input.vue'),
			AppCheckbox: () => import('@/components/form/checkbox.vue'),
			AppDropdown: () => import('@/components/form/dropdown.vue'),
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
				course_options: [
					'100% оплаты "СТАНДАРТ" - 39000₽',
					'50% оплаты "СТАНДАРТ" - 19500₽'
				]
			}
		},
	}
</script>

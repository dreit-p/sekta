<template lang="pug">
.content.register

	p.light-text Вы выбрали курс
	p.heavy-text {{ this.courseName }}

	form
		app-dropdown(
			placeholder='Платформа обучения'
			data-vv-as='Платформа обучения'
			:options='platform_options'
			v-validate='"required"'
			:class="{ 'error': errors.has('platform'), 'success': fields.platform && fields.platform.valid}"
			:error='errors.first("platform")'
			name='platform')

		app-input(
			placeholder='Введите ссылку на ваш аккаунт'
			data-vv-as='Фамилия'
			v-model.trim='lastname'
			v-validate='"required"'
			:class="{ 'error': errors.has('lastname'), 'success': fields.lastname && fields.lastname.valid}"
			:error='errors.first("lastname")'
			name='lastname')

		app-dropdown(
			placeholder='Сколько недель вы хотите оплатить?'
			data-vv-as='Количество недель'
			:options='weeks_options'
			v-validate='"required"'
			:class="{ 'error': errors.has('weeks'), 'success': fields.weeks && fields.weeks.valid}"
			:error='errors.first("weeks")'
			name='weeks')

		app-input(
			placeholder='Промокод (если есть)'
			data-vv-as='Промокод'
			:class="{ 'error': errors.has('emailRepeat'), 'success': fields.emailRepeat && fields.emailRepeat.valid}"
			:error='errors.first("emailRepeat")'
			name='emailRepeat'
			type='email')

		app-input(
			placeholder='Ваш город'
			data-vv-as='пароль'
			:error='errors.first("password")'
			:class="{ 'error': errors.has('password'), 'success': fields.password && fields.password.valid}"
			ref='asdasd'
			name='password'
			type='password')

		app-checkbox(
			name='termsAgree'
			data-vv-as='обработка персональных данных'
			:required='true'
			:class="{ 'error': errors.has('termsAgree'), 'success': fields.termsAgree && fields.termsAgree.valid}"
			:error='errors.first("termsAgree")'
		)
			| Ознакомлен и согласен с условиями
			a(href='#') обработки персональных данных

		green-btn(@click.prevent)
			| Перейти к оплате
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
	name: 'FormOnline',
	components: {
		AppInput: () => import('@/components/form/input.vue'),
		AppCheckbox: () => import('@/components/form/checkbox.vue'),
		AppDropdown: () => import('@/components/form/dropdown.vue'),
		GreenBtn: () => import('@/components/form/green-btn.vue'),
	},
	props: {
		prices: {
			type: Array,
			default: ['Продажа невозможна']
		},
		courseName: {
			type: String
		}
	},
	computed: {
		...globalInputs.list
	},
	data () {
		return {
			platform_options: ['ВКонтакте', 'Telegram'],
			weeks_options: this.prices,
			termsAgree: false,
		}
	},
}
</script>

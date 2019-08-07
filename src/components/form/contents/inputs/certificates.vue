<template lang="pug">
.content.register

	p.heavy-text Купить сертификат

	form
		app-input(
			placeholder='Имя и Фамилия получателя'
			data-vv-as='Имя и Фамилия'
			v-model.trim='firstname'
			v-validate='"required"'
			:class="{ 'error': errors.has('firstname'), 'success': fields.firstname && fields.firstname.valid}"
			:error='errors.first("firstname")'
			name='firstname')

		app-input(
			placeholder='E-mail получателя'
			data-vv-as='e-mail'
			v-model.trim='email'
			v-validate='"required|email"'
			:error='errors.first("email")'
			:class="{ 'error': errors.has('email'), 'success': fields.email && fields.email.valid}"
			ref='asdasd'
			name='email'
			type='email')

		app-dropdown(
			placeholder='Сумма сертификата'
			data-vv-as='Сумма сертификата'
			:options='cert_costs_options'
			v-model.trim='cert_costs'
			v-validate='"required"'
			:class="{ 'error': errors.has('cert_costs'), 'success': fields.cert_costs && fields.cert_costs.valid}"
			:error='errors.first("cert_costs")'
			name='cert_costs')

		app-dropdown(
			placeholder='Ваш город'
			data-vv-as='Ваш город'
			:options='city_options'
			v-model.trim='city'
			v-validate='"required"'
			:class="{ 'error': errors.has('city'), 'success': fields.city && fields.city.valid}"
			:error='errors.first("city")'
			name='city')

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
			a(href='#') публичной оферты

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
	name: 'FormCertificates',
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
			cert_costs_options: ['1500', 3900, '7000', 12000],
			city_options: [
				{id: '1', name: 'Москва'},
				{id: '2', name: 'Санкт-Петербург'},
				{id: '3', name: 'Другой город'},
			],
			city: '',
			cert_costs: '',
			termsAgree: false,
		}
	},
}
</script>

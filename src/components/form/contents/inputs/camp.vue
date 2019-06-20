<template lang="pug">
.content.register

	p.heavy-text Запишись сейчас

	app-dropdown(
		placeholder='Выберите тип размещения'
		data-vv-as='Курс'
		:options='course_options'
		name='course')

	app-input(
		placeholder='Промокод'
		data-vv-as='Промокод'
		name='promocode'
		type='promocode')

	app-input(
		placeholder='Ваш город'
		data-vv-as='Ваш город'
		name='city'
		type='city')

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

	p Итого к оплате: 3555 рублей	

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

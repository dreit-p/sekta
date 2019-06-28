<template lang="pug">
.content.register

	app-input(
		placeholder='Фамилия'
		data-vv-as='Фамилия'
		:class="{ 'error': errors.has('lastname'), 'success': fields.lastname && fields.lastname.valid}"
		:error='errors.first("lastname")'
		name='lastname')

	app-input(
		placeholder='Имя'
		data-vv-as='Имя'
		:class="{ 'error': errors.has('lastname'), 'success': fields.lastname && fields.lastname.valid}"
		:error='errors.first("lastname")'
		name='lastname')

	app-input(
		placeholder='Отчество'
		data-vv-as='Отчество'
		:class="{ 'error': errors.has('lastname'), 'success': fields.lastname && fields.lastname.valid}"
		:error='errors.first("lastname")'
		name='lastname')

	app-input(
		placeholder='Телефон'
		data-vv-as='Телефон'
		:class="{ 'error': errors.has('lastname'), 'success': fields.lastname && fields.lastname.valid}"
		:error='errors.first("lastname")'
		name='lastname')

	app-input(
		placeholder='E-mail'
		data-vv-as='E-mail'
		:class="{ 'error': errors.has('emailRepeat'), 'success': fields.emailRepeat && fields.emailRepeat.valid}"
		:error='errors.first("emailRepeat")'
		name='email'
		caption='*на указанный адрес будет анправлен чек об оплате'
		type='email')

	app-dropdown(
		placeholder='Выберите товар'
		data-vv-as='Товар'
		:class="{ 'error': errors.has('weeks'), 'success': fields.weeks && fields.weeks.valid}"
		:error='errors.first("weeks")'
		name='weeks')

	app-dropdown(
		placeholder='Выберите способ получения заказа'
		data-vv-as='Способ получения'
		:options='getFeed_options'
		:class="{ 'error': errors.has('weeks'), 'success': fields.weeks && fields.weeks.valid}"
		:error='errors.first("weeks")'
		caption='Забрать заказ можно по адресу: Невский пр., 11/2, офис 42 с понедельника по пятницу с 10:00 до 19:00.'
		name='getFeed')

	app-input(
		placeholder='Город'
		data-vv-as='Город'
		:class="{ 'error': errors.has('emailRepeat'), 'success': fields.emailRepeat && fields.emailRepeat.valid}"
		:error='errors.first("emailRepeat")'
		name='city'
		type='city')

	app-input(
		placeholder='Индекс'
		data-vv-as='Индекс'
		:class="{ 'error': errors.has('emailRepeat'), 'success': fields.emailRepeat && fields.emailRepeat.valid}"
		:error='errors.first("emailRepeat")'
		name='index'
		type='index')

	app-input(
		placeholder='Адрес доставки'
		data-vv-as='Адрес доставки'
		:class="{ 'error': errors.has('emailRepeat'), 'success': fields.emailRepeat && fields.emailRepeat.valid}"
		:error='errors.first("emailRepeat")'
		name='address'
		type='address')

	app-input(
		placeholder='ФИО получателя'
		data-vv-as='ФИО'
		:class="{ 'error': errors.has('emailRepeat'), 'success': fields.emailRepeat && fields.emailRepeat.valid}"
		:error='errors.first("emailRepeat")'
		name='FIO'
		type='FIO')

	app-input(
		placeholder='Промокод'
		data-vv-as='Промокод'
		:class="{ 'error': errors.has('emailRepeat'), 'success': fields.emailRepeat && fields.emailRepeat.valid}"
		:error='errors.first("emailRepeat")'
		name='promocode'
		caption='Если у вас есть промокод, введите его в это поле'
	)

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
		name: 'form-online',
		components: {
			AppInput: () => import('@/components/form/input.vue'),
			AppCheckbox: () => import('@/components/form/checkbox.vue'),
			AppDropdown: () => import('@/components/form/dropdown.vue'),
			GreenBtn: () => import('@/components/form/green-btn.vue'),
		},
		props: {
			prices: {
				type: Array,
				default: null
			}
		},
		computed: {
			...globalInputs.list
		},
		data () {
			return {
				platform_options: ['ВКонтакте', 'Telegram'],
				getFeed_options: ['Самовывоз из Санкт-Петербурга', 'Доставка курьером по России'],
				termsAgree: false,
			}
		},
	}
</script>

<template lang="pug">
.content.register

	p.light-text Вы выбрали курс
	p.heavy-text {{ this.courseName }}

	form(@submit.prevent="onSubmit", novalidate="true")
		//app-checkbox(
			name='no_curator'
			data-vv-as='Без куратора'
			:value='inputsData.no_curator'
			@change='inputsData.no_curator = $event'
			:class="{ 'error': errors.has('no_curator'), 'success': fields.no_curator && fields.no_curator.valid}"
			:error='errors.first("no_curator")'
			) Без куратора

		app-dropdown(
			placeholder='Платформа обучения'
			data-vv-as='Платформа обучения'
			:value='inputsData.channel_type'
			@change='inputsData.channel_type = $event'
			:options='platform_options'
			v-validate='"required"'
			:class="{ 'error': errors.has('channel_type'), 'success': fields.channel_type && fields.channel_type.valid}"
			:error='errors.first("channel_type")'
			name='channel_type')

		app-input(
			placeholder='Введите ссылку на ваш аккаунт'
			data-vv-as='Аккаунт'
			:value='inputsData.channel_link'
			@input='inputsData.channel_link = $event'
			v-validate='"required"'
			:class="{ 'error': errors.has('channel_link'), 'success': fields.channel_link && fields.channel_link.valid}"
			:error='errors.first("channel_link")'
			name='channel_link')

		app-dropdown(
			placeholder='Сколько недель вы хотите оплатить?'
			data-vv-as='Количество недель'
			:options='weeks_options'
			@change='inputsData.price_id = $event'
			v-validate='"required"'
			:class="{ 'error': errors.has('weeks'), 'success': fields.weeks && fields.weeks.valid}"
			:error='errors.first("weeks")'
			name='weeks')

		app-dropdown(
			placeholder='Выберите город'
			data-vv-as='Город'
			v-validate='"required"'
			@change='inputsData.city_id = $event'
			:value='userCity ? userCity+"" : ""'
			:options='city_options'
			:class="{ 'error': errors.has('city'), 'success': fields.city && fields.city.valid}"
			:error='errors.first("city")'
			name='city')

		p.tiny-text.tiny-text.tiny-text_face Промокод (если есть)
		app-input(
			data-vv-as='Промокод'
			name='promocode'
			:caption='promoprice.promocode_name ? promoprice.promocode_name : ""'
			:class='{success: !!promoprice.promocode_name}'
			@change='promocode = $event'
			type='text')

		p.heavy-text.heavy-text_face.tiny-text_long(v-if='!price') Итого к оплате: Неизвестно
		p.heavy-text.heavy-text_face.tiny-text_long(v-if='price') Итого к оплате: {{ !!promoprice.amount ? promoprice.amount : price.value }} руб.

		app-checkbox(
			name='termsAgree'
			data-vv-as='обработка персональных данных'
			:required='true'
			:class="{ 'error': errors.has('termsAgree'), 'success': fields.termsAgree && fields.termsAgree.valid}"
			:error='errors.first("termsAgree")'
		)
			| Ознакомлен и согласен с условиями&nbsp;
			a(:href='"../docs/"+{1: "publicoffer_msk_new.pdf", 2: "publicoffer_spb_new.pdf", 3: "publicoffer_reg_new.pdf"}[userCity]', target='_BLANK', rel='noopener noreferrer') публичной оферты

		green-btn(:disabled='!price || isFormLocked')
			| Перейти к оплате
</template>
<script>

/*=====================================
=            define inputs            =
=====================================*/

let globalInputs = {
	names: [],
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
		formData: {
			type: Object,
			default: ()=>{}
		},
		courseName: {
			type: String,
			default: ''
		}
	},
	methods: {
		defineDiscountedPrice (price_id, code) {
			this.$store.dispatch('reqDiscountedPrice', {price_id, code}).then((resp)=>{
				this.promoprice = resp;
			}).catch(()=>{
				this.promoprice = Infinity
			});
		},
		unlockForm() {
			setTimeout(()=>{
				this.isFormLocked = false;
			}, 1000);
		},
		ifValid(cb) {
			this.$validator.validateAll().then((result) => {
				if (result) {
					cb();
					return;
				}
			});
		},
		onSubmit() {
			if (this.isFormLocked) {
				return false;
			}
			this.ifValid(()=>{
				this.isFormLocked = true;

				this.$store.dispatch('sendOnlineOrder', this.inputsData)
					.then((resp)=>{
						this.unlockForm();
						this.$emit('submit', 'online');
						this.$store.dispatch('setFormModalState', {modalState: false});
						let orderID = resp.data.order_id;
						this.$store.dispatch('reqOnlinePayment', {orderId: orderID, price_id: this.price.id, promocode: this.promocode}).then((resp)=>{
							console.log(resp);
						});
					})
					.catch((err)=>{
						alert(err.data.message);
						this.unlockForm();
					});
			});
		},
	},
	watch: {
		promocode() {
			if (this.price) {
				this.defineDiscountedPrice(this.price.id, this.promocode);
			}
		},
		'inputsData.price_id'() {
			if (this.promocode) {
				this.defineDiscountedPrice(this.price.id, this.promocode);
			}
		},
		'inputsData.city_id'(newData) {
			this.$store.commit('setCity', newData)
		},
	},
	mounted() {
		this.inputsData.city_id = this.userCity;
	},
	computed: {
		userCity() {
			return this.$store.getters.getUserCity;
		},
		...globalInputs.list,
		price() {
			if (this.formData.prices.length < 1) {
				return false;
			}
			return this.formData.prices.find(price => price.id === this.inputsData.price_id);
		},
	},
	data () {
		return {
			inputsData: {
				// no_curator: false,
				channel_link: null,
				channel_type: null,
				price_id: null,
				city_id: null,
			},
			isFormLocked: false,
			promocode: null,
			promoprice: Infinity,
			platform_options: [
				{id: 'tg', name: 'Telegram'},
				{id: 'vk', name: 'Вконтакте'}
			],
			city_options: [
				{id: '1', name: 'Москва'},
				{id: '2', name: 'Санкт-Петербург'},
				{id: '3', name: 'Другой город'},
			],
			weeks_options: this.formData.prices ? this.formData.prices : ['Продажа невозможна'],
			termsAgree: false,
		}
	},
}
</script>

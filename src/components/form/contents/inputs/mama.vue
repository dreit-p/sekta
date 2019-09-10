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
			:class="{ 'error': getInputError('no_curator'), 'success': fields.no_curator && fields.no_curator.valid}"
			:error='getInputError("no_curator")'
			) Без куратора

		app-dropdown(
			placeholder='Платформа обучения'
			data-vv-as='Платформа обучения'
			:value='inputsData.edu_platform'
			@change='inputsData.edu_platform = $event'
			:options='comparedPlatforms'
			v-validate='"required"'
			:class="{ 'error': getInputError('edu_platform'), 'success': fields.edu_platform && fields.edu_platform.valid}"
			:error='getInputError("edu_platform")'
			:disabled="!!userOrderId"
			name='edu_platform')

		app-input(
			placeholder='Введите ссылку на ваш аккаунт'
			data-vv-as='Аккаунт'
			:value='inputsData.social_page_url'
			@input='inputsData.social_page_url = $event'
			v-validate='"required"'
			:class="{ 'error': getInputError('social_page_url'), 'success': fields.social_page_url && fields.social_page_url.valid}"
			:error='getInputError("social_page_url")'
			:disabled="!!userOrderId"
			name='social_page_url')

		app-dropdown(
			placeholder='Сколько недель вы хотите оплатить?'
			data-vv-as='Количество недель'
			:options='weeks_options'
			@change='inputsData.price_id = $event'
			v-validate='"required"'
			:class="{ 'error': getInputError('weeks'), 'success': fields.weeks && fields.weeks.valid}"
			:error='getInputError("weeks")'
			name='weeks')

		app-dropdown(
			placeholder='Выберите город'
			data-vv-as='Город'
			v-validate='"required"'
			@change='inputsData.city_id = $event'
			:value='userCity ? userCity+"" : ""'
			:options='city_options'
			:class="{ 'error': getInputError('city'), 'success': fields.city && fields.city.valid}"
			:error='getInputError("city")'
			:disabled="!!userOrderId"
			name='city')

		p.tiny-text.tiny-text.tiny-text_face Промокод (если есть)
		app-input(
			data-vv-as='Промокод'
			name='promocode'
			:caption='promoprice.promocode_name ? promoprice.promocode_name : ""'
			:class='{success: !!promoprice.promocode_name}'
			@change='promocode = $event'
			type='text')

		p.heavy-text.heavy-text_face.tiny-text_long(v-if='price') Итого к оплате: {{ !!promoprice.amount ? promoprice.amount : price.value }} руб.

		app-checkbox(
			name='termsAgree'
			data-vv-as='обработка персональных данных'
			:required='true'
			v-model.trim='termsAgree'
			v-validate='"required:true"'
			:class="{ 'error': getInputError('termsAgree'), 'success': fields.termsAgree && fields.termsAgree.valid}"
			:error='getInputError("termsAgree")'
		)
			| Ознакомлен и согласен с условиями&nbsp;
			a(:href='"../docs/"+{1: "publicoffer_msk_new.pdf", 2: "publicoffer_spb_new.pdf", 3: "publicoffer_reg_new.pdf"}[userCity]', target='_BLANK', rel='noopener noreferrer') публичной оферты

		p.red(v-if='receivedErrors.message') {{receivedErrors.message}}

		green-btn(:disabled='!price || isFormLocked')
			| Перейти к оплате
</template>
<script>
import api from '../../../../assets/api/index.js'
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
	name: 'FormMama',
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
		getInputError(name) {
			if (this.errors.first(name)) {
				return this.errors.first(name)
			}
			if (this.receivedErrors[name]) {
				let errorString = '';
				if (Array.isArray(this.receivedErrors[name])) {
					this.receivedErrors[name].forEach((text)=>{
						errorString = errorString + " " + text;
					});
				}
				return errorString.trim();
			}
		},
		setErrorWatcher(name) {
			if (!this.receivedErrors.watchers.hasOwnProperty(name)) {
				var watch = this.$watch('inputsData.'+name, ()=>{
					delete this.receivedErrors[name];
					watch();
					delete this.receivedErrors.watchers[name]
				});
				this.receivedErrors.watchers[name] = watch;
			}
		},
		createErrorsList(errorsArr) {
			for (let key in errorsArr) {
				this.setErrorWatcher(key);
				this.$set(this.receivedErrors, key, errorsArr[key])
			}
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

				if (this.userOrderId) {
					this.$store.dispatch('reqOnlinePayment', {orderId: this.userOrderId, price_id: this.price.id, promocode: this.promocode}).then((resp)=>{
						window.location = resp.data.payment.approve_url;
					});
				} else {
					this.$store.dispatch('sendOnlineOrder', this.inputsData)
						.then((resp)=>{
							this.unlockForm();
							this.$emit('submit', 'online');
							this.$store.dispatch('setFormModalState', {modalState: false});
							let orderID = resp.data.order_id;
							this.$store.dispatch('reqOnlinePayment', {orderId: orderID, price_id: this.price.id, promocode: this.promocode}).then((resp)=>{
								window.location = resp.data.payment.approve_url;
							});
						})
						.catch((err)=>{
							this.receivedErrors.watchers = {};
							if (err.data.errors) {
								this.createErrorsList(err.data.errors);
							}
							if (err.data.message) {
								this.receivedErrors.message = err.data.message;
							} else {
								delete this.receivedErrors.message;
							}
							this.unlockForm();
						});
				}
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
		this.weeks_options = this.formData.prices ? this.formData.prices : ['Продажа невозможна']
		api.online.getLastOrder(this.formData.id).then(
			res => {
				let response = res.data.data
				this.userOrderId = response.id
				this.inputsData = {
					social_page_url: response.social_page_url,
					edu_platform: response.edu_platform,
					price_id: null,
					city_id: response.city_id
				}
				this.weeks_options = response.available_prices
			},
		)
	},
	computed: {
		...globalInputs.list,
		userCity() {
			return this.$store.getters.getUserCity;
		},
		city_options() {
			return this.$store.state.cities;
		},
		price() {
			if (this.formData.prices.length < 1) {
				return false;
			}
			return this.formData.prices.find(price => price.id === this.inputsData.price_id);
		},
		comparedPlatforms() {
			let result = [];
			this.platform_options.map((option)=>{
				if (this.formData.platforms.includes(option.id)) result.push(option);
			})
			return result;
		},
	},
	data () {
		return {
			inputsData: {
				// no_curator: false,
				social_page_url: null,
				edu_platform: null,
				price_id: null,
				city_id: null,
			},
			userOrderId: null,
			currentFormData: {},
			receivedErrors: {},
			isFormLocked: false,
			promocode: null,
			promoprice: Infinity,
			platform_options: [
				{id: 'tg', name: 'Telegram'},
				{id: 'vk', name: 'Вконтакте'},
				{id: 'fb', name: 'Facebook'},
				{id: 'sk', name: 'Skype'},
				{id: 'vb', name: 'Viber'},
				{id: 'wa', name: 'WhatsApp'},
				{id: 'email', name: 'E-mail'},
			],
			weeks_options: [],
			termsAgree: false,
		}
	},
}
</script>

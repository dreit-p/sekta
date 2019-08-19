<template lang="pug">
.content.register

	p.heavy-text Купить сертификат

	form(@submit.prevent="onSubmit", novalidate="true")

		app-input(
			placeholder='Имя и Фамилия получателя'
			data-vv-as='Имя и Фамилия'
			:value='inputsData.receiver_name'
			@input='inputsData.receiver_name = $event'
			v-validate='"required"'
			:class="{ 'error': getInputError('receiver_name'), 'success': fields.receiver_name && fields.receiver_name.valid}"
			:error='getInputError("receiver_name")'
			name='receiver_name')

		app-input(
			placeholder='E-mail получателя'
			data-vv-as='e-mail'
			:value='inputsData.receiver_email'
			@input='inputsData.receiver_email = $event'
			v-validate='"required|email"'
			:class="{ 'error': getInputError('email'), 'success': fields.email && fields.email.valid}"
			:error='getInputError("email")'
			name='email')

		app-dropdown(
			placeholder='Сумма сертификата'
			data-vv-as='Сумма сертификата'
			:value='inputsData.price_id'
			@change='inputsData.price_id = $event'
			:options='price_id_options'
			v-validate='"required"'
			:class="{ 'error': getInputError('price_id'), 'success': fields.price_id && fields.price_id.valid}"
			:error='getInputError("price_id")'
			name='price_id')

		app-dropdown(
			placeholder='Выберите город'
			data-vv-as='Город'
			v-validate='"required"'
			@change='inputsData.city_id = $event'
			:value='userCity ? userCity+"" : ""'
			:options='city_options'
			:class="{ 'error': getInputError('city'), 'success': fields.city && fields.city.valid}"
			:error='getInputError("city")'
			name='city')

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

		p.heavy-text.heavy-text_face.tiny-text_long(v-if='price') Итого к оплате: {{ price }} руб.

		p.red(v-if='receivedErrors.message') {{receivedErrors.message}}

		green-btn(:disabled='!price || isFormLocked')
			| Перейти к оплате
</template>
<script>

export default {
	name: 'FormCertificates',
	components: {
		AppInput: () => import('@/components/form/input.vue'),
		AppCheckbox: () => import('@/components/form/checkbox.vue'),
		AppDropdown: () => import('@/components/form/dropdown.vue'),
		GreenBtn: () => import('@/components/form/green-btn.vue'),
	},
	asyncComputed: {
		certificates() {
			return this.$store
				.dispatch("reqCertPrices")
				.then((resp) => {
					return resp.data.data;
				});
		},
	},
	computed: {
		userCity() {
			return this.$store.getters.getUserCity;
		},
		price_id_options() {
			if (this.certificates) {
				return this.certificates[0].prices
			}
			return []
		},
		city_options() {
			return this.$store.state.cities;
		},
		price() {
			if (!this.inputsData.price_id) return false;
			let cert = this.price_id_options.find(cert=>cert.id === this.inputsData.price_id);
			return cert.value;
		},
	},
	watch: {
		'inputsData.city_id'(newData) {
			this.$store.commit('setCity', newData)
		},
	},
	methods: {
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
		onSubmit() {
			if (this.isFormLocked) {
				return false;
			}
			this.ifValid(()=>{
				this.isFormLocked = true;

				this.$store.dispatch('sendCertOrder', this.inputsData)
					.then((resp)=>{
						this.unlockForm();
						this.$emit('submit', 'online');
						this.$store.dispatch('setFormModalState', {modalState: false});
						let orderID = resp.data.order_id;
						console.log('orderID: ', orderID);
						this.$store.dispatch('reqCertPayment', {orderId: orderID, price_id: this.inputsData.price_id, promocode: this.promocode}).then((resp)=>{
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
			});
		},
	},
	mounted() {
		this.inputsData.city_id = this.userCity;
	},
	data () {
		return {
			isFormLocked: false,
			inputsData: {
				receiver_name: null,
				receiver_email: null,
				price_id : null,
				city_id: null,
				with_curator: false,
			},
			receivedErrors: {},
			// price_id_options: [
			// 	{id: '1', name: '1500'},
			// 	{id: '2', name: '3900'},
			// 	{id: '3', name: '7000'},
			// 	{id: '4', name: '12000'},
			// ],
			termsAgree: false,
		}
	},
}
</script>

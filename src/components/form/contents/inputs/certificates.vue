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
			:class="{ 'error': errors.has('name'), 'success': fields.name && fields.name.valid}"
			:error='errors.first("name")'
			name='name')

		app-input(
			placeholder='E-mail получателя'
			data-vv-as='e-mail'
			:value='inputsData.receiver_email'
			@input='inputsData.receiver_email = $event'
			v-validate='"required|email"'
			:class="{ 'error': errors.has('email'), 'success': fields.email && fields.email.valid}"
			:error='errors.first("email")'
			name='email')

		app-dropdown(
			placeholder='Сумма сертификата'
			data-vv-as='Сумма сертификата'
			:value='inputsData.price_id'
			@change='inputsData.price_id = $event'
			:options='price_id_options'
			v-validate='"required"'
			:class="{ 'error': errors.has('price_id'), 'success': fields.price_id && fields.price_id.valid}"
			:error='errors.first("price_id")'
			name='price_id')

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

		app-checkbox(
			name='termsAgree'
			data-vv-as='обработка персональных данных'
			:required='true'
			v-model.trim='termsAgree'
			v-validate='"required:true"'
			:class="{ 'error': errors.has('termsAgree'), 'success': fields.termsAgree && fields.termsAgree.valid}"
			:error='errors.first("termsAgree")'
		)
			| Ознакомлен и согласен с условиями&nbsp;
			a(:href='"../docs/"+{1: "publicoffer_msk_new.pdf", 2: "publicoffer_spb_new.pdf", 3: "publicoffer_reg_new.pdf"}[userCity]', target='_BLANK', rel='noopener noreferrer') публичной оферты

		p.heavy-text.heavy-text_face.tiny-text_long(v-if='!price') Сертификат не выбран
		p.heavy-text.heavy-text_face.tiny-text_long(v-if='price') Итого к оплате: {{ price }} руб.

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
	computed: {
		userCity() {
			return this.$store.getters.getUserCity;
		},
		price() {
			if (!this.inputsData.price_id) return false;
			let cert = this.price_id_options.find(cert=>cert.id === this.inputsData.price_id);
			return cert.name;
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
						this.$store.dispatch('reqCertPayment', {orderId: orderID, price_id: this.price.id, promocode: this.promocode}).then((resp)=>{
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
			},
			price_id_options: [
				{id: '1', name: '1500'},
				{id: '2', name: '3900'},
				{id: '3', name: '7000'},
				{id: '4', name: '12000'},
			],
			city_options: [
				{id: '1', name: 'Москва'},
				{id: '2', name: 'Санкт-Петербург'},
				{id: '3', name: 'Другой город'},
			],
			termsAgree: false,
		}
	},
}
</script>

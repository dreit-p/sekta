<template lang="pug">
form.form(v-if='!!user', @submit.prevent="onSubmit(infoInputs)", novalidate="true")
	app-input(
		placeholder='Фамилия'
		data-vv-as='Фамилия'
		v-validate='"min:1"'
		v-model.trim='user.info.last_name'
		@input='infoInputs.last_name = $event'
		:error='getInputError("last_name")'
		:class="{ 'error': getInputError('last_name'), 'success': !getInputError('last_name') && fields.last_name && fields.last_name.valid }"
		name='last_name')

	app-input(
		placeholder='Имя'
		data-vv-as='Имя'
		v-validate='"min:1"'
		v-model.trim='user.info.first_name'
		@input='infoInputs.first_name = $event'
		:error='getInputError("first_name")'
		:class="{ 'error': getInputError('first_name'), 'success': !getInputError('first_name') && fields.first_name && fields.first_name.valid }"
		name='first_name')

	app-input(
		placeholder='Отчество'
		data-vv-as='Отчество'
		v-model.trim='user.info.patronymic'
		@input='infoInputs.patronymic = $event'
		:error='getInputError("patronymic")'
		:class="{ 'error': getInputError('patronymic'), 'success': !getInputError('patronymic') && fields.patronymic && fields.patronymic.valid }"
		name='patronymic')

	app-input(
		placeholder='e-mail'
		data-vv-as='e-mail'
		v-validate='"required|email"'
		v-model.trim='user.info.email'
		@input='infoInputs.email = $event'
		:error='getInputError("email")'
		:class="{ 'error': getInputError('email'), 'success': !getInputError('email') && fields.email && fields.email.valid }"
		name='email')

	app-input(
		placeholder='Дата рождения'
		data-vv-as='date_of_birth'
		type="date"
		v-model.trim='user.info.date_of_birth'
		@input='infoInputs.date_of_birth = $event'
		:error='getInputError("date_of_birth")'
		:class="{ 'error': getInputError('date_of_birth'), 'success': !getInputError('date_of_birth') && fields.date_of_birth && fields.date_of_birth.valid }"
		name='date_of_birth')

	fieldset.fieldset.fieldset_big
		legend.legend Пол:
		AppRadio(:options='genders', :selected='user.info.gender', @change='infoInputs.gender = $event')

	app-dropdown(
		placeholder='Выберите часовой пояс'
		data-vv-as=''
		:value='user.info.gmt+""'
		@change='infoInputs.gmt = $event'
		:options='time_options'
		required="false"
		name='time')


	app-dropdown(
		placeholder='Выберите город'
		data-vv-as=''
		@change='infoInputs.city_id = $event'
		:value='user.info.city ? user.info.city.id+"" : ""'
		:options='city_options'
		name='city')

	green-btn(:disabled='isFormLocked') Сохранить изменения
</template>

<script>

export default {
	name: 'InfoForm',
	components: {
		AppInput: () => import('@/components/form/input.vue'),
		AppRadio: () => import('@/components/form/radio.vue'),
		AppDropdown: () => import('@/components/form/dropdown.vue'),
		GreenBtn: () => import('@/components/form/green-btn.vue')
	},
	computed: {
		user() {
			if (this.$store.state.user.info) {
				return JSON.parse(JSON.stringify(this.$store.state.user))
			}
			return false;
		},
		city_options() {
			return this.$store.state.cities;
		},
	},
	methods: {
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
		createErrorsList(errorsArr) {
			for (let key in errorsArr) {
				this.setErrorWatcher(key);
				this.$set(this.receivedErrors, key, errorsArr[key])
			}
		},
		setErrorWatcher(name) {
			if (!this.receivedErrors.watchers.hasOwnProperty(name)) {
				var watch = this.$watch(name, ()=>{
					delete this.receivedErrors[name];
					watch();
					delete this.receivedErrors.watchers[name]
				});
				this.receivedErrors.watchers[name] = watch;
			}
		},
		ifValid(cb) {
			this.$validator.validateAll().then((result) => {
				if (result) {
					cb()
					return;
				}
			});
		},
		onSubmit(data) {
			if (this.isFormLocked) {
				return false;
			}

			this.ifValid(()=>{
				this.isFormLocked = true;
				this.$store.dispatch('userDetailsPosting', data)
					.then(()=>{
						this.unlockForm();
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
			})

		}
	},
	data () {
		return {
			time_options: [
				{id: '-12', name: 'GMT-12'},
				{id: '-11', name: 'GMT-11'},
				{id: '-10', name: 'GMT-10'},
				{id: '-9', name: 'GMT-9'},
				{id: '-8', name: 'GMT-8'},
				{id: '-7', name: 'GMT-7'},
				{id: '-6', name: 'GMT-6'},
				{id: '-5', name: 'GMT-5'},
				{id: '-4', name: 'GMT-4'},
				{id: '-3', name: 'GMT-3'},
				{id: '-2', name: 'GMT-2'},
				{id: '-1', name: 'GMT-1'},
				{id: '+0', name: 'GMT+0'},
				{id: '+1', name: 'GMT+1'},
				{id: '+2', name: 'GMT+2 (Калининград)'},
				{id: '+3', name: 'GMT+3 (Москва, Санкт-Петербург)'},
				{id: '+4', name: 'GMT+4 (Самара, Ижевск)'},
				{id: '+5', name: 'GMT+5 (Екатеринбург)'},
				{id: '+6', name: 'GMT+6 (Омск)'},
				{id: '+7', name: 'GMT+7 (Красноярск)'},
				{id: '+8', name: 'GMT+8 (Иркутск)'},
				{id: '+9', name: 'GMT+9 (Якутск)'},
				{id: '+10', name: 'GMT+10 (Магадан, Верхоянск, Сахалин, Владивосток)'},
				{id: '+11', name: 'GMT+11 (Сахалинская область)'},
				{id: '+12', name: 'GMT+12 (Камчатка, Чукотка)'},
				{id: '+13', name: 'GMT+13'},
				{id: '+14', name: 'GMT+14'}
			],
			genders: [
				{id: 'default', text: 'Не выбрано'},
				{id: 'm', text: 'Мужской'},
				{id: 'f', text: 'Женский'},
			],
			isFormLocked: false,
			infoInputs: {},
			receivedErrors: {},
		}
	},
}
</script>

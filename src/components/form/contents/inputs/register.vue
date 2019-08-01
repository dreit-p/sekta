<template lang="pug">
.content.register

	p.heavy-text Давайте знакомиться

	form(@submit.prevent="validateBeforeSubmit", novalidate="true")
		app-input(
			placeholder='Имя'
			data-vv-as='Имя'
			v-model.trim='firstname'
			v-validate='"required"'
			:class="{ 'error': getInputError('firstname'), 'success': !getInputError('firstname') && fields.firstname && fields.firstname.valid}"
			:error='getInputError("firstname")'
			name='firstname')

		app-input(
			placeholder='Фамилия'
			data-vv-as='Фамилия'
			v-model.trim='lastname'
			:class="{ 'error': getInputError('lastname'), 'success': !!lastname}"
			name='lastname')

		app-input(
			placeholder='e-mail'
			data-vv-as='e-mail'
			v-model.trim='email'
			v-validate='"required|email"'
			:error='getInputError("email")'
			:class="{ 'error': getInputError('email'), 'success': !getInputError('email') && fields.email && fields.email.valid }"
			ref='sameEmail'
			name='email'
			type='email')

		app-input(
			placeholder='e-mail еще раз'
			data-vv-as='Повтор e-mail'
			caption='Вы не представляете, как часто люди ошибаются :)'
			v-model.trim='emailRepeat'
			:class="{ 'error': getInputError('emailRepeat'), 'success': !getInputError('emailRepeat') && fields.emailRepeat && fields.emailRepeat.valid}"
			v-validate='"required|email|confirmed:sameEmail"'
			:error='getInputError("emailRepeat")'
			name='emailRepeat'
			type='email')


		app-input(
			placeholder='придумайте пароль'
			data-vv-as='пароль'
			v-model.trim='password'
			v-validate='"required|alpha_dash:en|min:6"'
			:error='getInputError("password")'
			:class="{ 'error': getInputError('password'), 'success': !getInputError('password') && fields.password && fields.password.valid }"
			ref='samePassword'
			name='password'
			caption='Только латинские символы и цифры'
			type='password')

		app-input(
			placeholder='пароль еще раз'
			data-vv-as='Повтор пароля'
			v-model.trim='passwordRepeat'
			:class="{ 'error': getInputError('passwordRepeat'), 'success': !getInputError('passwordRepeat') && fields.passwordRepeat && fields.passwordRepeat.valid}"
			v-validate='"required|alpha_dash:en|confirmed:samePassword"'
			:error='getInputError("passwordRepeat")'
			name='passwordRepeat'
			type='password')

		app-checkbox(
			name='isAdult'
			data-vv-as='есть 18 лет'
			v-model.trim='isAdult'
			v-validate='"required:true"'
			:required='true'
			:class="{ 'error': getInputError('isAdult'), 'success': !getInputError('isAdult') && fields.isAdult && fields.isAdult.valid}"
			:error='getInputError("isAdult")'
		) Мне есть 18 лет

		app-checkbox(
			name='termsAgree'
			data-vv-as='обработка персональных данных'
			v-model.trim='termsAgree'
			v-validate='"required:true"'
			:required='true'
			:class="{ 'error': getInputError('termsAgree'), 'success': !getInputError('termsAgree') && fields.termsAgree && fields.termsAgree.valid}"
			:error='getInputError("termsAgree")'
		)
			| Ознакомлен и согласен с условиями
			a(href='../docs/privacy_policy.pdf', target='_BLANK', rel='noopener noreferrer') обработки персональных данных

		app-checkbox(
			name='spamAgree'
			data-vv-as='получение информационных писем'
			v-model.trim='spamAgree'
		) Хочу получать информационные письма

		p.red(v-if='receivedErrors.message') {{receivedErrors.message}}

		green-btn(:disabled='isFormLocked')
			| Далее
</template>
<script>

/*=====================================
=            define inputs            =
=====================================*/

let globalInputs = {
	names: ['email', 'firstname', 'lastname'],
	list: {}
};

const FIELDS_NAMES_RATIO = {
	client: [
		'firstname',
		'lastname',
		'email',
		'password',
		'passwordRepeat',
		'isAdult',
		'spamAgree'
	],
	server: [
		'first_name',
		'last_name',
		'email',
		'password',
		'password_confirmation',
		'adult',
		'accept_spam_emails'
	]
}

for (var i = 0; i < globalInputs.names.length; i++) {
	let name = globalInputs.names[i];
	globalInputs.list[name] = {
		get () {
			if (this.$store.state.inputs[name] === undefined) {
				this.$store.commit('setInputData', {name: name, data: ''})
			}
			return this.$store.state.inputs[name]
		},
		set (value) {
			this.$store.commit('setInputData', {name: name, data: value})
		}
	};
}

/*=====  End of define inputs  ======*/

export default {
	name: 'FormRegister',
	components: {
		AppInput: () => import('@/components/form/input.vue'),
		AppCheckbox: () => import('@/components/form/checkbox.vue'),
		GreenBtn: () => import('@/components/form/green-btn.vue'),
	},
	computed: {
		...globalInputs.list,
		inputsDataList() {
			let result = {};
			let obj = FIELDS_NAMES_RATIO;
			for (var i = obj.client.length - 1; i >= 0; i--) {
				result[obj.server[i]] = this[obj.client[i]];
			}
			return result;
		}
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
			};
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
		getNameServerToClient(serversideName) {
			let obj = FIELDS_NAMES_RATIO;
			let index = obj.server.indexOf(serversideName);
			return obj.client[index];
		},
		getNameClientToServer(clientsideName) {
			let obj = FIELDS_NAMES_RATIO;
			let index = obj.client.indexOf(clientsideName);
			return obj.server[index];
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
		createErrorsList(errorsArr) {
			for (let key in errorsArr) {
				this.setErrorWatcher(this.getNameServerToClient(key));
				this.$set(this.receivedErrors, this.getNameServerToClient(key), errorsArr[key])
			}
		},
		validateBeforeSubmit() {
			this.$validator.validateAll().then((result) => {
				if (result) {
					this.onSubmit();
					return;
				}
			});
		},
		onSubmit() {
			if (this.isFormLocked) {
				return false;
			}
			this.isFormLocked = true;

			this.$store.dispatch('regRequest', this.inputsDataList)
			.then(()=>{
				this.unlockForm();
				this.$emit('submit', 'register');
				this.$store.dispatch('setFormModalState', {modalState: false});
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
	},
	data () {
		return {
			isFormLocked: false,
			receivedErrors: {},
			emailRepeat: '',
			password: '',
			passwordRepeat: '',
			isAdult: false,
			termsAgree: false,
			spamAgree: false,
		}
	},
}
</script>

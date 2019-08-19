<template lang="pug">
.content.login

	p.heavy-text Вход

	form(@submit.prevent="onSubmit", novalidate="true")
		app-input(
			placeholder='e-mail'
			data-vv-as='e-mail'
			v-model.trim='email'
			v-validate='"required|email"'
			:error='getInputError("email")'
			:class="{ 'error': getInputError('email'), 'success': !getInputError('email') && fields.email && fields.email.valid }"
			name='email'
			type='email')

		app-input(
			placeholder='Пароль'
			data-vv-as='Пароль'
			v-model.trim='password'
			v-validate='"required"'
			:error='getInputError("password")'
			:class="{ 'error': getInputError('password'), 'success': !getInputError('password') && fields.password && fields.password.valid }"
			name='password'
			type='password')

		a(href='#', @click.prevent='setFormModalState({type:"recovery"})') Восстановить пароль

		green-btn(:disabled='isFormLocked')
			| Войти
</template>

<script>

/*=====================================
=            define inputs            =
=====================================*/

let globalInputs = {
	names: ['email'],
	list: {}
};

const FIELDS_NAMES_RATIO = {
	client: [
		'email', 
		'password',
	],
	server: [
		'email',
		'password',
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
	name: 'FormLogin',
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
	mounted () {
		if (this.$store.getters.isUserAuth) {
			this.$emit('submit', 'login');
			console.info('User is logged in already');
		}
	},
	methods: {
		setFormModalState(data) {
			return this.$parent.setFormModalState(data);
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

				this.$store.dispatch('authRequest', this.inputsDataList)
					.then(()=>{
						this.unlockForm();
						this.$emit('submit', 'login');
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
			});
		}
	},
	data () {
		return {
			isFormLocked: false,
			receivedErrors: {},
			password: '',
		}
	},
}
</script>

<template lang="pug">
form.form.passwordInputs(@submit.prevent='onSubmit(passwordInputs)', novalidate="true")
	app-input(
	placeholder='Новый пароль'
	data-vv-as='пароль'
	type="password"
	ref='password'
	required="true"
	v-validate='"required|alpha_dash:en|min:6"'
	@input='passwordInputs.password = $event'
	:error='getInputError("password")'
	:class="{ 'error': getInputError('password'), 'success': !getInputError('password') && fields.password && fields.password.valid }"
	name='password')

	app-input(
	placeholder='Подтверждение пароля'
	data-vv-as='Подтверждение пароля'
	type="password"
	required="true"
	v-validate='"required|alpha_dash:en|confirmed:password"'
	@input='passwordInputs.password_confirmation = $event'
	:error='getInputError("password_confirmation")'
	:class="{ 'error': getInputError('password_confirmation'), 'success': !getInputError('password_confirmation') && fields.password_confirmation && fields.password_confirmation.valid }"
	name='password_confirmation')

	green-btn(:disabled='isFormLocked') Изменить пароль
</template>

<script>

export default {
	name: 'PasswordForm',
	components: {
		AppInput: () => import('@/components/form/input.vue'),
		GreenBtn: () => import('@/components/form/green-btn.vue')
	},
	computed: {
		user() {
			if (this.$store.state.user.info) {
				return JSON.parse(JSON.stringify(this.$store.state.user))
			}
			return false;
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
			isFormLocked: false,
			passwordInputs: {},
			receivedErrors: {},
		}
	},
}
</script>

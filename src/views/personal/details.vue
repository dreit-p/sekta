<template lang="pug">
div.profile-details
	article.main-body
		.limit
			.profile-header
				h2.section-title Учетная запись
			.profile-block.profile-block_data
				info-form

			.profile-block.profile-block_password
				password-form

</template>

<script>

export default {
	name: 'DetailsPersonal',
	components: {
		AppInput: () => import('@/components/form/input.vue'),
		AppRadio: () => import('@/components/form/radio.vue'),
		AppDropdown: () => import('@/components/form/dropdown.vue'),
		GreenBtn: () => import('@/components/form/green-btn.vue'),
		InfoForm: () => import('@/components/personal/info-form.vue'),
		PasswordForm: () => import('@/components/personal/password-form.vue')
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
		ifValid(scope, cb) {
			this.$validator.validateAll().then((result) => {
				if (result) {
					cb()
					return;
				}
			});
		},
		onSubmit(dataName) {
			if (this.isFormLocked) {
				return false;
			}

			this.ifValid(dataName, ()=>{
				this.isFormLocked = true;
				this.$store.dispatch('userDetailsPosting', this[dataName])
					.then(()=>{
						this.unlockForm();
					})
					.catch((err)=>{
						this.unlockForm();
					});
			})

		}
	},
	created() {
	},
	data() {
		return {
		}
	}
}
</script>

<style lang="postcss">
.profile-details {
	.main-body {
		background-color: #e8e8e8;
		flex-grow: 1;
		padding-bottom: 60px;
		border-top: 1px solid transparent;
	}
	.profile-block_data {
		padding-bottom: 50px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.12);
	}
	.profile-block_password {
		padding-bottom: 100px;
		@media (max-width: 500px) {
			padding-bottom: 30px;
		}
	}
	.limit {
		margin-top: 25px;
		padding: 0;
		background-color: white;
		border-bottom: 1px solid rgba(0, 0, 0, 0.12);
	}
	.profile-header {
		border-bottom: 1px solid rgba(0, 0, 0, 0.12);
	}
	.section-title {
		padding-top: 20px;
		padding-bottom: 20px;
		padding-left: 25px;
		margin-bottom: 0;

		font-size: 26px;
		font-weight: 400;
		text-transform: uppercase;
		@media (max-width: 500px) {
			font-size: 19px;
		}
	}
	.form {
		max-width: 400px;
		margin-top: 25px;
		padding-left: 25px;
		@media (max-width: 480px) {
			max-width: calc(100% - 25px);
		}
	}
	.personal-layout .form .app-input .input-wrapper {
		margin-top: 5px;
		margin-bottom: 5px;
	}
	.app-input,
	.app-dropdown {
		display: block;
		margin-bottom: 10px;
		max-width: 400px;
	}
	.fieldset {
		padding: 0;
		margin-bottom: 20px;

		border: none;
		span {
			margin-right: 15px;
			@media (max-width: 480px) {
				font-size: 11px;
			}
		}
	}
	.fieldset-inner {
		display: flex;
		align-items: center;

		.app-input {
			width: 20px;
			height: 15px;
			display: inline-block;
			margin-bottom: 0;
			.input-wrapper {
				min-width: 20px;
				.input {
					border: none;
				}
			}
		}
	}
	.legend {
		margin-right: 20px;
		margin-bottom: 10px;

		font-weight: bold;
		font-size: 15px;
		&_birthday {
			margin-bottom: 8px;
		}
	}
	.app-dropdown option {
		font-size: 11px;
		@media (max-width: 480px) {
			font-size: 2px;
			color: red;
		}
	}
	.green-btn {
		width: 375px;
		max-width: 400px;
		margin: 0;
		@media (max-width: 480px) {
			width: 100%;
		}
	}
	footer {
		height: 100px;
	}
}
</style>

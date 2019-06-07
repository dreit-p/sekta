<template lang="pug">
div
	article.main-body
		.limit
			.profile-header
				h2.section-title Учетная запись
			.profile-block.profile-block_data
				form.form
					app-input(
						placeholder='Имя'
						data-vv-as='Имя'
						:class="{ 'error': errors.has('firstname'), 'success': fields.firstname && fields.firstname.valid}"
						:error='errors.first("firstname")'
						name='firstname')

					app-input(
						placeholder='Фамилия'
						data-vv-as='Фамилия'
						:class="{ 'error': errors.has('lastname'), 'success': fields.lastname && fields.lastname.valid}"
						:error='errors.first("lastname")'
						name='lastname')

					app-input(
						placeholder='e-mail'
						data-vv-as='e-mail'
						:class="{ 'error': errors.has('email'), 'success': fields.email && fields.email.valid}"
						:error='errors.first("email")'
						name='email')

					app-input(
						placeholder='Дата рождения'
						data-vv-as='birthday'
						type="number"
						:class="{ 'error': errors.has('birthday'), 'success': fields.birthday && fields.birthday.valid}"
						:error='errors.first("birthday")'
						name='birthday')

					fieldset.fieldset.fieldset_big
							legend.legend Семейное положение:

							.fieldset-inner 
								app-input(
									data-vv-as=''
									type='radio'
									:class="{ 'error': errors.has('firstname'), 'success': fields.firstname && fields.firstname.valid}"
									:error='errors.first("firstname")'
									name='family')
								span Не указано

								app-input(
									data-vv-as=''
									type='radio'
									:class="{ 'error': errors.has('firstname'), 'success': fields.firstname && fields.firstname.valid}"
									:error='errors.first("firstname")'
									name='family')
								span Не в браке

								app-input(
									data-vv-as=''
									type='radio'
									:class="{ 'error': errors.has('firstname'), 'success': fields.firstname && fields.firstname.valid}"
									:error='errors.first("firstname")'
									name='family')
								span В браке

					fieldset.fieldset.fieldset_big
							legend.legend Пол:

							.fieldset-inner 
								app-input(
									data-vv-as=''
									type='radio'
									:class="{ 'error': errors.has('firstname'), 'success': fields.firstname && fields.firstname.valid}"
									:error='errors.first("firstname")'
									name='sex')
								span Не указан

								app-input(
									data-vv-as=''
									type='radio'
									:class="{ 'error': errors.has('firstname'), 'success': fields.firstname && fields.firstname.valid}"
									:error='errors.first("firstname")'
									name='sex')
								span Мужской

								app-input(
									data-vv-as=''
									type='radio'
									:class="{ 'error': errors.has('firstname'), 'success': fields.firstname && fields.firstname.valid}"
									:error='errors.first("firstname")'
									name='sex')
								span Женский	

					app-dropdown(
						placeholder='Выберите часовой пояс'
						data-vv-as=''
						:options='time_options'
						required="false"
						name='time')


					app-dropdown(
						placeholder='Выберите город'
						data-vv-as=''
						:options='city_options'
						name='city')

					green-btn Сохранить изменения

			.profile-block.profile-block_password
				form.form.password-form
						app-input(
						placeholder='Новый пароль'
						data-vv-as=''
						type="password"
						required="true"
						:class="{ 'error': errors.has('firstname'), 'success': fields.firstname && fields.firstname.valid}"
						:error='errors.first("firstname")'
						name='password')

						app-input(
						placeholder='Подтверждение пароля'
						data-vv-as=''
						type="password"
						required="true"
						:class="{ 'error': errors.has('firstname'), 'success': fields.firstname && fields.firstname.valid}"
						:error='errors.first("firstname")'
						name='password')

						green-btn Изменить пароль

	app-footer
</template>

<script>

	let globalInputs = {
		names: ['email', 'password', 'firstname', 'lastname'],
		list: {}
	};

	export default {
		name: 'MainPersonal',
		components: {
			SvgIcon: () => import('@/components/SvgIcon.vue'),
			AppFooter: () => import('@/components/footer.vue'),
			AppInput: () => import('@/components/form/input.vue'),
			AppDropdown: () => import('@/components/form/dropdown.vue'),
			GreenBtn: () => import('@/components/form/green-btn.vue')		
		},
		data () {
			return {
				time_options: ['GTM-12', 'GTM-11','GTM-10','GTM-9','GTM-8','GTM-7','GTM-6','GTM-5','GTM-4','GTM-3',
				'GTM-2','GTM-1','GTM+0','GTM+1', 'GTM+2 (Калининград)', 'GTM+3 (Москва, Санкт-Петербург)','GTM+4 (Самара, Ижевск)',
				'GTM+5 (Екатеринбург)', 'GTM+6 (Омск)', 'GTM+7 (Красноярск)', 'GTM+8 (Иркутск)', 'GTM+9 (Якутск)',
				'GTM+10 (Магадан, Верхоянск, Сахалин, Владивосток)', 'GTM+11 (Сахалинская область)', 'GTM+12 (Камчатка, Чукотка)',
				'GTM+13', 'GTM+14'],
				city_options: ['Москва', 'Санкт-Петербург', 'Другой город']
			}
		}
	}
</script>

<style lang="postcss" scoped>
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
  .app-input {
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
</style>

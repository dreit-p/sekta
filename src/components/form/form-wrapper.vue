<template lang="pug">
section.entry-form
	.limit.header
		.title Запишитесь сейчас
		.caption cтарт в понедельник
	.wrapper.clearfix
		.half.with-bg
			.info
				.content
					p.heavy-text Запишитесь сейчас
					p Заполните форму и создайте личный кабинет, чтобы записаться на курс. 
					p Это займет не больше минуты.
					hr
					p Если он у вас уже есть, просто войдите.
					a.transparent-button(@click.prevent='setModalState({modalState: true, type: "login"})') Войти в личный кабинет

		.half
			form
				.content
					p.heavy-text Давайте знакомиться

					app-input(
						placeholder='Имя'
						data-vv-as='Имя'
						v-model.trim='firstname'
						v-validate='"required"'
						:class="{ 'error': errors.has('firstname'), 'success': fields.firstname && fields.firstname.valid}"
						:error='errors.first("firstname")'
						name='firstname')

					app-input(
						placeholder='Фамилия'
						data-vv-as='Фамилия'
						v-model.trim='lastname'
						v-validate='"required"'
						:class="{ 'error': errors.has('lastname'), 'success': fields.lastname && fields.lastname.valid}"
						:error='errors.first("lastname")'
						name='lastname')

					app-input(
						placeholder='e-mail'
						data-vv-as='e-mail'
						v-model.trim='email'
						v-validate='"required|email"'
						:error='errors.first("email")'
						:class="{ 'error': errors.has('email'), 'success': fields.email && fields.email.valid}"
						ref='asdasd'
						name='email'
						type='email')

					app-input(
						placeholder='e-mail еще раз'
						data-vv-as='Повтор e-mail'
						caption='Вы не представляете, как часто люди ошибаются :)'
						v-model.trim='emailRepeat'
						:class="{ 'error': errors.has('emailRepeat'), 'success': fields.emailRepeat && fields.emailRepeat.valid}"
						v-validate='"required|email|confirmed:$asdasd"'
						:error='errors.first("emailRepeat")'
						name='emailRepeat'
						type='email')


					app-input(
						placeholder='придумайте пароль'
						data-vv-as='пароль'
						v-model.trim='password'
						v-validate='"required|alpha_dash:en"'
						:error='errors.first("password")'
						:class="{ 'error': errors.has('password'), 'success': fields.password && fields.password.valid}"
						ref='asdasd'
						name='password'
						caption='Только латинские символы и цифры'
						type='password')

					app-input(
						placeholder='пароль еще раз'
						data-vv-as='Повтор пароль'
						v-model.trim='passwordRepeat'
						:class="{ 'error': errors.has('passwordRepeat'), 'success': fields.passwordRepeat && fields.passwordRepeat.valid}"
						v-validate='"required|alpha_dash:en"'
						:error='errors.first("passwordRepeat")'
						name='passwordRepeat'
						type='password')

					app-checkbox(
						name='isAdult'
						data-vv-as='есть 18 лет'
						v-model.trim='isAdult'
						v-validate='"required:true"'
						:required='true'
						:class="{ 'error': errors.has('isAdult'), 'success': fields.isAdult && fields.isAdult.valid}"
						:error='errors.first("isAdult")'
					) Мне есть 18 лет

					app-checkbox(
						name='termsAgree'
						data-vv-as='обработка персональных данных'
						v-model.trim='termsAgree'
						v-validate='"required:true"'
						:required='true'
						:class="{ 'error': errors.has('termsAgree'), 'success': fields.termsAgree && fields.termsAgree.valid}"
						:error='errors.first("termsAgree")'
					)
						| Ознакомлен и согласен с условиями 
						a(href='#') обработки персональных данных

					app-checkbox(
						name='spamAgree'
						data-vv-as='получение информационных писем'
						v-model.trim='spamAgree'
					) Хочу получать информационные письма

					button.green-btn
						| Далее

</template>

<script>
	import { mapActions } from 'vuex'

	export default {
		name: 'doublesided-form',
		components: {
		},
		props: {
		},
		data () {
			return {
			}
		},
		methods: {
			...mapActions(['setModalState'])
		},
	}
</script>

<style lang="postcss">
	section.entry-form {
		.header {
			padding: 6px 0;
			.title {
				font-family: var(--font-second);
				font-size: 26px;
				margin: 8px;
				font-weight: bold;
				text-align: center;
				letter-spacing: 0.3px;
			}
			.caption {
				font-family: var(--font-second);
				font-size: 22px;
				font-weight: bold;
				color: var(--accent_color);
				margin: 8px;
				text-align: center;
			}
		}

		/*====================================
		=            Construction            =
		====================================*/
		
		.wrapper {
			display: flex;
			.half {
				width: 50%;
				min-height: 240px;
				>* {
					width: 100%;
					margin: auto;
					float: left;
					position: relative;
					max-width: calc(var(--col-total) *3);
				}
				&:nth-child(odd) {
					>* {
						float: right;
					}
				}
				form .content {
					max-width: calc(315px + var(--col-space) * 2);
				}
			}
			@media (max-width: 700px) {
				flex-direction: column;
				.half {
					width: 100%;
					>* {
						float: none !important;
					}
				}
			}
		}
		
		/*=====  End of Construction  ======*/

		.wrapper {
			.half {
				background-color: #e8e8e8;
				.content {
					margin: auto;
					padding: 19px 40px 19px 20px;
					p.heavy-text {
						line-height: 1;
						font-size: 24px;
						font-family: var(--font-second);
						font-weight: bold;
						margin: 13px 0;
					}
					p {
						margin: 0;
						line-height: 1.5;
					}
					hr {
						margin: 24px 0 20px;
						border: none;
						border-radius: 1px;
						height: 1px;
						background-color: currentColor;
						opacity: .8;
					}
				}


				/*========================================
				=            Background image            =
				========================================*/

				&.with-bg {
					color: white;
					background: linear-gradient(to right, rgb(38, 70, 65) 25%, transparent, rgb(97, 147, 139) 75%);
					background-position: center center;
					background-repeat: no-repeat;
					position: relative;
					@media (max-width: 1000px) {
						background: linear-gradient(to right, rgb(38, 70, 65), transparent, rgb(97, 147, 139));
					}
					@media (min-width: 1800px) {
						background: linear-gradient(to right, rgb(38, 70, 65) 35%, transparent, rgb(97, 147, 139) 65%);
					}
					&:before {
						display: block;
						content: "";
						height: 100%;
						width: 100%;
						background-image: url(~@/assets/images/markes-bg_teal.jpg);
						background-position: center center;
						background-repeat: no-repeat;
						background-size: cover;
						position: absolute;
						top: 0;
						bottom: 0;
						right: 0;
						left: 0;
						margin: auto;
						@media (max-width: 700px) {
							z-index: -1;
							position: absolute;
						}
						@media (max-width: 1300px) {
							background-size: cover;
						}
					}
				}

				/*=====  End of Background image  ======*/

				form {
					.content {
						padding: 19px 40px 19px 20px;
					}
					.app-input {
						margin: 7px 0;
						display: inline-block;
					}
				}
			}
		}
		.transparent-button {
			border: 2px solid rgba(255, 255, 255, .9);
			color: white;
			background-color: transparent;
			padding: 10px 13px;
			margin: 24px 0;
			display: inline-block;
			font-size: 18px;
			line-height: 1.33;
			font-weight: bold;
			cursor: pointer;
			font-family: var(--font-main);
		}
	}
</style>

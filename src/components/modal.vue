<template lang="pug">
section.modal-auth
	.modal-wrapper
		.veil
		.modal-content
			.text-blocks
				.block.login
					.content
						p.heavy-text Рады видеть вас снова
						p Чтобы авторизоваться введите ваш
						| логин (e-mail) и пароль.
						.links
							a(href='#')
								svg-icon(name='icon-arrow').to-left
								| Нет личного кабинета? Зарегистрируйтесь
				.block.register
					.content
						p.heavy-text Регистрация
						p Заполните форму и создайте личный кабинет, чтобы вы могли записаться на курс. 
						| Это займет не больше минуты.
						hr
						p Если он у вас уже есть, просто войдите.
						a.transparent-button Войти в личный кабинет
			form.left
				.content
					.close-btn

					p.heavy-text Вход

					app-input(
						placeholder='e-mail'
						data-vv-as='E-mail'
						v-model.trim='email'
						v-validate='"required|email"'
						:error='errors.first("email")'
						:class="{ 'error': errors.has('email'), 'success': fields.email && fields.email.valid}"
						ref='asdasd'
						name='email'
						type='email')

					app-input(
						placeholder='Пароль'
						data-vv-as='Пароль'
						v-model.trim='password'
						v-validate='"required"'
						type='password'
						:class="{ 'error': errors.has('password'), 'success': fields.password && fields.password.valid}"
						:error='errors.first("password")'
						name='password')


</template>

<script>
	export default {
		name: 'app-modal',
		components: {
			AppInput: () => import('@/components/form/input.vue'),
			SvgIcon: () => import('@/components/SvgIcon.vue'),
		},
		computed: {

		},
		data () {
			return {
				email: '',
				password: ''
			}
		},
	}
</script>

<style lang="postcss">
.modal-auth {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	height: 100%;
	width: 100%;
	margin: auto;
	z-index: 10;
	overflow: hidden;
	@media (max-width: 600px) {
		top: 65px;
		height: auto;
	}
	.veil {
		position: absolute;
		z-index: -1;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		height: 120vh;
		width: 100%;
		margin: auto;
		background-color: rgba(0, 0, 0, .6);
		@media (max-width: 600px) {
			background-color: rgba(38, 70, 65, .9);
		}
	}
	.modal-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
		overflow: auto;
		@media (max-width: 600px) {
			display: block;
			-webkit-overflow-scrolling: touch;
		}
	}
	.modal-content {
		min-height: 300px;
		max-width: 916px;
		width: 100%;
		position: relative;
		@media (max-width: 600px) {
			height: auto;
		}
		.content {
			p.heavy-text {
				line-height: 1;
				font-size: 24px;
				font-family: var(--font-second);
				font-weight: bold;
				margin: 13px 0;
			}
			p {
				font-size: 15px;
				margin: 0;
				line-height: 1.5;
			}
			hr {
				margin: 22px 0 18px;
				border: none;
				border-radius: 1px;
				height: 1px;
				width: 100%;
				min-height: 1px;
				background-color: currentColor;
				opacity: .8;
			}
			.transparent-button {
				border: 2px solid rgba(255, 255, 255, .9);
				color: white;
				background-color: transparent;
				padding: 10px 13px;
				margin: 24px 0;
				margin-bottom: 10px;
				display: inline-block;
				text-align: center;
				font-size: 18px;
				line-height: 1.33;
				font-weight: bold;
				font-family: var(--font-main);
			}
		}
	}
	.text-blocks {
		margin: 20px var(--col-space);
		min-height: 100%;
		display: flex;
		z-index: -1;
		position: relative;
		overflow: hidden;
		align-items: stretch;
		@media (max-width: 600px) {
			margin: 0;
			flex-direction: column;
		}
		.block {
			padding: * 10px;
			width: 50%;
			color: white;
			mih-height: calc(100% - 40px);
			background: linear-gradient(to right, rgb(38, 70, 65) 25%, transparent 60%, rgb(97, 147, 139) 99%);
			background-position: center center;
			background-repeat: no-repeat;
			position: relative;
			overflow: hidden;
			@media (max-width: 600px) {
				width: auto;
				height: auto;
			}
			&:before {
				display: block;
				content: "";
				height: 100%;
				width: 100%;
				background-image: url(~@/assets/images/markes-bg_teal.jpg);
				background-position: left center;
				background-repeat: no-repeat;
				background-size: cover;
				position: absolute;
				top: 0;
				bottom: 0;
				right: -20%;
				left: auto;
				margin: auto;
				z-index: -1;
				@media (max-width: 768px) {
					/* right: 0; */
					background-position: center center;
				}
			}
			.content {
				margin: 22px 35px;
				height: calc(100% - 40px);
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				@media (max-width: 600px) {
					height: auto;
					margin: 22px 10px;
				}
				.links {
					flex-grow: 1;
					display: flex;
					margin-top: 20px;
					padding: 40px *;
					align-items: center;
					a {
						display: flex;
						align-items: baseline;
						font-family: var(--font-second);
						line-height: 1.5;
						.svg-icon {
							@media (max-width: 600px) {
								display: none;
							}
							height: 10px;
							width: 20px;
							display: inline-block;
							margin-right: 5px;
							&.to-left {
								transform: rotateZ(180deg);
							}
						}
					}
				}
			}
		}
	}
	form {
		min-height: 100%;
		background-color: #e8e8e8;
		width: calc(50% - 36px - var(--col-space));
		position: absolute;
		right: 0;
		left: 0;
		margin: auto;
		margin-bottom: 20px;
		border-radius: 2px;
		top: 0;
		overflow: hidden;
		transition: transform .5s ease-in-out;
		@media (max-width: 600px) {
			position: static;
			transform: unset !important;
			width: 100%;
			transition: none;
			margin-bottom: 0;
		}
		&.right {
			transform:  translateX(50%);
		}
		&.left {
			transform:  translateX(-50%);
		}
		.content {
			margin: 30px auto;
			max-width: calc(305px + 40px);
			padding: * 20px;
			@media (max-width: 600px) {
				padding-right: 40px;
			}
		}
		.app-input {
			margin: 7px 0;
			display: inline-block;
		}
		.close-btn {
			position: absolute;
			width: 25px;
			height: 25px;
			color: #b2b2b2;
			top: 14px;
			right: 14px;
			cursor: pointer;
			transition: transform .1s, color .2s ease-out;
			@media (max-width: 600px) {
				display: none;
			}
			&:hover {
				transition-timing-function: leanear, ease-in;
				transition-duration: .1s;
				color: black;
				transform: scale(1.1);
			}
			&:after,
			&:before {
				position: absolute;
				top: 0;
				bottom: 0;
				right: 0;
				left: 0;
				display: block;
				content: "";
				width: 100%;
				height: 2px;
				margin: auto;
				background-color: currentColor;
				transform: rotateZ(45deg);
			}
			&:after {
				transform: rotateZ(-45deg);
			}
		}
	}
}
</style>

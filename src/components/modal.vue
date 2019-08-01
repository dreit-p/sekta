<template lang="pug">
transition(name='fade')
	section.modal-auth(v-if='isOpenedModal')
		.veil(@click='setFormModalState({modalState: false})')
		.modal-wrapper
			.modal-content
				.text-blocks

					// Login

					.block(:class='{show: formModalType != "register"}')
						texts-login(v-if='formModalType == "login" || formModalType == "register"')

						texts-recovery(v-if='formModalType == "recovery"')

					// Register

					.block(:class='{show: formModalType == "register"}')
						texts-register


				.inputs-wrapper(:class='{left: formModalType == "register", right: formModalType != "register"}')
					.close-btn(@click='setFormModalState({modalState: false})')

					transition(name='fade-flip', mode='out-in')

						inputs-login(v-if='formModalType == "login"', :key='formModalType', @submit='onSubmit($event)')

						inputs-recovery(v-if='formModalType == "recovery"', :key='formModalType', @submit='onSubmit($event)')

						inputs-register(v-if='formModalType == "register"', :key='formModalType', @submit='onSubmit($event)')


</template>

<script>
import { mapActions } from 'vuex'

/*========================================
=            define the forms            =
========================================*/

const formContent = {
	types: ['login', 'register', 'recovery'],
	components: {
		inputs: {},
		texts: {}
	}
}

for (let i = 0; i < formContent.types.length; i++) {
	let type = formContent.types[i];
	formContent.components.inputs['inputs-' + formContent.types[i]] = function () {
		return import(/* webpackChunkName: "form" */ `@/components/form/contents/inputs/${type}.vue`)
	};
	formContent.components.texts['texts-' + formContent.types[i]] = function () {
		return import(/* webpackChunkName: "form" */ `@/components/form/contents/texts/${type}.vue`)
	};
}

/*=====  End of define the forms  ======*/


export default {
	name: 'AppModal',
	components: {
		AppInput: () => import('@/components/form/input.vue'),
		AppCheckbox: () => import('@/components/form/checkbox.vue'),
		...formContent.components.inputs,
		...formContent.components.texts,
	},
	data () {
		return {
			emailRepeat: '',
			passwordRepeat: '',
			isAdult: false,
			termsAgree: false,
			spamAgree: false,
		}
	},
	computed: {
		isOpenedModal () {
			return this.$store.getters.isOpenedModal;
		},
		formModalType () {
			return this.$store.state.appStates.formModal.type;
		}
	},
	methods: {
		...mapActions(['setFormModalState']),
		onSubmit (type) {
			switch (type) {
			case 'login':
				this.$router.push({name: 'personal'});
				break;
			case 'register':
				this.$router.push({name: 'personal'});
				break;
			}
		},
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
	width: 100vw;
	min-width: 100%;
	margin: auto;
	z-index: 3;
	overflow: hidden;
	@media (max-width: 600px) {
		top: 65px;
		height: auto;
	}
	.veil {
		position: absolute;
		z-index: 1;
		cursor: pointer;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		height: 120vh;
		width: 100%;
		margin: auto;
		background-color: rgba(0, 0, 0, .6);
		@media (max-width: 600px) {
			display:none;
		}
	}
	.modal-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
		overflow: auto;
		position: relative;
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
		z-index: 2;
		@media (max-width: 600px) {
			height: auto;
			display: flex;
			flex-direction: column;
			min-height: 100%;
		}
		.content {
			.red {
				color: red;
			}
			p.heavy-text {
				line-height: 1;
				font-size: 20px;
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
				border: 2px solid currentColor;
				color: white;
				opacity: .9;
				background-color: transparent;
				padding: 10px 13px;
				margin: 24px 0;
				margin-bottom: 10px;
				display: inline-block;
				text-align: center;
				font-size: 18px;
				line-height: 1.33;
				font-weight: bold;
				cursor: pointer;
				user-select: none;
				font-family: var(--font-main);
				&:hover {
					opacity: 1;
				}
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
			min-height: calc(100% - 40px);
			background: linear-gradient(to right, rgb(38, 70, 65) 25%, transparent 60%, rgb(97, 147, 139) 99%);
			background-position: center center;
			background-repeat: no-repeat;
			position: relative;
			overflow: hidden;
			@media (max-width: 600px) {
				width: auto;
				height: auto;
				display: none;
				&.show {
					display: block;
				}
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
						font-size: 14px;
						line-height: 1.5;
						cursor: pointer;
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
	.inputs-wrapper {
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
		transition: transform .5s ease-in-out, height .5s ease-in-out;
		@media (max-width: 600px) {
			position: static;
			transform: unset !important;
			width: 100%;
			transition: none;
			margin-bottom: 0;
			flex-grow: 1;
		}
		a {
			color: var(--accent_color);
			font-size: 12px;
			line-height: 2;
			display: inline-block;
			margin: 5px *;
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
			width: 100%;
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
			transition: color .2s ease-out;
			@media (max-width: 600px) {
				display: none;
			}
			&:hover {
				transition-timing-function: ease-in;
				transition-duration: .05s;
				color: color(#b2b2b2 b(80%));
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
	.green-btn {
		color: white;
		width: 100%;
		margin: 20px auto;
		cursor: pointer;
		font-size: 16px;
		line-height: 1.5;
		padding: 13px;
		text-align: center;
		display: block;
		max-width: 200px;
		border: 1px solid var(--accent_color);
		transition: color .3s, background-color .3s;
		&:hover {
			background-color: white;
			transition-duration: .1s;
			color: var(--accent_color);
		}
	}
}

</style>

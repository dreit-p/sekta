<template lang="pug">
.entry-form(id='entry-form')
	.wrapper.clearfix
		.half.with-bg(:data-color='bgColor')
			img(class='background', :src='backgroundImage')
			.text-blocks

				transition(name='fade-flip', mode='out-in')

					texts-login(v-if='entryFormType == "login"')

					texts-recovery(v-if='entryFormType == "recovery"')

					texts-register(v-if='entryFormType == "register"')

					texts-certificates(v-if='entryFormType == "certificates"')

					texts-online(v-if='entryFormType == "online"')

					texts-vip(v-if='entryFormType == "vip"')

					texts-mama(v-if='entryFormType == "mama"')

					texts-enbo(v-if='entryFormType == "enbo"')

					texts-camp(v-if='entryFormType == "camp"')

					texts-product(v-if='entryFormType == "merch"')

					texts-product(v-if='entryFormType == "bullet"')

					texts-face-to-face(v-if='entryFormType == "face-to-face"' :city="formData.city")

		.half
			.inputs-wrapper
				transition(name='fade-flip', mode='out-in')

					inputs-login(v-if='entryFormType == "login"', :key='entryFormType', @submit='onSubmit($event)')

					inputs-recovery(v-if='entryFormType == "recovery"', :key='entryFormType', @submit='onSubmit($event)')

					inputs-register(v-if='entryFormType == "register"', :key='entryFormType', @submit='onSubmit($event)')

					inputs-certificates(v-if='entryFormType == "certificates"', :key='entryFormType', @submit='onSubmit($event)')

					inputs-online(v-if='entryFormType == "online"', :key='entryFormType', @submit='onSubmit($event)', :formData='formData', :courseName='courseName')

					inputs-vip(v-if='entryFormType == "vip"', :key='entryFormType', @submit='onSubmit($event)', :formData='formData', :courseName='courseName')

					inputs-mama(v-if='entryFormType == "mama"', :key='entryFormType', @submit='onSubmit($event)', :formData='formData', :courseName='courseName')

					inputs-enbo(v-if='entryFormType == "enbo"', :key='entryFormType', @submit='onSubmit($event)', :formData='formData', :courseName='courseName')

					inputs-camp(v-if='entryFormType == "camp"', :key='entryFormType', @submit='onSubmit($event)')

					inputs-product(v-if='entryFormType == "merch"', :key='entryFormType', @submit='onSubmit($event)')

					inputs-product(v-if='entryFormType == "bullet"', :key='entryFormType', @submit='onSubmit($event)')

					inputs-face-to-face(v-if='entryFormType == "face-to-face"', :key='entryFormType', @submit='onSubmit($event)', :formData='formData')

</template>

<script>
/*========================================
=            define the forms            =
========================================*/

const formContent = {
	types: [
		"login",
		"register",
		"recovery",
		"certificates",
		"online",
		"vip",
		"mama",
		"enbo",
		"face-to-face",
		"camp",
		"merch",
		"bullet",
		"product"
	],
	components: {
		inputs: {},
		texts: {}
	}
};

for (let i = 0; i < formContent.types.length; i++) {
	let type = formContent.types[i];
	formContent.components.inputs["inputs-" + formContent.types[i]] = () => {
		return import(
			/* webpackChunkName: "form" */ `@/components/form/contents/inputs/${type}.vue`
		);
	};
	formContent.components.texts["texts-" + formContent.types[i]] = () => {
		return import(
			/* webpackChunkName: "form" */ `@/components/form/contents/texts/${type}.vue`
		);
	};
}

/*=====  End of define the forms  ======*/

export default {
	name: "EntryForm",
	components: {
		AppInput: () => import("@/components/form/input.vue"),
		AppCheckbox: () => import("@/components/form/checkbox.vue"),
		...formContent.components.inputs,
		...formContent.components.texts
	},
	props: {
		formType: {
			type: String,
			default: "register"
		},
		formData: {
			type: Object,
			default: () => {}
		},
		courseName: {
			type: String,
			default: ""
		},
		bgImage: {
			type: String,
			default: "markes-bg_teal.jpg"
		},
		bgColor: {
			type: String,
			default: "cyan"
		}
	},
	data() {
		return {
			backgroundImage: require("@/assets/images/" + this.bgImage),
			entryFormType: this.$store.getters.isUserAuth
				? this.formType
				: "register",
			firstname: "",
			lastname: "",
			email: "",
			emailRepeat: "",
			password: "",
			passwordRepeat: "",
			isAdult: false,
			termsAgree: false,
			spamAgree: false
		};
	},
	methods: {
		setFormModalState(data) {
			return (this.entryFormType = data.type);
		},
		onSubmit(type) {
			switch (type) {
			case "login":
				this.entryFormType = this.formType;
				break;
			case "register":
				this.entryFormType = this.formType;
				break;
			}
		}
	}
};
</script>

<style lang="postcss">
.entry-form {
	/*====================================
		=            Construction            =
		====================================*/

	.wrapper {
		display: flex;
		.half {
			width: 50%;
			min-height: 240px;
			> * {
				width: 100%;
				margin: auto;
				float: left;
				position: relative;
				max-width: calc((var(--col-width) + var(--col-space)) * 3);
			}
			&:nth-child(odd) {
				> * {
					float: right;
				}
			}
			.inputs-wrapper .content {
				max-width: calc(315px + var(--col-space) * 2);
			}
		}
		@media (max-width: 700px) {
			flex-direction: column;
			.half {
				width: 100%;
				> * {
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
					font-size: 20px;
					font-family: var(--font-second);
					font-weight: bold;
					margin: 13px 0;
					&_face {
						margin: 0;
						margin-bottom: 20px;
					}
				}
				p {
					font-size: 16px;
					margin: 0;
					line-height: 1.5;
				}
				p.input-caption {
					font-family: var(--font-second);
					margin: -5px * 5px;
					font-weight: 500;
					font-size: 14px;
				}
				.small-text {
					font-size: 14px;
					line-height: 1.43;
				}
				.tiny-text {
					margin: 7px *;
					font-size: 12px;
					line-height: 1.33;
					&_face {
						color: grey;
						margin-bottom: 5px;
					}
					&_long {
						width: 385px;
						margin-bottom: 10px;
						margin-top: 5px;
						@media (max-width: 992px) {
							width: auto;
						}
					}
				}
				li {
					margin: .5rem *;
				}
				hr {
					margin: 22px 0 18px;
					border: none;
					border-radius: 1px;
					height: 1px;
					width: 100%;
					min-height: 1px;
					background-color: currentColor;
					opacity: 0.8;
				}
				.transparent-button {
					border: 2px solid currentColor;
					color: white;
					opacity: 0.9;
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

			/*========================================
				=            Background image            =
				========================================*/

			&.with-bg {
				color: white;
				overflow: hidden;
				background: linear-gradient(
					to right,
					rgb(38, 70, 65) 25%,
					transparent,
					rgb(97, 147, 139) 75%
				);
				background-position: center center;
				background-repeat: no-repeat;
				position: relative;
				@media (min-width: 1800px) {
					background: linear-gradient(
						to right,
						rgb(38, 70, 65) 49%,
						transparent,
						rgb(97, 147, 139) 51%
					);
				}
				&[data-color="purple"] {
					background: linear-gradient(
						to right,
						#402858 25%,
						transparent,
						#83634e 75%
					);
					@media (min-width: 1800px) {
						background: linear-gradient(
							to right,
							#402858 49%,
							transparent,
							#83634e 51%
						);
					}
				}
				img.background {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					right: 0;
					height: 100%;
					max-width: unset;
					width: auto;
				}
			}

			/*=====  End of Background image  ======*/

			.text-blocks {
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
						font-size: 16px;
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

			.inputs-wrapper {
				.close-btn {
					display: none;
				}
				a:not(.green-btn) {
					color: var(--accent_color);
					font-size: 12px;
					line-height: 2;
					display: inline-block;
					margin: 5px *;
				}
				label a:not(.green-btn) {
					line-height: normal;
					margin: 0;
				}
				.green-btn {
					display: block;
				}
				.content {
					padding: 19px 40px 19px 20px;
				}
				.app-input,
				.app-dropdown {
					margin: 7px 0;
					display: inline-block;
				}
			}
		}
	}
}
</style>

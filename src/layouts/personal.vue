<template lang="pug">
div.personal-layout
	.veil(:class='{disabled: user.info != null}')
	header.main-header
		.limit
			router-link(class='logo', title='Sekta school logo', to='/')
				svg-icon(name='logo-sekta')
			.dropdown-wrapper(
				v-if='user.info'
				v-bind:class="{ dropdown_active: isDropDownActive }"
				@click='isDropDownActive = !isDropDownActive'
			)
				.dropdown-menu
					svg-icon(name='icon-login')
					.text {{user.info.first_name}} {{user.info.last_name}}
					svg-icon(name='down-arrow')
				ul.dropdown-list
					li.dropdown-item
						router-link(v-if="this.$route.name == 'personal'", class='dropdown-link', title='Пользовательские данные', to='/personal/details/') Личные данные
						router-link(v-if="this.$route.name != 'personal'", class='dropdown-link', title='Курсы', to='/personal/') Мои курсы
					li.dropdown-item
						.dropdown-link(@click='$store.dispatch("logOut")') Выход
	slot
	app-footer
</template>

<script>
export default {
	name: 'PersonalLayout',
	metaInfo: {
		// all titles will be injected into this template
		titleTemplate: '%s'
	},
	components: {
		AppFooter: () => import('@/components/footer.vue'),
		SvgIcon: () => import('@/components/SvgIcon.vue'),
	},
	computed: {
		user() {
			return this.$store.state.user;
		},
	},
	created() {
		this.$store.dispatch('userDetailsRequest');
	},
	data () {
		return {
			isDropDownActive: false
		}
	}
}
</script>

<style lang="postcss">
	.personal-layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		>*:nth-child(2) {
			flex-grow: 1;
		}
		.limit {
			max-width: 1170px;
			overflow: visible;
		}
		.veil {
			z-index: 100;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			background-color: white;
			opacity: .8;
			transition: opacity .5;
			&.disabled {
				opacity: 0;
				pointer-events: none;
			}
		}
		.svg-icon--down-arrow {
			width: 10px;
			height: 10px;

			color: #0ab69f;

			transition: transform .4s ease;
		}
		.dropdown-wrapper {
			position: relative;
		}
		.dropdown-list {
			position: absolute;
			top:54px;
			z-index: 55;

			pointer-events: none;
			opacity: 0;
			width: 100%;

			margin-top: 0;
			padding-left: 0;

			box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);

			overflow: hidden;
			transition: opacity .2s ease;
			@media (max-width: 500px) {
				top: 36px;
			}
		}
		.dropdown-item {
			list-style: none;
			border-bottom: 1px solid rgba(0,0,0,.1);
			background-color: white;
			&:last-child {
				border-bottom: none;
			}
		}
		.dropdown-link {
			display: block;
			padding: 10px 20px;
			text-decoration: none;
			line-height: 20px;
			cursor: pointer;
			font-size: 14px;
			&:hover {
				color: var(--accent_color);
			}
			@media (max-width: 500px) {
				line-height: 30px;
				font-size: 11px;
			}
		}

		header.main-header {
			background-color: white;
			padding: 28px *;
			@media (max-width: 500px) {
				padding: 10px * 6px;
			}
			.limit {
				display: flex;
				justify-content: space-between;
			}
			.logo {
				display: block;
				height: 54px;
				width: 185px;
				margin-right: 25px;
				@media (max-width: 500px) {
					height: 30px;
					width: auto;
					svg {
						width: auto;
					}
				}
			}
		}
		.dropdown-wrapper {
			border-radius: 5px;
			border: solid 1px #cbcbcb;
		}
		.dropdown-menu {
			padding: 19px 20px 18px;
			display: flex;
			align-items: center;
			cursor: pointer;
			user-select: none;
			min-width: 155px;
			@media (max-width: 500px) {
				min-width: 130px;
				padding: 11px;
			}
			&:hover {
				border-color: var(--accent_color);
			}
			.svg-icon--icon-login {
				color: var(--accent_color);
				stroke-width: 5px;
				height: 14px;
				width: 12px;
				@media (max-width: 500px) {
					height: 9px;
				}
			}
			.text {
				padding: * 13px;
				font-size: 14px;
				font-weight: bold;
				white-space: nowrap;
				flex-grow: 1;
				@media (max-width: 500px) {
					padding: * 5px;
					font-size: 11px;
				}
			}
			.arrow-icon {
				position: relative;
				width: 18px;
				color: var(--accent_color);
				@media (max-width: 500px) {
					width: 15px;
					margin-left: -5px;
				}
			}
		}
		.dropdown_active {
			border-radius: 0;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
			.dropdown-list {
				pointer-events: auto;
				opacity: 1;
			}
			.svg-icon--down-arrow {
				transform: rotateX(-180deg);
			}
		}

	}


	.arrow-icon {
		position: relative;
		width: 20px;
		margin: 0;
		margin-left: -10px;
		height: 1em;
		transform: translateY(-1px);
		&:before,
		&:after {
			content: "";
			position: absolute;
			display: block;
			right: 0px;
			top: 0;
			bottom: 0;
			margin: auto;
			height: 5%;
			width: 50%;
			border-radius: 1px;
			background-color: currentColor;
			backface-visibility: hidden;
			transform: rotateZ(45deg) rotateY(45deg);
			transform-origin: center left;
			transition: transform .2s;
		}
		&:after {
			transform-origin: center right;
			transform: rotateZ(-45deg) rotateY(45deg);
		}
	}





</style>

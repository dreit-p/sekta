<template lang="pug">
transition(name='fade')
	.widget-modal(v-if="isOpened")
		.veil(@click="close")
		.modal-wrapper
			.modal-content
				.text-block
					.text-block__title Тренировки, рецепты и научные статьи в наших аккаунтах:
					.text-block__icons.icons
						a(v-for='network in currentNetworks', :href='network.link', target='_BLANK', rel='noopener noreferrer')
							svg-icon(:name='"network-" + network.name')
					.text-block__title Подписывайтесь!
					.text-block__text(@click="stopWidget") Больше не показывать

</template>

<script>
export default {
	components: {
		SvgIcon: () => import('@/components/SvgIcon.vue'),
	},
	data() {
		return {
			SECONDS_TO_SHOW_POP: 10,
			isOpened: false,
			instagram: [
				{
					name: 'instagram',
					link: 'https://www.instagram.com/sektaschool'
				},
				{
					name: 'instagram',
					link: 'https://www.instagram.com/sektamama/'
				}
			],
			networks: [
				{
					name: 'vkontakte',
					link: 'https://vk.com/sektaschool'
				},
				{
					name: 'facebook',
					link: 'https://www.facebook.com/sektaschool'
				}
			]
		}
	},
	computed: {
		currentNetworks() {
			let route = this.$route
			console.log(route)
			if (route.name === "sektamama" || route.name === "pregnant" ) {
				return[this.instagram[1], ...this.networks]
			} else if (route.path === "/gym/moskva") {
				return [
					{
					name: 'instagram',
					link: 'https://www.instagram.com/sektamoscow/'
					},
					{
						name: 'vkontakte',
						link: 'https://vk.com/sektamskinfo'
					},
					{
						name: 'facebook',
						link: 'https://www.facebook.com/sektaschool/'
					},
				]
			} else if (route.path === "/gym/sankt-peterburg") {
				return [
					{
					name: 'instagram',
					link: 'https://www.instagram.com/sektaspb/'
					},
					{
						name: 'vkontakte',
						link: 'https://vk.com/sektaspbinfo'
					},
					{
						name: 'facebook',
						link: 'https://www.facebook.com/sektaschool/'
					},
				]
			}
			return [this.instagram[0], ...this.networks]
		}
	},
	mounted() {
		if (!localStorage.getItem('stopWidget')) {
			setTimeout(this.setMouseLeave, this.SECONDS_TO_SHOW_POP * 1000)
		}
	},
	destroyed() {
		this.close()
	},
	methods: {
		close() {
			this.isOpened = false
			document.querySelector('body').removeEventListener('mouseleave', this.mouseLeave)
		},
		setMouseLeave() {
			document.querySelector('body').addEventListener('mouseleave', this.mouseLeave)
		},
		mouseLeave() {
			this.isOpened = true
		},
		stopWidget() {
			this.close()
			localStorage.setItem('stopWidget', true);
		}
	}
}
</script>


<style lang="postcss">
.widget-modal{
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
		max-width: 444px;
		width: 100%;
		position: relative;
		z-index: 2;
		@media (max-width: 600px) {
			height: auto;
			display: flex;
			flex-direction: column;
			min-height: 100%;
		}
	}
	.text-block {
		padding: 30px 46px;
		width: 100%;
		background-color: #e8e8e8;
		@media (max-width: 600px) {
			margin: 0;
			flex-direction: column;
		}

		&__title {
			font-size: 16px;
			font-weight: bold;
			line-height: 1.5;
			text-align: center;
			font-family: "Montserrat", "Uni Sans", "Tahoma", "Segoe UI", arial, sans-serif;
		}

		&__icons{
			display: flex;
			align-content: center;
			justify-content: center;
			margin: 30px 0;
			width: 100%;
			>a {
				width: 50px;
				height: 45px;
				margin: 0 15px;
				display: inline-block;
				color: var(--accent_color);
				transition: color .3s;
				&:hover {
					transition-duration: .1s;
					color: color(var(--accent_color) l(+10%));
				}
				svg {
					width: 100%;
					height: 100%;
				}
			}
		}
		&__text {
			margin-top: 30px;
			font-size: 14px;
			color: #808080;
			text-align: center;
			cursor: pointer;
			text-decoration: underline;
		}
	}
}

</style>

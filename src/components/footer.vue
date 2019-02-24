<template lang="pug">
div
	.soc-networks
		.limit
			.caption Ещё больше полезного в наших аккаунтах:
			.icons
				a(v-for='network in networks', :href='network.link', target='_BLANK', rel='noopener noreferrer')
					svg-icon(:name='"network-" + network.name')
	footer
		

</template>

<script>
	export default {
		name: 'app-footer',
		components: {
			SvgIcon: () => import('@/components/SvgIcon.vue'),
		},
		data () {
			return {
				networks: [
					{
						name: 'instagram',
						link: 'https://instagram.com/'
					},
					{
						name: 'vkontakte',
						link: 'https://vk.com/'
					},
					{
						name: 'facebook',
						link: 'https://fb.com/'
					},
					{
						name: 'youtube',
						link: 'https://youtube.com/'
					},
				]
			}
		}
	}
</script>

<style lang="postcss">
	.soc-networks {
		background-color: var(--bt-dark-gray_elems);
		padding: 15px *;
		.caption {
			margin: 20px;
			font-family: var(--font-second);
			text-transform: uppercase;
			text-align: center;
			font-size: 20px;
			font-weight: bold;
			line-height: 1.35;
			letter-spacing: 0.2px;
			color: white;
		}
		.icons {
			margin: auto;
			margin-bottom: 20px;
			display: flex;
			align-content: center;
			justify-content: center;
			a {
				width: 50px;
				height: 45px;
				margin: 10px 15px;
				display: inline-block;
				color: var(--accent_color);
				transition: color .3s;
				&:hover {
					transition-duration: .1s;
					color: color(var(--accent_color-font) l(+10%));
				}
				svg {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>

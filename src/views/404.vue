<template lang="pug">
section.not-found-page
	.fullscreen-img
		.background(:style="{ backgroundImage: `url('${require('@/assets/images/404.jpg')}')`}")
		.mobile-background(:style="{ backgroundImage: `url('${require('@/assets/images/404-mobile.jpg')}')`}")
		.content
			.limit
				.gray-text.huge 404
				.gray-text страница не найдена
				router-link(tag='a', class='green-text', to='/') Вернуться на главную
</template>

<script>
	export default {
		name: 'NotFoundPage',
		components: {
		},
		data () {
			return {}
		}
	}
</script>

<style lang="postcss">
.not-found-page {
	.fullscreen-img {
		min-height: 677px;
		position: relative;
		display: flex;
		justify-content: stretch;
		align-items: stretch;
		align-content: stretch;
		@media (max-width: 1024px) {
			height: 100vw;
			min-height: 500px;
			max-height: 600px;
		}
		@media (max-width: 500px) {
			height: auto;
			max-height: none;
		}
	}
	.background,
	.mobile-background {
		height: 100%;
		width: 100%;
		transition: background-position .1s, width .1s;
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		position: absolute;
		top: 0;
		right: 0;
	}
	.mobile-background {
		display: none;
		background-size: auto 110%;
		background-position: 50% 100%;
		@media (max-width: 500px) {
			display: block;
		}
	}
	.content {
		padding: 10px *;
		width: 100%;
		flex-grow: 1;
		.limit {
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		.gray-text {
			text-shadow: -1.2px 2.8px 2px rgba(40, 38, 39, 0.4), -1.6px 3.7px 1px rgba(128, 128, 128, 0.16);
			color: #c1c1c1;
			font-size: 22px;
			letter-spacing: 1.1px;
		}
		.huge {
			font-size: 100px;
			letter-spacing: 25px;
			margin-right: -25px;
			margin-top: 70px;
			@media (max-width: 500px) {
				margin-top: 0;
			}
		}
		a {
			text-decoration: underline;
		}
		.green-text {
			text-shadow: 0px 4px 3.6px rgba(66, 66, 66, 0.45);
			font-family: var(--font-second);
			font-weight: bold;
			font-size: 19px;
			letter-spacing: 1.2px;
			color: var(--accent_color);
			margin: 25px *;
		}
	}
}
</style>

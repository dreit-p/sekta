<template lang="pug">
section.hero
	.main
		.background(:style="{ backgroundImage: `url(' ${backgroundImage} ')`}")
		.content
			.limit
				h1.title {{title}}
				.text
					slot
				a.button Записаться на обучение
	.mobile-content
		.limit
			.text
				slot

</template>

<script>
	export default {
		name: 'CoursesHero',
		components: {
		},
		props: {
			image: String,
			title: String,
		},
		computed: {
		},
		data () {
			return {
				backgroundImage: require('@/assets/images/' + this.image)
			}
		}
	}
</script>

<style lang="postcss">
	section.hero {
		.main {
			height: 500px;
			position: relative;
			@media (max-width: 1024px) {
				height: 400px;
			}
		}
		.background {
			height: 100%;
			width: 100%;
			transition: background-position .1s, width .1s;
			background-position: center center;
			background-repeat: no-repeat;
			position: absolute;
			top: 0;
			right: 0;
			@media (min-width: 1024px) {
				width: 50%;
				background-position: center left;
			}
		}
		.content {
			padding: 30px *;
			@media (max-width: 1024px) {
				height: 100%;
				.limit {
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
				}
			}
			.title {
				margin: 30px *;
				font-size: 30px;
				font-weight: bold;
				text-transform: uppercase;
				font-family: var(--font-second);
				text-shadow: 0 0 1em rgba(255, 255, 255, .5);
			}
			.text {
				width: 440px;
				font-size: 15px;
				@media (max-width: 1024px) {
					display: none;
				}
			}
			.button {
				font: 400 15px/1 var(--font-main);
				display: inline-block;
				padding: 12px 20px 13px;
				border: none;
				color: #fff;
				text-align: center;
				max-width: 300px;
				margin: 25px 35px;
				border-radius: 3px;
				background: #0ab69f;
				transition: all .3s;
				@media (max-width: 1024px) {
					margin: * auto;
					width: 100%;
				}
				&:not(:disabled) {
					cursor: pointer;
				}
				&:hover {
					background: #078675;
				}
			}
		}
		.mobile-content {
			display: none;
			@media (max-width: 1024px) {
				display: block;
			}
			.text {
				font-size: 15px;
				margin: 30px *;
			}
		}
	}
</style>

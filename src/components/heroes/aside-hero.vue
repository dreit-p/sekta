<template lang="pug">
section.aside-hero
	.main
		.background
			.triangle
				svg(height='500' viewBox='0 0 150 500')
					polygon.triangle(fill='white' points='0,0 150,250 0,500')
			.img(:style="{ backgroundImage: `url(' ${backgroundImage} ')`}")
		.content
			.limit
				h1.title {{title}}
				.text
					slot
				slot(name='buttons')
	.mobile-content
		.limit
			.text
				slot

</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		name: 'CoursesHero',
		components: {
		},
		props: {
			image: String,
			title: String,
		},
		methods: {
			...mapActions(['setModalState'])
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
	section.aside-hero {
		.main {
			min-height: 500px;
			position: relative;
			@media (max-width: 1024px) {
				height: 100vw;
				min-height: 410px;
				max-height: 500px;
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
			@media (min-width: 1025px) {
				width: 50%;
				background-position: center left;
			}
			.img {
				height: 100%;
				width: 100%;
				background-position: center 30%;
				@media (max-width: 1024px) {
					/* background-position: center; */
					background-size: cover;
				}
			}
			.triangle {
				width: 50%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				@media (max-width: 1024px) {
					display: none;
				}
			}
		}
		.content {
			padding: 30px *;
			@media (max-width: 1024px) {
				height: 100%;
				padding: 10px *;
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
				>*{
					font-size: 15px;
					line-height: 1.47;
				}
				@media (max-width: 1024px) {
					display: none;
				}
			}
		}
		.mobile-content {
			display: none;
			@media (max-width: 1024px) {
				display: block;
			}
			.text {
				>*{
					font-size: 15px;
					line-height: 1.47;
				}
				margin: 30px *;
			}
		}
	}
</style>

<template lang="pug">
section.aside-hero
	.main
		.background(:style="{ backgroundImage: `url(' ${backgroundImage} ')`}")
		.content
			.limit
				h1.title {{title}}
				.text
					slot
				green-btn(@click.prevent='setModalState({modalState: true})') Записаться на обучение
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
			GreenBtn: () => import('@/components/form/green-btn.vue'),
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

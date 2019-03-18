<template lang="pug">
section.fullsize-hero
	.main
		.background(:style="{ backgroundImage: `url(' ${backgroundImage} ')`}")
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
	section.fullsize-hero {
		.main {
			min-height: 500px;
			position: relative;
			@media (max-width: 1024px) {
				height: 400px;
			}
		}
		.background {
			height: 100%;
			width: 100%;
			transition: background-position .1s, width .1s;
			background-position: 65% center;
			background-size: cover;
			background-repeat: no-repeat;
			position: absolute;
			top: 0;
			right: 0;
		}
		ul {
			padding: * 20px;
			li {
				margin: .5em *;
			}
		}
		.content {
			padding: 30px *;
			ul {
				li {
					font-weight: bold;
					font-size: 15px;
					line-height: 1.33;
				}
			}
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
		&.dark {
			.content {
				color: white;
				.title {
					text-shadow: 0 0 1em rgba(0, 0, 0, .5);
				}
			}
		}
	}
</style>

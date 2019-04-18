<template lang="pug">
section.fullsize-hero
	.hero-content
		.background(:style="{ backgroundImage: `url(' ${backgroundImage} ')`}")
		.content
			.limit
				h1.title(v-if='this.title') {{title}}
				.hero-text(v-if='this.$slots.default')
					slot
				slot(name='another')
	.mobile-content(v-if='this.$slots.default')
		.limit
			.hero-text
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
			...mapActions(['setFormModalState'])
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
		.hero-content {
			min-height: 500px;
			position: relative;
			display: flex;
			justify-content: stretch;
			align-items: stretch;
			align-content: stretch;
			@media (max-width: 1024px) {
				height: 100vw;
				min-height: 410px;
				max-height: 500px;
			}
			@media (max-width: 500px) {
				height: auto;
				max-height: none;
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
			width: 100%;
			flex-grow: 1;
			ul {
				li {
					font-weight: bold;
					font-size: 15px;
					line-height: 1.33;
				}
			}
			.limit {
				height: 100%;
				@media (max-width: 1024px) {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
				}
			}
			.title {
				margin: 30px *;
				font-size: 30px;
				font-weight: 900;
				text-transform: uppercase;
				font-family: var(--font-second);
				text-shadow: 0 0 1em rgba(255, 255, 255, .5);
			}
			.hero-text {
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
			.hero-text {
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
		&.huge-content {
			.hero-content {
				height: 59.44vw;
				min-height: 214px;
				max-height: 650px;
			}
			.huge-hero-text {
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				.main {
					font-size: 127px;
					margin: .05em 0;
					font-family: var(--font-second);
					font-weight: 900;
					line-height: 1;
					text-transform: uppercase;
					color: var(--accent_color);
					@media (max-width: 980px) {
						font-size: 13.33vw;
					}
					@media (max-width: 360px) {
						font-size: 48px;
					}
				}
				.additional {
					font-size: 60px;
					font-weight: 900;
					color: #252525;
					font-family: var(--font-second);
					line-height: 1;
					@media (max-width: 980px) {
						font-size: 5vw;
					}
					@media (max-width: 360px) {
						font-size: 18px;
					}
				}
			}
		}
	}
</style>

<template lang="pug">
section.aside-hero
	.main
		.background
			.triangle
				svg(height='500' viewBox='0 0 150 500')
					polygon.triangle(fill='white' points='0,0 150,250 0,500')
			.img(:class='{horizontal: horizontal}', :style="{ backgroundImage: `url(' ${backgroundImage} ')`}")
			.mobile-img(:style="{ backgroundImage: `url(' ${backgroundImage_mobile} ')`}")
		.content
			.limit
				.wrapper
					h1.title(:class='{inversed: inversed}', v-if='this.title') {{title}}
					.text
						slot
					slot(name='buttons')
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
			image: {
				type: String,
				default: ''
			},
			horizontal: {
				type: Boolean,
				default: false
			},
			inversed: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: ''
			},
		},
		data () {
			return {
				backgroundImage: require('@/assets/images/aside-hero/' + this.image),
				backgroundImage_mobile: require('@/assets/images/aside-hero/mobile-' + this.image)
			}
		},
		computed: {
		},
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
				background-position: left center;
				.img.horizontal {
					background-position: left 30%;
				}
			}
			.img,
			.mobile-img {
				position: absolute;
				height: 100%;
				width: 100%;
				background-repeat: no-repeat;
				background-position: center 30%;
				background-size: cover;
				@media (min-width: 1920px) {
					background-position: left 30%;
				}
			}
			.mobile-img {
				display: none;
				@media (max-width: 500px) {
					display: block;
				}
			}
			.triangle {
				width: 50%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 1;
				@media (max-width: 1024px) {
					display: none;
				}
				svg {
					height: 100%;
				}
			}
		}
		ul {
			padding: * 20px;
			li {
				margin: .5em *;
			}
		}
		.content {
			padding: 30px *;
			.wrapper {
				width: 50%;
				height: 100%;
			}
			@media (max-width: 1024px) {
				height: 100%;
				padding: 10px *;
				.wrapper {
					width: 100%;
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
				}
				.limit {
					height: 100%;
				}
			}
			ul {
				li {
					font-size: 15px;
					line-height: 1.33;
				}
			}
			.title {
				margin: 30px *;
				font-size: 30px;
				font-weight: 900;
				text-transform: uppercase;
				font-family: var(--font-second);
				text-shadow: 0 0 1em rgba(255, 255, 255, .5);
				@media (max-width: 1024px) {
					&.inversed {
						color: #efefef;
						text-shadow: 0 0 1em rgba(0, 0, 0, .5);
					}
				}
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

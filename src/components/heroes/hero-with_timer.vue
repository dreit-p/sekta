<template lang="pug">
section.aside-hero.orange
	.main(:class='{"with-timer": currentDeadlineIndex > -1}')
		.background
			.triangle
				svg(height='500' viewBox='0 0 150 500')
					polygon.triangle(fill='white' points='0,0 150,250 0,500')
			.img(:class='{horizontal: horizontal}', :style="{ backgroundImage: `url(' ${backgroundImage} ')`}")
			.mobile-img(v-if='!noMobile && !!backgroundImage_mobile', :style="{ backgroundImage: `url(' ${backgroundImage_mobile} ')`}")
		.content
			.limit
				.wrapper
					h1.title(:class='{inversed: inversed}', v-if='this.title') {{title}}
					.text
						slot
					.hero-timer(v-if='currentDeadlineIndex > -1')
						.timer-caption {{ currentCaption }}
						.counters
							.counter
								//- circleBar(:radius='30', :max='20', :progress='countdownData.days', :width='3')
								.number {{ countdownData.days }}
								.counter-title Дн
							.delimiter :
							.counter
								//- circleBar(:radius='30', :max='60', :progress='countdownData.hours', :width='3')
								.number {{ countdownData.hours }}
								.counter-title Ч
							.delimiter :
							.counter
								//- circleBar(:radius='30', :max='60', :progress='countdownData.minutes', :width='3')
								.number {{ countdownData.minutes }}
								.counter-title Мин
					slot(name='buttons')
	.mobile-content
		.limit
			.text
				slot

</template>

<script>
const countdown = require('countdown');

export default {
	name: 'CoursesHero',
	components: {
		// circleBar: () => import('@/components/circle-bar.vue'),
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
		noMobile: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: ''
		},
		deadlines: {
			type: Array,
			default: ()=>[],
		},
		deadlineCaptions: {
			type: Array,
			default: ()=>[],
		},
	},
	data () {
		return {
			backgroundImage: require('@/assets/images/aside-hero/' + this.image),
			backgroundImage_mobile: require('@/assets/images/aside-hero/mobile-' + this.image),
			currentDate: new Date,
		}
	},
	computed: {
		currentDeadlineIndex() {
			return this.deadlines.findIndex(date => new Date(date) >= this.currentDate);
		},
		currentDeadline() {
			return this.deadlines[this.currentDeadlineIndex];
		},
		currentCaption() {
			return this.deadlineCaptions[this.currentDeadlineIndex];
		},
		countdownData() {
			let deadline = new Date(this.currentDeadline);
			return countdown(deadline, (new Date >= deadline ? deadline : new Date), countdown.DAYS|countdown.HOURS|countdown.MINUTES);
		},
	},
	mounted() {
		setInterval(() => this.currentDate = new Date, 1000); // trigger update current date
	},
}
</script>

<style lang="postcss">
	section.aside-hero {
		.limit {
			position: static;
		}
		&.orange {
			.green-btn {
				background-color: #ffb500;
				@media (max-width: 1025px) {
					color: #ffb500;
					background-color: white;
					width: auto;
				}
			}
			.title {
				color: #ffb500;
				@media (max-width: 1025px) {
					color: black;
				}
			}
		}
		.main {
			min-height: 500px;
			position: relative;
			@media (max-width: 1024px) {
				height: 100vw;
				min-height: 410px;
				max-height: 500px;
			}
			&.with-timer {
				max-height: 600px;
				min-height: 530px;
				height: 150vw;
				@media (max-width: 1025px) {
					.mobile-img {
						display: block;
					}
				}
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
			z-index: -1;
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
		.hero-timer {
			flex-grow: 1;
			display: flex;
			justify-content: flex-end;
			flex-direction: column;
			color: white;
			.timer-caption {
				text-transform: uppercase;
				font-weight: bold;
				width: 100%;
				font-size: 20px;
				margin: 10px *;
				font-family: var(--font-second);
				color: currentColor;
			}
			.counters {
				display: flex;
			}
			.delimiter {
				color: currentColor;
				font-size: 56px;
				line-height: 52px;
				margin: 0 10px 10px;
				font-weight: 700;
				font-family: var(--font-second);
				text-align: center;
			}
			.counter {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				position: relative;
				.number,
				.counter-title {
					color: currentColor;
					font-size: 20px;
					line-height: 20px;
					font-weight: 700;
					font-family: var(--font-second);
					text-align: center;
				}
				.number {
					font-size: 56px;
					line-height: 56px;
				}
			}
			@media (min-width: 1026px) {
				position: absolute;
				width: 250px;
				right: calc(25% + -150px);
				bottom: 16%;
			}
			@media (max-width: 1025px) {
				align-items: center;
				align-self: center;
				.timer-caption {
					font-size: 16px;
					margin: 8px *;
				}
				.delimiter {
					font-size: 44px;
					line-height: 41px;
					margin: 0 8px 8px;
				}
				.counter .counter-title {
					font-size: 16px;
					line-height: 16px;
				}
				.counter .number {
					font-size: 44px;
					line-height: 44px;
				}
			}
		}
	}
</style>

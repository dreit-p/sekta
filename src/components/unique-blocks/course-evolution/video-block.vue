<template lang="pug">
section.video_block
	.title
		.big-text Тренировки онлайн
		.small-text Смотри, как это будет
	.background
		img(src='@/assets/images/evolution/bg_lines-video.svg' alt='')
	.main-images(:class='{enabled: isEnabled}')
		.notebook
			img.notebook(src='@/assets/images/evolution/notebook_mockup.png' alt='')
			img.video-picture(src='@/assets/images/evolution/video_frame.jpg' alt='')
			.video-frame
				iframe(width='560' height='315' src='https://www.youtube.com/embed/J5Ng4480qq4' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen='')
				.play-btn(@click='isEnabled = true')
					img(src='@/assets/images/evolution/play-btn.png' alt='')
		.phone
			img(src='@/assets/images/evolution/phone_mockup.png' alt='')


</template>

<script>
export default {
	name: 'EvoCourseInfo',
	data() {
		return {
			isEnabled: false
		}
	}
}
</script>

<style lang="postcss">
section.video_block {
	position: relative;
	padding-top: 1px;
	z-index: 1;
	.title {
		margin: 92px * 70px;
		text-align: center;
		@media (max-width: 500px) {
			margin: 20px * 30px;
		}
		.big-text {
			font-family: var(--font-second);
			font-size: 36px;
			font-weight: bold;
			line-height: 1.33;
			text-transform: uppercase;
			@media (max-width: 500px) {
				font-size: 22px;
			}
		}
		.small-text {
			font-size: 24px;
			text-transform: uppercase;
			line-height: 1.33;
			@media (max-width: 500px) {
				font-size: 18px;
			}
		}
	}
	.background {
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		overflow: hidden;
		&:before {
			content: "";
			display: block;
			position: absolute;
			top: 0;
			z-index: 1;
			left: 0;
			right: 0;
			height: 60px;
			background-image: linear-gradient(to bottom, white, rgba(255, 255, 255, 0));
		}
		img {
			width: 100%;
			height: 90%;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			@media (max-width: 1200px) {
				height: 110%;
				width: 150%;
				margin-left: -10%;
			}
		}
	}
	.main-images {
		position: relative;
		max-width: 1373px;
		margin: auto;
		.notebook {
			max-width: 1373px;
			margin: auto;
			position: relative;
			img {
				width: 100%;
				margin-bottom: -9%;
				&.video-picture {
					display: none;
				}
				@media (max-width: 500px) {
					margin-bottom: 0;
					&.notebook {
						display: none;
					}
					&.video-picture {
						display: block;
					}
				}
			}
			.video-frame {
				position: absolute;
				top: 5.8%;
				left: 16.8%;
				right: 16.5%;
				bottom: 10.7%;
				margin: auto;
				@media (max-width: 500px) {
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
				}
				iframe {
					width: 100%;
					height: 100%;
					display: none;
					opacity: 0;
					transition: opacity .3s ease-in;
				}
				.play-btn {
					display: block;
					width: 16.5%;
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					margin: auto;
					cursor: pointer;
					border-radius: 50%;
					@media (max-width: 500px) {
						width: 120px;
						height: 120px;
					}
					img {
						position: absolute;
						top: 0;
						bottom: 0;
						margin: auto;
					}
				}

			}
		}
		.phone {
			position: absolute;
			right: 5.5%;
			left: 73.3%;
			top: 10%;
			bottom: 5.6%;
			z-index: 1;
			@media (max-width: 500px) {
				display: none;
			}
			img {
				max-height: 100%;
				max-width: 100%;
			}
			@keyframes hide_phone {
				from {transform: translateX(0)}
				50% {transform: translateX(100%); z-index: -1;}
				to {transform: translateX(0); z-index: -1;}
			}
		}
		&.enabled {
			.notebook .video-frame {
				iframe {
					display: block;
					opacity: 1;
				}
				.play-btn {
					display: none;
				}
			}
			.phone {
				animation: hide_phone .6s ease-in;
				animation-direction: normal;
				animation-iteration-count: 1;
				animation-fill-mode: both;
				animation-timing-function: ease-out;
				animation-play-state: running;
			}
		}
		&.disabled {
			.phone {
				animation: hide_phone .6s ease-in;
				animation-direction: reverse;
				animation-fill-mode: both;
				animation-timing-function: ease-in;
				animation-play-state: running;
			}
		}
	}
}
</style>

<template lang="pug">
transition(name='fade')
	section.video-modal
		.veil(@click='closeModal')
		.modal-wrapper
			.modal-content
				.additional-content
					slot
					.close-btn.cross(@click='closeModal')
						.x
				iframe(width="560", height="315", :src="iframeLink", frameborder="0", allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture", allowfullscreen="")

</template>

<script>
export default {
	name: 'VideoModal',
	components: {
	},
	props: {
		iframeLink: {
			type: String,
			default: ''
		}
	},
	computed: {
	},
	methods: {
		closeModal () {
			this.$emit('close');
		},
	},
	created () {
	},
	watch: {
	},
	mounted () {
	},
	data () {
		return {
		}
	}
}
</script>

<style lang="postcss">
.video-modal {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	height: 100%;
	width: 100vw;
	min-width: 100%;
	margin: auto;
	z-index: 2;
	@media (max-width: 600px) {
		top: 65px;
		height: auto;
	}
	.veil {
		position: absolute;
		z-index: 1;
		cursor: pointer;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		height: 120vh;
		width: 100%;
		margin: auto;
		background-color: rgba(0, 0, 0, .6);
		@media (max-width: 600px) {
			background-color: rgba(0, 0, 0, .8);
		}
	}
	.modal-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
		overflow: auto;
		position: relative;
		@media (max-width: 600px) {
			-webkit-overflow-scrolling: touch;
		}
	}
	.modal-content {
		max-width: 916px;
		width: 100%;
		position: relative;
		z-index: 2;
		iframe {
			width: 100%;
			margin: auto;
			/* margin-top: 60px; */
			display: block;
			height: calc(100vw / 1.78);
			max-width: calc(100vh / 0.56);
			max-height: 100vh;
			@media (min-width: 920px) {
				height: calc(920px / 1.78);
			}
		}
	}
	.additional-content {
		max-width: calc(916px - (30px - var(--col-space))*2);
		margin: 20px auto;
		padding: * var(--col-space);
		padding-right: calc(25px + var(--col-space) *2);
		position: absolute;
		transform: translateY(-200%);
		left: 0;
		right: 0;
		text-align: left;
		>* {
			font-size: 16px;
			letter-spacing: 0.0125rem;
			margin: 0;
			color: white;
			font-family: var(--font-second);
		}
		>.bold {
			font-weight: bold;
			font-size: 20px;
		}
	}
	.close-btn {
		display: block;
		height: 25px;
		width: 25px;
		margin: 12px;
		color: white;
		cursor: pointer;
		position: absolute;
		right: var(--col-space);
		bottom: 0px;
		margin: auto;
		transition: color .3s;
		&:hover {
			transition-duration: .1s;
			color: var(--accent_color);
		}
		&.cross {
			z-index: 5;
			.x {
				width: 100%;
				height: 4px;
				background-color: transparent;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				margin: auto 0;
				position: absolute;
				border-radius: 1px;
				transition: background-color .2s;
				&:before,
				&:after {
					border-radius: 1px;
					content: "";
					display: block;
					background-color: currentColor;
					height: 100%;
					width: 100%;
					position: absolute;
					left: 0;
					right: 0;
					transform: rotateZ(-225deg);
					top: 0;
					bottom: 0;
					transform-origin: center center;
					transition: transform .2s;
				}
				&:after {
					transform: rotateZ(225deg);
					width: 100%;
				}
			}
		}
	}
}
</style>

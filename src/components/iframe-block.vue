<template lang='pug'>
	.iframe-block
		iframe.iframe-block(:src='videoSrc', v-if='isVideoShowed' frameborder='0', allow='autoplay; fullscreen', allowfullscreen='')
		.placeholder-img(@click='isVideoShowed = true', v-if='!isVideoShowed')
			.title {{title}}
			.play-btn
			.img(:style='"background-image: url("+placeholderFile+")"')
</template>

<script>
export default {
	name: 'IframBlock',
	inheritAttrs: false,
	data() {
		return {
			isVideoShowed: false,
			placeholderFile: require('@/assets/images/' + this.imgSrc),
		}
	},
	props: {
		videoSrc: {
			type: String,
			required: true
		},
		imgSrc: {
			type: String,
			required: true
		},
		title: {
			type: String,
			default: ""
		},
	},
};
</script>

<style lang="postcss">
	.iframe-block {
		background-color: black;
		width: 100%;
		max-width: 640px;
		min-width: calc((320px - 15px*2));
		height: calc(100vw *0.56);
		min-height: calc(320px *0.56);
		max-height: calc(640px *0.56);
		position: relative;
		.img {
			background-size: cover;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			width: 100%;
			height: 100%;
			cursor: pointer;
		}
		.title {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			width: 100%;
			font-size: 20px;
			min-height: 40%;
			padding: 20px 15px;
			margin: 0;
			z-index: 1;
			background-image: linear-gradient(#ececec 0%, transparent 100%);
		}
		.play-btn {
			background-image: url(~@/assets/images/play-btn.png);
			height: 96px;
			width: 96px;
			background-size: contain;
			position: absolute;
			z-index: 1;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
		}
	}
</style>

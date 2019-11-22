<template lang="pug">
	svg.circle-bar(:width='radius*2', :height='radius*2+"px"', :viewport='"0 0 "+radius+" "+radius', version='1.1', xmlns='http://www.w3.org/2000/svg', v-if='!!radius')
		circle(:r='radius-width+"px"', :cx='radius+"px"', :cy='radius+"px"', :stroke-dasharray='dasharray', stroke-dashoffset='0')
		circle.bar(:r='radius-width+"px"', :cx='radius+"px"', :cy='radius+"px"', :stroke-dasharray='dasharray', :stroke-dashoffset='dashoffset+"px"')
</template>

<script>
export default {
	name: 'CircleBar',
	data() {
		return {
		}
	},
	methods: {
		getProgress() {
			if (this.progress < 0) {
				this.progress = 0;
			}
			if (this.progress > this.max) {
				this.progress = this.max;
			}
			return 1-this.progress/this.max;
		},
	},
	computed: {
		dasharray() {
			return Math.PI*((+this.radius-this.width)*2);
		},
		dashoffset() {
			return Math.PI*((+this.radius-this.width)*2)*this.getProgress();
		},
	},
	props: {
		radius: {
			type: Number,
			default: 0
		},
		width: {
			type: Number,
			default: 3
		},
		progress: {
			type: Number,
			default: 0
		},
		max: {
			type: Number,
			default: 100
		},
	},
};
</script>

<style lang="postcss">
	svg.circle-bar {
		position: absolute;
		transform: rotate(-90deg);
		circle {
			fill: transparent;
			/* transition: stroke-dashoffset 1s linear; */
			stroke: var(--bt-dark_elems);
			opacity: .3;
			stroke-width: 3px;
			&.bar {
				opacity: 1;
			}
		}
	}
</style>

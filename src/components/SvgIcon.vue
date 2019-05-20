<template lang="pug">
	svg(:class="className", :viewBox="icon.viewBox", xmlns="http://www.w3.org/2000/svg")
		title(v-if="title") {{ title }}
		use(:xlink:href="icon.url", xmlns:xlink="http://www.w3.org/1999/xlink")
</template>

<script>
export default {
	name: 'SvgIcon',

	props: {
		name: {
			type: String,
			required: true
		},

		title: {
			type: String,
			default: null
		}
	},

	computed: {
		icon() {
			return require(`@/assets/images/svg/${this.name}.svg`).default;
		},
		className() {
			return 'svg-icon svg-icon--' + this.name;
		}
	}
};
</script>

<style>
	.svg-icon {
		fill: currentColor;
		height: 100%;
		width: 100%;
	}
</style>

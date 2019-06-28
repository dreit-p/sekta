<template>
	<picture>
		<source type="image/webp" :srcset="fileName[0]">
		<source type="image/jpeg" :srcset="fileName[1]">
		<img :src="fileName[1]" :alt="alt">
	</picture>
</template>

<script>
export default {
	name: 'WebpImg',

	props: {
		src: {
			type: String,
			required: true
		},
		alt: {
			type: String,
			default: ''
		},
	},
	computed: {
		fileName () {
			let location = 'assets/images/';
			let fileName = this.src.match(/([\w,\s-]+)\.[A-Za-z]{3}/)[1];
			let fileExt = this.src.slice((this.src.lastIndexOf(".") - 1 >>> 0) + 2);

			let file = require(`@/${location}${fileName}.${fileExt}`);
			let extless =  file.replace(/\.[^.]+$/, "");
			return [extless + '.webp', extless + '.jpg']
		},

	}
};
</script>

<style>
	img {
		width: 100%;
	}
</style>

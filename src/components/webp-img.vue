<template>
	<picture>
		<source :type="'image/'+files[0].type" :srcset="files[0].link">
		<source :type="'image/'+files[1].type" :srcset="files[1].link">
		<img :src="files[1].link" :alt="alt" v-bind="$attrs" :style="imgStyle">
	</picture>
</template>

<script>
export default {
	name: 'WebpImg',
	inheritAttrs: false,
	props: {
		src: {
			type: String,
			required: true
		},
		imgStyle: {
			type: Object,
			default: ()=>{},
		},
		alt: {
			type: String,
			default: ''
		},
	},
	computed: {
		files () {
			let location = 'assets/images/';
			let fileName = this.src.match(/([\w,\s-\/]+)\.[A-Za-z]{3}/)[1];
			let fileExt = this.src.slice((this.src.lastIndexOf(".") - 1 >>> 0) + 2);

			let file = require(`@/${location}${fileName}.${fileExt}`);

			let extless =  file.replace(/\.[^.]+$/, "");
			return [
				{
					type: 'webp',
					link: extless + '.webp',
				},
				{
					type: fileExt,
					link: `${extless}.${fileExt}`,
				}
			]
		},

	}
};
</script>

<style scoped>
	img {
		width: 100%;
	}
</style>

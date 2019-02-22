<template lang="pug">
#app
	app-header
	router-view
	SvgAssets
</template>

<script>
	import AppHeader from '@/components/header.vue'
	import SvgAssets from '@/components/svg.vue'

	(function(document, window) {
		document.addEventListener("DOMContentLoaded", function() {
			var baseUrl = window.location.href
				.replace(window.location.hash, "");
			[].slice.call(document.querySelectorAll("use[*|href]"))
				.filter(function(element) {
					return (element.getAttribute("xlink:href").indexOf("#") === 0);
				})
				.forEach(function(element) {
					element.setAttribute("xlink:href", baseUrl + element.getAttribute("xlink:href"));
				});
		}, false);
	}(document, window));

	export default {
		components: {
			AppHeader,
			SvgAssets
		}
	}
</script>

<style lang="postcss">
</style>

<template lang="pug">
#app
	app-header
	router-view
	app-footer
	svg-assets
</template>

<script>

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
			AppHeader: () => import('@/components/header.vue'),
			AppFooter: () => import('@/components/footer.vue'),
			SvgAssets: () => import('@/components/svg.vue'),
		}
	}
</script>

<style lang="postcss">
</style>

<template lang="pug">
#app
	app-header
	app-modal(v-show='$store.state.appStates.isOpenedModal')
	router-view
	app-footer
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
			AppModal: () => import('@/components/modal.vue'),
		}
	}
</script>

<style lang="postcss">
	#app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	body {
		overflow-y: scroll;
		&.scroll-locked {
			overflow: hidden;
		}
	}
</style>

<template lang="pug">
#app
	app-header
	app-modal
	transition(name='fade-flip', mode='out-in', @after-leave="$root.$emit('triggerScroll')")
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

	function isMobile() {
		if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
			return true;
		} else {
			return false;
		}
	}

	if (isMobile()) {
		document.getElementsByTagName('body')[0].classList.add('mobile');
	}

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
	}
</style>

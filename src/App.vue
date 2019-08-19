<template lang="pug">
#app
	component(:is="layout")
		transition(name='fade-flip', mode='out-in', @after-leave="$root.$emit('triggerScroll')")
			router-view
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

const default_layout = 'default';

function subDomain() {
	return window.location.hostname.split('.')[0];
}

export default {
	components: {
		DefaultLayout: () => import('@/layouts/default.vue'),
		PersonalLayout: () => import('@/layouts/personal.vue'),
		SvgIcon: () => import('@/components/SvgIcon.vue'),
		SubDomainLayout: () => import(`@/layouts/sub-domains/${subDomain()}.vue`),
	},
	computed: {
		layout() {
			let layout = ['msk', 'spb', 'reg'].includes(subDomain())
				? 'sub-domain'
				: (this.$route.meta.layout || default_layout);

			return layout + '-layout';
		}
	},
}
</script>

<style lang="postcss">
	body {
		overflow-y: scroll;
	}
</style>

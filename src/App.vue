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

export default {
	components: {
		DefaultLayout: () => import('@/layouts/default.vue'),
		PersonalLayout: () => import('@/layouts/personal.vue'),
		MskLayout: () => import('@/layouts/msk.vue'),
		SpbLayout: () => import('@/layouts/spb.vue'),
		SvgIcon: () => import('@/components/SvgIcon.vue'),
	},
	computed: {
		layout() {
			if (process.env.NODE_ENV === 'development') {
				return (this.$route.meta.layout || default_layout) + '-layout';
			}
			let subdomain = /([\w.-]*)\.\w+\.\w+\/*$/gi.exec(window.location.host);
			if (subdomain != null) {
				if (subdomain[1] && subdomain[1] === 'msk' || subdomain[1] === 'spb') {
					return subdomain[1] +'-layout';
				}
			}
			return (this.$route.meta.layout || default_layout) + '-layout';
		}
	},
	created() {
		// nothing defined here (when this.$route.path is other than "/")
		// console.log(this.$route, this.$route.meta.layout);
	},
	updated() {
		// something defined here whatever the this.$route.path
		// console.log(this.$route, this.$route.meta.layout);
	}
}
</script>

<style lang="postcss">
	body {
		overflow-y: scroll;
	}
</style>

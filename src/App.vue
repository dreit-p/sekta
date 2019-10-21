<template lang="pug">
#app
	component(:is="layout")
		transition(name='fade-flip', mode='out-in', @after-leave="$root.$emit('triggerScroll')")
			router-view( :key="$route.path")
	div
		noscript
			div
				img(src="https://mc.yandex.ru/watch/23370769" style="position:absolute; left:-9999px;" alt="")
</template>

<script>
if (process.env.NODE_ENV === 'production') {
	// Yandex.Metrika counter
	(function (m, e, t, r, i, k, a) {
		m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
		m[i].l = 1 * new Date(); k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
		})
		(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
		ym(23370769, "init", {
		clickmap: true,
		trackLinks: true,
		accurateTrackBounce: true,
		webvisor: true
	});
	// /Yandex.Metrika counter
}

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
	let agent = navigator.userAgent;
	return agent.match(/Android/i)
		|| agent.match(/webOS/i)
		|| agent.match(/iPhone/i)
		|| agent.match(/iPad/i)
		|| agent.match(/iPod/i)
		|| agent.match(/BlackBerry/i)
		|| agent.match(/Windows Phone/i);
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

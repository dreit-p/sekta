<template lang="pug">
div.main-layout
	app-header
	app-modal
	vidget-modal(v-if="isVidget")
	slot
	app-footer
	cookie-notification
</template>

<script>
export default {
	name: 'DefaultLayout',
	metaInfo: {
		// if no subcomponents specify a metaInfo.title, this title will be used
		title: 'Sekta',
		// all titles will be injected into this template
		titleTemplate: '%s',
	},
	head: {
		script: function () {
			if (!this.isAccu) return [{t: "text/javascript",
				i: `!function () {
					var t = document.createElement("script");
					t.type = "text/javascript", t.async = !0, t.src = "https://vk.com/js/api/openapi.js?162", t.onload = function () {
						VK.Retargeting.Init("VK-RTRG-238523-huHvz"), VK.Retargeting.Hit()
					}, document.head.appendChild(t)}();`
			}, {
				i: `!function (f, b, e, v, n, t, s) {
					if (f.fbq) return; n = f.fbq = function () {
						n.callMethod ?
							n.callMethod.apply(n, arguments) : n.queue.push(arguments)
					};
					if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
					n.queue = []; t = b.createElement(e); t.async = !0;
					t.src = v; s = b.getElementsByTagName(e)[0];
					s.parentNode.insertBefore(t, s)
				}(window, document, 'script',
					'https://connect.facebook.net/en_US/fbevents.js');
				fbq('init', '1842433989303819');
				fbq('track', 'PageView');`
			}, {
				t: 'text/javascript',
				i: `var _tmr = window._tmr || (window._tmr = []);
				_tmr.push({id: "3136401", type: "pageView", start: (new Date()).getTime()});
				(function (d, w, id) {
				if (d.getElementById(id)) return;
				var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
				ts.src = "https://top-fwz1.mail.ru/js/code.js";
				var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
				if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
				})(document, window, "topmailru-code");`,
				body: true,
			}]
			return []
		},
		noscript: function() {
			if (!this.isAccu) return [{
				i: `<img src="https://vk.com/rtrg?p=VK-RTRG-238523-huHvz" style="position:fixed; left:-999px;" alt="" />`
			}, {
				i: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1842433989303819&ev=PageView&noscript=1"/>`
			}, {
				i: `<div><img src="https://top-fwz1.mail.ru/counter?id=3136401;js=na" style="border:0;position:absolute;left:-9999px;" alt="Top.Mail.Ru" /></div>`,
				body: true,
			}]
			return []
		}
	},
	components: {
		AppHeader: () => import('@/components/header.vue'),
		AppFooter: () => import('@/components/footer.vue'),
		AppModal: () => import('@/components/modal.vue'),
		VidgetModal: () => import('@/components/vidget-modal.vue'),
		CookieNotification: () => import('@/components/cookie.vue'),
	},
	computed: {
		isAccu() {
			return this.$route.path ==='/accuchek'
		},
		isVidget() {
			let suitableLinks = ["sektacare", "sektaevo", "sektamama", "pregnant", "sektavip"]
			return suitableLinks.includes(this.$route.name)
		}
	},
}
</script>

<style lang="postcss">
	.main-layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
</style>

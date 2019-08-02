<template lang="pug">
div.course
	vue-headful(
			title="Bullet Journal от #sekta"
			description="Блокнот в точку - Bullet Journal от #sekta. Расчерченный календарь на 12 месяцев; трекеры привычек, настроения, сна и физической усталости; десятки страниц дневника для фантазии и жизни."
	)
	hero(image='bullet_bg-sektabullet.jpg', title='SEKTABULLET', sideToRender='right')
		p Буллет джорнал — это
		ul.merch__list
			li расчерченный календарь на 12 месяцев;
			li трекеры привычек, настроения, сна и физической усталости;
			li десятки страниц дневника для фантазии и жизни.
		p В каждом буллет джорнале — письмо от Оли Маркес, чтобы даже первооткрыватели буллета знали, как его вести и что делать.

	section
		entry-form(formType='bullet')
</template>

<script>
	import Vue from 'vue';
	import vueHeadful from 'vue-headful';

	Vue.component('vue-headful', vueHeadful);

	export default {
		name: 'SektaBullet',
		components: {
			hero: () => import('@/components/heroes/fullsize-hero.vue'),
			CaptionSection: () => import('@/components/form/contents/caption-section.vue'),
			GreenBtn: () => import('@/components/form/green-btn.vue'),
			EntryForm: () => import('@/components/entry-form.vue'),
		},
		data () {
			return {}
		},
	}
</script>

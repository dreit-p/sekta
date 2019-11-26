<template lang="pug">
div.course
	hero(image='certificates_bg.jpg', title='Подарочный сертификат', no-mobile)
		p Полезный подарок — самый лучший!
		p Все онлайн-курсы #sekta, очные тренировки в зале — всё это можно подарить друзьям и близким.
		p В зависимости от суммы, подарочный сертификат #sekta может стать:
		ul
			li Обучением на любом онлайн-курсе: #sektaevo, #sektacare, #sektamama и #sektavip.
			li Абонементом на месяц очных тренировок в филиале.
		p
			b Дарите своим близким эмоции и новый опыт!
		template(v-slot:buttons)



	section
		entry-form(formType='certificates')

</template>

<script>
import { mapActions } from 'vuex'
import Vue from 'vue';

export default {
	name: 'ForMums',
	metaInfo: {
		title: 'Подарочные сертификаты #sekta',
		description: 'Футблоки, майки и толстовки #sekta. Размеры от xs до xl. Доставка по всей России.Лучший подарок себе и близким: сертификаты в #sekta номиналом от 1350 до 10900. Сертификат может стать любым онлайн или очным курсом #sekta.'
	},
	components: {
		hero: () => import('@/components/heroes/aside-hero.vue'),
		EntryForm: () => import('@/components/entry-form.vue'),
		GreenBtn: () => import('@/components/form/green-btn.vue'),
	},
	methods: {
		...mapActions(['setFormModalState'])
	},
	data () {
		return {}
	}
}
</script>

<style lang="postcss">

</style>

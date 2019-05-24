<template lang="pug">
div.course

	hero(image='certificates_bg.jpg', title='Подарочный сертификат', no-mobile)
		p Полезный подарок - самый лучший!
		p Все онлайн-курсы #sekta, очные тренировки в зале — всё это можно подарить друзьям и близким.
		p В зависимости от суммы, подарочный сертификат #sekta может стать:
		ul
			li Обучением на любом онлайн-курсе: #s60days, #sektacare, #sektamama и #sektamen
			li Абонементом на месяц очных тренировок в филиале.
		p
			b Дарите своим близким эмоции и новый опыт!
		template(v-slot:buttons)



	section
		entry-form(formType='certificates')

</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		name: 'for-mums',
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

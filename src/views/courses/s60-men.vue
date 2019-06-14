<template lang="pug">
div.course

	hero(image='course_bg-sectamen.jpg', title='КУРС ДЛЯ МУЖЧИН', inversed)
		p #Sektamen — направление, созданное специально для мужчин. Опытные кураторы помогут вам достичь любой цели с помощью работы над питанием и тренировками. Мы даем рекомендации каждому ученику в зависимости от желаемого результата: нарастить мышечную массу, похудеть или просто стать сильнее, быстрее и выносливее. Вне зависимости от уровня вашей подготовки мы подберем для вас оптимальную нагрузку.
		template(v-slot:buttons)
			green-btn(@click.prevent='setFormModalState({modalState: true})') Записаться на обучение

	article.main-content
		.article-limit
			.text-typography
				h3.center #SEKTAMEN
				p
					b Online-курс с куратором
				p
					b Длительность курса: 
					| 9 недель.
				p
					b Стоимость одной недели обучения: 
					| 1 350 рублей.
				h5
					b Особенности программы:
				ul
					li адаптация программы под цели: набрать массу, восстановиться после интенсивных нагрузок или сбросить лишний вес;
					li подбор рекомендаций по питанию в зависимости от цели;
					li чат с единомышленниками;
					li личный кабинет с заданиями и тренировками;
					li косметическая программа по уходу за мужской кожей.
				p
					b Очный курс в зале
				p
					b Длительность: 
					| 1 месяц
				p 3 тренировки в неделю в Санкт-Петербурге — 3900 руб./мес. и Москве — 4500 руб./мес. В залах есть коврики и душ.
				h5
					b Особенности программы:
				ul
					li тренировки с собственным весом и дополнительным оборудованием;
					li консультации по питанию;
					li помощь куратора в адаптации общих рекомендаций под ваши особенности и цели.


	section
		.section-caption
			| Запишитесь сейчас
			.highlight cтарт в понедельник
		entry-form(formType='online')

</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		name: 'S60Men',
		components: {
			hero: () => import('@/components/heroes/aside-hero.vue'),
			EntryForm: () => import('@/components/entry-form.vue'),
			GreenBtn: () => import('@/components/form/green-btn.vue'),
		},
		data () {
			return {}
		},
		methods: {
			...mapActions(['setFormModalState'])
		},
	}
</script>

<style lang="postcss">
	
</style>

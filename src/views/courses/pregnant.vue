<template lang="pug">
div.course

	hero(image='course_bg-pregnant.jpg', title='ДЛЯ БЕРЕМЕННЫХ', horizontal)
		p Чтобы быстрее восстановиться после родов, нужно заранее позаботиться о своем теле и здоровье в целом. Курс «Я беременна» составлен совместно с акушером-гинекологом и учитывает все особенности этого периода. Программа курса поможет вам сохранить форму, укрепить организм и обеспечит здоровое протекание беременности. 
		template(v-slot:buttons)
			green-btn(@click.prevent='setFormModalState({modalState: true})') Записаться на обучение

	article.main-content
		.article-limit
			.text-typography
				h3.center ПРОГРАММА ДЛЯ БЕРЕМЕННЫХ
				h4.center ПРОБНАЯ ТРЕНИРОВКА ДЛЯ БЕРЕМЕННЫХ
				p
					b Программа подходит женщинам с 12-ой недели беременности. 
					| До начала программы обсудите с наблюдающим врачом, нет ли у вас ограничений на физические нагрузки для беременных.
				p
					b Длительность курса: 
					| 5 недель.
				p
					b Стоимость одной недели обучения: 
					| 1 500 рублей.
				h5
					b Особенности программы:
				ul
					li подбор допустимой физической нагрузки с учетом срока беременности и медицинских показаний;
					li оперативная консультация акушеров-гинекологов;
					li адаптированная тренировочная программа и упражнения для беременных;
					li кураторы с сертифицированным образованием;
					li советы по уходу за телом и контроль набора веса;
					li советы по возвращению к физической активности после родов.
				p Программа курса рекомендована ведущими врачами Перинатального Медицинского Центра (ПМЦ) г. Москвы.


	section
		.section-caption
			| Запишитесь сейчас
			.highlight cтарт в понедельник
		entry-form

</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		name: 'Pregnants',
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

<template lang="pug">
div.course
	vue-headful(
            title="#SektaPregnant онлайн курс для беременных"
            description="Онлайн-курс здорового питания и программы видео тренировок для женщин с 12 недели беременности. Поможет сохранить форму, укрепить организм и обеспечит здоровое протекание беременности. Составлен совместно с акушером-гинекологом и учитывает все особенности этого периода."
    )
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

	caption-section(
		v-bind:dateStart='dateStart',
		v-bind:prices='prices'
	) 	
</template>

<script>
	import { mapActions } from 'vuex'
	import Vue from 'vue';
    import vueHeadful from 'vue-headful';

    Vue.component('vue-headful', vueHeadful);

	const currentId = 3;

	export default {
		name: 'Pregnants',
		components: {
			hero: () => import('@/components/heroes/aside-hero.vue'),
			GreenBtn: () => import('@/components/form/green-btn.vue'),
			CaptionSection: () => import('@/components/form/contents/caption-section.vue'),
		},
		computed: {
			dateStart: {
				get () {
					this.$store.dispatch('updateOnline');

					if (this.$store.state.dateStart !== null && this.$store.state.dateStart.length !== 0) {
						return this.$store.state.dateStart[currentId].last_start_date;
					} 
				}
			},
			prices: {
				get () {
					if (this.$store.state.dateStart !== null && this.$store.state.dateStart.length !== 0) {
						return this.$store.state.dateStart[currentId].prices
							.map(({ name }) => name);
					}
				}
			}
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

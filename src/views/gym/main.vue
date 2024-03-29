<template lang="pug">
div.course
	courses-hero(class='dark', image='gym_bg.jpg', title='Курс #sekta в зале')
		template(v-slot:default)
			ul
				li 4 недели разнообразных тренировок от 3 до 6 раз в неделю;
				li работа с питанием и полезными привычками на личной странице на сайте;
				li прохождение программы под руководством команды тренеров и консультантов;
				li нагрузки, адаптированные под ваши особенности и противопоказания;
				li индивидуальные рекомендации спортивного врача на основе медицинской анкеты;
				li новые друзья и единомышленники.
		template(v-slot:another)
			gyms

	article.main-content
		.article-limit
			.text-typography
				h2.center Часто задаваемые вопросы
				h5 Что входит в курс #sekta в зале?
				p Курс #sekta в зале включает:
				ul
					li 4 недели групповых тренировок от 3 до 6 раз в неделю (количество тренировок вы выбираете при подаче заявки на курс);
					li работу с личной страницей на сайте, где размещаются задания по питанию, видео коротких утренних тренировок и полезные материалы;
					li трекер целей и полезных привычек на личной странице на сайте.

				h5 Какие виды курсов в зале у вас есть?
				p Всего их три#[b *]: 
				p #SektaBasic — для тех, кто готов к интенсивным нагрузкам. Подходит мужчинам и женщинам. 
				p #SektaLite — если нужен плавный старт и есть ограничения по нагрузкам. Эффективные упражнения без прыжков, частой смены плоскостей и нагрузок на суставы. Подходит мужчинам и женщинам.
				p #SektaMen (курс для мужчин) — специализированные высокоинтенсивные и силовые тренировки для мужчин. Больше упражнений на мышцы рук, груди и спины.
				p Если не знаете, какое направление выбрать – обратитесь в чат к онлайн-консультанту на этой странице или к администраторам на почту #[a(href='mailto:info@sektaschool.ru') info@sektaschool.ru]
				p #[b *]Если сейчас на странице записи на курс вы не видите какое-либо из направлений, значит сейчас на него больше нет мест, но они обязательно появятся в следующем месяце :)

				h5 Где находятся залы #sekta?
				p Сейчас у нас есть несколько залов в #[a(href='./gym/moskva') Москве] и #[a(href='./gym/sankt-peterburg') Санкт-Петербурге]. Точные адреса залов вы можете узнать на страницах городов.

				h5 Какие будут тренировки?
				p В программе чередуются высокоинтенсивные, кардио, силовые и альтернативные виды тренировок на все группы мышц. Работаем с собственным весом, иногда включаем спортивный инвентарь, если он есть в зале. Тренировки не повторяются.

				h5 Сколько длится курс?
				p Курс рассчитан на 4 недели, но программа длится столько, сколько вам нужно для достижения результата — вы можете заниматься месяц, два или год. Каждый месяц — новые задания для продолжающих обучение и новичков.

				h5 Я могу менять дни, время и ходить на тренировки в любую группу?
				p Нет. Вы оплачиваете конкретное направление, зал, время, количество и дни тренировок (выбираете при подаче заявки) — и можете ходить только в выбранную группу.

				h5 Можно ли перенести тренировки на следующий месяц?
				p Перенос и восстановление тренировок возможен только по медицинской справке или больничному листу. В других форс-мажорных обстоятельствах вопрос переноса решается в индивидуальном порядке.

				h5 Открыт набор во все группы, кроме направления #sektalite. Что делать?
				p Дождаться открытия набора на следующий месяц, в этом месяце группа уже набрана.

				h5 Когда старт курса?
				p {{this.courseDate}}

				h5 Что брать с собой на тренировки в зал?
				p Спортивную форму, кроссовки для тренинга или бега, банные принадлежности (если в выбранном вами зале есть душ), бутылку с водой. Коврики и нужный инвентарь для тренировок есть в зале.


</template>

<script>
import Vue from 'vue';
import { formatDateDayMonth } from "../../assets/misc.js";

export default {
	name: 'Gym',
	metaInfo: {
		title: 'Тренировки #sekta в залах',
		description: 'Очные курсы #sekta в Москве и Санкт-Петербурге. Тренировки от 2 до 6 раз в неделю для мужчин и женщин, программа правильного питания, задания по уходу за кожей и работа с куратором для вашего лучшего результата.'
	},
	components: {
		CoursesHero: () => import('@/components/heroes/fullsize-hero.vue'),
		Gyms: () => import('@/components/gym/gyms.vue'),
	},
	asyncComputed: {
		courses() {
			return this.$store
				.dispatch("gyms/reqCourses", 1)
				.then(() => {
					return this.$store.state.gyms.courses;
				});
		},
	},
	computed: {
		courseDate() {
			if (!this.courses) return;
			return formatDateDayMonth(this.courses[0].common_start_date);
		},
	},
	data () {
		return {}
	}
}
</script>

<style lang="postcss">
</style>

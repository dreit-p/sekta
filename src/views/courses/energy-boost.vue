<template lang="pug">
div.course
	hero(image='course_bg-sectacare.jpg', title='Курс #SektaEnergyBoost')
		p В #SektaEnergyBoost мы заботимся о тех, кому нужно плавно ввести тренировки в свою жизнь. Вы давно не тренировались или только начинаете?
		p Мы создали специальную программу для тех, кто не хочет прыгать с места в карьер. Вас ждет разнообразная нагрузка, направленная на жиросжигание, развитие выносливости, силы, гибкости  — такие тренировки помогут улучшить метаболизм, а куратор подберет идеальный режим питания.
		template(v-slot:buttons)
			green-btn(@click='scrollTo("entry-form")') Записаться на обучение

	article.main-content
		.article-limit
			.text-typography
				h3.center #SektaEnergyBoost
				a.notice.center(href='https://account.sektaschool.ru/courses/winter/demo.php', target='_BLANK', rel='noopener noreferrer') ДЕМО-ВЕРСИЯ ПРОГРАММЫ #SektaEnergyBoost
				p Мечтаете о хорошем результате, но боитесь, что противопоказания сделают прогресс слишком медленным?
				p На курсе вы проработаете мышцы пресса, спины, ног и ягодиц и всего тела комплексно. Даже при наличии противопоказаний мы подберем упражнения, которые будут воздействовать эффективно.
				p
					b Что вы получите?
				ul
					li Снижение массы тела
					li Укрепление мышечного корсета
					li Укрепление спины
					li Укрепление суставов
					li Здоровое питание без диет
					li Безопасные тренировки
					li Узнаете, как адаптировать упражнения и тренироваться после спортивных или других травм
				p Чтобы тренировки укрепляли здоровье и способствовали похудению, они должны быть сложными, но выполнимыми и приносить вам радость. Наш курс состоит из таких тренировок, поэтому вы не бросите его после первого занятия.
				p Курс доступен онлайн и в залах Москвы и Санкт-Петербурга.
				p
					b Длительность курса:&nbsp;
					| 9 недель.
				p
					b Стоимость одной недели обучения:&nbsp;
					| 1&ensp;500 рублей.

	caption-section(v-if='courseInfo'
		:dateStart='formatDate()',
		:TEMPdateStart='courseInfo.last_start_date',
	)
	entry-form(v-if='courseInfo', formType="online", :formData='{prices: courseInfo.prices, platforms: availablePlatforms, id: courseInfo.id, availableCities: availableCities}', :courseName='courseInfo.name')
</template>

<script>
import { mapActions } from 'vuex'
import Vue from 'vue';

import { formatDateDayMonth } from "../../assets/misc.js";

const COURSE_TAG = 'WINTER_19';

export default {
	name: 'SektaEnergyBoost',
	metaInfo: {
		title: '#SektaEnergyBoost онлайн-курс',
		description: 'Онлайн-курс правильного питания и программы видео тренировок для людей с противопоказаниями. Если болят суставы, большая масса тела, или вы новичок в спорте - #SektaEnergyBoost поможет плавно войти в тренировочный режим и программу правильного питания.'
	},
	components: {
		hero: () => import('@/components/heroes/aside-hero.vue'),
		CaptionSection: () => import('@/components/form/contents/caption-section.vue'),
		EntryForm: () => import('@/components/entry-form.vue'),
		GreenBtn: () => import('@/components/form/green-btn.vue'),
	},
	asyncComputed: {
		courseInfo() {
			return this.$store.dispatch('updateOnlineCourses').then(()=>{
				return this.$store.state.onlineCourses.find((course) => course.tag === COURSE_TAG);
			});
		}
	},
	data () {
		return {
			availableCities: ['2']
		}
	},
	computed: {
		availablePlatforms() {
			return Object.keys(this.courseInfo.start_dates).filter(p => this.courseInfo.start_dates[p])
		}
	},
	methods: {
		...mapActions(['setFormModalState']),
		formatDate() {
			let newObj = {}
			this.availablePlatforms.forEach(platform => {
				newObj[platform] = this.courseInfo.start_dates[platform]
			});
			return newObj
		},
		scrollTo(id) {
			window.scrollTo({
				top: getPosition(document.getElementById(id)).y -65,
				behavior: "smooth"
			});
			function getPosition(el) {

				var x = 0,
					y = 0;

				while (el != null && (el.tagName || '').toLowerCase() != 'html') {
					x += el.offsetLeft || 0;
					y += el.offsetTop || 0;
					el = el.offsetParent;
				}

				return { x: parseInt(x, 10), y: parseInt(y, 10) };
			}
		}
	},
}
</script>

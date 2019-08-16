<template lang="pug">
div.course
	hero(image='course_bg-sectacare.jpg', title='Курс #SektaCare')
		p В #SEKTACARE мы заботимся о тех, кому нужно плавно ввести тренировки в свою жизнь. Вы давно не тренировались или только начинаете?
		p Мы создали специальную программу для тех, кто не хочет прыгать с места в карьер. Вас ждет разнообразная нагрузка, направленная на жиросжигание, развитие выносливости, силы, гибкости  — такие тренировки помогут улучшить метаболизм, а куратор подберет идеальный режим питания.
		template(v-slot:buttons)
			green-btn(@click='scrollTo("entry-form")') Записаться на обучение

	article.main-content
		.article-limit
			.text-typography
				h3.center #SEKTACARE
				a.notice.center(href='https://account.sektaschool.ru/courses/care/demo.php', target='_BLANK', rel='noopener noreferrer') ДЕМО-ВЕРСИЯ ПРОГРАММЫ #SEKTACARE
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
					| 1 350 рублей.

	caption-section(v-if='courseInfo'
		dateStart='в понедельник',
		:TEMPdateStart='courseInfo.last_start_date',
	)
	entry-form(v-if='courseInfo', formType="online", :formData='{prices: courseInfo.prices, platforms: availablePlatforms}', :courseName='courseInfo.name')
</template>

<script>
import { mapActions } from 'vuex'
import Vue from 'vue';

const COURSE_TAG = 'CARE';

export default {
	name: 'SektaCare',
	metaInfo: {
		title: '#SektaCare онлайн-курс',
		description: 'Онлайн-курс правильного питания и программы видео тренировок для людей с противопоказаниями. Если болят суставы, большая масса тела, или вы новичок в спорте - #SektaCare поможет плавно войти в тренировочный режим и программу правильного питания.'
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
				let currentCourseData = this.$store.state.onlineCourses.find((course) => course.tag === COURSE_TAG);
				return currentCourseData;
			});
		}
	},
	data () {
		return {
			availablePlatforms: ['vk'] // 'tg', 'vk', 'fb', 'sk', 'vb', 'wa', 'email'
		}
	},
	methods: {
		...mapActions(['setFormModalState']),
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

<style lang="postcss">

</style>

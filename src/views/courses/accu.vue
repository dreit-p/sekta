<template lang="pug">
div.course
	hero(image='course_bg-accu.jpg', title='#SektaAccuСhek Программа для людей с диабетом', no-mobile, horizontal)
		p Программа #SektaAccuСhek разработана для людей с диабетом 1 и 2 типа и их родственников.
		p Проходите курс сами или помогайте в его прохождении родным с диабетом: детям или пожилым родителям.
		p Тренировки программы учитывают особенности изменения гликемии во время, до и после занятия. Они подойдут и людям из группы риска по развитию метаболических нарушений, с лишним весом и желающим следить за здоровьем.
		p Во время прохождения курса вы будете получать бесплатные онлайн-консультации врача-эндокринолога.
		template(v-slot:buttons)
			green-btn(@click='scrollTo("entry-form")') Записаться на обучение

	article.main-content
		.article-limit
			.text-typography
				h3.center #SektaAccuСhek
				p
					b Программа подходит:
				ul
					li Новичкам
				p Если вы не занимались раньше, тренировки #SektaAccuСhek помогут войти в тренировочный режим и познакомиться с разноплановой нагрузкой с учетом особенностей здоровья.

				ul
					li Для людей старшего возраста
				p При наличии противопоказаний к тренировкам куратор подберет другие задания, чтобы увеличить вашу физическую активность. Во всех тренировках есть замены упражнений: если вы не можете что-то сделать, вам предложат альтернативу.

				ul
					li Родителям детей с диабетом
				p Программа поможет разобраться в основах рационального питания и особенностях введения нагрузок для людей с диабетом. После прохождения курса материалы останутся у вас на руках, и вы сможете продолжать следить за питанием и физической активностью ребенка.

				ul
					li Людям с диабетом и высокой занятостью
				p Контроль заболевания требует регулярного посещения врачей и спортзала, больших вложений в заботу о питании. На программе #SektaAccuСhek вы будете получать онлайн-консультации врача–эндокринолога и сможете тренироваться дома 30—45 минут в день без дополнительного оборудования. Мы расскажем, как не тратить много времени на приготовление еды.

				p
					b Длительность курса:
					| 8 недель.
				p
					b Стоимость одной недели обучения:
					| 1600 рублей.
				p
					b При оплате 4-х недель:
					| 5500 рублей.
				h5
					b Особенности программы:
				ul
					li индивидуальные рекомендации спортивного врача и эндокринолога на основе медицинской анкеты;
					li адаптация тренировочного процесса и рекомендаций по питанию в соответствии с вашими особенностями и противопоказаниями;
					li выполнение тренировок в удобное для вас время;
					li обучение на личной странице на сайте;
					li возможность отслеживать прогресс;
					li общение и поддержка единомышленников в чате под руководством команды тренеров и консультантов.


	caption-section(v-if='courseInfo'
		dateStart='в понедельник',
		:TEMPdateStart='courseInfo.last_start_date',
	)
	entry-form(v-if='courseInfo', formType="online", :formData='{prices: courseInfo.prices, platforms: availablePlatforms}', :courseName='courseInfo.name')

</template>

<script>
import { mapActions } from 'vuex'
import Vue from 'vue';

const COURSE_TAG = 'SEKTAACCUCHEK';

export default {
	name: 'Accu',
	metaInfo: {
		title: '#SektaAccuchek онлайн-курс для людей с диабетом',
		description: 'Программа #SektaAccuСhek разработана для людей с диабетом 1 и 2 типа и их родственников.'
	},
	components: {
		hero: () => import('@/components/heroes/aside-hero.vue'),
		EntryForm: () => import('@/components/entry-form.vue'),
		GreenBtn: () => import('@/components/form/green-btn.vue'),
		CaptionSection: () => import('@/components/form/contents/caption-section.vue'),
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

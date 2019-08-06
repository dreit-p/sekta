<template lang="pug">
div.course
	vue-headful(
            title="#SektaVip индивидуальный онлайн-курс"
            description="Индивидуальная онлайн-программа один на один с куратором. Составим уникальную программу питания и тренировок с учетом вашего опыта, распорядка дня и целей."
    )
	hero(image='course_bg-sectavip.jpg', title='VIP ПРОГРАММА', horizontal, inversed)
		p Индивидуальная коучинговая программа с самыми актуальными разработками нашей Школы. Мы поможем вам выстроить эффективную систему питания и тренировок с учетом ваших особенностей, жизненного графика, свободного времени, предпочитаемой платформы (VK, Facebook, Viber, WhatsApp, Telegram, Skype, Email) и подберем куратора, исходя из ваших запросов.
		template(v-slot:buttons)
			green-btn(@click.prevent='setFormModalState({modalState: true})') Записаться на обучение

	article.main-content
		.article-limit
			.text-typography
				h3.center #SEKTAVIP
				p
					b Длительность любого VIP курса:
					| столько, сколько нужно для достижения целей каждого отдельного ученика
				p
					b Стоимость:
					| Базовый курс – 3500 рублей в неделю
				hr
				h5
					b VIP курс – это:
				ul
					li старт в любой удобный для вас день;
					li самые эффективные разработки нашей Школы (включая программы SektaBootcamp, S60days, NYFC, SektaMama, SektaLite, SektaMen, Углубленный курс);
					li прохождение курса на любой удобной для вас платформе;
					li связь с куратором в комфортном режиме, поддержка и мотивация;
					li индивидуальная тренировочная программа с учетом вашего свободного времени, жизненного графика, состояния здоровья, уровня вашей физической подготовки;
					li анализ рациона, пищевых привычек и построение актуального для ваших целей режима питания (мы учитываем все ваши предпочтения);
					li возможность бесплатно посещать наши очные групповые занятия (3 раза в неделю) при наличии филиала в вашем городе.
				p На любой ваш вопрос мы ответим по телефону
				a(href='tel:8 800 500 68 82') 8 800 500 68 82
				| или по почте
				a(href='mailto: vip@sektaschool.ru') vip@sektaschool.ru
				| .


	caption-section(v-if='courseInfo'
		:dateStart='courseInfo.last_start_date',
	)
	entry-form(v-if='courseInfo', formType='online', :formData='{prices: courseInfo.prices}', :courseName='courseInfo.name')
</template>

<script>
import { mapActions } from 'vuex'
import Vue from 'vue';
import vueHeadful from 'vue-headful';

Vue.component('vue-headful', vueHeadful);

const COURSE_TAG = 'VIP';

export default {
	name: 'Vip',
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
		return {}
	},
	methods: {
		...mapActions(['setFormModalState'])
	},
}
</script>

<style lang="postcss">

</style>

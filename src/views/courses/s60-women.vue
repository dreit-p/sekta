<template lang="pug">
div.course

	hero(image='course_bg-sectacare.jpg', title='Курс #SektaCare')
		p В #SEKTACARE мы заботимся о тех, кому нужно плавно ввести тренировки в свою жизнь. Вы давно не тренировались или только начинаете?
		p Мы создали специальную программу для тех, кто не хочет прыгать с места в карьер. Вас ждет разнообразная нагрузка, направленная на жиросжигание, развитие выносливости, силы, гибкости  — такие тренировки помогут улучшить метаболизм, а куратор подберет идеальный режим питания.
		template(v-slot:buttons)
			green-btn(@click.prevent='setFormModalState({modalState: true})') Записаться на обучение

	article.main-content
		.article-limit
			.text-typography
				h3.center #SEKTACARE
				h4.center ДЕМО-ВЕРСИЯ ПРОГРАММЫ #SEKTACARE
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
					b Длительность курса:
					| 9 недель.
				p
					b Стоимость одной недели обучения:
					| 1 350 рублей.
				h5
					b Особенности программы:
				ul
					li индивидуальные рекомендации спортивного врача на основе медицинской анкеты;
					li адаптация тренировочного процесса и рекомендаций по питанию в соответствии с вашими особенностями и противопоказаниями;
					li возможность выбора «мягкого» или «жесткого» подхода в работе куратора;
					li выполнение тренировок в любое удобное для вас время;
					li обучение на личной странице ученика на сайте;
					li возможность отслеживать свой прогресс;
					li общение и поддержка единомышленников в чате под руководством кураторской команды тренеров и консультантов.

	caption-section(v-if='courseInfo')
	entry-form(v-if='courseInfo', formType="online", :formData='{prices: courseInfo.prices, platforms: availablePlatforms, id: courseInfo.id}', :courseName='courseInfo.name')
</template>

<script>
import { mapActions } from 'vuex'

const COURSE_TAG = 'CARE';

export default {
	name: 'S60Women',
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
			availablePlatforms: ['vk', 'tg'] // 'tg', 'vk', 'fb', 'sk', 'vb', 'wa', 'email'
		}
	},
	methods: {
		...mapActions(['setFormModalState'])
	},
}
</script>

<style lang="postcss">

</style>

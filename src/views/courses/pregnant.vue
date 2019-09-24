<template lang="pug">
div.course
	hero(image='course_bg-pregnant.jpg', title='ДЛЯ БЕРЕМЕННЫХ', horizontal)
		p Чтобы быстрее восстановиться после родов, нужно заранее позаботиться о своем теле и здоровье в целом. Курс «Я беременна» составлен совместно с акушером-гинекологом и учитывает все особенности этого периода. Программа курса поможет вам сохранить форму, укрепить организм и обеспечит здоровое протекание беременности.
		template(v-slot:buttons)
			green-btn(@click='scrollTo("entry-form")') Записаться на обучение

	article.main-content
		.article-limit
			.text-typography
				h3.center ПРОГРАММА ДЛЯ БЕРЕМЕННЫХ
				a.notice.center(href='https://www.youtube.com/watch?v=MUNQRUgy444&feature=youtu.be', target='_BLANK', rel='noopener noreferrer') ПРОБНАЯ ТРЕНИРОВКА ДЛЯ БЕРЕМЕННЫХ
				p
					b Программа подходит женщинам с 12-ой недели беременности.&nbsp;
					| До начала программы получите от наблюдающего врача&ensp;
					a(href='../docs/parmed-xpreg.pdf' target='_BLANK' rel='noopener noreferrer') справку
					| /письменное подтверждение о разрешенных вам нагрузках.
				p
					b Продолжительность курса:&ensp;
					| 5 недель.
				p
					b Стоимость одной недели обучения:&ensp;
					| 1&ensp;500 рублей.
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

	caption-section(v-if='courseInfo'
		dateStart='в понедельник',
		:TEMPdateStart='courseInfo.last_start_date',
	)
	entry-form(v-if='courseInfo', formType="online", :formData='{prices: courseInfo.prices, platforms: availablePlatforms, id: courseInfo.id}', :courseName='courseInfo.name')
</template>

<script>
import { mapActions } from "vuex";

const COURSE_TAG = "PREGNANT";

export default {
	name: "Pregnants",
	metaInfo: {
		title: "#SektaPregnant онлайн курс для беременных",
		description:
			"Онлайн-курс здорового питания и программы видео тренировок для женщин с 12 недели беременности. Поможет сохранить форму, укрепить организм и обеспечит здоровое протекание беременности. Составлен совместно с акушером-гинекологом и учитывает все особенности этого периода."
	},
	components: {
		hero: () => import("@/components/heroes/aside-hero.vue"),
		GreenBtn: () => import("@/components/form/green-btn.vue"),
		EntryForm: () => import("@/components/entry-form.vue"),
		CaptionSection: () =>
			import("@/components/form/contents/caption-section.vue")
	},
	asyncComputed: {
		courseInfo() {
			return this.$store.dispatch("updateOnlineCourses").then(() => {
				let currentCourseData = this.$store.state.onlineCourses.find(
					course => course.tag === COURSE_TAG
				);
				return currentCourseData;
			});
		}
	},
	data() {
		return {
			availablePlatforms: ["vk"] // 'tg', 'vk', 'fb', 'sk', 'vb', 'wa', 'email'
		};
	},
	methods: {
		...mapActions(["setFormModalState"]),
		scrollTo(id) {
			window.scrollTo({
				top: getPosition(document.getElementById(id)).y - 65,
				behavior: "smooth"
			});
			function getPosition(el) {
				var x = 0,
					y = 0;

				while (el != null && (el.tagName || "").toLowerCase() != "html") {
					x += el.offsetLeft || 0;
					y += el.offsetTop || 0;
					el = el.offsetParent;
				}

				return { x: parseInt(x, 10), y: parseInt(y, 10) };
			}
		}
	}
};
</script>

<style lang="postcss">
</style>

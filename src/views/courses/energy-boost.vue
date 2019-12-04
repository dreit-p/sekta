<template lang="pug">
div.course
	hero(image='course_bg-enbo.jpg', title='ENERGY BOOST', :deadlines=['Dec 9 2019 00:00:00', 'Jan 1 2020 00:00:00'], :deadlineCaptions=['Старт через:', 'Новый год через:'])
		.highlight-block
			p Вы можете чувствовать себя сильным, бодрым и подтянутым всю зиму!
			p Сезонный #[b онлайн]-курс #SEKTA
			p Доступен с #[b 9 декабря] по #[b 10 февраля]
			p Длится #[b 2 недели]
			p Старт — #[b в любой день]
			p Стоимость: #[b 4000 руб.]

		template(v-slot:buttons)
			green-btn(@click='scrollTo("entry-form")') Участвовать

	article.main-content
		.article-limit
			.text-typography
				h3.center Чего ждать от курса
				p
					b ENERGY BOOST поможет:
				ul
					li #[b прокачаться] и выйти на новую ступень своей формы,
					li #[b зарядиться энергией] в разгар зимы,
					li #[b восстановиться] после стресса и поддержать организм.

				iframeBlock(videoSrc='https://player.vimeo.com/video/374926206', imgSrc='EnBo-video-placeholder.jpg', title='ОЛЯ МАРКЕС РАССКАЗЫВАЕТ О #SEKTA ENERGY BOOST:')

				p #[b Четыре уровня нагрузки] — выберите подходящий, а потом повторите программу на более сложном.
				p #[b Красный] — для тех, кто прокачан в питании, много тренируется и готов к челленджам.
				p #[b Оранжевый] — для тех, кто хочет взять максимум, но не уверен в своих силах.
				p #[b Зеленый] — восстановительный уровень. Для тех, кто не в ресурсе, но хочет начать делать хоть что-то.
				p #[b Синий] — минимум усилий. Без комплексной работы — только тренировки, пока не вернутся силы.

				p #[b Три вида тренировок:]
				ul
					li короткие утренние тренировки с Олей Маркес — для бодрости,
					li антистресс-практики: инь-йога, хатха-йога, кундалини, пилатес, растяжка, флоу-йога — для восстановления,
					li «классика» от #SEKTA — для тех, кто хочет прокачаться по максимуму.

				p #[b Energizing menu:]
				ul
					li готовое меню для увеличения уровня энергии,
					li список рецептов и продуктовая корзина,
					li со всеми необходимыми витаминами и микроэлементами,
					li no sugar, no junk.

				a(href='#' @click.prevent='showSendpulse = true') Меню для новогоднего стола! Получить.

				p #[b А еще:]
				ul
					li групповой чат,
					li работа с паттернами в питании,
					li диджитал детокс,
					li рецепты здоровых блюд для новогоднего стола,
					li периодическое голодание,
					li планирование года на базе концепции #[a(href='https://sektascience.com/2019/03/01/new-normal/' target="_BLANK" rel="noopener noreferrer") New Normal].

	caption-section
	entry-form(v-if='courseInfo', formType="enbo", :formData='{prices: courseInfo.prices, platforms: availablePlatforms, id: courseInfo.id, availableCities: availableCities}', :courseName='courseInfo.name')

	sendpulse(:show='showSendpulse' @close='showSendpulse = false')
</template>

<script>
import { mapActions } from 'vuex'

const COURSE_TAG = 'WINTER_19';

export default {
	name: 'SektaEnergyBoost',
	metaInfo: {
		title: '#SektaEnergyBoost онлайн-курс',
		description: 'Онлайн-курс правильного питания и программы видео тренировок для людей с противопоказаниями. Если болят суставы, большая масса тела, или вы новичок в спорте - #SektaEnergyBoost поможет плавно войти в тренировочный режим и программу правильного питания.'
	},
	components: {
		hero: () => import('@/components/heroes/hero-with_timer.vue'),
		sendpulse: () => import('@/components/unique-blocks/enbo-sendpulse.vue'),
		iframeBlock: () => import('@/components/iframe-block.vue'),
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
			availableCities: ['2'],
			showSendpulse: false,
		}
	},
	computed: {
		availablePlatforms() {
			return Object.keys(this.courseInfo.start_dates).filter(p => this.courseInfo.start_dates[p])
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
	.highlight-block {
		p {
			margin: 10px *;
		}
	}
</style>


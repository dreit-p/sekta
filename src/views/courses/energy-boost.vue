<template lang="pug">
div.course
	hero(image='course_bg-enbo.jpg', title='ENERGY BOOST', :deadlines=['Jan 27 2020 13:00:00'], :deadlineCaptions=['До конца продаж осталось:'])
		.highlight-block
			p Вы можете чувствовать себя сильным, бодрым и подтянутым всю зиму!
			p Сезонный #[b онлайн]-курс #SEKTA
			p Доступен с #[b 9 декабря] по #[b 10 февраля]
			p Длится #[b 2 недели]
			p Доступ открыт #[b с момента оплаты и до 10 февраля]
			p Старт — #[b в любой день]
			p Стоимость: #[b 2900 руб.]

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

				p #[b А еще:]
				ul
					li групповой чат,
					li работа с паттернами в питании,
					li диджитал детокс,
					li рецепты здоровых блюд для новогоднего стола,
					li периодическое голодание,
					li планирование года на базе концепции #[a(href='https://sektascience.com/2019/03/01/new-normal/' target="_BLANK" rel="noopener noreferrer") New Normal].
	sendpulse

	caption-section
	entry-form(v-if='courseInfo', formType="enbo", :formData='{prices: courseInfo.prices, platforms: availablePlatforms, id: courseInfo.id, availableCities: availableCities}', :courseName='courseInfo.name')
	article.main-content
		.article-limit
			.text-typography
				h2.center Нас часто спрашивают

				h5 Надо ли выбирать уровень заранее?
				p Нет. После оплаты вы получите подробную информацию, как пройти курс на любом из уровней, а определитесь уже в процессе. Если вы почувствуете, что выбранный уровень для вас слишком сложный, вы сможете перейти на другой.

				h5 Я смогу пройти курс несколько раз на разных уровнях?
				p Да. Вы можете пройти курс столько раз, сколько успеете с даты оплаты до 10 февраля.

				h5 Можно ли пройти курс сначала на более сложном, а потом на более простом уровне?
				p Да. Вы можете начать с красного уровня, а потом повторить курс на зелёном, чтобы закрепить результат и новые привычки. Или наоборот.

				h5 Курс будет доступен всего две недели?
				p Нет. Курс будет доступен в личном кабинете с момента покупки до 10 февраля. Чем раньше вы купите курс, тем больше времени у вас будет на его прохождение и повторение.

				h5 А будут ли подарки к Новому Году?
				p Да. Мы будем дарить подарки от GlamBox, L'etoile, 4fresh, Zuii, Hello Moda, Лены Дегтярь, Edoque, Дольки, Собиратора, Be Kind и ROXY.
				p А еще прямо сейчас дарим вам меню для новогоднего стола. #[a(href='#' @click.prevent sp-show-form="139063") Получить меню].
				br
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


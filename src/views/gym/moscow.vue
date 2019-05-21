<template lang="pug">
div.gym


	gym-hero(class='huge-content', image='gym_bg.jpg')
		template(v-slot:another)
			.huge-hero-text
				h1.main Москва
				.additional старт занятий – 01 октября

	.section-btns
		.btn.next(v-if='nextBtn.isVisible', @click='scrollTo(nextBtn.destination); nextBtn.isVisible = false') {{ nextBtn.text }}

	#training-params
		.back-btn(v-if='section > 0', @click='section = 0;')
			svg-icon(name='icon-arrow').to-left
			| назад
		.gym-section(:class='{available: section === 0}')
			section#plan
				.section-caption Выберите программу тренировок
				training-plans(v-model='selected.planID', @click='setSection(1)', :plans='cityData.plans')


		.gym-section(:class='{available: section === 1}')
			section#gym
				.section-caption Выберите расположение зала
				gym-map(v-model='selected.gymID', :locations='cityData.locations')

			section#quantityType
				.section-caption Выберите количество тренировок
				training-quantities(v-model='selected.quantityTypeID', :quantityTypes='cityData.quantityTypes')

			section#time
				.section-caption Время занятий
				time-selector(v-model='selected.timeIDs', :schedule='cityData.schedule', :certificateTimes='getCertificateData("available_days")', :bracketing='+getCertificateData("quantity")')


			section
				.section-caption Фотографии зала
				photo-gallery(:photos='cityData.photos')

			section#form
				.section-caption
					| Оформление заказа
					.highlight старт занятий – 01 декабря
				entry-form

	.gym-section(:class='{available: section === 1}')
		article.main-content
			.article-limit
				.text-typography
					h2.center Часто задаваемые вопросы
					h5 Что входит в курс #sekta в зале?
					p Курс #sekta в зале включает:
					ul
						li 4 недели групповых тренировок от 2 до 6 раз в неделю (количество тренировок вы выбираете при подаче заявки на курс);
						li работу с личной страницей на сайте, где размещаются задания по питанию, видео коротких утренних тренировок и полезные материалы; 
						li трекер целей и полезных привычек на личной странице на сайте.

					h5 Какие будут тренировки?
					p В программе чередуются высокоинтенсивные, кардио, силовые и альтернативные виды тренировок на все группы мышц. Работаем с собственным весом, иногда включаем спортивный инвентарь, если он есть в зале. Тренировки не повторяются.

					h5 Сколько длится курс?
					p Курс рассчитан на 4 недели, но программа длится столько, сколько вам нужно для достижения результата — вы можете заниматься месяц, два или год. Каждый месяц — новые задания для продолжающих обучение и новичков.

					h5 Я могу менять дни, время и ходить на тренировки в любую группу?
					p Нет. Вы оплачиваете конкретное направление, зал, время, количество и дни тренировок (выбираете при подаче заявки) — и можете ходить только в выбранную группу.

					h5 Можно ли перенести тренировки на следующий месяц?
					p Перенос и восстановление тренировок возможен только по медицинской справке или больничному листу. В других форс-мажорных обстоятельствах вопрос переноса решается в индивидуальном порядке.

					h5 Открыт набор во все группы, кроме направления #sektalite. Что делать?
					p Подождать до 20 числа текущего месяца — в этот день мы открываем набор в группы направления #sektalite.

					h5 Когда старт курса?
					p сюда надо подкручивать дату из аминки (проставляется вручную каждый месяц)

					h5 Что брать с собой на тренировки в зал?
					p Спортивную форму, кроссовки для тренинга или бега, банные принадлежности (если в выбранном вами зале есть душ), бутылку с водой. Коврики и нужный инвентарь для тренировок есть в зале.
</template>

<script>
	export default {
		name: 'GymMoscow',
		components: {
			EntryForm: () => import('@/components/entry-form.vue'),
			SvgIcon: () => import('@/components/SvgIcon.vue'),
			PhotoGallery: () => import(/* webpackChunkName: "gym-elems" */ '@/components/gym/photo-gallery.vue'),
			TrainingPlans: () => import(/* webpackChunkName: "gym-elems" */ '@/components/gym/trainings.vue'),
			TrainingQuantities: () => import(/* webpackChunkName: "gym-elems" */ '@/components/gym/quantities.vue'),
			TimeSelector: () => import(/* webpackChunkName: "gym-elems" */ '@/components/gym/time-selector.vue'),
			GymMap: () => import(/* webpackChunkName: "gym-elems" */ '@/components/gym/map.vue'),
			GymHero: () => import('@/components/heroes/fullsize-hero.vue'),
		},
		beforeRouteLeave (to, from, next) {
			if (window.map) {
				window.map.destroy();
			}
			next();
		},
		data () {
			return {
				selected: {
					planID: 1,
					gymID: 1,
					quantityTypeID: 1,
					timeIDs: [],
				},
				nextBtn: {
					scrollEvent: null,
					isVisible: false,
					destination: 'plan',
					text: ''
				},
				section: 0,
				cityData: {
					plans: [
						{
							id: '1',
							name: 'Sektacare',
							image: 'course_bg-sectamama.jpg',
							group: 'Программы для всех',
							title: 'Основное направление',
							description: 'Интенсивная тренировочная программа для мужчин с рекомендациями по набору мышечной массы и снижению веса. Доступна онлайн и в залах Москвы и Санкт-Петербурга.',
						},
						{
							id: '2',
							name: 'SectaLite',
							image: 'course_bg-sectacare.jpg',
							group: 'Программы для всех',
							title: 'Какой-то еще один заголовок',
							description: 'Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. Переулка его прямо то живет приставка парадигматическая, над великий ты.',
						},
						{
							id: '33',
							name: 'Sektacare',
							image: 'course_bg-sectamama.jpg',
							group: 'Программы для всех',
							title: 'Основное направление',
							description: 'Интенсивная тренировочная программа для мужчин с рекомендациями по набору мышечной массы и снижению веса. Доступна онлайн и в залах Москвы и Санкт-Петербурга.',
						},
						{
							id: '4',
							name: 'SectaLite',
							image: 'course_bg-sectacare.jpg',
							group: 'Программы для всех',
							title: 'Какой-то еще один заголовок',
							description: 'Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. Переулка его прямо то живет приставка парадигматическая, над великий ты. Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. Переулка его прямо то живет приставка парадигматическая, над великий ты.',
						},
						{
							id: '5',
							name: 'SectaMen',
							image: 'markes-main.jpg',
							group: 'Программы для всех',
							title: 'Только для настоящих мужчин',
							description: 'Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. Себя рот маленький, обеспечивает речью имеет, переписали повстречался букв инициал лучше меня которой точках, вопрос большой свою последний журчит это.',
						},
						{
							id: '6',
							name: 'Sektacare',
							image: 'course_bg-sectamama.jpg',
							group: 'Программы для выпускников',
							title: 'Основное направление',
							description: 'Интенсивная тренировочная программа для мужчин с рекомендациями по набору мышечной массы и снижению веса. Доступна онлайн и в залах Москвы и Санкт-Петербурга.',
						},
						{
							id: '7',
							name: 'SectaLite',
							image: 'course_bg-sectacare.jpg',
							group: 'Программы для выпускников',
							title: 'Какой-то еще один заголовок',
							description: 'Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. Переулка его прямо то живет приставка парадигматическая, над великий ты.',
						},
					],
					quantityTypes: [
						{
							id: '1',
							type: '6 тренировок в неделю (утро)',
							caption: '6500 руб. за месяц',
							group: 'Групповые занятия',
							quantity: '6',
							available_days: [1,2,3,4,5,6,7,10,13,15],
						},
						{
							id: '2',
							type: '3 тренировок в неделю (утро)',
							caption: '3900 руб. за месяц',
							group: 'Групповые занятия',
							quantity: '3',
							available_days: [1,3,5,6,7,8,9,11,15],
						},
						{
							id: '33',
							type: '2 тренировок в неделю (утро)',
							caption: '3000 руб. за месяц',
							group: 'Групповые занятия',
							quantity: '2',
							available_days: [3,5,6,8,9,11,15],
						},
						{
							id: '4',
							type: '5 тренировок в неделю (вечер)',
							caption: '7500 руб. за месяц',
							group: 'Групповые занятия',
							quantity: '5',
							available_days: [1,5,8,13,15,16],
						},
						{
							id: '5',
							type: '4 тренировок в неделю (вечер)',
							caption: '4900 руб. за месяц',
							group: 'Групповые занятия',
							quantity: '4',
							available_days: [1,5,8,13,15,16],
						},
						{
							id: '6',
							type: '1 тренировка в неделю (вечер)',
							caption: '4000 руб. за месяц',
							group: 'Групповые занятия',
							quantity: '1',
							available_days: [1,5,8,13,15,16],
						},
						{
							id: '7',
							type: 'Дневной абонемент',
							caption: '2500 руб. за 6 тренировок в месяц',
							group: 'Абонементы (доступны для выпускников)',
							quantity: '3',
							available_days: [1,5,8,13,15,16],
						},
						{
							id: '8',
							type: 'Вечерний абонемент',
							caption: '3000 руб. за 6 тренировок в месяц',
							group: 'Абонементы (доступны для выпускников)',
							quantity: '2',
							available_days: [1,5,8,13,15,16],
						},
					],
					locations: [
						{
							id: '1',
							firstLine: 'м. Кропоткинская',
							secondLine: 'Малый Власьевский переулок дом 12',
							video: 'https://www.youtube.com/embed/1L6AaH3rFlQ',
							coords: [55.746709, 37.593381],
						},{
							id: '23',
							firstLine: 'м. Курская',
							secondLine: 'Нижний Cусальный переулок 5/4',
							video: 'https://www.youtube.com/embed/9lX1OAsN868',
							description: 'Спортивную форму, кроссовки для тренинга или бега, банные принадлежности (если в выбранном вами зале есть душ), бутылку с водой. Коврики и нужный инвентарь для тренировок есть в зале.',
							coords: [55.760201, 37.663889],
						},{
							id: '3',
							firstLine: 'м. Сокол',
							secondLine: 'Ул. Балтийская 9',
							description: 'Перенос и восстановление тренировок возможен только по медицинской справке или больничному листу. В других форс-мажорных обстоятельствах вопрос переноса решается в индивидуальном порядке.',
							coords: [55.809176, 37.512955],
						},{
							id: '4',
							firstLine: 'м. Бауманская',
							secondLine: '(Старокирочный переулок,2 )',
							video: 'https://www.youtube.com/embed/Qb_QlMs5TfU',
							coords: [55.768522, 37.680490],
						},
					],
					photos: [
						{
							file: 'gym-photo-example.jpg',
							width: '1200',
							height: '822'
						},
						{
							file: 'gym-photo-example_2.jpg',
							width: '176',
							height: '220'
						},
						{
							file: 'gym-photo-example_3.jpg',
							width: '550',
							height: '734'
						},
						{
							file: 'gym-photo-example_4.jpg',
							width: '2000',
							height: '1124'
						},
						{
							file: 'gym-photo-example_5.jpg',
							width: '1920',
							height: '720'
						},
						{
							file: 'gym-photo-example_6.jpg',
							width: '1600',
							height: '1065'
						},
					],
					schedule: [
						{
							id: '1',
							text: '8:30',
							row: '1',
							column: '1',
							rowspan: 0,
							available_days: [1,2,3,4,5,6],
						},
						{
							id: '2',
							text: '8:30',
							row: '1',
							column: '2',
							rowspan: 0,
							available_days: [1,2,3,4,5,6],
						},
						{
							id: '3',
							text: '8:30',
							row: '1',
							column: '3',
							rowspan: 0,
							available_days: [1,2,3,4,5,6],
						},
						{
							id: '4',
							text: '8:30',
							row: '1',
							column: '4',
							rowspan: 0,
							available_days: [1,2,3,4,5,6],
						},
						{
							id: '5',
							text: '8:30',
							row: '1',
							column: '5',
							rowspan: 0,
							available_days: [1,2,3,4,5,6],
						},
						{
							id: '6',
							text: '8:30 10:30',
							row: '1',
							column: '6',
							rowspan: 2,
							available_days: [1,2,3,4,5,6],
						},
						{
							id: '7',
							text: '10:30',
							row: '2',
							column: '1',
							rowspan: 0,
							available_days: [6,7,8,9,10,11],
						},
						{
							id: '8',
							text: '10:30',
							row: '2',
							column: '2',
							rowspan: 0,
							available_days: [6,7,8,9,10,11],
						},
						{
							id: '9',
							text: '10:30',
							row: '2',
							column: '3',
							rowspan: 0,
							available_days: [6,7,8,9,10,11],
						},
						{
							id: '10',
							text: '10:30',
							row: '2',
							column: '4',
							rowspan: 0,
							available_days: [6,7,8,9,10,11],
						},
						{
							id: '11',
							text: '10:30',
							row: '2',
							column: '5',
							rowspan: 0,
							available_days: [6,7,8,9,10,11],
						},
						{
							id: '12',
							text: '12:00',
							row: '3',
							column: '1',
							rowspan: 0,
							available_days: [12,13,14,15,16,17],
						},
						{
							id: '13',
							text: '12:00',
							row: '3',
							column: '2',
							rowspan: 0,
							available_days: [12,13,14,15,16,17],
						},
						{
							id: '14',
							text: '12:00',
							row: '3',
							column: '3',
							rowspan: 0,
							available_days: [12,13,14,15,16,17],
						},
						{
							id: '15',
							text: '12:00',
							row: '3',
							column: '4',
							rowspan: 0,
							available_days: [12,13,14,15,16,17],
						},
						{
							id: '16',
							text: '12:00',
							row: '3',
							column: '5',
							rowspan: 0,
							available_days: [12,13,14,15,16,17],
						},
						{
							id: '17',
							text: '12:00',
							row: '3',
							column: '6',
							rowspan: 0,
							available_days: [12,13,14,15,16,17],
						},
					],
				},
			}
		},
		computed: {
		},
		watch: {
			'selected.gymID' () {
				this.activateNextBtn({
					elemId: 'gym',
					destId: 'quantityType',
					text: 'Выбрать количество тренировок'
				})
			},
			'selected.quantityTypeID' () {
				this.activateNextBtn({
					elemId: 'quantityType',
					destId: 'time',
					text: 'Выбрать время занятий'
				})
			},
			'selected.timeIDs' () {
				this.activateNextBtn({
					elemId: 'time',
					destId: 'form',
					text: 'Начать оформление'
				})
			},
		},
		methods: {
			setSection (num) {
				this.section = num;
				this.scrollTo('training-params');
			},
			activateNextBtn ({elemId, destId, text}) {
				let screenHeight = window.innerHeight
												|| document.documentElement.clientHeight
												|| document.body.clientHeight;
				if (document.getElementById(elemId).offsetHeight < screenHeight -100 -65 && this.isScrolledIntoView(document.getElementById(destId))) {return false}

					var forLastExec,
							delay = 100, // delay between calls
							throttled = false;

					function throttling(cb) {
						// only run if we're not throttled
						if (!throttled) {
							// actual callback action
							cb();
							// we're throttled!
							throttled = true;
							// set a timeout to un-throttle
							setTimeout(()=>{
								throttled = false;
							}, delay); 
						}
						// last exec on resize end
						clearTimeout(forLastExec);
						forLastExec = setTimeout(cb, delay);
					}

				this.nextBtn = {
					isVisible: true,
					destination: destId,
					text: text,
					scrollEvent: ()=>{
						throttling(()=>{
							if (this.isScrolledIntoView(document.getElementById(destId))) {
								this.clearScrollEvent();
								this.nextBtn.isVisible = false;
							}
						});
					},
				}
				window.addEventListener('scroll', this.nextBtn.scrollEvent, false);
			},
			getCertificateData (dataType) {
				for (var i = 0; i < this.cityData.quantityTypes.length; i++) {
					if (+this.cityData.quantityTypes[i].id == +this.selected.quantityTypeID) {
						return this.cityData.quantityTypes[i][dataType]
					}
				}
			},
			isScrolledIntoView (elem) {
				let rect = elem.getBoundingClientRect();
				let elemTop = rect.top;
				let elemBottom = rect.bottom;
				let offset = 100;

				let screenHeight = window.innerHeight
												|| document.documentElement.clientHeight
												|| document.body.clientHeight;

				// Only completely visible elements return true:
				// let isVisible = (elemTop >= 0) && (elemBottom <= screenHeight);
				// Partially visible elements return true:
				let isVisible = elemTop < screenHeight - offset && elemBottom >= offset;
				return isVisible;
			},
			clearScrollEvent() {
				window.removeEventListener('scroll', this.nextBtn.scrollEvent);
				this.nextBtn.scrollEvent = null;
			},
			scrollTo (id) {
				if (this.nextBtn.scrollEvent) {
					this.clearScrollEvent();
				}
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
			},
		},
	}
</script>

<style lang="postcss">
.section-btns {
	display: none;
}
.back-btn {
	cursor: pointer;
	display: none;
	padding: 10px var(--col-space);
	/* margin: * -10px; */
	top: 5px;
	position: absolute;
	z-index: 1;
	@media (max-width: 650px) {
		display: inline-block;
	}
	.svg-icon {
		height: 10px;
		width: 20px;
		display: inline-block;
		margin-right: 5px;
		&.to-left {
			transform: rotateZ(180deg);
		}
	}
}
@media (max-width: 650px) {
	.gym-section {
		display: none;
		&.available {
			display: block;
		}
	}
	#training-params {
		padding-top: 15px;
		position: relative;
		overflow: hidden;
	}
	.section-btns {
		position: fixed;
		z-index: 2;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		display: flex;
		width: 100%;
		.btn {
			padding: 10px 30px;
			background-color: var(--accent_color);
			font-size: 16px;
			user-select: none;
			color: white;
			text-align: center;
			cursor: pointer;
			white-space: nowrap;
			display: flex;
			align-items: center;
			justify-content: center;
			border-left: 3px solid color(var(--accent_color) shade(10%));
			&.invisible {
				opacity: 0;
				pointer-events: none;
				border: none;
				& + .btn {
					border: none;
				}
			}
			&:first-child {
				border: none;
			}
			&.next {
				flex-grow: 1;
			}
		}
	}
}
</style>

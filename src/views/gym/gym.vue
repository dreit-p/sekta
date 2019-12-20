<template lang="pug">
div.gym
	gym-hero(class='huge-content', :image='`gym_${city.code}.jpg`')
		template(v-slot:another v-if="courseDate")
			.huge-hero-text
				h1.main {{city.name}}
				//- .additional старт занятий – {{courseDate}}
				.additional старт курса – 6 января
				p Тренировки в зале начнутся 13 января
					br
					| еще можно присоединиться

	.section-btns
		.btn.next(v-if='nextBtn.isVisible', @click='scrollTo(nextBtn.destination); nextBtn.isVisible = false') {{ nextBtn.text }}

	#training-params
		.back-btn(v-if='section > 0', @click='setSection(0); nextBtn.isVisible = false')
			svg-icon(name='icon-arrow').to-left
			| назад
		.gym-section(:class='{available: section === 0}')
			section#plan
				template(v-if='courses')
					.section-caption Выберите программу тренировок
					courses(v-model='selected.courseID', @click='setSection(1)', :courses='courses')


		.gym-section(:class='{available: section === 1}')
			section#gym
				template(v-if='gyms')
					.section-caption Выберите расположение зала
					gym-map(v-model='selected.gymID', @click='activateNextBtn({ elemId: "gym", destId: "quantityType", text: "Выбрать количество тренировок" })', :gyms='gyms')

			section#quantityType
				template(v-if='selected.gymID && selected.courseID && visits.length > 0')
					.section-caption Выберите количество тренировок
					practices(v-model='selected.visit', @click='activateNextBtn({ elemId: "quantityType", destId: "time", text: "Выбрать время занятий" })', :visits='visits')

			section#time
				template(v-if='selected.visit')
					.section-caption Время занятий
					schedule(v-model='selected.practiceID', @click='activateNextBtn({ elemId: "time", destId: "form", text: "Начать оформление" })', :practices='selected.visit.practices')


			section(v-if='!!currentGym && currentGym.gallery.length')
				.section-caption Фотографии зала
				photo-gallery(:photos='currentGym.gallery')

			section#form
				.section-caption(v-if="courseDate")
					| Оформление заказа
					.highlight старт занятий – {{this.courseDate}}
				entry-form(formType='face-to-face', v-if='formData', :formData='formData')

	.gym-section(:class='{available: section === 1}')
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

					template(v-if='city.id == 1')
						h5 Где находятся ваши залы в Москве?
						ul
							li #[a(href='https://yandex.ru/maps/-/CGHFNUZ7' target="_BLANK" rel="noopener noreferrer") Малый Власьевский пер., 12 (м. Кропоткинская)]. Проводятся тренировки #SektaBasic
							li #[a(href='https://yandex.ru/maps/-/CGHFNB0T' target="_BLANK" rel="noopener noreferrer") Нижний сусальный пер., 5/4 (м. Курская)] — АРМА. Проводятся тренировки #SektaBasic, #SektaLite и #SektaMen
							li #[a(href='https://yandex.ru/maps/-/CGHFNN4q' target="_BLANK" rel="noopener noreferrer") ул. Балтийская, дом 9 (м. Сокол)]. Проводятся тренировки #SektaBasic.

					template(v-if='city.id == 2')
						h5 Где находятся ваши залы в Санкт-Петербурге?
						ul
							li #[a(href='https://yandex.ru/maps/-/CGHFJCJm' target="_BLANK" rel="noopener noreferrer") ул. Итальянская, 5, 3 этаж (м. Невский проспект)]. Проводятся тренировки #SektaBasic и #SektaLite
							li #[a(href='https://yandex.ru/maps/-/CGHFJV6E' target="_BLANK" rel="noopener noreferrer") ул.Большая Разночинная, 24, 2 этаж (м.Чкаловская)]. Проводятся тренировки #SektaBasic
							li #[a(href='https://yandex.ru/maps/-/CGHFJFKF' target="_BLANK" rel="noopener noreferrer") ул. Курская, 28/32 (м. Обводный канал)]. Проводятся тренировки #SektaMen

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
import Vue from "vue";
import { formatDateDayMonth } from "../../assets/misc.js";

export default {
	name: "GymTemplate",
	metaInfo() {
		let cityId = this.city.id
		return {
			title: {
				1: 'Москва курс #sekta',
				2: 'Санкт-петербург курс #sekta'
			}[cityId],
			description: {
				1: 'Покупая абонемент в #sekta на месяц, вы получаете не просто групповые тренировки в залах, а полноценную комплексную программу, направленную на ваш лучший результат. Здоврое питание, новые тренировочные задания каждый месяц, уход за кожей и поддержка и помощь куратороской команды каждый день.',
				2: 'Покупая абонемент в #sekta на месяц, вы получаете не просто групповые тренировки в залах, а полноценную комплексную программу, направленную на ваш лучший результат. Здоврое питание, новые тренировочные задания каждый месяц, уход за кожей и поддержка и помощь куратороской команды каждый день.'
			}[cityId]
		}
	},
	components: {
		EntryForm: () => import("@/components/entry-form.vue"),
		SvgIcon: () => import("@/components/SvgIcon.vue"),
		PhotoGallery: () =>
			import(/* webpackChunkName: "gym-elems" */ "@/components/gym/photo-gallery.vue"),
		Courses: () =>
			import(/* webpackChunkName: "gym-elems" */ "@/components/gym/courses.vue"),
		Practices: () =>
			import(/* webpackChunkName: "gym-elems" */ "@/components/gym/practices.vue"),
		Schedule: () =>
			import(/* webpackChunkName: "gym-elems" */ "@/components/gym/schedule.vue"),
		GymMap: () =>
			import(/* webpackChunkName: "gym-elems" */ "@/components/gym/map.vue"),
		GymHero: () => import("@/components/heroes/fullsize-hero.vue")
	},
	beforeRouteLeave(to, from, next) {
		if (window.map) {
			window.map.destroy();
		}
		next();
	},
	data() {
		return {
			selected: {
				courseID: null,
				gymID: null,
				visit: null,
				practiceID: null
			},
			nextBtn: {
				scrollEvent: null,
				isVisible: false,
				destination: "plan",
				text: ""
			},
			section: 0
		};
	},
	asyncComputed: {
		gyms() {
			let data = {
				cityId: this.city.id,
				courseID: this.selected.courseID
			};
			return this.$store.dispatch("gyms/reqGyms", data).then(()=>{
				let gyms = this.$store.state.gyms.gyms;
				if (gyms.length > 0) {
					this.selected.gymID = gyms[0].id;
					return gyms;
				}
			});
		},
		courses() {
			return this.$store
				.dispatch("gyms/reqCourses", this.city.id)
				.then(() => {
					return this.$store.state.gyms.courses;
				});
		},
		currentGym() {
			if (!this.gyms) {return false}
			return this.gyms.find(gym => gym.id === this.selected.gymID);
		},
		visits() {
			return this.$store
				.dispatch("gyms/reqPractices", {
					gymID: this.selected.gymID,
					courseID: this.selected.courseID
				})
				.then(() => {
					return this.$store.state.gyms.practices;
				});
		}
	},
	computed: {
		courseInfo() {
			if (!this.courses) return;
			let course = this.courses.find(
				course => course.id === this.selected.courseID
			);
			return course;
		},
		city_options() {
			return this.$store.state.cities;
		},
		city() {
			let name = this.$route.params.city;
			return this.city_options.find(city=>city.englishName === name);
		},
		courseDate() {
			if (!this.courseInfo) return;
			return formatDateDayMonth(this.courseInfo.common_start_date);
		},
		locationInfo() {
			if (!this.gyms) return;
			let gym = this.gyms.find(gym => gym.id === this.selected.gymID);
			return gym;
		},
		practiceInfo() {
			if (!this.selected.visit) return;
			let practice = this.selected.visit.practices.find(
				practice => practice.id === this.selected.practiceID
			);
			return practice;
		},
		formData() {
			if (!this.courseInfo || !this.locationInfo || !this.practiceInfo) {
				return false;
			}
			return {
				course: this.courseInfo,
				location: this.locationInfo,
				practice: this.practiceInfo,
				city: this.city
			};
		}
	},
	watch: {
		// 'selected.gymID' () {
		// 	this.selected.visit = null;
		// 	this.activateNextBtn({
		// 		elemId: 'gym',
		// 		destId: 'quantityType',
		// 		text: 'Выбрать количество тренировок'
		// 	})
		// },
		// 'selected.visit' () {
		// 	this.selected.practiceID = null;
		// 	this.activateNextBtn({
		// 		elemId: 'quantityType',
		// 		destId: 'time',
		// 		text: 'Выбрать время занятий'
		// 	})
		// },
		// 'selected.practiceID' () {
		// 	this.activateNextBtn({
		// 		elemId: 'time',
		// 		destId: 'form',
		// 		text: 'Начать оформление'
		// 	})
		// },
	},
	methods: {
		setSection(num) {
			this.section = num;
			if (window.innerWidth <= 650) {
				this.scrollTo("training-params");
			}
		},
		activateNextBtn({ elemId, destId, text }) {
			let screenHeight =
				window.innerHeight ||
				document.documentElement.clientHeight ||
				document.body.clientHeight;
			if (
				document.getElementById(elemId).offsetHeight <
					screenHeight - 100 - 65 &&
				this.isScrolledIntoView(document.getElementById(destId))
			) {
				return false;
			}

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
					setTimeout(() => {
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
				scrollEvent: () => {
					throttling(() => {
						if (
							this.isScrolledIntoView(
								document.getElementById(destId)
							)
						) {
							this.clearScrollEvent();
							this.nextBtn.isVisible = false;
						}
					});
				}
			};
			window.addEventListener("scroll", this.nextBtn.scrollEvent, false);
		},
		getCertificateData(dataType) {
			for (var i = 0; i < this.cityData.practices.length; i++) {
				if (
					+this.cityData.practices[i].id == +this.selected.practiceID
				) {
					return this.cityData.practices[i][dataType];
				}
			}
		},
		isScrolledIntoView(elem) {
			let rect = elem.getBoundingClientRect();
			let elemTop = rect.top;
			let elemBottom = rect.bottom;
			let offset = 100;

			let screenHeight =
				window.innerHeight ||
				document.documentElement.clientHeight ||
				document.body.clientHeight;

			// Only completely visible elements return true:
			// let isVisible = (elemTop >= 0) && (elemBottom <= screenHeight);
			// Partially visible elements return true:
			let isVisible =
				elemTop < screenHeight - offset && elemBottom >= offset;
			return isVisible;
		},
		clearScrollEvent() {
			window.removeEventListener("scroll", this.nextBtn.scrollEvent);
			this.nextBtn.scrollEvent = null;
		},
		scrollTo(id) {
			if (this.nextBtn.scrollEvent) {
				this.clearScrollEvent();
			}
			window.scrollTo({
				top: getPosition(document.getElementById(id)).y - 65,
				behavior: "smooth"
			});
			function getPosition(el) {
				var x = 0,
					y = 0;

				while (
					el != null &&
					(el.tagName || "").toLowerCase() != "html"
				) {
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
	.gym {
		-webkit-overflow-scrolling: touch;
	}
	.section-btns {
		position: fixed;
		-webkit-transform: translateZ(0);
		-webkit-overflow-scrolling: touch;
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

<template lang="pug">
div.gym
	vue-headful(
            title="Москва курс #sekta"
            description="Покупая абонемент в #sekta на месяц, вы получаете не просто групповые тренировки в залах, а полноценную комплексную программу, направленную на ваш лучший результат. Здоврое питание, новые тренировочные задания каждый месяц, уход за кожей и поддержка и помощь куратороской команды каждый день."
    )
	gym-hero(class='huge-content', :image='`gym_${getCity.code}.jpg`')
		template(v-slot:another v-if="courseDate")
			.huge-hero-text
				h1.main {{getCity.name}}
				.additional старт занятий – {{courseDate}}

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


			//- section
			//- 	.section-caption Фотографии зала
			//- 	photo-gallery(:photos='cityData.photos')

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
					p {{this.courseDate}}

					h5 Что брать с собой на тренировки в зал?
					p Спортивную форму, кроссовки для тренинга или бега, банные принадлежности (если в выбранном вами зале есть душ), бутылку с водой. Коврики и нужный инвентарь для тренировок есть в зале.
</template>

<script>
import Vue from "vue";
import vueHeadful from "vue-headful";

import { formatDateDayMonth } from "../../assets/misc.js";

Vue.component("vue-headful", vueHeadful);

export default {
	name: "GymMoscow",
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
			cityId: 1,
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
			section: 0,
			cityData: {
				photos: [
					{
						file: "gym-photo-example.jpg",
						width: "1200",
						height: "822"
					},
					{
						file: "gym-photo-example_2.jpg",
						width: "176",
						height: "220"
					},
					{
						file: "gym-photo-example_3.jpg",
						width: "550",
						height: "734"
					},
					{
						file: "gym-photo-example_4.jpg",
						width: "2000",
						height: "1124"
					},
					{
						file: "gym-photo-example_5.jpg",
						width: "1920",
						height: "720"
					},
					{
						file: "gym-photo-example_6.jpg",
						width: "1600",
						height: "1065"
					}
				]
			}
		};
	},
	asyncComputed: {
		gyms() {
			let data = {
				cityId: this.getCity.id,
				courseID: this.selected.courseID
			};
			return this.$store.dispatch("gyms/reqGyms", data).then(res => {
				if (res.data.data.length > 0) {
					this.selected.gymID = res.data.data[0].id;
					return res.data.data;
				}
			});
		},
		courses() {
			return this.$store
				.dispatch("gyms/reqCourses", this.getCity.id)
				.then(() => {
					return this.$store.state.gyms.courses;
				});
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
		getCity() {
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
				practice: this.practiceInfo
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

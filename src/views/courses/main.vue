<template lang="pug">
	article.courses-list
		section.course
			.background
				.img(:style="{ backgroundImage: `url(' ${require('@/assets/images/course_wide_bg-s60days.jpg')} ')`}")
				.mobile-img(:style="{ backgroundImage: `url(' ${require('@/assets/images/course_mobile_bg-s60days.jpg')} ')`}")
			.content-wrapper
				.content
					.title Основной онлайн-курс #s60days:
					ul
						li Тренировки, которые хочется выполнять.
						li Здоровое питание без голода и срывов.
						li 60 дней до результата.
					.buttons
						router-link(title='онлайн-курс #s60days для женщин', to='/online-courses/s60days')
							green-btn Для женщин
						router-link(title='онлайн-курс #s60days для мужчин', to='/online-courses/s60days-men')
							green-btn Для мужчин
		section.course
			.background
				.img(:style="{ backgroundImage: `url(' ${require('@/assets/images/course_wide_bg-s60lite.jpg')} ')`}")
				.mobile-img(:style="{ backgroundImage: `url(' ${require('@/assets/images/course_mobile_bg-s60lite.jpg')} ')`}")
			.content-wrapper
				.content
					.title КУРС #SEKTACARE:
					p Тренировки и питание для:
					ul
						li новичков в тренинге 
						li людей с противопоказаниями к интенсивным нагрузкам 
						li людей старшего возраста
						li людей с размером одежды 50+ 
					.buttons
						router-link(title='КУРС #SEKTACARE', to='/online-courses/sektacare')
							green-btn Подробности
		section.course
			.background
				.img(:style="{ backgroundImage: `url(' ${require('@/assets/images/course_wide_bg-sectamama.jpg')} ')`}")
				.mobile-img(:style="{ backgroundImage: `url(' ${require('@/assets/images/course_mobile_bg-sectamama.jpg')} ')`}")
			.content-wrapper
				.content
					.title Школа идеального тела для мам
					p Поможет:
					ul
						li похудеть после родов,
						li постепенно ввести безопасную физическую нагрузку,
						li научиться питаться здорово и разнообразно во время ГВ,
						li сделать рацион своей семьи более сбалансированным и питательным.
					.buttons
						router-link(title='#sektamama', to='/online-courses/sektamama')
							green-btn Подробности
		section.course
			.background
				.img(:style="{ backgroundImage: `url(' ${require('@/assets/images/course_wide_bg-pregnant.jpg')} ')`}")
				.mobile-img(:style="{ backgroundImage: `url(' ${require('@/assets/images/course_mobile_bg-pregnant.jpg')} ')`}")
			.content-wrapper
				.content.fix-to-top
					.title Школа идеального тела для беременных
					p СО ВТОРОГО ТРИМЕСТРА
					p Поможет:
					ul
						li сохранить форму,
						li укрепить организм,
						li обеспечить здоровое протекание беременности.
					.buttons
						router-link(title='#sektamama', to='/online-courses/pregnant')
							green-btn Подробности
		section.course
			.background
				.img(:style="{ backgroundImage: `url(' ${require('@/assets/images/course_wide_bg-vip.jpg')} ')`}")
				.mobile-img(:style="{ backgroundImage: `url(' ${require('@/assets/images/course_mobile_bg-vip.jpg')} ')`}")
			.content-wrapper
				.content
					.title VIP программа с личным тренером
					p Для всех, кому нужен индивидуальный коучинг и программа, составленная специально для вас.
					.buttons
						router-link(title='vip программа sektavip', to='/online-courses/sektavip')
							green-btn Подробности
</template>

<script>
	import { mapActions } from 'vuex'

	export default {
		name: 'Courses',
		components: {
			// CourseSection: () => courseSection,
			GreenBtn: () => import('@/components/form/green-btn.vue'),
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
	article.courses-list {
		.course {
			height: 42vw;
			min-height: 520px;
			position: relative;
			overflow: hidden;
			@media (max-width: 600px) {
				.background:after {
					content: "";
					display: block;
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					margin: auto;
					background-image: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.6) 25%, rgba(0,0,0,.3) 50%, rgba(0,0,0,.2) 100%);
					opacity: .8;
					z-index: 1;
				}
				.content-wrapper {
					width: 100%;
					color: white;
					/* text-shadow: 0 0 50px rgba(125,125,125,.8); */
					justify-content: flex-start !important;
					align-items: flex-end;
				}
			}
		}
		.background {
			height: 100%;
			width: 100%;
			transition: background-position .1s, width .1s;
			background-position: center center;
			background-repeat: no-repeat;
			position: absolute;
			top: 0;
			right: 0;
			.img,
			.mobile-img {
				position: absolute;
				height: 100%;
				width: 100%;
				background-position: 25% center;
				background-size: cover;
			}
			.mobile-img {
				background-position: center;
				background-size: cover;
				display: none;
			}
			@media (max-width: 600px) {
				.mobile-img {
					display: block;
				}
				.img {
					display: none;
				}
			}
		}
		.content-wrapper {
			z-index: 1;
			position: relative;
			height: 100%;
			min-width: 50%;
			width: auto;
			float: right;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			/* text-shadow: 0 0 50px rgba(255,255,255,.8); */
		}
		.course:nth-of-type(even) {
			.background .img {
				background-position: 75% center;
			}
			.content-wrapper {
				float: left;
				justify-content: flex-end;
				.content {
				}
			}
		}
		.content {
			padding: 20px var(--col-space);
			max-width: calc(var(--col-total)*6 /2);
			@media (min-width: 601px) {
				&.fix-to-top {
					align-self: flex-start;
				}
			}
			.title {
				font-weight: 900;
				font-family: var(--font-second);
				text-transform: uppercase;
				font-size: 30px;
				line-height: 1.2;
				margin: 30px *;
				@media (max-width: 600px) {
					font-size: 26px;
				margin: 10px *;
				}
			}
			ul {
				padding: * 1em;
				margin: 10px *;
				li {
					margin: 10px *;
					font-size: 15px;
					font-weight: bold;
					line-height: 1.33;
					@media (max-width: 600px) {
						font-size: 11px;
						margin: 6px *;
					}
				}
			}
			p {
				margin: 10px *;
				font-size: 15px;
				font-weight: bold;
				line-height: 1.33;
				@media (max-width: 600px) {
					font-size: 11px;
					margin: 6px *;
				}
			}
			.buttons {
				margin: 30px -5px;
				@media (max-width: 600px) {
					margin: 10px *;
				}
			}
			.green-btn {
				min-width: 0;
				width: auto;
				margin: 5px;
				border-radius: 4px;
			}
		}
	}
</style>

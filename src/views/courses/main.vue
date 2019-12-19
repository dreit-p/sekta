<template lang="pug">
	article.courses-list.inverted-order
		section.course
			.background
				.img(:style="{ backgroundImage: `url(' ${require('@/assets/images/course_wide_bg-enbo.jpg')} ')`}")
				.mobile-img(:style="{ backgroundImage: `url(' ${require('@/assets/images/course_mobile_bg-enbo.jpg')} ')`}")
			.content-wrapper
				.content
					.title Сезонный курс
						br
						| #SEKTA ENERGY BOOST
					p Зимний интенсив никогда не повторяется!
					ul
						li 4 уровня сложности — вам доступны все,
						li готовое меню со&nbsp;списком продуктов,
						li аналитические задания,
						li общий чат в&nbsp;телеграме,
						li рецепты здоровых новогодних блюд.
					.buttons
						router-link(title='ОСНОВНОЙ ОНЛАЙН-КУРС #SEKTAEVO', :to='{ name: "energyboost" }')
							green-btn Подробности
			.scroll-appeal
				| листай вниз
				.arrows
		section.course
			.background
				.img(:style="{ backgroundImage: `url(' ${require('@/assets/images/evo_desk.jpg')} ')`}")
				.mobile-img(:style="{ backgroundImage: `url(' ${require('@/assets/images/evo_mobile.jpg')} ')`}")
			.content-wrapper
				.content
					.title ОСНОВНОЙ ОНЛАЙН-КУРС #SEKTAEVO:
					ul
						li Подходит и мужчинам и женщинам
						li 4 типа питания на выбор
						li Тренировочный план, который легко встроится в&nbsp;вашу жизнь
					.buttons
						router-link(title='ОСНОВНОЙ ОНЛАЙН-КУРС #SEKTAEVO', :to='{ name: "sektaevo" }')
							green-btn Подробности
		section.course
			.background
				.img(:style="{ backgroundImage: `url(' ${require('@/assets/images/course_wide_bg-s60lite.jpg')} ')`}")
				.mobile-img(:style="{ backgroundImage: `url(' ${require('@/assets/images/course_mobile_bg-s60lite.jpg')} ')`}")
			.content-wrapper
				.content
					.title КУРС #SEKTACARE
					p Программа для тех, кому нужен плавный старт
					ul
						li нагрузка, направленная на жиросжигание, развитие выносливости, силы, гибкости
						li поэтапная работа с&nbsp;привычками
						li опытный наставник, который адаптирует программу под ваши индивидуальные особенности
					.buttons
						router-link(title='КУРС #SEKTACARE', :to='{ name: "sektacare" }')
							green-btn Подробности
		section.course
			.background
				.img(:style="{ backgroundImage: `url(' ${require('@/assets/images/course_wide_bg-sectamama.jpg')} ')`}")
				.mobile-img(:style="{ backgroundImage: `url(' ${require('@/assets/images/course_mobile_bg-sectamama.jpg')} ')`}")
			.content-wrapper
				.content
					.title ШКОЛА ИДЕАЛЬНОГО ТЕЛА ДЛЯ МАМ
					p Курс поможет:
					ul
						li похудеть после родов
						li постепенно ввести безопасную физическую нагрузку
						li научиться питаться здорово и&nbsp;разнообразно во время ГВ
						li сделать рацион своей семьи более сбалансированным и питательным
					.buttons
						router-link(title='#sektamama', :to='{ name: "sektamama" }')
							green-btn Подробности
		section.course
			.background
				.img(:style="{ backgroundImage: `url(' ${require('@/assets/images/course_wide_bg-pregnant.jpg')} ')`}")
				.mobile-img(:style="{ backgroundImage: `url(' ${require('@/assets/images/course_mobile_bg-pregnant.jpg')} ')`}")
			.content-wrapper
				.content.fix-to-top
					.title ШКОЛА ИДЕАЛЬНОГО ТЕЛА ДЛЯ БЕРЕМЕННЫХ
					p СО ВТОРОГО ТРИМЕСТРА
					p Курс поможет:
					ul
						li сохранить форму
						li укрепить организм
						li обеспечить здоровое протекание беременности
					.buttons
						router-link(title='#sektamama', :to='{ name: "pregnant" }')
							green-btn Подробности
		section.course
			.background
				.img(:style="{ backgroundImage: `url(' ${require('@/assets/images/course_wide_bg-vip.jpg')} ')`}")
				.mobile-img(:style="{ backgroundImage: `url(' ${require('@/assets/images/course_mobile_bg-vip.jpg')} ')`}")
			.content-wrapper
				.content
					.title VIP-ПРОГРАММА С ЛИЧНЫМ ТРЕНЕРОМ
					p Для всех, кому нужен идеальный коучинг и&nbsp;программа, составленная специально для вас.
					.buttons
						router-link(title='vip программа sektavip', :to='{ name: "sektavip" }')
							green-btn Подробности
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'Courses',
	metaInfo: {
		title: 'Онлайн-курсы #sekta',
		description: 'Онлайн-курсы правильного питания и программы видео тренировок у вас дома.'
	},
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
	&.inverted-order {
		.course:nth-of-type(odd) {
			.background .img {
				background-position: 75% center;
			}
			.content-wrapper {
				float: left;
				justify-content: flex-end;
			}
		}
		.course:nth-of-type(even) {
			.background .img {
				background-position: 25% center;
			}
			.content-wrapper {
				float: right;
				justify-content: flex-start;
			}
		}
	}
	.content {
		padding: 20px var(--col-space);
		max-width: calc((var(--col-width) + var(--col-space))*6 /2);
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
	.scroll-appeal {
		position: absolute;
		pointer-events: none;
		user-select: none;
		z-index: 1;
		bottom: 30px;
		left: 0;
		right: 0;
		animation: pulse 3s 2s linear alternate infinite;
		font-family: var(--font-second);
		font-size: 12px;
		font-weight: 500;
		line-height: 15px;
		margin-bottom: 10px;
		text-transform: uppercase;
		text-align: center;
		opacity: .5;
		@media (max-width: 600px) {
			bottom: 20px;
			color: white;
			left: auto;
			right: 20%;
		}
		@media (max-width: 650px) {
			display: block;
		}
		.arrows {
			margin: 0 auto;
			position: relative;
			width: 15px;
			height: 22px;
			transform: scale(.6);
			&:before,
			&:after {
				display: block;
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				margin: auto;
				width: 10px;
				height: 10px;
				transform: rotate(45deg);
				border-right: 2px solid currentColor;
				border-bottom: 2px solid currentColor;
				animation: arrow-fading 1s infinite;
				animation-delay: .1s;
				animation-direction: alternate;
			}
			&:after {
				width: 12px;
				height: 12px;
				top: auto;
				bottom: 0;
				animation-delay: .2s;
			}
		}
	}
}


@keyframes pulse {
	to {
		opacity: 1;
	}
}

@keyframes arrow-fading {
	from {opacity: 0;}
	to {opacity: 1;}
}
</style>

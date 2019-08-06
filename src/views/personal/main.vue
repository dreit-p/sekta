<template lang="pug">
	article.main-body
		.limit
			section.first-row
				.confirm-mail(v-if="!isMailSent") Адрес электронной почты не подтвержден.&nbsp;
					a(href="#" @click.prevent="sendMailConfirm").green Подтвердить сейчас
				.confirm-mail(v-else) Письмо отправлено на вашу почту
			section.column
				template(v-if="onlineCourses.length > 0")
					h2.section-title.first Активные онлайн курсы
					active-course(
						v-for="course in onlineCourses"
						:courseName="course.course_name"
						:payStatus="course.pay_status"
						:group="course.group"
						:url="course.approve_payment_url"
						additionalInfo='#SektaBootCamp2 – это тренировочный интенсив, который настроен под тебя и твои цели.'
						@goToCourse="goToCourse"
						@pay="redirect(course.approve_payment_url)"
					)
				template(v-if="gymCourses.length > 0")
					h2.section-title Активные очные курсы
					active-course(
						v-for="course in gymCourses"
						:courseName="course.course_name"
						:payStatus="course.pay_status"
						:group="course.group"
						additionalInfo='#SektaBootCamp – это тренировочный интенсив, который настроен под тебя и твои цели.'
						@goToCourse="goToCourse"
						@pay="redirect(course.approve_payment_url)"
					)
				h2.section-title Сертфикаты
				.tile.goods
					.goods__image
					.text СЕРТИФИКАТ НА СУММУ 10 900руб.
				template(v-if="products.length > 0")
					h2.section-title Товары
					.tile.goods(v-for="course in products")
						.goods__image(:class="`goods__image_${course.product_name === 'Блокнот' ? 'bullet' : 'merch'}`")
						.text-block
							.text.title {{course.product_name}}
							.sub-text Количество: 1

				h2.section-title Рекомендуем
				.tile.simple
					.main-content
						.img-side
							svg-icon(name='logo-sekta')
						.text-side
							.title #s60lite
							.description
								| Мы создали специальную программу для тех, кто не хочет прыгать с места в карьер. Вас ждет разнообразная нагрузка, направленная на жиросжигание, развитие выносливости, силы, гибкости  — такие тренировки помогут улучшить метаболизм, а куратор подберет идеальный режим питания.
							.btns
								a.btn Демо
			section.column.sidebar
				h2.section-title.first Статистика
				.tile
					.content
						h2.title.green Курсы
						hr
						.text Завершенных курсов:&nbsp;
							span.green 2
						hr
						.text Активных курсов:&nbsp;
							span.green 3
						hr
						h2.title.green Прогресс
						hr
						.text.heavy #sekta bootcamp3&nbsp;
							span.green 0%
						hr
						.text.heavy #sekta bootcamp3 vol.2&nbsp;
							span.green 84%
						hr
						.text.heavy oldschool&nbsp;
							span.green 0%
						hr

</template>

<script>
import api from '@/assets/api/index.js'

export default {
	name: 'MainPersonal',
	components: {
		SvgIcon: () => import('@/components/SvgIcon.vue'),
		ActiveCourse: () => import('@/components/personal/active-course.vue'),
	},
	computed: {
		user() {
			return this.$store.state.user;
		},
	},
	data () {
		return {
			isMailSent: false,
			onlineCourses: [],
			gymCourses: [],
			products: [],
		}
	},
	created() {
		this.getOnlineOrders()
		this.getGymOrders()
		this.getProducts()
	},
	methods: {
		getOnlineOrders() {
			api.getOnlineOrders(this.$store.state.user.token).then(
				res => {
					this.onlineCourses = res.data.data
				},
				rej => {
				}
			)
		},
		getGymOrders() {
			api.getGymOrders(this.$store.state.user.token).then(
				res => {
					this.gymCourses = res.data.data
				},
				rej => {
				}
			)
		},
		getProducts() {
			api.getProducts(this.$store.state.user.token).then(
				res => {
					this.products = res.data.data
				},
				rej => {
				}
			)
		},
		sendMailConfirm() {
			this.isMailSent = true
		},
		redirect(url) {
			window.location = url
		},
		goToCourse() {
		},
	}
}
</script>

<style lang="postcss" scoped>
	article.main-body {
		background-color: #e8e8e8;
		flex-grow: 1;
		padding-bottom: 60px;
		.limit {
			padding-top: 30px;
			display: grid;
			grid-auto-columns: auto 361px;
			grid-gap: 0 30px;
			@media (max-width: 850px) {
				grid-gap: 0;
			}
			@media (max-width: 500px) {
				padding: 0;
			}
		}
		.green {
			color: var(--accent_color);
		}
		section.first-row {
			grid-row: 1;
		}
		.confirm-mail {
			background-color: white;
			padding: 15px 0;
			text-align: center;
			font-weight: bold;
  			font-size: 14px;
			a {
				cursor: pointer
			}
		}
		section.column {
			grid-row: 2;
			&.sidebar {
				grid-column: 2;
				min-width: 361px;
				@media (max-width: 850px) {
					grid-column: 1;
				}
			}
		}
		.section-title {
			margin: 60px 0.125rem 24px;
			font-size: 22px;
			font-weight: 800;
			text-transform: uppercase;
			&.first {
				margin-top: 30px;
			}
			@media (max-width: 500px) {
				font-size: 16px;
				margin: 30px var(--col-space) 20px;
			}
		}
		.tile {
			min-width: 100%;
			background-color: white;
			margin-bottom: 30px;
			overflow: hidden;
			@media (max-width: 500px) {
				margin-bottom: 20px;
			}
			&:last-child {
				margin-bottom: auto;
			}
		}
		.btns {
			width: 100%;
			overflow: hidden;
			margin: -10px;
		}
		.btn {
			background-color: white;
			border-radius: 5px;
			display: inline-block;
			text-decoration: none;
			text-align: center;
			border: 1px solid var(--accent_color);
			padding: 15px 18px;
			min-width: 145px;
			margin: 10px;
			font-size: 15px;
			font-weight: bold;
			color: var(--accent_color);
			transition: background-color .3s, color .3s;
			@media (max-width: 500px) {
				padding: 10px 14px;
				font-size: 11px;
				min-width: 110px;
			}
			&:hover {
				transition-duration: .2s, .2s;
				background-color: var(--accent_color);
				color: white;
			}
		}

		.tile.goods {
			display: flex;
			align-items: center;
			.goods__image {
				background: url(~@/assets/images/aside-hero/certificates_bg.jpg) 100% center / cover;
				flex-basis: 47%;
				max-width: 310px;
				height: 30vw;
				max-height: 226px;
				margin-right: 58px;

				&_merch {
					background: url(~@/assets/images/merch_bg-sektamerch.jpg) 6% / cover;
				}
				&_bullet {
					background: url(~@/assets/images/bullet_bg-sektabullet.jpg) 19% / cover;
				}
			}
			.text {
				font-size: 18px;
				font-weight: bold;
				&.title {
					text-transform: uppercase;
				}
				@media (max-width: 500px) {
					font-size: 12px;
				}
			}
			.sub-text {
				font-size: 11px;
				font-weight: bold;
				color: #6a6a6a;
			}
		}

		.tile.simple {
			overflow: hidden;
			@media (max-width: 1024px) {
				.main-content {
					padding-left: 0;
				}
				.img-side {
					position: relative;
					min-height: 90px;
				}
			}
			.main-content {
				margin: 20px 30px;
				position: relative;
				padding-left: 175px;
				padding-bottom: 15px;
				@media (max-width: 500px) {
					padding-bottom: 5px;
					margin: 10px var(--col-space);
				}
			}
			.img-side {
				min-height: 100%;
				max-width: 145px;
				margin-right: 30px;
				float: left;
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
				@media (max-width: 500px) {
					width: calc(50% - 30px);
					min-height: 70px !important;
				}
				img,
				svg {
					margin: 0;
					height: auto;
				}
			}
			.text-side {
				.title {
					font-size: 18px;
					font-weight: bold;
					text-transform: uppercase;
					@media (max-width: 500px) {
						font-size: 13px;
					}
				}
				.description {
					margin: 23px * 15px;
					line-height: 1.5;
					font-size: 14px;
					@media (max-width: 500px) {
						float: left;
						font-size: 13px;
						line-height: 1.38;
						margin: 18px * 10px;
					}
				}
			}
		}


		.sidebar {
			.content {
				margin: 27px 30px;
				@media (max-width: 500px) {
					margin: 20px 30px;
				}
			}
			.title {
				font-size: 18px;
				margin: 35px * 20px;
				font-weight: bold;
				text-transform: uppercase;
				@media (max-width: 500px) {
					font-size: 14px;
					margin: 18px * 15px;
				}
			}
			hr {
				height: 1px;
				width: 100%;
				margin: 20px *;
				border: none;
				background-color: #cbcbcb;
				@media (max-width: 500px) {
					margin: 15px *;
				}
			}
			.text {
				font-size: 14px;
				font-weight: bold;
				&.heavy {
					text-transform: uppercase;
					font-size: 15px;
					font-weight: 800;
				}
			}
		}
	}
</style>

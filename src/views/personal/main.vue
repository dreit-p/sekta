<template lang="pug">
	article.main-body
		.limit
			section.first-row
				.confirm-mail(v-if="!$store.state.user.info.gmt") Важно! Укажите верный часовой пояс перед записью на любой курс.&nbsp;
					router-link(to='/personal/details').green Укажите часовой пояс
				.confirm-mail(v-if="showMail && !isMailSent && !user.info.is_email_verified") Адрес электронной почты не подтвержден.&nbsp;
					a(href="#" @click.prevent="requestVerifyEmail").green Подтвердить сейчас
				.confirm-mail(v-else-if="isMailSent") Письмо отправлено на вашу почту
			section.column
				template(v-if="onlineCoursesActive.length > 0")
					h2.section-title.first Активные онлайн курсы
					active-course(
						v-for="course in onlineCoursesActive"
						:courseName="course.course_name"
						:orderId="course.id"
						:payStatus="course.pay_status"
						:progress="course.edu_progress"
						:group="course.group"
						:image="course.course_image"
						:url="course.course_url"
						:demoUrl="course.course_demo_url"
						:cityId="course.city_id"
						:prices="course.available_prices"
						:payment="course.pending_payment"
						:additionalInfo='course.course_description'
						@pay="yaKassaRedirect"
					)
				template(v-if="gymCoursesActive.length > 0")
					h2.section-title Активные очные курсы
					active-course(
						v-for="course in gymCoursesActive"
						:courseName="course.course_name"
						:orderId="course.id"
						:payStatus="course.pay_status"
						:progress="course.edu_progress"
						:group="course.group"
						:image="course.course_image"
						:url="course.course_url"
						:demoUrl="course.course_demo_url"
						:cityId="course.city_id"
						:prices="course.available_prices"
						:payment="course.pending_payment"
						:additionalInfo='course.course_description'
						@pay="yaKassaRedirect"
					)
				template(v-if="certificates.length > 0")
					h2.section-title Сертификаты
					.tile.goods.certificate(v-for="certificate in certificates")
						.goods__image
						.goods__block
							.text {{certificate.certificate.name}}
							.progress-caption {{certificate.pay_status}}
							.description(v-if="certificate.is_fully_paid") Мы отправили сертификат на почту, которую вы указывали при покупке
							.btns(v-if="certificate.available_prices.length > 0 || certificate.pending_payment")
								.btn(@click="goPay(certificate.pending_payment, certificate.id, certificate.available_prices[0].id)") Оплатить
				template(v-if="products.length > 0")
					h2.section-title Товары
					.tile.goods(v-for="course in products")
						.goods__image(:class="`goods__image_${course.product_name === 'Блокнот' ? 'bullet' : 'merch'}`")
						.text-block
							.text.title {{course.product_name}}
							.sub-text Количество: 1
				template(v-if="unPaidCourses.length > 0")
					h2.section-title.first Заявки
					active-course(
						v-for="course in unPaidCourses"
						:courseName="course.course_name"
						:orderId="course.id"
						:payStatus="course.pay_status"
						:progress="course.edu_progress"
						:group="course.group"
						:image="course.course_image"
						:url="course.course_url"
						:demoUrl="course.course_demo_url"
						:cityId="course.city_id"
						:prices="course.available_prices"
						:payment="course.pending_payment"
						:additionalInfo='course.course_description'
						@pay="yaKassaRedirect"
					)
				h2.section-title Рекомендуем
				.tile.simple(v-for="course in recommended")
					.main-content
						.img-side
							svg-icon(:name='course.svg')
						.text-side
							.title {{course.name}}
							.description {{course.description}}
							.btns
								a(:href="course.url" target="_blank").btn Демо
			section.column.sidebar
				h2.section-title.first Статистика
				.tile
					.content
						h2.title.green Курсы
						hr
						.text Завершенных курсов:&nbsp;
							span.green {{statistics.finished}}
						hr
						.text Активных курсов:&nbsp;
							span.green {{statistics.active}}
						hr
						// template(v-if="allCoursesForProgress.length > 0")
						// 	h2.title.green Прогресс
						// 	hr
						// 	template(v-for="course in allCoursesForProgress")
						// 		.text.heavy {{course.course_name}}&nbsp;
						// 			span.green {{course.edu_progress}} %
						// 		hr

</template>

<script>
import api from "@/assets/api/index.js";

export default {
	name: "MainPersonal",
	metaInfo: {
		title: 'Мои курсы',
	},
	components: {
		SvgIcon: () => import("@/components/SvgIcon.vue"),
		ActiveCourse: () => import("@/components/personal/active-course.vue")
	},
	data() {
		return {
			isMailSent: false,
			onlineCourses: [],
			onlineCoursesActive: [],
			gymCourses: [],
			gymCoursesActive: [],
			products: [],
			certificates: [],
			showMail: false,
			recommended: [
				{
					name: "#SEKTACARE",
					description:
						"В #SektaCare мы заботимся о тех, кому нужно плавно ввести тренировки в свою жизнь. Вас ждет разнообразная нагрузка, направленная на жиросжигание, развитие выносливости, силы, гибкости — такие тренировки помогут улучшить метаболизм, а куратор подберет идеальный режим питания",
					url: "https://account.sektaschool.ru/courses/care/demo.php",
					svg: "sekta-care"
				},
				{
					name: "#SEKTAEVO",
					description:
						"SektaEvolution — это комплексный, продуманный и сбалансированный курс. При его разработке мы учли всё: опыт команды и 120 тысяч выпускников #SEKTA, базовые и новые исследования о здоровье, питании, спорте и образе жизни. В основе курса — наши исследования о мотивации. Постарались сделать всё, чтобы вам всегда хотелось идти вперед.",
					url: "https://account.sektaschool.ru/courses/evolution_demo/",
					svg: "sekta-evo"
				}
			],
			statistics: {
				active: 0,
				finished: 0
			}
		};
	},
	computed: {
		user() {
			return this.$store.state.user;
		},
		allCourses() {
			return [...this.onlineCourses, ...this.gymCourses];
		},
		// allCoursesForProgress() {
		// 	return [...this.onlineCoursesActive, ...this.gymCoursesActive].filter(course => course.edu_progress === null);
		// },
		unPaidCourses() {
			return this.allCourses.filter(
				course => !course.is_active
			);
		}
	},
	created() {
		if (this.$route.query.verify_email) {
			this.verifyEmail(this.$route.query.verify_email);
		} else {
			this.showMail = true
		}
		this.getOnlineOrders();
		this.getGymOrders();
		this.getCertificates();
		this.getProducts();
		this.getStatistics();
	},
	methods: {
		goPay(url, id, price) {
			if (url) {
				window.location = url.approve_url;
			} else {
				this.$store
					.dispatch("reqCertPayment", {
						orderId: id,
						price_id: price,
					})
					.then(res => {
						window.location = res.data.payment.approve_url
					});
			}
		},
		getStatistics() {
			api.personal.getStatistics().then(
				res => {
					this.statistics = res.data
				},
				rej => {}
			);
		},
		getOnlineOrders() {
			api.online.getOrders().then(
				res => {
					this.onlineCourses = res.data.data;
					this.onlineCoursesActive = res.data.data.filter(
						course => course.is_active
					);
				},
				rej => {}
			);
		},
		getGymOrders() {
			api.gym.getOrders().then(
				res => {
					this.gymCourses = res.data.data;
					this.gymCoursesActive = res.data.data.filter(
						course => course.is_active
					);
				},
				rej => {}
			);
		},
		getCertificates() {
			api.certs.getOrders().then(
				res => {
					this.certificates = res.data.data;
				},
				rej => {}
			);
		},
		getProducts() {
			api.product.getOrders().then(
				res => {
					this.products = res.data.data;
				},
				rej => {}
			);
		},
		requestVerifyEmail() {
			this.isMailSent = true;
			api.personal.requestVerifyEmail()
		},
		verifyEmail(token) {
			api.personal.verifyEmail(token).then(res => {
				if (!res.data.status) {
					this.showMail = true
				}
			},)
		},
		yaKassaRedirect(url) {
			window.location = url;
		},
	}
};
</script>

<style lang="postcss" scoped>
article.main-body {
	background-color: #e8e8e8;
	flex-grow: 1;
	padding-bottom: 60px;
	.limit {
		padding-top: 30px;
		display: grid;
		display: -ms-grid;
		grid-auto-columns: auto 361px;
		grid-gap: 0 30px;
		-ms-grid-columns: 1fr 30px 361px;
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
		-ms-grid-row: 1;
		.confirm-mail:not(:first-child) {
			margin-top: 25px;
		}
	}
	.confirm-mail {
		background-color: white;
		padding: 15px 0;
		text-align: center;
		font-weight: bold;
		font-size: 14px;
		a {
			cursor: pointer;
		}
	}
	section.column {
		grid-row: 2;
		-ms-grid-row: 2;
		&.sidebar {
			grid-column: 2;
			-ms-grid-column: 3;
			min-width: 361px;
			@media (max-width: 850px) {
				grid-column: 1;
				-ms-grid-column: 1;
				grid-row: 3;
				-ms-grid-row: 3;
			}
		}
	}
	.section-title {
		margin: 30px 0.125rem 24px;
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
		transition: background-color 0.3s, color 0.3s;
		@media (max-width: 500px) {
			padding: 10px 14px;
			font-size: 11px;
			min-width: 110px;
		}
		&:hover {
			transition-duration: 0.2s, 0.2s;
			background-color: var(--accent_color);
			color: white;
		}
	}

	.tile.goods {
		display: flex;
		align-items: center;
		.goods__image {
			background: url(~@/assets/images/aside-hero/certificates_bg.jpg) 100%
				center / cover;
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

	.tile.certificate {
		align-items: flex-start;

		.goods__image {
			margin-right: 0;
			flex: 1;
		}
		.goods__block {
			padding: 20px 30px;
			flex: 1;
		}
		.progress-caption {
			width: 100%;
			overflow: hidden;
			font-size: 11px;
			font-weight: 700;
			color:#6a6a6a;
			margin: 15px 0;
		}
		.description {
			margin-bottom: 15px;
			margin-top: 23px;
			line-height: 1.5;
			font-size: 14px;
		}
		.btn {
			background-color: #0ab6a1;
			color: white;
			cursor: pointer;
			&:hover {
				border: 1px solid #078675;
				background: #078675;
			}
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
				max-height: 100%;
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

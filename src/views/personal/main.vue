<template lang="pug">
div
	article.main-body
		.limit
			section.column
				h2.section-title Активные курсы
				.tile.course
					.main-content
						.top-content
							.img-side
								svg-icon(name='logo-sekta')
							.text-side
								.title Oldschool
								.info
									.line
										svg-icon(name='icon-graph')
										| Прогресс:
										span.green 0%
									.line
										svg-icon(name='icon-calendar')
										| Старт: 13.12.2018
						.progress-bar
							.border
							.fill(style='max-width: 0%')
						.progress-caption Курс полностью оплачен
						.btns
							button.btn Открыть курс
							button.btn Оплатить курс
					.additional-content
						.open-btn Подробнее о курсе
							.arrow-icon


				.tile.course
					.main-content
						.top-content
							.img-side
								svg-icon(name='logo-sekta')
							.text-side
								.title Oldschool
								.info
									.line
										svg-icon(name='icon-graph')
										| Прогресс:
										span.green 0%
									.line
										svg-icon(name='icon-calendar')
										| Старт: 13.12.2018
						.progress-bar
							.border
							.fill(style='max-width: 34%')
						.progress-caption Курс полностью оплачен
						.btns
							button.btn Открыть курс
							button.btn Оплатить курс

					.additional-content
						.open-btn Подробнее о курсе
							.arrow-icon


				.tile.course
					.main-content
						.top-content
							.img-side
								svg-icon(name='logo-sekta')
							.text-side
								.title Oldschool
								.info
									.line
										svg-icon(name='icon-ruble')
										| 3900 руб/месяц (3 тренировки/нед.)
									.line
										svg-icon(name='icon-calendar')
										| Старт: 13.12.2018
						.progress-caption Курс полностью оплачен
						.btns
							button.btn Открыть курс
							button.btn Оплатить курс

					.additional-content
						.open-btn Подробнее о курсе
							.arrow-icon


				h2.section-title Сертфикаты
				.tile.certificate
					.img(:style="{ backgroundImage: `url('${require('@/assets/images/aside-hero/certificates_bg.jpg')}')` }")
					.text СЕРТИФИКАТ НА СУММУ 10 900руб.


				h2.section-title Рекомендуем
				.tile.simple
					.img-side
						svg-icon(name='logo-sekta')
					.text-side
						.title #s60lite
						.description
							| Мы создали специальную программу для тех, кто не хочет прыгать с места в карьер. Вас ждет разнообразная нагрузка, направленная на жиросжигание, развитие выносливости, силы, гибкости  — такие тренировки помогут улучшить метаболизм, а куратор подберет идеальный режим питания.
						.btns
							a.btn Демо



			section.column.sidebar
				h2.section-title Статистика
				.tile
					.content
						h2.title.green Курсы
						hr
						.text Завершенных курсов:
							span.green 2
						hr
						.text Активных курсов:
							span.green 3
						hr
						h2.title.green Прогресс
						hr
						.text.heavy #sekta bootcamp3
							span.green 0%
						hr
						.text.heavy #sekta bootcamp3 vol.2
							span.green 84%
						hr
						.text.heavy oldschool
							span.green 0%
						hr

	app-footer
</template>

<script>
	export default {
		name: 'MainPersonal',
		components: {
			SvgIcon: () => import('@/components/SvgIcon.vue'),
			AppFooter: () => import('@/components/footer.vue'),
		},
		data () {
			return {}
		}
	}
</script>

<style lang="postcss" scoped>
	.arrow-icon {
		position: relative;
		width: 20px;
		margin: 0;
		margin-left: -10px;
		height: 1em;
		transform: translateY(-1px);
		&:before,
		&:after {
			content: "";
			position: absolute;
			display: block;
			right: 0px;
			top: 0;
			bottom: 0;
			margin: auto;
			height: 5%;
			width: 50%;
			border-radius: 1px;
			background-color: currentColor;
			backface-visibility: hidden;
			transform: rotateZ(45deg) rotateY(45deg);
			transform-origin: center left;
			transition: transform .2s;
		}
		&:after {
			transform-origin: center right;
			transform: rotateZ(-45deg) rotateY(45deg);
		}
	}


	article.main-body {
		background-color: #e8e8e8;
		flex-grow: 1;
		padding-bottom: 60px;
		.limit {
			display: grid;
			grid-auto-columns: auto 361px;
			grid-gap: 30px;
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
		section.column {
			&.sidebar {
				grid-column: 2;
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
		.course {
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
			.top-content {
				display: flex;
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
				float: left;
				@media (max-width: 500px) {
					float: right;
					width: 50%;
				}
			}
			.title {
				font-size: 18px;
				font-weight: bold;
				text-transform: uppercase;
				@media (max-width: 500px) {
					font-size: 13px;
				}
			}
			.info {
				.line {
					margin: 15px 5px;
					font-size: 14px;
					font-weight: bold;
					@media (max-width: 500px) {
						margin: 10px 0;
						font-size: 12px;
					}
					.svg-icon {
						margin: 2px 3px;
						max-height: calc(1em - 2px);
						display: inline-block;
						float: left;
						width: 15px;
					}
				}
			}
			.progress-bar {
				height: 20px;
				width: calc(100% + 4px);
				margin: 0 -2px;
				overflow: hidden;
				position: relative;
				border-radius: 5px;
				z-index: 0;
				@media (max-width: 500px) {
					margin: 10px * 5px;
					height: 17px;
				}
				.border {
					z-index: 1;
					position: absolute;;
					width: 100%;
					height: 100%;
					background-color: transparent;
					border-radius: 5px;
					border: 1px solid #cbcbcb;
					box-shadow: inset 0 0 0 2px white;
				}
				.fill {
					z-index: -1;
					position: relative;
					display: block;
					margin: 2px;
					opacity: .5;
					background-color: var(--accent_color);
					width: calc(100% - 4px);
					height: calc(100% - 4px);
				}
			}
			.progress-caption {
				width: 100%;
				overflow: hidden;
				font-size: 11px;
				font-weight: bold;
				color: #6a6a6a;
				margin: 15px 0;
				@media (max-width: 500px) {
					margin: 5px 0 10px;
				}
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

		.additional-content {
			border-top: 1px solid #cbcbcb;
			.open-btn {
				font-size: 11px;
				font-weight: bold;
				color: #6a6a6a;
				display: flex;
				justify-content: center;
				padding: 21px;
				align-items: center;
				@media (max-width: 500px) {
					padding: 10px;
				}
				.arrow-icon {
					width: 20px;
					height: 1em;
					margin: 0;
					@media (max-width: 500px) {
						width: 15px;
					}
				}
			}
		}


		.tile.certificate {
			display: flex;
			align-items: center;
			.img {
				background-position: center center;
				background-size: cover;
				flex-basis: 47%;
				max-width: 310px;
				height: 30vw;
				max-height: 226px;
			}
			.text {
				flex-shrink: 1;
				flex-basis: 57%;
				padding: 20px;
				font-size: 18px;
				font-weight: bold;
				text-align: center;
				@media (max-width: 500px) {
					font-size: 12px;
				}
			}
		}

		.tile.simple {
			display: flex;
			align-items: stretch;
			padding: 20px 30px;
			@media (max-width: 500px) {
				display: block;
				padding: 14px 18px;
			}
			.img-side {
				margin-right: 30px;
				min-width: 145px;
				float: left;
				img,
				svg {
					height: auto;
					width: auto;
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



	footer {
		height: 100px;
	}
</style>

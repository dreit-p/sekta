<template lang="pug">
section
	.limit.clearfix
		.text_markes
			.col50
				p.sekta #sekta
				p.tit
					| Идеальное тело — это не кубики на животе, не цифра на весах, не бирка на одежде.
				p
					| В нашем представлении, это тело, которое дает возможность жить полной здоровой жизнью без оглядки на правила и запреты; жить, не боясь еды, не загоняя себя до полного изнеможения в зале. 
					br
					| Задача «Школы идеального тела» — подобрать для каждого идеальную формулу, подходящую именно его образу жизни. То есть научить вас привычкам, которые будут строить ваше идеальное тело, — то, о котором вы всегда мечтали.
				p.copyright © Ольга Маркес
			.col50
				img(src='@/assets/images/markes-main.jpg' alt='')
		.here_you_will_find
			h2.direct-speech__title здесь вы найдете
			.here_you_will_find__conteiner
				.here_you_will_find__item
					p.num_bg 1
					p
						.caption Комплексный подход:
						| программа питания
						br
						| и тренировок, советы по уходу за телом, работа с мотивацией;
				.here_you_will_find__item
					p.num_bg 2
					p
						.caption Обоснование всех рекомендаций:
						| каждая рекомендация подтверждена научными исследования и опытом наших выпускников; программы составлены
						| при участии врачей, сертифицированных тренеров, специалистов по питанию и психологии;
				.here_you_will_find__item
					p.num_bg 3
					p
						.caption Комьюнити:
						| кураторы, которые хотят
						br
						| привести вас к цели,
						br
						| и команда единомышленников,
						br
						| которая всегда вас поддержит.
		.text_program
			hr.line_text_program
			.text_program__item
				p.tit Онлайн программы
				p
					| Можно пройти из любой точки мира — нужны только кроссовки и доступ к интернету.
					br
					| Время и место тренировок вы выбираете сами.
				p
					| В каждой программе: полное видео тренировок, рекомендации по питанию, задания, которые приведут вас к цели, консультации опытного наставника
				.bot_part
					p.start Старт: каждый понедельник
					p.for_button
						router-link(title='Выбрать курс', to='/online-courses')
							green-btn Выбрать курс
			.text_program__item
				p.tit Тренировки в зале
				p
					| Доступны 2—6 раз в неделю в Москве 
					br
					| и Санкт-Петербурге. 
					br
					| Программа включает задания по питанию, очные консультации с куратором, тренировки
					br
					| в зале по фиксированному расписанию.
				.bot_part
					p.start Старт 04 марта
					p.for_button
						router-link(title='Посмотреть расписание', to='/gym/')
							green-btn Посмотреть расписание

</template>

<script>
	export default {
		name: 'second_screen',
		components: {
			GreenBtn: () => import('@/components/form/green-btn.vue'),
		},
		data () {
			return {}
		}
	}
</script>

<style lang="postcss" scoped>
	.limit {
		width: 100%;
	}
	.text_markes {
		margin-top: 50px;
		width: 100%;
		float: left;
		display: flex;
		@media screen and (max-width: 810px) {
			flex-direction: column-reverse;
		}
		.col50 {
			width: 50%;
			position: relative;
			min-height: 1px;
			padding-left: 0;
			padding-right: 34px;
			&:nth-child(even) {
				padding-right: 0;
			}
			img {
				width: 100%;
			}
			@media screen and (max-width: 810px) {
				width: 100%;
				padding-right: 0;
				
			}
			p {
				font-family: var(--font-main);
				font-size: 15px;
				font-style: italic;
				color: #000;
				line-height: 1.47;
			}
			p.sekta {
				transform: rotate(180deg);
				float: left;
				font-family: var(--font-second);
				color: #e0e0e0;
				font-size: 100px;
				text-transform: uppercase;
				line-height: 0;
				font-weight: 700;
				left: 0;
				writing-mode: tb-rl;
				margin: 0 47px 0 55px;
				font-style: normal;
				@media screen and (max-width: 1010px) {
					display: none;
				}
			}
			p.tit {
				color: #0ab6a1;
				font-size: 20px;
				line-height: 22px;
				font-style: italic;
				font-weight: 700;
				-webkit-margin-before: 0em;
				margin-bottom: 15px;
				padding-right: 5px;
				font-family: var(--font-main);
				@media (max-width: 768px) {
					margin-top: 10px;
				}
			}
			p.copyright {
				font-size: 18px;
				font-weight: 600;
				font-style: italic;
				line-height: 1.11;
				letter-spacing: normal;
				text-align: right;
				margin-right: 39px;
				font-family: var(--font-main);
			}
		}
	}

	@media (max-width: 768px)
	.text_markes, .here_you_will_find {
		padding: 0 34px 0 34px;
	}

	.direct-speech__title {
		font-size: 30px;
		text-transform: uppercase;
		font-family: var(--font-second);
		font-weight: 700;
		letter-spacing: .25px;
		line-height: 36px;
		margin: 0 auto;
		max-width: 980px;
		@media (min-width: 1010px) {
			margin-top: 10px;
		}
		@media (max-width: 768px) {
			text-align: left;
		}
	}

	.here_you_will_find {
		width: 100%;
		float: left;
		text-align: center;
		margin-top: 50px;
		&__conteiner {
			display: flex;
			justify-content: space-between;
			@media (max-width: 768px) {
				flex-direction: column;
			}
		}
		&__item {
			float: left;
			width: 30%;
			position: relative;
			margin-top: 70px;
			font-size: 15px;
			line-height: 1.33;
			.caption {
				font-weight: bold;
				margin-bottom: 5px;
				display: block;
			}
			.num_bg {
				float: left;
				font-family: var(--font-second);
				color: #eaeaea;
				font-size: 200px;
				text-transform: uppercase;
				line-height: 0;
				font-weight: 700;
				position: absolute;
				font-style: normal;
				top: 25%;
				z-index: -1;
				left: 0 !important;
				margin: auto;
				width: 100%;
				transform: translateY(-50%);
				@media (max-width: 768px) {
					top: 35%;
				}
			}
			&:nth-child(2) {
				width: 36%;
			}
			@media (max-width: 768px) {
				&:nth-child(2),
				& {
					width: 100%;
				}
			}
		}
	}

	.line_text_program {
		display: none;
		@media (max-width: 768px) {
			width: 100%;
			margin: 0 auto;
			margin-bottom: 30px;
			display: block;
			border: 0.5px solid #737373;
		}
	}

	.text_program {
		width: 100%;
		float: left;
		display: flex;
		justify-content: space-between;
		margin-top: 35px;
		border-top: 1px solid;
		padding-top: 30px;
		margin-bottom: 100px;
		@media (max-width: 768px) {
			padding: 0px 0 0 0;
			flex-direction: column;
			margin-bottom: 10px;
			border: none;
		}
		&__item {
			width: 48%;
			background: #e8e8e8;
			padding: 30px 55px 150px 50px;
			position: relative;
			@media (max-width: 768px) {
				width: 100%;
				padding: 30px 15px 15px 15px;
				min-height: max-content;
			}
			@media screen and (max-width: 1010px) {
				margin-bottom: 30px;
			}
			a {
				margin: 0 auto;
				text-decoration: none;
			}
			p {
				line-height: 1.47;
				letter-spacing: 0.2px;
				margin: 0.5em 0 0 0;
				font-size: 15px;
			}
			p.tit {
				font-size: 30px;
				font-family: var(--font-second);
				font-weight: 700;
				letter-spacing: .25px;
				margin: 0 0 0.5em 0;
			}
			.bot_part {
				position: absolute;
				bottom: 2.5em;
				width: calc(100% - 105px);
				@media screen and (max-width: 768px) {
					position: static;
					width: 100%;
					margin-top: 16px;
					margin-bottom: 20px;
				}
			}
			p.start {
				font-size: 18px;
				color: #0ab6a1;
				font-weight: 700;
				margin: 0.5em 0 1.5em 0;
			}
			.for_button {
				text-align: center;
				-webkit-margin-before: 0;
				-webkit-margin-after: 0;
			}
		}
	}

	.green-btn {
		margin: 20px 0;
	}
</style>

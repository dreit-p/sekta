<template lang="pug">
section.articles-list
	.limit
		.section-title Партнерские проекты и публикации в СМИ
		.tiles
			a.tile(v-for='tile in articles', :href='tile.link', target="_BLANK", rel="noopener noreferrer")
				.big-title {{tile.srcTitle}}
				.img(:style='{"backgroundImage": `url(${tile.photo})`}')
					.gradient
				.content
					.title {{tile.srcTitle}}
					.description {{tile.articleTitle}}
		a.more-btn(v-if='currentQuantity < articlesData.length', @click='currentQuantity = currentQuantity + step') Загрузить еще

</template>

<script>
export default {
	name: 'ArticlesList',
	computed: {
		articles() {
			let quantity = this.currentQuantity < this.articlesData.length
				? this.currentQuantity
				: this.articlesData.length
			return this.articlesData.slice(0, quantity);
		},
	},
	data() {
		return {
			currentQuantity: 4,
			step: 4,
			articlesData: [
				{
					srcTitle: 'ЗОЖНИК',
					articleTitle: '«Оля Маркес: не мечтай о деньгах — думай о людях», 2015 год.',
					photo: '../articles-images/1.jpg',
					link: 'http://zozhnik.ru/interview_s_olga_markes_sekta/'
				},
				{
					srcTitle: 'ЗОЖНИК',
					articleTitle: '«Закаливание: что говорит наука», 2013 год.',
					photo: '../articles-images/2.jpg',
					link: 'http://zozhnik.ru/drugaya-sekta/'
				},
				{
					srcTitle: 'Wonderzine',
					articleTitle: '«Как звёзды соцсетей продвигают фитнес в массы», 2015 год.',
					photo: '../articles-images/3.jpg',
					link: 'https://www.wonderzine.com/wonderzine/health/sport/214223-sport-via-social-media'
				},
				{
					srcTitle: 'Wonderzine',
					articleTitle: '«Фитнес-рейвы: Главный спортивный тренд лета», 2015 год.',
					photo: '../articles-images/4.jpg',
					link: 'https://www.wonderzine.com/wonderzine/health/wellness/214197-fitness-rave'
				},
				{
					srcTitle: 'Wonderzine',
					articleTitle: '«Фитнес-туризм: Новый виток активного досуга», 2016 год.',
					photo: '../articles-images/5.jpg',
					link: 'https://www.wonderzine.com/wonderzine/health/sport/217487-fitness-tourism'
				},
				// {
				// 	srcTitle: 'THE VILLAGE',
				// 	articleTitle: '«4 проверенных дистанционных курса», 2015 год.',
				// 	photo: '../articles-images/6.jpg',
				// 	link: 'https://www.the-village.ru/village/city/city-guide/177741-programmy-distantsionnyh-trenirovok'
				// },
				{
					srcTitle: 'GQ',
					articleTitle: '«Как заниматься спортом в холодную погоду?», 2016 год.',
					photo: '../articles-images/7.jpg',
					link: 'https://www.gq.ru/lifestyle/kak-zanimatsya-sportom-v-holodnuyu-pogodu'
				},
				{
					srcTitle: 'Forbes',
					articleTitle: '«Стройный бизнес: интервью с основателем Школы #Sekta», 2014 год.',
					photo: '../articles-images/8.jpg',
					link: 'http://www.forbes.ru/forbes-woman/zhenshchiny-v-biznese/276091-stroinyi-biznes-kak-pevitsa-zarabotala-na-ioge-i-borbe-s-l'
				},
				{
					srcTitle: 'ELLE.RU',
					articleTitle: '«Домашняя тренировка: за и против онлайн-фитнеса», 2015 год.',
					photo: '../articles-images/9.jpg',
					link: 'https://www.elle.ru/krasota/beauty_blog/domashnyaya-trenirovka-za-i-protiv-onlayn-fitnesa/'
				},
				{
					srcTitle: 'Cosmopolitan',
					articleTitle: '«Как создать идеальное тело: 10 ценных советов от фитнес-блогеров», 2016 год. ',
					photo: '../articles-images/10.jpg',
					link: 'https://www.cosmo.ru/health/sport/kak-sozdat-idealnoe-telo-10-cennyh-sovetov-ot-fitnes-blogerov/'
				},
				{
					srcTitle: 'SNC',
					articleTitle: '«Сколько стоит похудеть? Мы проверили 7 популярных методик», 2017 год.',
					photo: '../articles-images/11.jpg',
					link: 'http://www.sncmedia.ru/body/skolko-stoit-pokhudet-7-populyarnykh-metodik/'
				},
				{
					srcTitle: 'Собака',
					articleTitle: '«На ход ноги: Ольга Маркес», 2014 год.',
					photo: '../articles-images/12.jpg',
					link: 'http://www.sobaka.ru/photo/nightlife/25328'
				},
				{
					srcTitle: 'Собака',
					articleTitle: '«Sekta: Как Ольга Маркес заставила худеть половину планеты», 2015 год.',
					photo: '../articles-images/13.jpg',
					link: 'http://www.sobaka.ru/city/sport/37141'
				},
				{
					srcTitle: 'Calvert Journal',
					articleTitle: '«Olya Markes: fitness movement», 2015 год.',
					photo: '../articles-images/14.jpg',
					link: 'http://www.calvertjournal.com/features/show/4238'
				},
				{
					srcTitle: 'Афиша DAILY',
					articleTitle: '«Год Periscope: как видеостримы бездельников, зеков и звезд меняют медиа», 2016 год.',
					photo: '../articles-images/15.jpg',
					link: 'https://daily.afisha.ru/brain/1069-god-periscope-kak-videostrimy-bezdelnikov-zekov-i-zvezd-menyayt-media/'
				},
				{
					srcTitle: 'НЕТ, ЭТО НОРМАЛЬНО',
					articleTitle: '«Думаю, близость — это наша суперспособность», 2017 год.',
					photo: '../articles-images/16.jpg',
					link: 'https://n-e-n.ru/marques/'
				},
				// {
				// 	srcTitle: 'НЕТ, ЭТО НОРМАЛЬНО',
				// 	articleTitle: '«Какие упражнения можно делать беременным», 2017 год.',
				// 	photo: '../articles-images/17.jpg',
				// 	link: 'https://n-e-n.ru/complex/'
				// },
				{
					srcTitle: 'МИР ТВ',
					articleTitle: '«Идеальное тело: стереотипы и реальность», 2017 год.',
					photo: '../articles-images/18.jpg',
					link: 'http://mirtv.ru/video/49477/'
				},
				{
					srcTitle: 'Allure + NIKE сериал «Стань лучше»',
					articleTitle: 'Разработка индивидуальных планов питания и тренировок для каждой участницы, участие в съемках 8 серий, информационная поддержка.',
					photo: '../articles-images/19.jpg',
					link: 'https://www.glamour.ru/health/fitness/119434_stan_luchshe_premera_seriala_na_sayte_allure'
				},
				{
					srcTitle: 'Aviasales: контентный спецпроект',
					articleTitle: 'Проект: «Здоровая еда в разных странах мира». Серия тематических материалов, контент для теста «Куда отправиться за гастрономическими впечатлениями?», информационная поддержка.',
					photo: '../articles-images/20.jpg',
					link: 'http://projects.aviasales.ru/promo/projects/52'
				},
				{
					srcTitle: 'Перинатальный центр Москвы «Мать и дитя», партнер #SEKTAMAMA',
					articleTitle: 'Цикл бесплатных лекций для беременных, тренировочный контент для марафона #недожидаясь2016, инфоподдержка, создание тематического контента.',
					photo: '../articles-images/21.jpg',
					link: 'https://www.instagram.com/explore/tags/недожидаясь2016/'
				},
				{
					srcTitle: 'Олимпийский комитет России, Олимпийский забег',
					articleTitle: 'Организация забега на Всероссийский олимпийский день, информационная и PR-поддержка забега, проведение тренировок на площадке мероприятия.',
					photo: '../articles-images/22.jpg',
					link: 'https://www.youtube.com/watch?v=PmNNwiV1Bwk'
				},
				{
					srcTitle: 'Олимпийский патруль, МДЦ «Артек»',
					articleTitle: 'Разработка спортивной программы для детей в возрасте 6—12 лет, проведение теоретических и спортивных активностей.',
					photo: '../articles-images/23.jpg',
					link: 'https://vk.com/album-18356255_246910287'
				},
				{
					srcTitle: 'GLAMBOX',
					articleTitle: 'Информационная поддержка, тематический контент для email-рассылок и соцсетей, кросс-промо, product placement на мероприятиях и интенсивах.',
					photo: '../articles-images/24.jpg',
					link: ''
				},
				{
					srcTitle: 'Росконтроль «Экспертное мнение»',
					articleTitle: 'Экспертные комментарии от сотрудников научного отдела по вопросам тренинга и питания.',
					photo: '../articles-images/25.jpg',
					link: 'https://roscontrol.com/community/article/vrednie-produkti-zachem-mi-ih-edim-i-kak-zastavit-sebya-ot-nih-otkazatsya/'
				},
				{
					srcTitle: '«Антон тут рядом»',
					articleTitle: 'Участие в благотворительном ужине в поддержку центра, работающего со взрослыми людьми с аутизмом, организация продаж и информационная поддержка.',
					photo: '../articles-images/26.jpg',
					link: 'https://www.asi.org.ru/news/2015/10/28/na-blagotvoritelnom-uzhine-v-polzu-anton-tut-ryadom-sobrali-30-tysyach-rublej/'
				},
				// {
				// 	srcTitle: 'Nike — генеральный технический партнер в 2015—2016 гг.',
				// 	articleTitle: 'Участие в рекламных кампаниях и активностях бренда: #ЯТОЛЬКОЛУЧШЕ, #ВЫШЕНЕПОГОДЫ, NTC+TOUR, NYResolution, кросс-промо, product placement.',
				// 	photo: '',
				// 	link: ''
				// },
				// {
				// 	srcTitle: 'ReStore',
				// 	articleTitle: 'Создание сценария мероприятия и его реализация в поддержку выхода на рынок нового продукта бренда — Apple Watch 3.',
				// 	photo: '',
				// 	link: 'https://yadi.sk/i/s_e9T87z3MSGZo'
				// },
			],
		}
	},
}
</script>

<style lang="postcss">
.articles-list {
	background-color: #f2f2f2;
	padding-bottom: 30px;
	.section-title {
		margin: 30px *;
		font-family: var(--font-second);
		font-size: 26px;
		font-weight: bold;
		color: #232323;
		@media (max-width: 450px) {
			font-size: 20px;
			line-height: 1.4;
			margin: 30px * 20px;
		}
	}
	.more-btn {
		display: block;
		text-align: center;
		margin: auto;
		padding: 20px;
		font-weight: 600;
		font-size: 16px;
		font-style: italic;
		color: #232323;
		text-decoration: underline;
		cursor: pointer;
		@media (max-width: 450px) {
			padding: 0;
			font-size: 14px;
		}
	}
	.tiles {
		display: flex;
		flex-wrap: wrap;
		margin: -10px;
		margin-bottom: 0;
		width: calc(100% + 20px);
		.tile {
			width: calc(25% - 20px);
			margin: 10px;
			height: 270px;
			position: relative;
			overflow: hidden;
			text-decoration: none;
			.img {
				position: absolute;
				top: 0;
				left: 0;
				height: 100%;
				width: 100%;
				border-radius: 10px;
				overflow: hidden;
				background-color: var(--bt-color_muted);
				background-size: cover;
				background-position: center center;
			}
			.gradient {
				background-image: linear-gradient(to bottom, rgba(238, 238, 238, 0), var(--accent_color));
				position: absolute;
				bottom: 0;
				top: 0;
				left: 0;
				right: 0;
				height: 100%;
				width: 100%;
				margin: auto;
				transition: transform .2s ease-out;
			}
			.content {
				transition: transform .2s ease-out, opacity .2s ease-in;
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				margin: auto;
				padding: 10px 15px 30px;
				color: white;
				max-height: 100%;
				text-overflow: ellipsis;
				display: flex;
				flex-direction: column;
			}
			.title {
				text-decoration: underline;
				margin: 5px *;
				font-family: var(--font-second);
				font-weight: bold;
				text-overflow: ellipsis;
			}
			.description {
				font-size: 14px;
				line-height: 1.3;
				text-overflow: ellipsis;
				overflow: hidden;
			}
			.big-title {
				transition: transform .2s ease-out, opacity .2s ease-out;
				pointer-events: none;
				user-select: none;
				text-align: center;
				font-size: 20px;
				font-family: var(--font-second);
				font-weight: bold;
				color: white;
				position: absolute;
				z-index: 1;
				bottom: 30px;
				left: 0;
				right: 0;
				margin: auto;
				padding: * 15px;
			}
			@media (min-width: 451px) {
				.gradient {
					transform: translateY(34%);
				}
				.content {
					opacity: 0;
					transform: translateY(34%);
				}
				.big-title {
					opacity: 1;
					transform: translateY(0px);
				}
				&:hover {
					.gradient {
						transform: translateY(0);
					}
					.content {
						opacity: 1;
						transform: translateY(0);
					}
					.big-title {
						opacity: 0;
						transform: translateY(-80px);
					}
				}
			}
		}
		@media (max-width: 768px) {
			.tile {
				width: calc(50% - 20px);
			}
		}
		@media (max-width: 450px) {
			margin: -5px;
			width: calc(100% + 10px);
			.tile {
				width: calc(50% - 10px) !important;
				margin: 5px;
				height: auto;
				.big-title {
					display: none;
				}
				.content {
					position: static;
					color: #1c1c1c;
					padding: 3px 0;
					.title {
						margin: 7px 0;
						font-size: 16px;
					}
					.description {
						font-size: 14px;
						margin-bottom: 20px;
					}
				}
				.img {
					height: 190px;
					position: relative;
					.gradient {
						transform: translateY(34%);
					}
				}
			}
		}
	}
}
</style>

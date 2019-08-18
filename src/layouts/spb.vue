<template lang="pug">
div.main-layout
	.mini-header
		.header-offset
		.content
			.limit
				.top
					a(href='https://sektaschool.ru', class='logo', title='Sekta school logo')
						svg-icon(name='logo-sekta')
					.main-links
					.contacts
						a.phone.animated-underline.left(href='tel:+78005006882') 8 (800) 500–68–82
						.caption пн-пт 10:00–19:00
	.requisites
		.article-limit
			.text-typography
				h2 Общество с ограниченной ответственностью «ШКОЛА ИДЕАЛЬНОГО ТЕЛА СПБ»
				table(border='1')
					tr
						td Полное фирменное наименование
						td Общество с ограниченной ответственностью «ШКОЛА ИДЕАЛЬНОГО ТЕЛА СПБ»
					tr
						td Сокращенное фирменное наименование
						td ООО «ШКОЛА ИДЕАЛЬНОГО ТЕЛА СПБ»
					tr
						td Адрес места нахождения
						td 191024, Санкт-Петербург, Невский пр. д. 32-34, лит. H, пом. 42
					tr
						td Дата регистрации
						td 17.04.2015 года
					tr
						td Основной государственный орган (ОГРН)
						td 1157847138789
					tr
						td ИНН
						td 7841022260
					tr
						td КПП
						td 784101001
					tr
						td Наименование налогового органа
						td Межрайонная Инспекция Федеральной налоговой службы №10 по Санкт-Петербургу
					tr
						td Генеральный директор
						td Копытина Евгения Владимировна
				img(src='http://spb.sektaschool.ru/ШИТ-СПБ-ИНН.jpg' width='100%')
				img(src='http://spb.sektaschool.ru/ШИТ-СПБ-ОГРН.jpg' width='100%')
	cookie-notification
</template>

<script>
export default {
	name: 'SubdomenHome',
	metaInfo: {
		// if no subcomponents specify a metaInfo.title, this title will be used
		title: 'Документы',
		// all titles will be injected into this template
		titleTemplate: '%s'
	},
	components: {
		CookieNotification: () => import('@/components/cookie.vue'),
		SvgIcon:() => import('@/components/SvgIcon.vue'),
	},
}
</script>

<style lang="postcss">
	.main-layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.mini-header {
		.header-offset {
			@media (max-width: 600px) {
				height: 65px;
			}
		}
		.content {
			background-color: var(--bt-dark_elems);
			padding-top: 8px;
			width: 100%;
			@media (max-width: 600px) {
				padding-top: 0;
				position: fixed;
				top: 0;
				z-index: 5;
			}
		}
		.top {
			display: flex;
			align-items: center;
			padding: 13px *;
			border-bottom: 1px solid color(var(--bt-color_muted) b(+50%));
			@media (max-width: 600px) {
				padding: 8px *;
				border-bottom: none;
			}
			/* .main-links,
			.contacts {
				@media (max-width: 600px) {
					display: none;
				}
			} */
		}
		.logo {
			display: inline-block;
			width: var(--col-width);
			height: 45px;
			color: white;
			flex-shrink: 0;
			svg {
				width: 100%;
				height: 100%;
				object-fit: contain;
			}
		}
		.contacts {
			display: flex;
			justify-content: center;
			align-items: flex-start;
			flex-direction: column;
			@media (max-width: 425px) {
				font-size: 14px;
			}
			.phone {
				color: white;
				font-size: 1.125em;
				letter-spacing: 0.2px;
				text-decoration: none;
				margin-bottom: 2px;
				white-space: nowrap;
			}
			.phone:hover + .caption {
				color: color(var(--bt-color_muted) w(+70%));
				transition-duration: .1s;
			}
			.caption {
				font-size: 0.8125em;
				color: var(--bt-color_muted);
				letter-spacing: 0.1px;
				transition: color .2s;
			}
		}
		.main-links {
			flex-grow: 1;
		}
	}
	.requisites {
		td {
			padding: 0.625rem 0.9375rem;
			@media (max-width: 500px) {
				font-size: 13px;
			}
		}
		img {
			margin: 30px 0;
		}
	}
</style>

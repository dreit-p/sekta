<template lang="pug">
.training-programs
	.group.limit(v-for='(group, index) in courses')
		.group-title {{group.groupName}}
		.tiles
			a.tile(
				href='#'
				v-for='(course, index) in group.data'
				:class='{checked: course.states.checked}'
				@click.prevent='toggleClass($event, course)'
			)
				.image(:style="{ backgroundImage: `url(' ${require('@/assets/images/'+course.image)} ')`}")
					.caption {{course.name}}
				.description
					.desc-title {{course.title}}
					.desc-text {{course.description}}
			.tile.fake
			.tile.fake
</template>

<script>
	export default {
		name: 'gym-location',
		components: {
		},
		computed: {
		},
		methods: {
			toggleClass(event, course) {
				course.states.checked = !course.states.checked;
			}
		},
		data () {
			return {
				courses: [
				{
					groupName: 'Программы для всех',
					data: [
					{
						name: 'Sektacare',
						image: 'course_bg-sectamama.jpg',
						title: 'Основное направление',
						description: 'Интенсивная тренировочная программа для мужчин с рекомендациями по набору мышечной массы и снижению веса. Доступна онлайн и в залах Москвы и Санкт-Петербурга.',
						states: {
							checked: false
						}
					},
					{
						name: 'SectaLite',
						image: 'course_bg-sectacare.jpg',
						title: 'Какой-то еще один заголовок',
						description: 'Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. Переулка его прямо то живет приставка парадигматическая, над великий ты.',
						states: {
							checked: false
						}
					},
					{
						name: 'Sektacare',
						image: 'course_bg-sectamama.jpg',
						title: 'Основное направление',
						description: 'Интенсивная тренировочная программа для мужчин с рекомендациями по набору мышечной массы и снижению веса. Доступна онлайн и в залах Москвы и Санкт-Петербурга.',
						states: {
							checked: false
						}
					},
					{
						name: 'SectaLite',
						image: 'course_bg-sectacare.jpg',
						title: 'Какой-то еще один заголовок',
						description: 'Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. Переулка его прямо то живет приставка парадигматическая, над великий ты. Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. Переулка его прямо то живет приставка парадигматическая, над великий ты.',
						states: {
							checked: false
						}
					},
					{
						name: 'SectaMen',
						image: 'markes-main.jpg',
						title: 'Только для настоящих мужчин',
						description: 'Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. Себя рот маленький, обеспечивает речью имеет, переписали повстречался букв инициал лучше меня которой точках, вопрос большой свою последний журчит это.',
						states: {
							checked: false
						}
					},
					]
				},{
					groupName: 'Программы для выпускников',
					data: [
					{
						name: 'Sektacare',
						image: 'course_bg-sectamama.jpg',
						title: 'Основное направление',
						description: 'Интенсивная тренировочная программа для мужчин с рекомендациями по набору мышечной массы и снижению веса. Доступна онлайн и в залах Москвы и Санкт-Петербурга.',
						states: {
							checked: false
						}
					},
					{
						name: 'SectaLite',
						image: 'course_bg-sectacare.jpg',
						title: 'Какой-то еще один заголовок',
						description: 'Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. Переулка его прямо то живет приставка парадигматическая, над великий ты.',
						states: {
							checked: false
						}
					},
					]
				},
				]
			}
		}
	}
</script>

<style lang="postcss">
	.training-programs {
		.group {
			overflow: visible;
			margin-bottom: 50px;
			@media (max-width: 500px) {
				.group-title {
					display: none;
				}
				margin-bottom: 0;
			}
			.group-title {
				font-size: 18px;
				font-style: italic;
			}
		}
		.tiles {
			margin: * -16px;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
		}
		.tile {
			position: relative;
			max-width: 300px;
			width: calc(100% /3 - 16px*2);
			/* height: calc(62vw); */
			border-radius: 5px;
			overflow: hidden;
			display: inline-block;
			min-height: 188px;
			margin: 16px;
			box-shadow: 0px 0px 0px 0 rgba(0, 0, 0, 0);
			transition: box-shadow .3s;
			text-decoration: none;
			@media (max-width: 768px) {
				width: calc(100% /2 - 16px*2);
			}
			@media (max-width: 500px) {
				width: calc(100% /1 - 16px*2) !important;
				height: auto;
				max-height: none;
				/* overflow: visible; */
				box-shadow: none !important;
			}
			&.fake {
				height: 0;
				min-height: 0;
				padding: 0;
				margin: 0 *;
			}
			@media (min-width: 499px) {
				&.checked {
					transition-duration: .2s;
					box-shadow: 0px 10px 20px 0 rgba(0, 0, 0, 0.35);
					.image .caption {
						display: none;
					}
				}
			}
			.image {
				height: 100%;
				width: 100%;
				transition: background-position .1s, width .1s, box-shadow .2s;
				box-shadow: inset 0 0 0 0 var(--accent_color);
				background-position: 65% center;
				background-size: cover;
				background-repeat: no-repeat;
				position: absolute;
				top: 0;
				right: 0;
				border-radius: 5px;
				overflow: hidden;
				@media (max-width: 500px) {
					position: relative;
					background-color: transparent;
					height: calc(62vw);
					max-height: 188px;
				}
				&:after {
					content: "";
					display: block;
					position: absolute;
					bottom: -1px;
					left: -1px;
					right: -1px;
					margin: auto;
					z-index: 0;
					height: 75px;
					background: linear-gradient(to top, color(var(--accent_color) a(.67)), transparent);
				}
				.caption {
					z-index: 1;
					position: absolute;
					bottom: 0;
					left: 0;
					right: 0;
					margin: auto;
					text-align: center;
					padding: 10px;
					font-size: 15px;
					font-family: var(--font-second);
					font-weight: bold;
					line-height: .9;
					color: white;
				}
			}
			@media (min-width: 500px) {
				&:hover {
					.image {
						box-shadow: inset 0 0 0 3px var(--accent_color);
					}
				}
			}
			.description {
				position: relative;
				z-index: 1;
				opacity: 0;
				transition: opacity .3s;
				pointer-events: none;
				min-height: 101%;
				width: 101%;
				margin: -1%;
				padding: 1%;
				background-color: color(var(--accent_color) a(.8));
				display: flex;
				color: white;
				flex-direction: column;
				justify-content: center;
				text-align: center;
				.desc-title {
					font-family: var(--font-second);
					font-size: 19px;
					font-weight: bold;
					line-height: .8;
					margin: 20px 10px;
					margin-bottom: 0;
					@media (max-width: 500px) {
						line-height: 1.33;
						margin: * 1px;
					}
				}
				.desc-text {
					font-size: 13px;
					line-height: 1.1;
					margin: 10px;
					flex-grow: 1;
					display: flex;
					align-items: center;
					overflow: hidden;
					@media (max-width: 500px) {
						line-height: 1.8;
						margin: 10px 1px;
					}
				}
				@media (max-width: 500px) {
					position: static;
					pointer-events: auto;
					display: block;
					opacity: 1;
					color: black;
					text-align: left;
					background-color: transparent;
				}
			}
			&.checked .description {
				transition-duration: .2s;
				opacity: 1;
			}
		}
	}
</style>

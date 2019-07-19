<template lang="pug">
section.faq
	.background
		img.lines(src='@/assets/images/evolution/bg_lines.svg' alt='')
	.content
		.limit
			.title ОТВЕЧАЕМ НА ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ:
			ul.list
				li(v-for='(point, index) in listData')
					.icon
					.pt-title(v-html='point.title')
					.pt-text(v-html='point.text')

</template>

<script>
export default {
	name: 'EvoFAQ',
	mounted() {
		let list = document.querySelector('.faq .list');
		list.querySelectorAll('li').forEach(function(elem) {
			elem.addEventListener('click', function () {

				let hideElem = elem => {
					elem.classList.remove('active');
					elem.addEventListener('transitionend', function () {
						elem.classList.remove('visible');
					}, {once: true});
				}
				let showElem = elem => {
					elem.classList.add('visible');
					setTimeout(()=>{
						elem.classList.add('active');
					}, 20);
				}

				if (elem.classList.contains('active')) {
					hideElem(elem);
				} else {
					list.querySelectorAll('li.active').forEach(function(activeElem) {
						activeElem.classList.remove('active');
						activeElem.classList.remove('visible');
					});
					showElem(elem);
				}
			}, false);
		});
	},
	data() {
		return {
			activePoint: 0,
			listData: [
				{
					title: 'Кому подходит?',
					text: 'Мужчинам и женщинам. Если врач не запрещал и не ограничивал вас физических нагрузках - #EVO вам подходит. <br> В каждой тренировке даётся базовый и упрощенный вариант упражнений, поэтому программа подойдет даже новичкам <br> в спорте'
				},
				{
					title: 'Как я буду получать задание?',
					text: 'Весь курс вы будете проходить в личном кабинете на нашем сайте. Как он выглядит, смотрите в демоверсии.'
				},
				{
					title: 'Что мне понадобится для занятий?',
					text: 'Интернет, коврик, кроссовки и спортивная форма.'
				},
				{
					title: 'Тренироваться нужно в конкретное время?',
					text: 'Нет. Можете тренироваться, когда вам удобно. Но утроворк логичней делать утром. 🙂'
				},
				{
					title: 'Доступ к тренировкам останется навсегда?',
					text: 'Доступ к программе открыт на время прохождения курса.'
				},
				{
					title: 'Есть ли скидки?',
					text: 'При единовременной оплате всего курса (10 недель), вы получите скидку 15%, при оплате 5 недель — 10%.'
				},
				{
					title: 'А если я заболею во время курса?',
					text: 'Курс можно «заморозить» на период от 1 до 4 недель при наличии медицинской справки.'
				},
				{
					title: 'Не получается оплатить! Что делать?',
					text: 'Напишите на почту info@sektaschool.ru или в онлайн-консультант — и наши администраторы вам помогут.'
				},
			]
		}
	}
}
</script>

<style lang="postcss">
section.faq {
	position: relative;
	height: 940px;
	overflow: hidden;
	@media (max-width: 768px) {
		min-height: 0;
		height: auto;
	}
	.background {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		z-index: -1;
		background-image: url(~@/assets/images/evolution/bg-pic-qa.jpg);
		background-position: 35% top;
		.lines {
			position: absolute;
			display: none;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			height: 100vw;
			width: 67vw;
			opacity: .1;
			transform: rotateZ(90deg) scaleX(-1) scaleY(1.25);
			filter: FlipH;
		}
		@media (max-width: 768px) {
			background: none;
			.lines {
				display: block;
			}
		}
		@media (max-width: 500px) {
			.lines {
				left: 40%;
				bottom: -20%;
				right: auto;
				margin-left: 0;
				transform: rotateZ(65deg) scaleX(-2) scaleY(2.5);
			}
		}
	}
	.content {
		padding: 30px * 80px;
		color: white;
		@media (max-width: 768px) {
			color: black;
		}
		.title {
			font-family: var(--font-second);
			font-size: 36px;
			font-weight: bold;
			margin: 35px * 25px;
			text-align: center;
			@media (max-width: 768px) {
				margin: 10px auto;
				max-width: 500px;
			}
			@media (min-width: 501px) and (max-width: 768px) {
				font-size: 26px;
			}
			@media (max-width: 500px) {
				font-size: 22px !important;
			}
		}
		ul.list {
			width: 50%;
			float: right;
			padding-left: 20px;
			margin: auto;
			margin-left: 20px;
			@media (max-width: 768px) {
				width: auto;
				padding: * 70px;
			}
			@media (max-width: 500px) {
				padding: * 10px !important;
			}
			li {
				list-style: none;
				position: relative;
				margin: 55px *;
				cursor: pointer;
				@media (max-width: 768px) {
					margin: 20px *;
					padding-bottom: 1px;
				}
				.icon {
					position: absolute;
					left: -40px;
					top: 0;
					width: 20px;
					height: 20px;
					/* border: 1px solid currentColor; */
					box-shadow: 0 0 .5px 0 currentColor inset, 0 0 0 1px currentColor;
					border-radius: 50%;
					backface-visibility: hidden;
					transform: rotateZ(-90deg);
					transition: transform .4s;
					@media (max-width: 768px) {
						left: -30px;
					}
					&:before,
					&:after {
						content: "";
						display: block;
						position: absolute;
						backface-visibility: hidden;
						background-color: currentColor;
						border-radius: 1px;
						height: 1px;
						margin: auto;
						top: -1.5px;
						left: 0;
						right: 0;
						bottom: 0;
						transform: rotate(45deg) rotateY(45deg);
						transform-origin: center left;
						transition: transform .2s;
						width: 10px;
					}
					&:after {
						transform: rotate(-45deg) rotateY(45deg);
						transform-origin: center right;
					}
				}
				&.active {
					.icon {
						transform: rotateZ(0);
						transition-duration: .3s;
					}
					.pt-text {
						opacity: 1;
						transition: opacity .3s;
					}
				}
				&.visible .pt-text {
					display: block;
				}
			}
			.pt-title {
				font-family: var(--font-second);
				font-size: 17px;
				font-weight: bold;
				@media (max-width: 768px) {
					font-weight: normal;
				}
			}
			.pt-text {
				font-size: 15px;
				line-height: 1.4;
				margin: 20px *;
				display: none;
				opacity: 0;
				overflow: hidden;
				transition: opacity .4s;
				@media (max-width: 768px) {
					margin: 15px *;
				}
			}
		}
	}
}
</style>

<template lang="pug">
section.interractive_desc
	.limit
		.other-section-text
			.notice
				| Длится 10 недель
				br
				| старт каждый понедельник
			p
				b #SektaEvolution
				|  — это комплексный, продуманный
				| и сбалансированный курс. При его разработке мы
				| учли всё: опыт команды и 120 тысяч выпускников
				| #SEKTA, базовые и новые исследования
				| о здоровье, питании, спорте и образе жизни.
				| В основе курса — наши исследования о мотивации.
				| Постарались сделать всё, чтобы вам всегда
				| хотелось идти вперед.
		.info-canvas
			h1.title
				| что такое онлайн‑Курс
				br
				| #sektaevolution?
			.main-image(:data-selected-index='activeSectionIdx')
				img(src='@/assets/images/evolution/girl.png' alt='')
				.dots
					.layer
					.layer
					.layer
					.layer
			.text-blocks(:data-selected-index='activeSectionIdx')
				.left
					.block
						.block-title Тренировки
						ul.block-list
							li
								span займут от 15 до 35 минут
							li
								span
									| по видео: включайте
									br
									| и делайте, когда удобно
							li
								span
									| все виды нагрузки:
									br
									| кардио, силовые, HIIT,
									br
									| стретчинг, комплексы на проблемные зоны
					.block
						.block-title знания
						ul.block-list
							li
								span
									| физиология
									br
									|  и психология похудения
							li
								span как сохранить мотивацию и результат
							li
								span
									| что делать до&nbsp;и&nbsp;после тренировки
									br
									|  для максимального эффекта
				.right
					.block
						.block-title питание
						ul.block-list
							li
								span 4 рациона для крутого результата
							li
								span расскажем что есть, когда и сколько
							li
								span
									| куратор поможет разобраться
									br
									|  и не сдаться
					.block
						.block-title уход за кожей
						ul.block-list
							li
								span контрастный душ
							li
								span самомассаж на проблемные зоны
							li
								span
									| подготовка тела перед тренировкой
									br
									|  для усиления эффекта упражнений
			.scroll-appeal
				| листай вниз
				.arrows


</template>

<script>
export default {
	name: 'EvoInterractiveDesc',
	mounted() {
		window.addEventListener('scroll', this.onScrollFn, false);
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.onScrollFn, false);
	},
	methods: {
		throttling (cb) {
			let data = this.scrollThrotling;
			if (!data.throttled) {
				cb();
				data.throttled = true;
				setTimeout(()=>{
					data.throttled = false;
				}, data.delay);
			}
			clearTimeout(data.forLastExec);
			data.forLastExec = setTimeout(cb, data.delay);
		},
		onElementView(elem, cb) {
			let screenHeight = document.documentElement.clientHeight;
			if (elem.getBoundingClientRect().top < ( screenHeight/2 )
				&& elem.getBoundingClientRect().bottom > ( screenHeight/2 )
			) {
				cb();
			}
		},
		onScrollFn() {
			let screenWidth = document.documentElement.clientWidth;
			let section = document.getElementsByClassName('interractive_desc')[0];
			let container = section.getElementsByClassName('limit')[0];

			let setScrollStep = ()=>{

				let stepQnt = 4;
				let elementHeight = container.getBoundingClientRect().height;
				// let stepHeight = elementHeight / stepQnt;
				let sectionHeight = elementHeight / (stepQnt *2);

				let floatPosition = (-container.getBoundingClientRect().top - sectionHeight *2) /sectionHeight;

				// let debug = ()=>{
				// 	console.log({
				// 		'elementHeight ': elementHeight,
				// 		// 'stepHeight ': stepHeight,
				// 		'sectionHeight ': sectionHeight,
				// 		'floatPosition ': floatPosition
				// 	});
				// }

				// debug();

				this.actualIdx = Math.min(Math.max(Math.ceil( floatPosition ) , 0), stepQnt-1);
				if (this.activeSectionIdx != this.actualIdx) {
					this.activeSectionIdx = this.actualIdx;
				}

			}

			if (screenWidth <= this.mobileSize) {
				this.throttling(()=>{
					this.onElementView(container, setScrollStep);
				});
			}

		}
	},
	data() {
		return {
			actualIdx: 0,
			activeSectionIdx: 0,
			mobileSize: 650,
			scrollThrotling: {
				forLastExec: null,
				delay: 25,
				throttled: false
			},
		}
	},
}
</script>

<style lang="postcss">
.interractive_desc {
	.limit {
		@media (max-width: 650px) {
			overflow: visible;
			min-height: 2200px;
		}
	}
	.other-section-text {
		display: none;
		@media (max-width: 900px) {
			display: block;
		}
		.notice {
			margin: 30px * 20px;
			font-size: 22px;
			font-family: var(--font-second);
			font-weight: bold;
			text-transform: uppercase;
			color: var(--bt-dark_elems);
			@media (max-width: 425px) {
				font-size: 18px;
			}
		}
		p {
			font-size: 16px;
			line-height: 1.38;
		}
	}
	.title {
		font-size: 40px;
		font-weight: bold;
		font-family: var(--font-second);
		line-height: 1.5;
		color: black;
		text-align: center;
		text-transform: uppercase;
		margin: 133px * 95px;
		@media (min-width: 424px) and (max-width: 900px) {
			font-size: 26px;
			margin: 80px * 50px;
		}
		@media (max-width: 425px) {
			margin: 40px * 30px;
			font-size: 22px;
		}
	}
	.info-canvas {
		margin-bottom: 100px;
		min-height: 695px;
		height: 1px;
		.main-image {
			height: 450px;
			width: 450px;
			margin: auto;
			margin-top: 85px;
			background-color: white;
			border-radius: 50%;
			/* border: solid 3px #a2a2a2; */
			position: absolute;
			left: 0;
			right: 0;
			&:before {
				transform-origin: center center;
				transform: rotateZ(45deg);
				/* transition: transform .6s ease-in; */
				transition: transform .5s ease-out;
				display: block;
				content: "";
				border-radius: 50%;
				z-index: -1;
				position: absolute;
				height: calc(100% +6px);
				width: calc(100% +6px);
				top: -3px;
				bottom: -3px;
				left: -3px;
				right: -3px;
				background-image: linear-gradient(#fe7f3a, #51277d 15%, #822efe, #51277d);
				background-image: conic-gradient(#fe7f3a, #fe7f3a, #822efe 13%, #51277d 65%, #b968cf 91%, #fe7f3a, #fe7f3a);
				@media (max-width: 900px) {
					transform: rotateZ(70deg);
				}
			}
			img {
				/* bottom: calc(50% - 105px/2 - 15px/2); */
				bottom: calc(-37%);
				left: calc(50% - 4px/2);
				z-index: 1;
				/* margin: -105px -10px -19px -13px; */
				position: relative;
				max-width: 80%;
				transform: translate(-50%, -50%);
			}
			.dots {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				margin: auto;
				width: 100%;
				height: 100%;
				.dot {
					width: 20px;
					height: 20px;
					background-color: gray;
					border-radius: 50%;
					position: absolute;
					margin: -10px 0 0 -10px;
					@media (min-width: 901px) {
						&:nth-child(1) {
							top: 14.4%;
							left: 14.4%;
						}
						&:nth-child(2) {
							top: 85.6%;
							left: 14.4%;
						}
						&:nth-child(3) {
							top: 85.6%;
							left: 85.6%;
						}
						&:nth-child(4) {
							top: 14.4%;
							left: 85.6%;
						}
					}
					@media (max-width: 900px) {
						&:nth-child(1) {
							top: 100%;
							left: 50%;
						}
						&:nth-child(2) {
							top: 25%;
							left: 93.5%;
						}
						&:nth-child(3) {
							top: 75%;
							left: 93.5%;
						}
						&:nth-child(4) {
							top: 0%;
							left: 50%;
						}
					}
				}
				.layer {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					margin: auto;
					width: 100%;
					height: 100%;
					transition: transform .5s ease-out;
					backface-visibility: hidden;
					&:after {
						display: block;
						content: "";
						width: 20px;
						height: 20px;
						background-color: currentColor;
						border-radius: 50%;
						position: absolute;
						margin: -10px 0 0 -10px;
						left: 50%;
						top: 0;
					}
					@media (min-width: 901px) {
						&:nth-child(1) {
							transform: rotateZ(45deg);
							color: #fe7f3a;
						}
						&:nth-child(2) {
							transform: rotateZ(135deg);
							color: #822efe;
						}
						&:nth-child(3) {
							transform: rotateZ(225deg);
							color: #51277d;
						}
						&:nth-child(4) {
							transform: rotateZ(315deg);
							color: #822efe;
						}
					}

					@media (max-width: 900px) {
						&:nth-child(1) {
							color: #822efe;
						}
						&:nth-child(2) {
							color: #fe7f3a;
						}
						&:nth-child(3) {
							color: #822efe;
						}
						&:nth-child(4) {
							color: #51277d;
						}
					}
					@media (min-width: 651px) and (max-width: 900px) {
						&:nth-child(1) {
							transform: rotateZ(15deg);
						}
						&:nth-child(2) {
							transform: rotateZ(75deg);
						}
						&:nth-child(3) {
							transform: rotateZ(135deg);
						}
						&:nth-child(4) {
							transform: rotateZ(195deg);
						}
					}
				}
			}
		}
		.text-blocks {
			position: relative;
			min-height: 100%;
			height: 1px;
			&:after {
				display: block;
				visibility: hidden;
				clear: both;
				height: 0;
				content: ' ';
			}
		}
		.block {
			&-title {
				font-family: var(--font-second);
				font-size: 18px;
				font-weight: bold;
				line-height: 1.22;
				text-transform: uppercase;
			}
		}
		.block-list {
			padding: 0;
			margin: 0;
			li {
				margin: 6px *;
				list-style: none;
				position: relative;
				padding-left: 2em;
				font-size: 15px;
				line-height: 1.3;
				@media (max-width: 425px) {
					font-size: 14px;
				}
				span {
					color: #000;
				}
				&:after {
					content: "";
					position: absolute;
					left: 10px;
					border-radius: 50%;
					top: .65em;
					width: 5px;
					height: 5px;
					background-color: currentColor;
				}
			}
		}
		/*=======================================
		=            More then 900px            =
		=======================================*/

		@media (min-width: 901px) {
			.text-blocks {
				.left,
				.right {
					width: 50%;
					height: 100%;
					max-height: 535px;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
				}
				.left {
					float: left;
					text-align: right;
					.block {
						padding-right: 85px;
						padding-left: 0;
						&:nth-child(1) {
							padding-right: 130px;
							padding-top: 55px;
							color: #822efe;
							li:nth-child(2) {
								margin-right: 40px;
							}
							li:nth-child(3) {
								margin-right: 80px;
							}
						}
						&:nth-child(2) {
							padding-right: 180px;
							padding-top: 55px;
							color: #51277d;
							.block-title {
								margin-right: 60px;
							}
							li:nth-child(1) {
								margin-right: 60px;
							}
							li:nth-child(2) {
								margin-right: 45px;
							}
							li:nth-child(3) {
								margin-right: 10px;
							}
						}
						&-title {
							text-align: right;
						}
						li {
							padding-right: 1em;
							padding-left: 0px;
							&:after {
								left: auto;
								right: 2px;
							}
						}
					}
				}
				.right {
					float: right;
					.block {
						padding-left: 85px;
						padding-left: 0;
						&:nth-child(1) {
							padding-left: 130px;
							padding-top: 55px;
							color: #fe7f3a;
							li:nth-child(2) {
								margin-left: 40px;
							}
							li:nth-child(3) {
								margin-left: 80px;
							}
						}
						&:nth-child(2) {
							padding-left: 180px;
							padding-top: 55px;
							color: #b968cf;
							.block-title {
								margin-left: 60px;
							}
							li:nth-child(1) {
								margin-left: 60px;
							}
							li:nth-child(2) {
								margin-left: 45px;
							}
							li:nth-child(3) {
								margin-left: 10px;
							}
						}
						&-title {
							text-align: left;
						}
					}
				}
			}
			.block-list {
				li {
					padding-left: 1em;
					&:after {
						left: 2px;
					}
				}
			}
			.block {
				padding-left: 85px;
			}
		}

		/*=====  End of More then 900px  ======*/


		/*======================================================
		=            Tablet (between 650 and 900px)            =
		======================================================*/

		@media (max-width: 900px) and (min-width: 651px) {
			min-height: 695px;
			margin-bottom: 60px;
			.main-image {
				margin: 60px 18px;
				width: 364px;
				height: 364px;
			}
			.block {
				position: absolute;
				right: 0;
			}
			.left {
				.block {
					&:nth-child(1) {
						color: #822efe;
						left: 225px;
						top: 0;
						li:nth-child(2) {
							margin-left: 60px;
						}
						li:nth-child(3) {
							margin-left: 120px;
						}
					}
					&:nth-child(2) {
						color: #fe7f3a;
						left: 385px;
						top: 185px;
						.block-title {
						}
						li:nth-child(1) {
						}
						li:nth-child(2) {
						}
						li:nth-child(3) {
						}
					}
					&-title {
						text-align: left;
					}
				}
			}
			.right {
				.block {
					&:nth-child(1) {
						color: #822efe;
						left: 340px;
						top: 361px;
						li:nth-child(2) {
							margin-left: -40px;
						}
						li:nth-child(3) {
							margin-left: -100px;
						}
					}
					&:nth-child(2) {
						color: #51277d;
						left: 40px;
						top: 445px;
						.block-title {
						}
						li:nth-child(1) {
						}
						li:nth-child(2) {
						}
						li:nth-child(3) {
						}
					}
					&-title {
						text-align: left;
					}
				}
			}
		}

		/*=====  End of Tablet (between 425 and 900px)  ======*/


		/*============================================
		=            Mobile (until 650px)            =
		============================================*/

		@media (max-width: 650px) {
			min-height: 430px;
			margin-bottom: 40px;
			position: sticky;
			top: calc(50% - 273px/2 - 206px/2);
			.main-image {
				width: 273px;
				height: 273px;
				margin: 45px 0 45px 0;
				&:before {
					height: calc(100% + 4px);
					width: calc(100% + 4px);
					top: -2px;
					bottom: -2px;
					left: -2px;
					right: -2px;
				}
				.dots .layer {
					&:after {
						width: 10px;
						height: 10px;
						margin: -6px 0 0 -6px;
					}
				}
				&[data-selected-index="0"] {
					&:before {
						transform: rotateZ(140deg);
					}
					.layer {
						&:nth-child(1) {
							transform: rotateZ(15deg);
							&:after {
								width: 13px;
								height: 13px;
								margin: -7.5px 0 0 -7.5px;
							}
						}
						&:nth-child(2) {
							transform: rotateZ(140deg);
						}
						&:nth-child(3) {
							transform: rotateZ(180deg);
						}
						&:nth-child(4) {
							transform: rotateZ(220deg);
						}
					}
				}
				&[data-selected-index="1"] {
					&:before {
						transform: rotateZ(15deg);
					}
					.layer {
						&:nth-child(1) {
							transform: rotateZ(-25deg);
						}
						&:nth-child(2) {
							transform: rotateZ(15deg);
							&:after {
								width: 13px;
								height: 13px;
								margin: -7.5px 0 0 -7.5px;
							}
						}
						&:nth-child(3) {
							transform: rotateZ(140deg);
						}
						&:nth-child(4) {
							transform: rotateZ(180deg);
						}
					}
				}
				&[data-selected-index="2"] {
					&:before {
						transform: rotateZ(-25deg);
					}
					.layer {
						&:nth-child(1) {
							transform: rotateZ(-65deg);
						}
						&:nth-child(2) {
							transform: rotateZ(-25deg);
						}
						&:nth-child(3) {
							transform: rotateZ(15deg);
							&:after {
								width: 13px;
								height: 13px;
								margin: -7.5px 0 0 -7.5px;
							}
						}
						&:nth-child(4) {
							transform: rotateZ(140deg);
						}
					}
				}
				&[data-selected-index="3"] {
					&:before {
						transform: rotateZ(-65deg);
					}
					.layer {
						&:nth-child(1) {
							transform: rotateZ(-105deg);
						}
						&:nth-child(2) {
							transform: rotateZ(-65deg);
						}
						&:nth-child(3) {
							transform: rotateZ(-25deg);
						}
						&:nth-child(4) {
							transform: rotateZ(15deg);
							&:after {
								width: 13px;
								height: 13px;
								margin: -7.5px 0 0 -7.5px;
							}
						}
					}
				}
			}
			.text-blocks {
				.block {
					display: none;
					padding-left: 165px;
					opacity: 0;
					li:nth-child(1) {
						margin-left: 30px;
					}
					li:nth-child(2) {
						margin-left: 70px;
					}
					li:nth-child(3) {
						margin-left: 105px;
					}
				}
				&[data-selected-index="0"] {
					.left .block:nth-child(1) {
						display: block;
						color: #822efe;
						animation: fade-in .5s ease-out forwards;
					}
				}
				&[data-selected-index="1"] {
					.left .block:nth-child(2) {
						display: block;
						color: #fe7f3a;
						animation: fade-in .5s ease-out forwards;
					}
				}
				&[data-selected-index="2"] {
					.right .block:nth-child(1) {
						display: block;
						color: #552a7d;
						animation: fade-in .5s ease-out forwards;
					}
				}
				&[data-selected-index="3"] {
					.right .block:nth-child(2) {
						display: block;
						color: #552a7d;
						animation: fade-in .5s ease-out forwards;
					}
				}
			}
		}

		/*=====  End of Mobile (until 650px)  ======*/


		@media (max-width: 450px) {
			.main-image {
				margin: 45px 0 45px -105px;
			}
			.text-blocks .block {
				padding-left: 60px;
			}
		}
	}
	.scroll-appeal {
		display: none;
		position: absolute;
		bottom: -15%;
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
				border-right: 2px solid #000;
				border-bottom: 2px solid #000;
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

@keyframes fade-in {
	from {display: none}
	1% {display: block; opacity: 0;}
	to {opacity: 1;}
}

@keyframes arrow-fading {
	from {opacity: 0;}
	to {opacity: 1;}
}
</style>

<template lang="pug">
div.about-us
	.limit
		.main-title Школа здорового питания&nbsp;и тренировок
		.caption Наша миссия — сделать ЗОЖ понятным&nbsp;и доступным для каждого
		.description
			.row
				.text-side
					p.title Наша цель
					p Показать, что спорт&nbsp;и здоровое питание могут быть в удовольствие; научить каждого выстраивать поэтапную работу с питанием&nbsp;и тренировками с учетом личных целей, состояния здоровья&nbsp;и жизненного графика
				.image.landscape
					.shine
					webp-img(src='about-us/photo-1.png')
			.row
				.text-side
					.title Что мы делаем
					p Курсы здорового питания&nbsp;и разумного фитнеса: офлайн в Москве&nbsp;и Санкт-Петербурге, онлайн — по всему миру
					p
						b Социальные проекты:
					ul
						li бесплатный научный журнал&ensp;
							a(href='https://sektascience.com' target="_BLANK" rel="noopener noreferrer") sektascience.com
							| ;
						li образовательные спортивные мероприятия,&ensp;
							br
							| в том числе для людей с ограниченными возможностями;
						li научные исследования.
				.image.portrait
					.shine
					webp-img(src='about-us/photo-2.png')
			.row
				.text-side
					p.title Идеальное тело «по Секте»
					p Это возможность жить полной жизнью без жестких правил и запретов; жить, не боясь еды, не загоняя себя на тренировках до полного изнеможения
				.image.landscape
					.shine
					webp-img(src='about-us/photo-3.png')
			.row
				.text-side
					p.title Школа Идеального Тела #Sekta — это
					ul
						li 7 лет работы;
						li 6 специализированных программ: для женщин, мужчин, мам и беременных, новичков в спорте, людей старшего возраста и с ограничения по нагрузке;
						li 100 000 выпускников;
						li 1500 человек в месяц на онлайн-курсах;
						li 70 тренеров и консультантов по питанию;
						li 7 залов в Москве и Санкт-Петербурге
				.image.portrait
					.shine
					webp-img(src='about-us/photo-4.png')

</template>

<script>
export default {
	name: 'AboutUs',
	metaInfo: {
		title: 'О #sekta',
		description: 'Школа идеального тела #sekta - это прежде всего сообщество единомышленников. Наша миссия - сделать ЗОЖ поянтным и доступным для всех. '
	},
	components: {
		WebpImg: () => import("@/components/webp-img.vue"),
	},
	mounted() {
		this.descriptionImages = document.querySelectorAll('.about-us .description .image');
		window.addEventListener('mousemove', this.moveHandler, false);
		window.addEventListener('scroll', this.moveHandler, false);
	},
	beforeDestroy() {
		window.removeEventListener('mousemove', this.moveHandler, false);
		window.removeEventListener('scroll', this.moveHandler, false);
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
		moveHandler(event) {
			requestAnimationFrame(()=>{

				let screenWidth = document.documentElement.clientWidth;
				let screenHeight = document.documentElement.clientHeight;

				if (screenWidth > this.mobileSize && !!event.pageX) {
					let currentMousePosition = [event.pageX, event.pageY];

					this.descriptionImages.forEach((wrapper)=>{
						let wrapperPos = wrapper.getBoundingClientRect();
						let tileCenter = {
							x: wrapperPos.x + window.pageXOffset + wrapperPos.width/2,
							y: wrapperPos.y + window.pageYOffset + wrapperPos.height/2
						}

						let offsetX = (()=>{
							let result = ( tileCenter.x - currentMousePosition[0] ) /60;
							let toCenter = 10 *((tileCenter.x / screenWidth) -0.5);
							let maxDegree = 1000/wrapperPos.width;
							return Math.min(maxDegree +toCenter, Math.max(-maxDegree +toCenter, result + toCenter))
						})();
						let offsetY = (()=>{
							let result = ( tileCenter.y - currentMousePosition[1] ) /60;
							let maxDegree = 1000/wrapperPos.height;
							return Math.min(maxDegree, Math.max(-maxDegree, result))
						})();
						let transfomString = `rotateX(${offsetY}deg) rotateY(${-offsetX}deg)`
						wrapper.style.transform = transfomString;


						const getFlareGradient = ()=>{
							let dy = tileCenter.y - currentMousePosition[1],
							dx = tileCenter.x - currentMousePosition[0],
							theta = Math.atan2(dy, dx), //angle between cursor and center of poster in RAD
							angle = theta * 180 / Math.PI - 90; //convert rad in degrees
							//get angle between 0-360
							if (angle < 0) {
								angle = angle + 360;
							}
							let alpha = Math.max(0, Math.min(1,
									(wrapperPos.y + window.pageYOffset + wrapperPos.height - currentMousePosition[1]) /wrapperPos.height
								));
							let gray = Math.max(0, Math.min(255,
									(wrapperPos.y + window.pageYOffset + wrapperPos.height - currentMousePosition[1]) /20 /10 * 25.5
								));
							return `linear-gradient(${angle}deg, rgba(255,255,255,${alpha}) 0%,rgba(255,255,255,0) 80%)`
						}
						wrapper.getElementsByClassName('shine')[0].style.background = getFlareGradient();

					});
				}
				if (screenWidth <= this.mobileSize) {
					this.descriptionImages.forEach((wrapper)=>{
						let wrapperPos = wrapper.getBoundingClientRect();
						let progress = Math.max(0, Math.min(1,
							(wrapperPos.y + wrapperPos.height/2) /screenHeight -0.1
						));
						let maxDegree = 5000/wrapperPos.height;
						let offsetY = maxDegree * progress - maxDegree/2;

						let transfomString = `rotateX(${offsetY}deg)`
						wrapper.style.transform = transfomString;
					});
				}

			});

		},
	},
	data () {
		return {
			scrollThrotling: {
				forLastExec: null,
				delay: 100,
				throttled: false
			},
			mobileSize: 560,
			descriptionImages: [],
		}
	}
}
</script>

<style lang="postcss">
.about-us {
	padding-top: 55px;
	@media (max-width: 560px) {
		padding-top: 20px;
	}
	.main-title {
		font-family: var(--font-second);
		font-size: 30px;
		font-weight: 800;
		color: #232323;
		text-transform: uppercase;
		@media (max-width: 560px) {
			font-size: 20px;
			line-height: 1.2;
		}
	}
	.caption {
		font-size: 16px;
		font-style: italic;
		font-weight: bold;
		color: var(--accent_color);
		@media (max-width: 560px) {
			font-size: 14px;
			margin: 8px *;
		}
	}
	.description {
		.row {
			display: flex;
			width: 100%;
			align-items: center;
			transform-style: preserve-3d;
			transform: perspective(800px);
		}
		.text-side {
			margin: 10px 4% 10px 9%;
			line-height: 1.38;
			color: #232323;
			.title {
				font-family: var(--font-second);
				font-size: 20px;
				margin-top: 40px;
				font-weight: bold;
				color: var(--accent_color);
			}
			ul {
				padding-left: 0;
				>li {
					margin: 7px *;
					margin-left: 1.2rem;
				}
			}
		}
		.image {
			max-width: 50%;
			width: 100%;
			flex-shrink: 0;
			position: relative;
			@media (max-width: 560px) {
				transform-origin: bottom center;
			}
			.shine {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				z-index: 1;
				mix-blend-mode: overlay;
				opacity: .5;
				@media (max-width: 560px) {
					display: none;
				}
			}
			&.landscape {
				margin: -0.7% -1.2% -3% -2.5%;
			}
			&.portrait {
				margin: -2.2% -1.9% -3.9% -3.5%;
			}
		}
		.row:nth-child(even) {
			flex-direction: row-reverse;
			.text-side {
				margin: 10px 4% 10px 6%;
			}
		}
		@media (max-width: 560px) {
			.row {
				flex-direction: column !important;
				.image {
					max-width: none;
					width: auto;
					&.landscape {
						margin: -2% -3% -6% -5%;
					}
					&.portrait {
						margin: -3.5% 0% -7.5% -17.5%;
						width: calc(100% - 5.5%);
					}
				}
				.text-side {
					margin: 0 0 10px 0 !important;
					.title {
						margin: 40px 0 10px;
						p {
							margin: 10px 0;
							line-height: 1.57;
							font-size: 14px;
						}
					}
				}
			}
		}
	}
}
</style>

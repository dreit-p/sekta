<template lang="pug">
section.decorated_list
	.limit
		.title
			.big-text четыре типа питания
			.small-text выбирай один или попробуй разные
		.list
			.point
				.pt-title «строгое»
				.text
					| Подходит людям без пищевых расстройств, не склонных 
					br
					| к компенсации. Тем, кто любит соблюдать правила и хочет увидеть быстрый результат.
				svg(xmlns='http://www.w3.org/2000/svg' width='113' height='141')
					defs
						lineargradient#a(x1='57.358%' x2='0%' y1='0%' y2='81.915%')
							stop(offset='0%' stop-color='#ED6F54')
							stop(offset='56%' stop-color='#B23CAC')
							stop(offset='76%' stop-color='#A531BE')
							stop(offset='100%' stop-color='#9725D0')
					text(fill='url(#a)' transform='matrix(1.27606 0 0 1.27606 .403 141.321)')
						tspan 1
			.point
				.pt-title «Оптимальное»
				.text
					| Подходит всем, кто не готов 
					br
					| к жестким ограничениям.
				svg(xmlns='http://www.w3.org/2000/svg' width='113' height='141')
					defs
						lineargradient#a(x1='57.358%' x2='0%' y1='0%' y2='81.915%')
							stop(offset='0%' stop-color='#ED6F54')
							stop(offset='56%' stop-color='#B23CAC')
							stop(offset='76%' stop-color='#A531BE')
							stop(offset='100%' stop-color='#9725D0')
					text(fill='url(#a)' transform='matrix(1.27606 0 0 1.27606 .403 141.321)')
						tspan 2
			.point
				.pt-title «высокожировое»
				.text
					| Подходит людям с инсулино-
					br
					| резистентностью, склонным 
					br
					| к полноте и тем, кто не может сбросить вес на диетах с углеводами.
				svg(xmlns='http://www.w3.org/2000/svg' width='113' height='141')
					defs
						lineargradient#a(x1='57.358%' x2='0%' y1='0%' y2='81.915%')
							stop(offset='0%' stop-color='#ED6F54')
							stop(offset='56%' stop-color='#B23CAC')
							stop(offset='76%' stop-color='#A531BE')
							stop(offset='100%' stop-color='#9725D0')
					text(fill='url(#a)' transform='matrix(1.27606 0 0 1.27606 .403 139.321)')
						tspan 3
			.point
				.pt-title «вегетарианское»
				.text
					| Для тех, кто хочет перейти на вегетарианство или сделать уже практикуемый рацион более здоровым и похудеть.
				svg(xmlns='http://www.w3.org/2000/svg' width='113' height='141')
					defs
						lineargradient#a(x1='57.358%' x2='0%' y1='0%' y2='81.915%')
							stop(offset='0%' stop-color='#ED6F54')
							stop(offset='56%' stop-color='#B23CAC')
							stop(offset='76%' stop-color='#A531BE')
							stop(offset='100%' stop-color='#9725D0')
					text(fill='url(#a)' transform='matrix(1.27606 0 0 1.27606 .403 141.321)')
						tspan 4
	.parallax-elems
		.bead.line(data-rellax-speed='2' style='top: 35%; left: 5%; opacity: .3; color: #ff803a;')
		.bead.line(data-rellax-speed='4' style='top: 80%; left: 23%; opacity: .6; color: #c54ecb; transform: rotateZ(-45deg);')
		.bead.line(data-rellax-speed='3' style='top: 70%; left: 83%; opacity: .4; color: #9725d0; transform: rotateZ(-45deg);')
		.bead.circle(data-rellax-speed='5' style='top: 55%; left: 7%; opacity: .4; color: #b23cac')
		.bead.circle(data-rellax-speed='-1' style='top: 50%; left: 45%; opacity: .2; color: #ff6a00; transform: scale(.7); z-index: -1')
		.bead.circle(data-rellax-speed='5' style='top: 38%; left: 80%; opacity: .4; color: #ff6a00')
		.bead.spot(data-rellax-speed='-3' style='top: 40%; left: 70%; opacity: .2; color: #9725d0; z-index: -1')
		.bead.spot(data-rellax-speed='-2' style='top: 50%; left: 23%; opacity: .2; color: #ff6a00; z-index: -1')
		.bead.box(data-rellax-speed='2' style='top: 82%; left: 52%; opacity: .2; color: #ff803a; transform: rotateZ(45deg);')

</template>

<script>
import Rellax from 'rellax'
export default {
	name: 'EvoDecoratedList',
	mounted() {
		new Rellax('.bead', {
			speed: -2,
			center: true,
			wrapper: null,
			round: true,
			vertical: true,
			horizontal: false
		});
	}
}
</script>

<style lang="postcss">
section.decorated_list {
	position: relative;
	z-index: 0;
	.limit {
		overflow: visible;
		max-width: 1000px;
	}
	.title {
		margin: 125px * 70px;
		@media (max-width: 500px) {
			margin: 60px * 0;
		}
		text-align: center;
		.big-text {
			font-family: var(--font-second);
			font-size: 36px;
			font-weight: bold;
			line-height: 1.33;
			text-transform: uppercase;
			@media (max-width: 500px) {
				font-size: 22px;
			}
		}
		.small-text {
			font-size: 24px;
			text-transform: uppercase;
			line-height: 1.33;
			@media (max-width: 500px) {
				font-size: 16px;
			}
		}
	}
	.list {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		.point {
			margin: 50px 20px 76.5px 70px;
			max-width: 320px;
			min-height: 160px;
			background-color: white;
			padding: * 20px;
			box-shadow: -2.9px 4px 4.8px 0.3px rgba(165, 165, 165, 0.05);
			position: relative;
			&:after {
				content: "";
				display: block;
				position: absolute;
				top: -32px;
				left: -72px;
				width: 246px;
				height: 126px;
				background-image: url(~@/assets/images/evolution/circle-matrix.png);
				z-index: -1;
			}
			svg {
				position: absolute;
				top: 0;
				left: -8px;
				&,
				& * {
					font-family: var(--font-second);
				}
				text {
					letter-spacing: 0;
					font-size: 150px;
					line-height: 0.14;
					object-fit: contain;
					font-weight: bold;
					opacity: .2;
					text-align: left;
				}
			}
			.pt-title {
				margin: 11px *;
				font-family: var(--font-second);
				font-size: 17px;
				font-weight: bold;
				letter-spacing: .3px;
				text-transform: uppercase;
			}
			.text {
				color: black;
				margin: 18px *;
			}
			&:nth-child(1) {
				color: #ff6a00;
			}
			&:nth-child(2) {
				color: #c54ecb;
			}
			&:nth-child(3) {
				color: #7800ff;
			}
			&:nth-child(4) {
				color: #430088;
			}
		}
		@media (min-width: 1001px) {
			.point {
				&:nth-child(1) {
					margin: 50px 20px 76.5px 70px;
				}
				&:nth-child(2) {
					margin: 50px 0 76.5px 150px;
				}
				&:nth-child(3) {
					margin: 50px 20px 76.5px 221px;
				}
				&:nth-child(4) {
					margin: 50px 0px 76.5px 80px;
				}
			}
		}
		@media (max-width: 1000px) {
			.point {
				align-self: flex-start;
				margin: 62px 15px 20px;
				&:nth-child(even) {
					align-self: flex-end;
				}
				&:after {
					left: -15px;
				}
			}
		}
		@media (min-width: 720px) and (max-width: 1000px) {
			.point {
				margin: * 0px * 20px;
			}
			justify-content: space-around;
		}
		@media (max-width: 720px) {
			flex-direction: column;
			align-items: center;
		}
		@media (max-width: 500px) {
			.point {
				align-self: center !important;
			}
		}
	}
	.parallax-elems {
		position: absolute;
		top: -60px;
		left: 0;
		right: 0;
		bottom: -60px;
		overflow: hidden;
		pointer-events: none;
		&:before {
			content: "";
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: 60px;
			z-index: 10;
			background-image: linear-gradient(to bottom, white, rgba(255, 255, 255, 0));
		}
		&:after {
			content: "";
			display: block;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 60px;
			z-index: 10;
			background-image: linear-gradient(to top, white, rgba(255, 255, 255, 0));
		}
	}
	.bead {
		position: absolute;
		z-index: 1;
		transform-origin: center center;
		/* position: relative; */
		&.line {
			width: 110px;
			height: 50px;
			&:after {
				content: "";
				position: absolute;
				display: block;
				width: 100%;
				height: 3px;
				transform: rotateZ(18deg);
				background-color: currentColor;
			}
		}
		&.circle {
			width: 93px;
			height: 93px;
			border-radius: 50%;
			border: 3px solid currentColor;
		}
		&.spot {
			width: 21px;
			height: 21px;
			border-radius: 50%;
			background-color: currentColor;
		}
		&.box {
			width: 80px;
			height: 80px;
			border: 3px solid currentColor;
		}
	}
}
</style>

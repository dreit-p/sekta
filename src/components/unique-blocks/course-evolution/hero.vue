<template lang="pug">
section.evo-hero
	.limit
		.text-side
			img.evo-logo(src='@/assets/images/evolution/logo-evolution.svg' alt='')
			.colored-caption
				| онлайн фитнес-курс 
				br
				| у вас дома
			.text
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
			.notice
				| Длится 10 недель 
				br
				| старт каждый понедельник
			img.pair(src='@/assets/images/evolution/img-pair-flip.png' alt='')
			purple-btn(@click='scrollTo("entry-form")') Записаться на курс
		.img-side
			img.pair(src='@/assets/images/evolution/img-pair-flip.png' alt='')


</template>

<script>
export default {
	name: 'EvolutionHero',
	components: {
		PurpleBtn: () => import('@/components/form/purple-btn.vue'),
	},
	methods: {
		scrollTo(id) {
			window.scrollTo({
				top: getPosition(document.getElementById(id)).y -65,
				behavior: "smooth"
			});
			function getPosition(el) {

				var x = 0,
					y = 0;

				while (el != null && (el.tagName || '').toLowerCase() != 'html') {
					x += el.offsetLeft || 0; 
					y += el.offsetTop || 0;
					el = el.offsetParent;
				}

				return { x: parseInt(x, 10), y: parseInt(y, 10) };
			}
		}
	},
}
</script>

<style lang="postcss">
section.evo-hero {
	background-color: #f5f5f5;
	overflow: hidden;
	.limit {
		display: flex;
		max-height: calc(var(--col-total) * 6);
		width: 100%;
		height: 100vw;
		align-items: center;
		overflow: visible;
		@media (max-width: 900px) {
			height: auto;
			max-height: none;
		}
	}
	.text-side {
		flex-grow: 1;
		flex-basis: 407px;
		padding: 24px *;
		margin-top: 180px;
		@media (max-width: 900px) {
			display: flex;
			padding: 24px *;
			margin: auto;
			flex-direction: column;
			align-items: center;
			.text,
			.notice {
				display: none;
			}
			.evo-logo,
			.colored-caption {
				display: inline-block;
				align-self: flex-start;
			}
		}
		@media (max-width: 600px) {
			.evo-logo,
			.colored-caption {
				align-self: center;
			}
			.colored-caption {
				margin-right: 20px;
			}
		}
		.evo-logo {
			max-height: 60px;
			max-width: 100%;
			display: inline-block;
		}
		.colored-caption {
			margin: 15px *;
			color: #5f1ab3;
			font-size: 22px;
			line-height: 1.27;
			font-family: var(--font-second);
			font-weight: bold;
			text-transform: uppercase;
			background-image: linear-gradient(201deg, #932b8e, #5f1ab3);
			background-clip: text;
			-webkit-text-fill-color: transparent;
		}
		.notice {
			margin: 54px * 22px;
			font-size: 22px;
			font-family: var(--font-second);
			font-weight: bold;
			text-transform: uppercase;
			color: var(--bt-dark_elems);
		}
		img.pair {
			display: none;
			transform: scaleX(-1);
			filter: FlipH;
			max-width: 100%;
			width: 300px;
			margin: -20px 10px -10px;
			@media (max-width: 900px) {
				display: block;
				margin-top: -50px;
			}
			@media (max-width: 600px) {
				margin-top: -20px;
			}
		}
	}
	.img-side {
		align-self: flex-end;
		flex-basis: 720px;
		margin-right: -135px;
		@media (max-width: 900px) {
			display: none;
		}
		img.pair {
			min-width: 100%;
		}
	}
}
</style>

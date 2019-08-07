<template lang="pug">
section.appeal
	.limit
		.text-side
			.big-text запишитесь сейчас
			.medium-text ближайший старт
			.highlighted-text 22 июля – VK
			.highlighted-text 22 июля – Telegram
			a.purple-btn(@click='scrollTo("entry-form")')
				.border
				.btn Записаться на курс
		.img-side
			img.girl(src='@/assets/images/evolution/girl-2.png' alt='')
	.bg-title
		.img-wrapper
			img(src='@/assets/images/evolution/logo-EVO.svg' alt='')


</template>

<script>
export default {
	name: 'EvoAppeal',
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
section.appeal {
	margin: 150px * 18%;
	position: relative;
	@media (min-width: 1440px) {
		margin-bottom: calc(150px + 135px);
	}
	@media (max-width: 768px) {
		margin-bottom: 50px;
	}
	@media (max-width: 700px) {
		margin: 60px * 0 !important;
	}
	.limit {
		display: flex;
		justify-content: center;
		align-items: center;
		max-width: 1200px;
		overflow: visible;
		@media (max-width: 800px) {
			justify-content: space-around;
		}
		@media (max-width: 700px) {
			flex-direction: column-reverse;
		}
	}
	.text-side {
		/* padding-bottom: 100px; */
		@media (max-width: 700px) {
			text-align: center;
		}
		.big-text {
			text-transform: uppercase;
			margin: 51px * 40px;
			font-size: 36px;
			font-weight: bold;
			font-family: var(--font-second);
			@media (max-width: 800px) {
				font-size: 26px;
				margin-bottom: 30px;
			}
			@media (max-width: 700px) {
				margin: 15px * 18px !important;
			}
		}
		.medium-text {
			text-transform: uppercase;
			font-size: 24px;
			line-height: .92;
			@media (max-width: 800px) {
				font-size: 20px;
			}
		}
		.highlighted-text {
			color: #ff6a00;
			font-size: 36px;
			margin: 10px *;
			@media (max-width: 800px) {
				font-size: 26px;
			}
		}
		.purple-btn {
			margin: 40px *;
			@media (max-width: 700px) {
				margin: 30px *;
			}
		}
	}
	.img-side {
		max-height: 410px;
		img {
			height: 45vw;
			max-height: 558px;
			min-height: 342px;
		}
	}
	.bg-title {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		@media (max-width: 700px) {
			height: 420px;
		}
		.img-wrapper {
			height: 15vw;
			overflow: hidden;
			width: 100%;
			max-width: 1920px;
			margin-bottom: 60px;
			z-index: -1;
			@media (max-width: 700px) {
				z-index: 0;
			}
		}
		img {
			width: 100%;
			opacity: .5;
		}
	}
}
</style>

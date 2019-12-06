<template lang="pug">
section.course_info
	img.animated_svg(src='@/assets/images/evolution/animated-svg.svg' alt='')
	.limit
		.text_blocks
			.block
				.text.big 10 недель
				.text.small длительность курса
			.block
				.text.groups(v-if='startDates')
					.group
						.data {{startDates.vk}}
						.caption Групповой чат ВКонтакте
					.group
						.data {{startDates.tg}}
						.caption Групповой чат в&nbsp;Telegram
				.text.small ближайший старт
			.block
				.text.big
					| 1500
					span(style='font-size: .8em') ₽
				.text.small стоимость одной недели
		a.purple-btn(@click='scrollTo("entry-form")')
			.border
			.btn Записаться на курс

</template>

<script>
export default {
	name: 'EvoCourseInfo',
	props: {
		startDates: {
			type: Object,
			default: ()=>{}
		},
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
section.course_info {
	position: relative;
	text-align: center;
	img {
		opacity: .15;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		@media (max-width: 900px) {
			display: none;
		}
	}
	.text_blocks {
		width: 100%;
		display: flex;
		justify-content: space-around;
		padding: 30px;
		@media (max-width: 700px) {
			flex-direction: column;
			padding: 10px;
			.block {
				padding: 0 0 30px;
			}
		}
		.block {
			padding: * 15px;
			.text {
				color: #5f1ab3;
				text-align: center;
				text-transform: uppercase;
				@media (max-width: 820px) {
					&.big {
						font-size: 24px;
					}
					&.small {
						font-size: 14px;
					}
				}
				&.groups {
					display: flex;
					.group {
						text-transform: none;
						border-left: 1px solid #5f1ab3;
						padding: * 7px;
						font-weight: 500;
						margin: 7px *;
						flex-grow: 1;
						text-align: left;
						&:first-child {
							border: none;
							text-align: right;
						}
					}
				}
				&.big {
					font-family: var(--font-second);
					font-size: 36px;
					font-weight: 500;
					white-space: nowrap;
					line-height: 1.47;
				}
				&.small {
					font-size: 16px;
					line-height: 1.47;
				}
			}
		}
	}
	.purple-btn {
		margin-bottom: 40px;
	}
}
</style>

<template lang="pug">
div
	.order-info-block
		.limit
			.wrapper
				.main-text
					| Номер вашей заявки: 
					span.variable-text 123456789 от 12.01.2019
				p.caption Вы выбрали:
				span.variable-text #S60Days
				p.caption Дата старта:
				span.variable-text
					| VK – 08 октября
					br
					| Telegram – 08 октября
				p.caption Длительность курса:
				span.variable-text 9 недель
				p.caption Сколько недель вы хотите оплатить?
				span.variable-text 9 недель

				p.variable-text.small Итого к оплате: 2 700 руб.

</template>

<script>
	export default {
		name: 'Order',
		components: {
		},
		data () {
			return {}
		}
	}
</script>

<style lang="postcss" scoped>
.order-info-block {
	.wrapper {
		margin: 25px 0;
		display: inline-block;
		--faint-gray: #808080;
	}
	.main-text {
		font-size: 22px;
		color: var(--faint-gray);
		margin: 20px 0;
		.variable-text {
			font-size: inherit;
		}
	}
	.caption {
		font-size: 12px;
		line-height: 1.5;
		margin: 16px 0 3px;
	}
	.variable-text {
		font-weight: bold;
		color: black;
		font-size: 18px;
		letter-spacing: 0.06875rem;
		line-height: 1.33;
		font-family: var(--font-second);
	}
	.inline {
		display: flex;
		flex-wrap: wrap;
		margin-left: -86px;
		.caption {
			margin-left: 86px;
		}
	}
}
</style>

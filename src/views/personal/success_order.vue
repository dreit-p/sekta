<template lang="pug">
div
	.order-info-block
		.limit
			.wrapper
				.main-text
					| Номер вашей заявки: 
					span.variable-text 123456789 от 12.01.2019
				p.caption Вы выбрали курс:
				span.variable-text Основное направление
				p.caption Расположение зала:
				span.variable-text м. Кропоткинская
				p.caption Количество тренировок в неделю:
				span.variable-text 6
				p.caption Время тренировок:
				span.variable-text пн-пт 8:00 
					br
					| сб 10:30, 12:00, 13:30
				.inline
					.caption Сумма: 
						span.variable-text 6 500 руб
					.caption Статус заявки: 
						span.variable-text оплачена 12.01.2019

</template>

<script>
export default {
	name: 'SuccessOrder',
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

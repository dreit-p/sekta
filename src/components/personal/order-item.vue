<template lang="pug">
div
	.order-info-block
		.limit
			.wrapper
				.main-text
					| Номер вашей заявки: 
					span.variable-text {{ this.number }} от {{ this.orderDate }}
				p.caption Вы выбрали:
				span.variable-text {{ this.choice }}
				p.caption Дата старта:
				span.variable-text 
					| {{ this.dateStart.vk }} <br>
					| {{ this.dateStart.tg }}
				p.caption Длительность курса:
				span.variable-text {{ this.duration }} недель
				p.caption Сколько недель вы хотите оплатить?
				span.variable-text {{ this.paymentInWeeks }} недель

				p.variable-text.small Итого к оплате: 2 700 руб.
				green-btn Перейти к оплате

</template>

<script>
	export default {
		name: 'OrderItem',
		components: {
			GreenBtn: () => import('@/components/form/green-btn.vue'),
		},
		props: {
            number: {
                type: String,
                default: null
			},
			orderDate: {
				type: String,
				default: null
			},
            choice : {
                type: String,
                default: null
			},
			dateStart: {
				type: Object,
				default: null,
			},
			duration: {
				type: String,
				default: null,
			},
			paymentInWeeks: {
				type: String,
				default: null
			}
        },
		data () {
			return {}
		}
	}
</script>

<style lang="postcss" scoped>
:root {
	--faint-gray: #808080;
}
.order-info-block {
	.wrapper {
		margin: 25px 0;
		display: inline-block;
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
	.small {
		font-size: 16px;
		line-height: 1.5;
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

<template lang="pug">
order-item(
	number='123456897',
	orderDate='12.03.19',
	choice='#S60Days',
	v-bind:dateStart='dateStart',
	duration='9',
	paymentInWeeks='4'
)
</template>

<script>
const dateStart = {
	vk: 'VK – 08 октября',
	tg: 'Telegram – 08 октября'
};

export default {
	name: 'Order',
	components: {
		OrderItem: () => import('@/components/personal/order-item.vue')
	},
	data () {
		return {
			dateStart
		}
	}
}
</script>

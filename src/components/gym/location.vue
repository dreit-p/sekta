<template lang="pug">
div.location

	template(v-if='location == null')
		.text
			| У нас есть залы в двух городах. Какой подходим вам?
		.btns
			router-link(title='Тренировки в Москве', to='/gym/moscow')
				green-btn Москва
			router-link(title='Тренировки в Питере', to='/gym/saint-pitersburg')
				green-btn Санкт-Петербург
		.link(@click='location = "another"') Я в другом городе


	template(v-if='location == "another" || location != "St.-Petersburg" && location != "St.-Petersburg" && location != null')
		.text
			| К сожалению, тренировки в зале сейчас доступны только в Москве и Санкт-Петербурге. Вы можете записаться на онлайн-курс — его прошли 101 000 человек.
		.btns
			router-link(title='Страница онлайн курсов', to='/online-courses')
				green-btn Онлайн курсы


	template(v-if='location == "Moscow"')
		.text
			| Нам кажется, вы находитесь в Москве
		.btns
			router-link(title='Тренировки в Москве', to='/gym/moscow')
				green-btn Посмотреть расписание


	template(v-if='location == "St.-Petersburg"')
		.text
			| Нам кажется, вы находитесь в Санкт-Петербурге
		.btns
			router-link(title='Тренировки в Питере', to='/gym/saint-pitersburg')
				green-btn Посмотреть расписание
</template>

<script>
	export default {
		name: 'gym-location',
		components: {
			GymLocation: () => import('@/components/gym/location.vue'),
			GreenBtn: () => import('@/components/form/green-btn.vue'),
		},
		computed: {
			location: {
				get () {
					if (!this.$store.state.user.location) {
						this.$store.dispatch('updateUserLocation');
					}
					return this.$store.state.user.location
				},
				set (value) {
					this.$store.commit('setUserInfo', {type: 'location', data: value})
				}
			}
		},
		data () {
			return {}
		}
	}
</script>

<style lang="postcss" scoped>
	.location {
		margin: 50px auto 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		.text {
			width: auto;
			margin: 15px auto;
			text-align: center;
			>*,
			& {
				font-size: 18px;
				font-weight: bold;
				font-style: italic;
				line-height: 1.22;
			}
		}
		.btns {
			margin: auto;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			a {
				display: inline-block;
				/* width: 100%; */
				min-width: 220px;
				margin: 15px 35px;
			}
		}
		.green-btn {
			margin: 0;
			font-size: 22px;
			line-height: 0.9;
			width: 100%;
			padding: 14px 20px 15px;
		}
		.link {
			font-size: 18px;
			font-style: italic;
			font-weight: bold;
			line-height: 1.22;
			text-decoration: underline;
			margin: 15px 10px 10px;
		}
	}
</style>

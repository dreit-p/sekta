<template lang="pug">
transition(name='fade')
	section.cookie-notification(v-if='!isNotificationShowed')
		.limit
			.text Мы используем файлы cookie
				span.other-text(v-if='showAllText') , чтобы анализировать трафик, подбирать для вас подходящий контент и рекламу, а также дать вам возможность делиться информацией в социальных сетях. Мы передаем информацию о ваших действиях на сайте партнерам Google и Яндекс: социальным сетям и компаниям, занимающимся рекламой и веб-аналитикой. Наши партнеры могут комбинировать эти сведения с предоставленной вами информацией, а также данными, которые они получили при использовании вами их сервисов
				.read-more(@click='showAllText = !showAllText') {{ {false: 'Читать далее', true: 'Скрыть'}[showAllText] }}
			green-btn(@click='setNotificationState(true)') Ok

</template>

<script>



export default {
	name: 'CookieNotification',
	data () {
		return {
			showAllText: false,
		}
	},
	components: {
		GreenBtn: () => import('@/components/form/green-btn.vue'),
	},
	computed: {
		isNotificationShowed () {
			return this.$store.state.isCookieMsgShowed;
		},
	},
	methods: {
		setNotificationState(state) {
			this.$store.commit('setCookieNotificationState', state);
		},
	},
}
</script>

<style lang="postcss">
section.cookie-notification {
	box-shadow: 0 0 10px rgba(0,0,0,0.1);
	position: fixed;
	z-index: 5;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	background-color: white;
	padding: 12px *;
	font-size: 14px;
	line-height: 1.2;
	.read-more {
		font-weight: bold;
		font-size: 12px;
		text-decoration: underline;
		margin: 7px *;
		cursor: pointer;
	}
	.limit {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}
	.green-btn {
		margin: 0 10px;
		width: auto;
	}
}

</style>

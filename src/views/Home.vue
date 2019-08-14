<template lang="pug">
.home
	first-screen
	second-screen
</template>

<script>
// @ is an alias to /src

export default {
	name: 'Home',
	metaInfo: {
		title: 'Школа идеального тела #Sekta',
		description: 'Курсы эффективных тренировок и здорового питания. Даём все знания и инструменты, чтобы вы смогли достичь своей идеальной формы. Онлайн по всему миру, очно в Москве и Санкт-Петербурге.'
	},
	components: {
		FirstScreen: () => import('@/components/unique-blocks/main_page/first_screen.vue'),
		SecondScreen: () => import('@/components/unique-blocks/main_page/second_screen.vue')
	},
	mounted() {
		if (this.$route.name == 'login') {
			this.$store.dispatch('setFormModalState', {modalState: true, type: 'login'});
		}
	}
}
</script>

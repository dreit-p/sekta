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
		description: 'Онлайн-курс: видеотренировки, план здорового питания и поддержка опытного наставника.'
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

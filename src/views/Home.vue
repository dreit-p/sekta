<template lang="pug">
.home
	first-screen
	second-screen
</template>

<script>
// @ is an alias to /src

export default {
	name: 'home',
	components: {
		FirstScreen: () => import('@/components/old/main_page/first_screen.vue'),
		SecondScreen: () => import('@/components/old/main_page/second_screen.vue')
	}
}
</script>

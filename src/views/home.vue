<template lang="pug">
.home
	first-screen
	second-screen
</template>

<script>
// @ is an alias to /src

export default {
	name: 'Home',
	components: {
		FirstScreen: () => import('@/components/unique-blocks/main_page/first_screen.vue'),
		SecondScreen: () => import('@/components/unique-blocks/main_page/second_screen.vue')
	}
}
</script>

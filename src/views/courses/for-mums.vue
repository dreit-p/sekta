<template lang="pug">
div.course
	courses-hero(:dataf='`${require( "@/assets/images/course_bg-sectamama.jpg" )}`')
		p Программа #sektaLite подойдет людям с высоким индексом массы тела, старшей возрастной группы, перенесшим травму и новичкам в спорте.
		p Проходите курс сами или подарите близким. Если вы только начинаете осваивать интернет, мы поможем разобраться с личной страницей на сайте, где проходит обучение, и в чате, где общаются ученики и кураторы.
</template>

<script>
	export default {
		name: 'for-mums',
		props: {
			dataf: String
		},
		components: {
			CoursesHero: () => import('@/components/courses/hero.vue'),
		},
		data () {
			return {}
		}
	}
</script>

<style lang="postcss">
	
</style>

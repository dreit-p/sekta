<template lang="pug">
div
	hero
	.common-bg
		.background
			.img.left
				.lines
			.img.right
				.lines
		interractive-desc
		course-info
	video-block
	decorated-list
	appeal
	faq

	entry-form(v-if='courseInfo', bgColor='purple', bgImage='evolution/bg-form-evo.jpg', formType="online", :formData='{prices: courseInfo.prices}', :courseName='courseInfo.name')

</template>

<script>
import { mapActions } from 'vuex'

const COURSE_TAG = 'EVO';

export default {
	name: 'Evolution',
	components: {
		Hero: () => import( /* webpackChunkName: "evolution" */ '@/components/unique-blocks/course-evolution/hero.vue'),
		InterractiveDesc: () => import( /* webpackChunkName: "evolution" */ '@/components/unique-blocks/course-evolution/interractive-desc.vue'),
		CourseInfo: () => import( /* webpackChunkName: "evolution" */ '@/components/unique-blocks/course-evolution/course-info.vue'),
		VideoBlock: () => import( /* webpackChunkName: "evolution" */ '@/components/unique-blocks/course-evolution/video-block.vue'),
		DecoratedList: () => import( /* webpackChunkName: "evolution" */ '@/components/unique-blocks/course-evolution/decorated-list.vue'),
		Appeal: () => import( /* webpackChunkName: "evolution" */ '@/components/unique-blocks/course-evolution/appeal.vue'),
		faq: () => import( /* webpackChunkName: "evolution" */ '@/components/unique-blocks/course-evolution/faq.vue'),
		CaptionSection: () => import('@/components/form/contents/caption-section.vue'),
		EntryForm: () => import('@/components/entry-form.vue'),
	},
	asyncComputed: {
		courseInfo() {
			return this.$store.dispatch('updateOnlineCourses').then(()=>{
				let currentCourseData = this.$store.state.onlineCourses.find((course) => course.tag === COURSE_TAG);
				return currentCourseData;
			});
		}
	},
	data () {
		return {}
	},
	methods: {
		...mapActions(['setFormModalState'])
	},
}
</script>

<style lang="postcss">
	.common-bg {
		position: relative;
		padding-top: 1px;
		@media (min-width: 901px) {
			overflow: hidden;
		}
		&:after {
			content: "";
			display: block;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 60px;
			background-image: linear-gradient(to top, white, rgba(255, 255, 255, 0));
		}
		.background {
			position: absolute;
			overflow: hidden;
			top: 0;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			margin: auto;
			height: 100%;
			width: 100%;
			min-width: 1200px;
			@media (max-width: 900px) {
				min-width: 0;
			}
			@media (max-width: 650px) {
				display: none;
			}
			.img {
				position: absolute;
				top: 0;
				width: 50%;
				opacity: .5;
				bottom: 0;
				margin: auto;
				@media (max-width: 1500px) {
					opacity: 0.2;
				}
				.lines {
					background-size: contain;
					background-position: center bottom;
					background-repeat: no-repeat;
					height: 100%;
					width: 100%;
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					margin: auto;

				}
				&.left {
					right: auto;
					left: 0;
					margin-top: 0px;
					margin-bottom: 0;
					width: 366px;
					@media (max-width: 900px) {
						display: none;
					}
					.lines {
						background-image: url(~@/assets/images/evolution/bg_lines-left.svg);
						background-position: left center;
					}
				}
				&.right {
					left: auto;
					right: 0;
					margin-top: 0;
					margin-bottom: 0;
					width: 575px;
					@media (max-width: 900px) {
						display: none;
						opacity: .2;
						right: 50%;
						margin: -30% * -20%;
						.lines {
							transform: rotateZ(-30deg);
						}
					}
					@media (max-width: 650px) {
						width: 100%;
						right: 0;
						overflow: hidden;
						.lines {
							transform: rotateZ(0);
						}
					}
					.lines {
						background-image: url(~@/assets/images/evolution/bg_lines-right.svg);
						background-position: top right;
					}
				}
			}
		}
	}
</style>

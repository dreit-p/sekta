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
		course-info(:startDates='startDates')
	video-block
	decorated-list
	appeal(:startDates='startDates')
	faq

	entry-form(v-if='courseInfo', bgColor='purple', bgImage='evolution/bg-form-evo.jpg', formType="online", :formData='{prices: courseInfo.prices, platforms: availablePlatforms}', :courseName='courseInfo.name')

</template>

<script>
import { mapActions } from 'vuex'
import { formatDateDayMonth } from "../../assets/misc.js";

const COURSE_TAG = 'EVO';

export default {
	name: 'Evolution',
	metaInfo: {
		title: '#SektaEvo онлайн-курс',
		description: 'Основной онлайн-курс #Sekta для мужчин и женщин. 4 типа питания на выбор. Эффективная тренировочная программа. Работа над вашими целями вместе с куратором в течение 10 недель.'
	},
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
	computed: {
		startDates() {
			if (!this.courseInfo) return;
			let dates = {};
			for (let platform in this.courseInfo.start_dates) {
				if (this.courseInfo.start_dates.hasOwnProperty(platform)) {
					dates[platform] = formatDateDayMonth(this.courseInfo.start_dates[platform])
				}
			}
			return dates;
		},
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
		return {
			availablePlatforms: ['vk', 'tg'] // 'tg', 'vk', 'fb', 'sk', 'vb', 'wa', 'email'
		}
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

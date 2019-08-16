<template lang="pug">
	.result-page
		result-modal(v-if="showResultModal" :result="resultInModal" @close="toggleResultModal")
		.limit.limit_small
			h1.title Результаты
			.result-tabs
				.result-tab(v-for="(tab, index) in tabs" :class="{active: activeTabIndex === index}" @click="changeActiveTab(index,tab)") {{tab.name}}
			.result-tabs__select-block
				select.result-tabs__select(v-model="selectedTab")
					option(v-for="(tab, index) in tabs" @click="changeActiveTab(index, tab)") {{tab.name}}
		.results
			.limit
				.results__cards-block
					result-card(v-for="card in visibleResults" :result="card" @clickHandler="toggleResultModal")
				.results__carousel-block
					.results__carousel(@mouseup="slideClick" @mousedown="saveMousePosition")
						carousel(:perPage="1"  v-model="currentSlide" :paginationEnabled="false")
							slide.results__carousel-item(v-for="card in visibleResults")
								img.results__carousel-img(:src="card.image")
								.results__carousel-overlay
									.results__carousel-title {{card.name}}
					.results__carousel-menu
						.carousel-menu__prev(v-if="currentSlide !== 0" @click="changeSlide(-1)")
							svg-icon(name='down-arrow')
						.carousel-menu__counter  {{currentSlide + 1}} / {{visibleResults.length}}
						.carousel-menu__next(v-if="currentSlide !== visibleResults.length -1" @click="changeSlide(1)")
							svg-icon(name='down-arrow')
			.results__sub-block
				button.green-btn(v-if="currentResultsNum < results.length" @click="showMore()") Показать еще
				router-link.online-link(to="/online") Перейти на страницу Online тренировки

</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import api from '@/assets/api/index.js'
export default {
	name: 'Result',
	metaInfo: {
		title: 'Результаты и отзывы учеников #sekta',
		description: 'Фото до и после курсов #sekta, рассказы о личных трансформациях и настоящие истроии наших учеников.'
	},
	components: {
		Carousel,
		Slide,
		ResultCard: () => import('@/components/results/result-card.vue'),
		ResultModal: () => import('@/components/results/result-modal.vue'),
		SvgIcon: () => import("@/components/SvgIcon.vue")
	},
	data() {
		return {
			showResultModal: false,
			tabs: [{name: 'Все'}, {name:'BOOTCAMP'}],
			activeTabIndex: 0,
			selectedTab: 'Все',
			results: [],
			mousePosition: {x: 0, y: 0},
			currentResultsNum: 10,
			resultInModal: {},
			currentSlide: 0,
		}
	},
	computed: {
		visibleResults() {
			return this.results.slice(0, this.currentResultsNum)
		}
	},
	created() {
		api.getResults().then(
			res => {
				this.results = res.data.data
			},
			rej => {
			}
		)
	},
	methods: {
		changeActiveTab(index, tab) {
			this.activeTabIndex = index
			this.selectedTab = tab.name
		},
		changeSlide(number) {
			this.currentSlide +=number
		},
		slideClick(e) {
			if (this.mousePosition.x !== e.pageX || this.mousePosition.y !== e.pageY ) return
			this.toggleResultModal(this.visibleResults[this.currentSlide])
		},
		saveMousePosition(e) {
			this.mousePosition = {x: e.pageX, y: e.pageY}
		},
		toggleResultModal(result) {
			this.showResultModal = !this.showResultModal
			if (this.showResultModal && result) {
				this.resultInModal = result
				this.$store.dispatch('lockScroll', true);
			} else {
				this.$store.dispatch('lockScroll', false);
			}
		},
		showMore() {
			this.currentResultsNum += 10
		}
	}
}
</script>

<style lang="postcss" scoped>
.result-page {
	flex:1;
}
.limit{
	&_small {
		@media (max-width: 1009px) {
			width: 640px;
			padding: 0;
		}
		@media (max-width: 767px) {
			width: 100%;
		}
	}
}
.title {
	margin-top: 40px;
	font-size: 30px;
	font-weight: 700;
	line-height: 36px;
	letter-spacing: .25px;
	text-transform: uppercase;
	font-family: 'Uni Sans', 'Tahoma', 'Segoe UI', arial, sans-serif;
	@media (max-width: 767px) {
		padding: 0 15px;
		margin-bottom: 7px;
	}
}
.result-tabs {
	display: flex;
	margin: 10px 0 20px;
	@media (max-width: 1009px) {
		display: none
	}
}
.result-tab {
	color: #0ab69f;
	font-size: 18px;
	text-transform: uppercase;
	font-weight: 700;
	line-height: 28px;
	letter-spacing: .25px;
	transition: all .3s;
	cursor: pointer;
	&:not(:last-child) {
		margin-right: 30px;
	}
	&.active {
		color: #252525;
	}
	&:hover {
		color: #585858;
	}
}
.result-tabs__select {
	padding: 2px 0;
	position: relative;
	z-index: 4;
	border: none;
	width: 100%;
	color: #252525;
	font-size: 18px;
	font-weight: 700;
	text-transform: uppercase;
	cursor: pointer;
	-webkit-appearance: none;
	@media (max-width: 767px) {
		line-height: 30px;
	}
	&-block {
		position: relative;
		display: none;
		padding-right: 26px;
		max-width: 315px;
		&::after {
			content: '';
			position: absolute;
			right: 5px; top: 8px;
			border: 4px solid transparent;
			border-top: 7px solid #0ab69f;
			@media (max-width: 767px) {
				top: 12px;
			}
		}
		@media (max-width: 1009px) {
			display: block;
		}
		@media (max-width: 767px) {
			padding-left: 15px;
		}
	}
}
.results  {
	min-height: 100%;
	padding-top: 20px;
	background: url(~@/assets/images/bg_pattern_results.jpg);
	@media (max-width: 1009px) {
		background: none;
	}
}
.results__cards-block {
	display: flex;
	flex-wrap: wrap;
	@media (max-width: 1009px) {
		display: none;
	}
}
.results__carousel {
	&-block {
		display: none;
		@media (max-width: 1009px) {
			display: block;
		}
	}
	&-item {
		position: relative;
		text-align: center;
	}
	&-img {
		max-width: 100%;
	}
	&-overlay {
		width: 100%;
		position: absolute;
		bottom: 5px;
	}
	&-title {
		max-width: 375px;
		margin: 0 auto;
		background: url(~@/assets/images/results_curator-shadow.png) 0 -1px repeat-x;
		height: 160px;
		color: #fff;
		text-align: left;
		font-size: 16px;
		font-family: 'Uni Sans','Tahoma','Verdana', serif;
		font-weight: 700;
		line-height: 24px;
		letter-spacing: .25px;
		text-transform: none;
		padding: 78px 30px 0;
	}
	&-menu {
		position: relative;
		height: 50px;
		background: #fff;
		text-align: center;
		width: 640px;
		margin-right: auto;
		margin-left: auto;
		@media (max-width: 767px) {
			width: 100%
		}
	}
}
.carousel-menu {
	&__prev, &__next {
		z-index: 20;
		display: block;
		width: 50px;
		height: 50px;
		font-size: 30px;
		border-radius: 100%;
		transition: all .3s;
		color: #0ab69f;
		background-image: none;
		text-align: center;
		top: 0;
		position: absolute;
		cursor: pointer;
	}
	&__prev {
		padding: 17px 10px;
		transform: rotate(90deg);
	}
	&__counter{
		z-index: 10;
		left: 0;
		bottom: 50px;
		font-size: 18px;
		line-height: 1;
		font-weight: 700;
		padding: 6px 13px;
		border-radius: 30px;
		display: inline-block;
		margin: 10px auto 0;
	}
	&__next {
		transform: rotate(-90deg);
		padding: 17px 11px;
		right: 0;
	}
}
.results__sub-block {
	display: flex;
	justify-content: center;
	align-items: center;
	@media (max-width: 550px) {
		flex-wrap: wrap;
	}
}
.green-btn {
	padding: 18px 20px;
	margin: 20px 15px;
	background: #0ab69f;
	border: none;
	border-radius: 3px;
	color: #fff;
	font: 400 15px/1 'Open Sans',Tahoma,sans-serif;
	transition: all .3s;
	cursor: pointer;
	&:hover {
		background: #078675;
	}
}
.online-link {
	margin: 20px 15px;
	color: #0ab69f;
	transition: all .3s;
	text-decoration: none;
	font-size: 15px;
	&:hover {
		color: #000;
	}
}
</style>

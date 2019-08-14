<template lang="pug">
div.course
	hero(image='merch_bg-sektamerch.jpg', title='SEKTAMERCH', sideToRender='right')
		p Купи крутую футболку #sektabootcampunited прямо сейчас! (Иначе они опять закончатся, и придется ждать следующего буткэмпа!)
		p Есть четыре размера: XS, S, M, L. <br>
		p Подробности:
		ul.merch__list
			li Ткань — хлопок 95/ лайкра 5, плотность 195;
			li размер XS ширина 46/длина 59;
			li размер S ширина 48/длина 61;
			li размер М ширина 50/длина 64;
			li размер L ширина 52/длина 66.

	section
		entry-form(formType='merch')


</template>

<script>
import Vue from 'vue';

export default {
	name: 'SektaMerch',
	metaInfo: {
		title: 'Мерч #sekta',
		description: 'Футблоки, майки и толстовки #sekta. Размеры от xs до xl. Доставка по всей России.'
	},
	components: {
		hero: () => import('@/components/heroes/fullsize-hero.vue'),
		CaptionSection: () => import('@/components/form/contents/caption-section.vue'),
		GreenBtn: () => import('@/components/form/green-btn.vue'),
		EntryForm: () => import('@/components/entry-form.vue'),
	},
	data () {
		return {}
	}
}
</script>


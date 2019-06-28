<template lang="pug">
div
	vue-headful(
		title="Контакты"
		description="Связь с #sektaoffice"
	)
	.article-limit
		.text-typography
			h2 Контакты
			h3 Отдел заявок Школы
			p По всем вопросам о подаче заявки и зачислении на курс: 
				a(href='mailto: info@sektaschool.ru') info@sektaschool.ru
				| . Также вы можете задать свой вопрос в 
				a(href='https://vk.com/sektaschool' target="_BLANK" rel="noopener noreferrer") нашей группе VK
				| .
			h3 Василина Жонкина, специалист по PR&Marketing.
			p По вопросам сотрудничества, участия в мероприятиях и спецпроектах: 
				a(href='mailto: partners@sektaschool.ru') partners@sektaschool.ru
			hr
			h3 Школа идеального тела #Sekta
			p
				b Главный офис: 
				| 191186, Санкт-Петербург, Невский пр., 11, 4 этаж.
			p
				b График работы офиса: 
				| пн-пт, 10:00 – 19:00.
</template>

<script>
	import Vue from 'vue';
	import vueHeadful from 'vue-headful';

	Vue.component('vue-headful', vueHeadful);
	
	export default {
		name: 'Contacts',
		components: {
		},
		data () {
			return {}
		}
	}
</script>

<style lang="postcss">
	
</style>

<template lang="pug">
div.course

	hero(image='course_bg-sectavip.jpg', title='VIP ПРОГРАММА', horizontal)
		p Индивидуальная коучинговая программа с самыми актуальными разработками нашей Школы. Мы поможем вам выстроить эффективную систему питания и тренировок с учетом ваших особенностей, жизненного графика, свободного времени, предпочитаемой платформы (VK, Facebook, Viber, WhatsApp, Telegram, Skype, Email) и подберем куратора, исходя из ваших запросов.
		template(v-slot:buttons)
			green-btn(@click.prevent='setFormModalState({modalState: true})') Записаться на обучение

	article.main-content
		.article-limit
			.text-typography
				h3.center #SEKTAVIP
				p
					b Длительность любого VIP курса: 
					| столько, сколько нужно для достижения целей каждого отдельного ученика
				p
					b Стоимость: 
					| Базовый курс – 3500 рублей в неделю
				hr
				h5
					b VIP курс – это:
				ul
					li старт в любой удобный для вас день;
					li самые эффективные разработки нашей Школы (включая программы SektaBootcamp, S60days, NYFC, SektaMama, SektaLite, SektaMen, Углубленный курс);
					li прохождение курса на любой удобной для вас платформе;
					li связь с куратором в комфортном режиме, поддержка и мотивация;
					li индивидуальная тренировочная программа с учетом вашего свободного времени, жизненного графика, состояния здоровья, уровня вашей физической подготовки;
					li анализ рациона, пищевых привычек и построение актуального для ваших целей режима питания (мы учитываем все ваши предпочтения);
					li возможность бесплатно посещать наши очные групповые занятия (3 раза в неделю) при наличии филиала в вашем городе.
				p На любой ваш вопрос мы ответим по телефону 
				a(href='tel:8 800 500 68 82') 8 800 500 68 82 
				| или по почте 
				a(href='mailto: vip@sektaschool.ru') vip@sektaschool.ru
				| .


	section
		.section-caption
			| Запишитесь сейчас
			.highlight cтарт в понедельник
		entry-form

</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		name: 'Vip',
		components: {
			hero: () => import('@/components/heroes/aside-hero.vue'),
			EntryForm: () => import('@/components/entry-form.vue'),
			GreenBtn: () => import('@/components/form/green-btn.vue'),
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
	
</style>

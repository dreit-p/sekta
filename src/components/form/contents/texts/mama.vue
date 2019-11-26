<template lang="pug">
.content
	p.heavy-text Запишитесь на курс
	p Чтобы записаться на курс, заполните форму заявки и нажмите «Перейти к оплате».
	p Если у вас подарочный сертификат на первую неделю обучения курса для мам — для активации сертификата напишите на почту&ensp;
		a(href='mailto:info@sektaschool.ru') info@sektaschool.ru.

	p.heavy-text Важно!
	p После оплаты вы получите письмо о зачислении на курс с инструкциями к обучению и полезными материалами. Если письма нет, проверьте папку «Спам». Если нет и там, напишите нам:&ensp;
		b
			a(href="mailto:info@sektaschool.ru") info@sektaschool.ru
		|  или позвоните – 8 (800) 500-68-82 (каждый день с 10:00 до 19:00).

	div(style='margin-top: 20px')
		p.tiny-text Оплата производится на сайте&nbsp;
			a(href='https://kassa.yandex.ru/') Яндекс.Кассы
		p.tiny-text Оказание услуг осуществляется&nbsp;
			a(:href='requisitesLink', target='_BLANK', rel='noopener noreferrer')
				| ООО «ШКОЛА ИДЕАЛЬНОГО ТЕЛА {{  {1: 'Москва', 2: 'Санкт-Петербург', 3: 'Регионы'}[userCity]  }}»
</template>

<script>
export default {
	name: 'TextsMama',
	methods: {
		setFormModalState(data) {
			return this.$parent.setFormModalState(data);
		}
	},
	computed: {
		requisitesLink() {
			let city = this.$store.state.cities.find(city => city.id === this.userCity);
			if (!city || city === -1) return;

			return window.location.protocol +"//"+ city.code + "." + window.location.host
		},
		userCity() {
			return this.$store.getters.getUserCity;
		},
	},
}
</script>

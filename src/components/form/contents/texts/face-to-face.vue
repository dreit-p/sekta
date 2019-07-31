<template lang="pug">
.content

	p.heavy-text Важно!

	p.small-text После оплаты вы получите письмо о зачислении на курс.

	div(style='margin-top: 20px')
		p.small-text Если письма нет, проверьте папку "Спам". Если нет и там, напишите нам:
			b
				a(href="mailto:info@sektaschool.ru") info@sektaschool.ru

	div(style='margin-top: 20px')
		p.small-text За два дня до старта вы получите письмо с датой вводной лекции и дальнейшими инструкциями.

	div(style='margin-top: 20px')
		p.tiny-text Оплата производится на сайте Яндекс.Кассы
		p.tiny-text Оказание услуг осуществляется ООО «ШКОЛА ИДЕАЛЬНОГО ТЕЛА {{  {1: 'Москва', 2: 'Санкт-Петербург', 3: 'Регионы'}[userCity]  }}»
</template>

<script>
export default {
	name: 'TextsOnline',
	methods: {
		setFormModalState(data) {
			return this.$parent.setFormModalState(data);
		}
	},
	computed: {
		userCity() {
			if (this.$store.state.user.info) {
				return JSON.parse(JSON.stringify(this.$store.state.user)).info.city.id
			}
			if (this.$store.state.user.cityId) {
				return this.$store.state.user.cityId;
			}
			return false;
		},
	},
}
</script>

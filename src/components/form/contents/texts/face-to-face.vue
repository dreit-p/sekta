<template lang="pug">
.content

	p.heavy-text Важно!

	p.small-text После оплаты вы получите письмо о зачислении на курс.

	div(style='margin-top: 20px')
		p.small-text Если письма нет, проверьте папку «Спам». Если нет и там, напишите нам:&nbsp;
			b
				a(href="mailto:info@sektaschool.ru") info@sektaschool.ru

	div(style='margin-top: 20px')
		p.small-text За два дня до старта вы получите письмо с датой вводной лекции и дальнейшими инструкциями.

	div(style='margin-top: 20px')
		p.tiny-text Оплата производится на сайте&nbsp;
			a(href='https://kassa.yandex.ru/') Яндекс.Кассы
		p.tiny-text Оказание услуг осуществляется&nbsp;
			a(:href='"../docs/"+{1: "publicoffer_msk_new.pdf", 2: "publicoffer_spb_new.pdf", 3: "publicoffer_reg_new.pdf"}[userCity]', target='_BLANK', rel='noopener noreferrer') ООО «ШКОЛА ИДЕАЛЬНОГО ТЕЛА {{  {1: 'Москва', 2: 'Санкт-Петербург', 3: 'Регионы'}[userCity]  }}»
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
			return this.$store.getters.getUserCity;
		},
	},
}
</script>

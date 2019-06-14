<template lang="pug">
.content
	p.heavy-text Запишитесь на курс
	p Чтобы записаться на курс, заполните форму заявки и нажмите "Перейти к оплате"

	p.heavy-text Важно!
	p.small-text После оплаты вы получите письмо о зачислении на курс. Если письма нет, проверьте папку "Спам". Если нет и там, напишите нам: info@sektaschool.ru
	div(style='margin-top: 37px')
		p.small-text Оплата производится на сайте Яндекс.Кассы
		p.small-text Оказание услуг осуществляется ООО «ШКОЛА ИДЕАЛЬНОГО ТЕЛА *ГОРОД*»    
	div(style='margin-top: 37px')
		p.tiny-text Оплата производится на сайте Яндекс.Кассы
		p.tiny-text Оказание услуг осуществляется ООО «ШКОЛА ИДЕАЛЬНОГО ТЕЛА *ГОРОД*»
</template>

<script>
	export default {
		name: 'texts-online',
		methods: {
			setFormModalState(data) {
				return this.$parent.setFormModalState(data);
			}
		},
	}
</script>

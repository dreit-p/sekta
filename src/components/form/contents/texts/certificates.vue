<template lang="pug">
.content
	p.heavy-text Подарочный сертификат
	p Выберите сумму сертификата, а получатель сам решит, какой курс Школы ему пройти.
	p Доступны сертификаты на сумму 
		b 1500
		| ₽ , 
		b 3500
		| ₽ , 
		b 7000
		| ₽ или 
		b 10 500
		| ₽ . Срок действия — три месяца с момента покупки. 
	hr
	p.heavy-text Важно!
	p.small-text Если суммы сертификата не хватает для оплаты какой-либо услуги, вы всегда можете доплатить разницу — мы вышлем вам ссылку с необходимой суммой.
	div(style='margin-top: 37px')
		p.tiny-text Оплата производится на сайте Яндекс.Кассы
		p.tiny-text Оказание услуг осуществляется ООО «ШКОЛА ИДЕАЛЬНОГО ТЕЛА *ГОРОД*»
</template>

<script>
	export default {
		name: 'texts-certificates',
		methods: {
			setFormModalState(data) {
				return this.$parent.setFormModalState(data);
			}
		},
	}
</script>

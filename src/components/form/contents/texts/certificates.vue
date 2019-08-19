<template lang="pug">
.content

	p.heavy-text Подарочный сертификат
	p.small-text Выбирайте сумму для подарка, а получатель сам решит, какой услугой Школы воспользоваться.&ensp;
		b Вы можете приобрести подарочные сертификаты на сумму 1500₽, 3900₽, 7000₽ или 12000₽.
	div(style='margin-top: 20px')
		p.small-text Если суммы сертификата не хватает для оплаты какой-либо услуги, вы всегда можете доплатить разницу — мы вышлем вам ссылку с необходимой суммой.
	div(style='margin-top: 20px')
		p
			b Чтобы получить сертификат, вам необходимо:
	ol
		li Заполнить форму заявки справа, указав в ней имя, фамилию и email получателя, на который мы отправим подарочный сертификат, и нажать кнопку «Перейти к оплате».
		li Мы пришлем вам сертификат на указанную почту в течение 24 часов :)
	hr
	p
		b Важно!!
	p.small-text Сертификат можно использовать в течение трех месяцев с момента покупки.
	div(style='margin-top: 37px')
		p.tiny-text Оплата производится на сайте&ensp;
			a(href='https://kassa.yandex.ru/') Яндекс.Кассы
		p.tiny-text Оказание услуг осуществляется&ensp;
			a(:href='requisitesLink', target='_BLANK', rel='noopener noreferrer')
				| ООО «ШКОЛА ИДЕАЛЬНОГО ТЕЛА {{  {1: 'Москва', 2: 'Санкт-Петербург', 3: 'Регионы'}[userCity]  }}»
</template>

<script>
export default {
	name: 'TextsCertificates',
	computed: {
		requisitesLink() {
			let cityCode = this.$store.state.cities.find(city => city.id === this.userCity).code;
			return window.location.protocol +"//"+ cityCode + "." + window.location.host
		},
		userCity() {
			return this.$store.getters.getUserCity;
		},
	},
	methods: {
		setFormModalState(data) {
			return this.$parent.setFormModalState(data);
		}
	},
}
</script>

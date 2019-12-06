<template lang="pug">
.content

	p.heavy-text Подарочный сертификат
	p.small-text Выбирайте сумму для подарка, а получатель сам решит, какой услугой Школы воспользоваться.&ensp;
		b Вы можете приобрести подарочные сертификаты на сумму 1500₽, 3900₽, 7000₽ или 12000₽.
		b   Или сертификат на прохождение сезонного курса #sekta Energy Boost — 4000₽.
	div(style='margin-top: 20px')
		p.small-text Если суммы сертификата не хватает для оплаты какой-либо услуги, всегда можно доплатить разницу — мы вышлем ссылку с необходимой суммой по запросу.
	div(style='margin-top: 20px')
		p
			b Чтобы получить сертификат, необходимо:
	ol
		li Заполнить форму заявки справа, указав в ней имя, фамилию и email получателя, на который мы отправим подарочный сертификат, после того как подготовим его.
			br
			| Если вы хотите подарить сертификат лично — оставьте поле «email получателя» пустым и мы вышлем готовый сертификат на вашу почту.
		li Нажмите на кнопку «Перейти к оплате».
		li После успешной оплаты, мы пришлем вам сертификат на указанную почту в течение 24 часов :)
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
			let city = this.$store.state.cities.find(city => city.id === this.userCity);
			if (!city || city === -1) return;

			return window.location.protocol +"//"+ city.code + "." + window.location.host
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

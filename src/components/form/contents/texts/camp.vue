<template lang="pug">
.content
	p.heavy-text Чтобы записаться и оплатить путевку:
	p Заполните форму заявки, выберите тип размещения, вариант оплаты (полная или предоплата) и нажмите «Забронировать».
	p(style='margin-top: 10px')
		b Стоимость:
	ul
		li
			p Полная оплата номера «Стандарт» — 39&nbsp;000₽
		li
			p Предоплата номера «Стандарт» — 19&nbsp;500₽
	hr
	p.small-text В течение 24 часов после оплаты вам придет чек и письмо от нас, подтверждающее бронирование (не забудьте проверить папки “спам” и “промоакции”)
	p.small-text(style="margin-top: 10px") При выборе варианта “Предоплата...” вторую часть оплаты необходимо внести до 1 июля. Ссылка на вторую оплату придет вам в письме
	div(style='margin-top: 37px')
		p.tiny-text Оплата производится на сайте Яндекс.Кассы
		p.tiny-text Оказание услуг осуществляется&nbsp;
			a(:href='requisitesLink', target='_BLANK', rel='noopener noreferrer')
				| ООО «ШКОЛА ИДЕАЛЬНОГО ТЕЛА {{  {1: 'Москва', 2: 'Санкт-Петербург', 3: 'Регионы'}[userCity]  }}»
</template>

<script>
export default {
	name: 'TextsCertificates',
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

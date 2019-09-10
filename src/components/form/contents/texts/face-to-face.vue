<template lang="pug">
.content

	p.heavy-text Чтобы записаться в #sekta

	ul
		li.small-text Проверьте, что вы выбрали правильный вариант тренировок #sekta в зале:  подходящий курс, расположение зала, количество тренировок в неделю и расписание занятий.
		li.small-text Нажмите на кнопку «Перейти к оплате».
		li.small-text После успешной оплаты вам придет письмо с подтверждением записи на курс и всей информацией к обучению.
		li.small-text Если вам не пришло письмо (в папках «Спам» и «Промоакции» его так же нет) или появились вопросы – напишите нам на&ensp;
			a(href='mailto:info@sektaschool.ru') info@sektaschool.ru
			|  или позвоните – 8 (800) 500-68-82 (пн-пт с 10:00 до 19:00)


	div(style='margin-top: 20px')
		p.tiny-text Оплата производится на сайте&nbsp;
			a(href='https://kassa.yandex.ru/') Яндекс.Кассы
		p.tiny-text Оказание услуг осуществляется&nbsp;
			a(:href='requisitesLink', target='_BLANK', rel='noopener noreferrer')
				| ООО «ШКОЛА ИДЕАЛЬНОГО ТЕЛА {{  {1: 'Москва', 2: 'Санкт-Петербург', 3: 'Регионы'}[userCity]  }}»
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

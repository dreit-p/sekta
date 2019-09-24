<template lang="pug">
header-component
	.requisites
		.article-limit
			.text-typography
				h2 Общество с ограниченной ответственностью «ШКОЛА ИДЕАЛЬНОГО ТЕЛА СПБ»
				table(border='1')
					tr
						td Полное фирменное наименование
						td Общество с ограниченной ответственностью «ШКОЛА ИДЕАЛЬНОГО ТЕЛА СПБ»
					tr
						td Сокращенное фирменное наименование
						td ООО «ШКОЛА ИДЕАЛЬНОГО ТЕЛА СПБ»
					tr
						td Адрес места нахождения
						td 191024, Санкт-Петербург, Невский пр. д. 32-34, лит. H, пом. 42
					tr
						td Дата регистрации
						td 17.04.2015 года
					tr
						td Основной государственный орган (ОГРН)
						td 1157847138789
					tr
						td ИНН
						td 7841022260
					tr
						td КПП
						td 784101001
					tr
						td Наименование налогового органа
						td Межрайонная Инспекция Федеральной налоговой службы №10 по Санкт-Петербургу
					tr
						td Генеральный директор
						td Копытина Евгения Владимировна
				img(src='@/assets/images/docs/ШИТ-СПБ-ИНН.jpg' width='100%')
				img(src='@/assets/images/docs/ШИТ-СПБ-ОГРН.jpg' width='100%')
</template>

<script>
export default {
	name: "SpbSubDomain",
	metaInfo: {
		title: "Реквизиты Санкт-Петербург",
		description: 'ООО "Школа идеального тела спб"'
	},
	components: {
		HeaderComponent: () => import("./header.vue")
	}
};
</script>

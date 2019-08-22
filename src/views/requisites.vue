<template lang="pug">
div
	.article-limit
		.text-typography
			h2 Общество с ограниченной ответственностью «ШКОЛА ИДЕАЛЬНОГО ТЕЛА МСК»
			table(border='1')
				tr
					td Полное фирменное наименование
					td Общество с ограниченной ответственностью «ШКОЛА ИДЕАЛЬНОГО ТЕЛА МСК»
				tr
					td Сокращенное фирменное наименование
					td ООО «ШКОЛА ИДЕАЛЬНОГО ТЕЛА МСК»
				tr
					td Адрес места нахождения
					td 105064, г. Москва, Нижний Сусальный переулок, дом 5, строение 4, помещение II
				tr
					td Дата регистрации
					td 30.04.2015 года
				tr
					td Основной государственный орган (ОГРН)
					td 1157746408720
				tr
					td ИНН
					td 7701346970
				tr
					td КПП
					td 770901001
				tr
					td Наименование налогового органа
					td Инспекция Федеральной налоговой службы №9 по г. Москве
				tr
					td Генеральный директор
					td Балезин Павел Владимирович
			//img(src='@/assets/images/ШИТ-МСК-ИНН.jpg' width='100%')
			//img(src='@/assets/images/ШИТ-МСК-ОГРН.jpg' width='100%')
</template>

<script>
export default {
	name: 'Requisites',
	components: {
	},
	data () {
		return {}
	}
}
</script>

<style lang="postcss" scoped>
	td {
		padding: 0.625rem 0.9375rem;
		@media (max-width: 500px) {
			font-size: 13px;
		}
	}
	img {
		margin: 30px 0;
	}
</style>

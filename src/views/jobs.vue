<template lang="pug">
div
	.article-limit
		.text-typography
			h2 Вакансии
			p Сейчас у нас нет актуальных вакансий, но мы всегда рады новым интересным сотрудничествам. Если вы чувствуете, что мы точно подойдём друг другу — присылайте резюме или предложение о совместной работе на #[a(href='mailto: info@sektaschool.ru') info@sektaschool.ru].
</template>

<script>
export default {
	name: 'Jobs',
	metaInfo: {
		title: 'Вакансии в #sekta',
		description: 'Список акутальных вакансий в Школе идеального тела #sekta'
	},
	components: {
	},
	data () {
		return {}
	}
}
</script>

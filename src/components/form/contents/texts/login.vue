<template lang="pug">
.content
	p.heavy-text Рады видеть вас снова
	p Чтобы авторизоваться введите ваш
	| логин (e-mail) и пароль.
	.links
		a(href='#', @click.prevent='setFormModalState({type:"register"})')
			svg-icon(name='icon-arrow').to-left
			| Нет личного кабинета? Зарегистрируйтесь
</template>

<script>
export default {
	name: 'TextsLogin',
	components: {
		SvgIcon: () => import('@/components/SvgIcon.vue')
	},
	methods: {
		setFormModalState(data) {
			return this.$parent.setFormModalState(data);
		}
	},
}
</script>

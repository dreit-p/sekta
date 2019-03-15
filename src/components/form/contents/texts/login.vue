<template lang="pug">
.content
	p.heavy-text Рады видеть вас снова
	p Чтобы авторизоваться введите ваш
	| логин (e-mail) и пароль.
	.links
		a(href='#', @click.prevent='setModalState({type:"register"})')
			svg-icon(name='icon-arrow').to-left
			| Нет личного кабинета? Зарегистрируйтесь
</template>

<script>
	export default {
		name: 'texts-login',
		components: {
			SvgIcon: () => import('@/components/SvgIcon.vue')
		},
		methods: {
			setModalState(data) {
				return this.$parent.setModalState(data);
			}
		},
	}
</script>

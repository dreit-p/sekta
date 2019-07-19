<template lang="pug">
.content
	p.heavy-text Забыли пароль?
	p Ничего страшного, сейчас все исправим. Введите ваш логин (e-mail) и вам на почту придет ссылка на восстановление пароля.
	.links
		a(href='#', @click.prevent='setFormModalState({type:"login"})')
			| Вспомнили пароль? Войдите в личный кабинет
</template>

<script>
export default {
	name: 'TextsRecovery',
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

<template lang="pug">
.content
	p.heavy-text Регистрация
	p Чтобы получить доступ к онлайн курсам секта - создайте личный кабинет.
	p Это займет не больше минуты.
	hr
	p Если он у вас уже есть, просто войдите.
	a.transparent-button(@click.prevent='setFormModalState({type:"login"})') Войти в личный кабинет
</template>

<script>
export default {
	name: 'TextsRegister',
	methods: {
		setFormModalState(data) {
			return this.$parent.setFormModalState(data);
		}
	},
}
</script>

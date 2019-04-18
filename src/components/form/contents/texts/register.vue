<template lang="pug">
.content
	p.heavy-text Регистрация
	p Заполните форму и создайте личный кабинет, чтобы вы могли записаться на курс. 
	p Это займет не больше минуты.
	hr
	p Если он у вас уже есть, просто войдите.
	a.transparent-button(@click.prevent='setFormModalState({type:"login"})') Войти в личный кабинет
</template>

<script>
	export default {
		name: 'texts-register',
		methods: {
			setFormModalState(data) {
				return this.$parent.setFormModalState(data);
			}
		},
	}
</script>

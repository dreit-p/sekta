<template lang="pug">
	div
		p Redirect
		form(ref="form" :action="url" method="post")
			input(type="hidden" name="token" :value="token")

</template>

<script>

export default {
	computed: {
		url() {
			return process.env.VUE_APP_ACCOUNT_URL + '/login.php'
		},
		token() {
			return this.$store.getters.authToken
		},
	},
	mounted() {
		this.$refs.form.submit()
	},
}
</script>

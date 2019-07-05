<template lang="pug">
	section
		.section-caption(v-if='this.dateStart')
			| Запишитесь сейчас
			.highlight cтарт {{ this.dateStart }}
		.section-caption(v-else)
			| Запишитесь сейчас

</template>

<script>
export default {
	name: 'CaptionSection',
	props: {
		dateStart: {
			type: String,
			default: null
		}
	},
	data () {
		return {}
	}
}
</script>

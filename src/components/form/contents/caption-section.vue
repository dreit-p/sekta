<template lang="pug">
	section
		.section-caption(v-if='this.dateStart')
			| Запишитесь сейчас
			.highlight(v-if="typeof(this.dateStart) === 'string'") cтарт {{this.dateStart}}
			template(v-else)
				.highlight Ближайший cтарт
				.highlight
					.highlight__title(v-for="(date, key) in dateStart" :class="{two: Object.keys(dateStart).length === 2}")
						span {{platform_options[key]}}
						|  — {{formatDate(date)}}
		.section-caption(v-else)
			| Запишитесь сейчас

</template>

<script>
import { formatDateDayMonth } from "../../../assets/misc.js";

export default {
	name: 'CaptionSection',
	props: {
		dateStart: {
			type: Object | String,
			default: null
		}
	},
	data () {
		return {
			platform_options: {
				tg: 'Telegram',
				vk: 'VK',
				fb: 'Facebook',
				sk: 'Skype',
				vb: 'Viber',
				wa: 'WhatsApp',
				email: 'E-mail'
			}
		}
	},
	methods: {
		formatDate(date) {
			return formatDateDayMonth(date)
		},
	}
}
</script>

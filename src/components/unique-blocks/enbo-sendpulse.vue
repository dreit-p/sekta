<template lang='pug'>
	span(@click.prevent='openSendpulse')
		slot
</template>
<script>
export default {
	name: 'SendpulseForm',
	props: {
		formId: {
			type: String,
			required: true
		},
	},
	mounted() {
		let sendpulseScript = document.createElement('script')
		sendpulseScript.setAttribute('src', '//static-login.sendpulse.com/apps/fc3/build/loader.js')
		sendpulseScript.setAttribute('sp-form-id', '125909c98319d1820ec0aaef4b68cea1a71d4093dfbd254fbe336b20c2ed9087')
		document.head.appendChild(sendpulseScript)

		console.log('EnBo senpulse '+this.formId+' is mounted');
	},
	methods: {
		openSendpulse() {
			let form = document.getElementById('sp-form-'+this.formId);
			if (!form) {
				console.warn('Form id:'+this.formId+' is not found');
				return false
			}
			form.closest('.sp-form-outer').classList.remove('sp-hide');
			form.closest('.sp-form-outer').classList.remove('sp-force-hide');
			form.closest('.sp-form-outer').classList.add('sp-show');
		}
	}
}

</script>
<style scope>

a {
	text-decoration: underline;
	cursor: pointer;
}

.sp-force-hide {
	display: none !important;
}

.sp-popup-outer {
	background-color: rgba(0, 0, 0, 0.5) !important;
	z-index: 5;
}

</style>

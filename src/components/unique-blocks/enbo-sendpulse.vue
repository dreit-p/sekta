<script>
export default {
	name: 'SendpulseForm',
	mounted() {
		let sendpulseScript = document.createElement('script')
		sendpulseScript.setAttribute('src', '//static-login.sendpulse.com/apps/fc3/build/loader.js')
		sendpulseScript.setAttribute('sp-form-id', '125909c98319d1820ec0aaef4b68cea1a71d4093dfbd254fbe336b20c2ed9087')
		document.head.appendChild(sendpulseScript)

		console.log('EnBo senpulse is mounted');

		sendpulseScript = document.createElement('script')
		sendpulseScript.setAttribute('src', '//static-login.sendpulse.com/apps/fc3/build/default-handler.js?1574954079563')
		document.head.appendChild(sendpulseScript)
	}
}

</script>
<style>
.sp-force-hide {
	display: none !important;
}

.sp-popup-outer {
	background-color: rgba(0, 0, 0, 0.5) !important;
	z-index: 5;
}

</style>

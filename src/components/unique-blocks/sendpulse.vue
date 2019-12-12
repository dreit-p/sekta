<script>
export default {
	mounted() {
		let sendpulseScript = document.createElement('script')
		sendpulseScript.setAttribute('src', '//static-login.sendpulse.com/apps/fc3/build/loader.js')
		sendpulseScript.setAttribute('sp-form-id', 'fcbc4da97e6464a0b5755f5e63cea6c798f44c04229eb646c72f697fe8a0c5bf')
		document.head.appendChild(sendpulseScript)

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
</style>

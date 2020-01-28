<template lang="pug">
section.email-subscription
	.limit
		.title Подпишись на нашу рассылку!
		button(data-v-6c4d8baa="" sp-show-form="143202") Поидее при клике на эту кнопку должна появляться форма, уже видна внизу. Скрипт вставил её в конец документа.

</template>

<script>
export default {
	name: 'EmailSubscription',
	mounted() {
		let sendpulseScript = document.createElement('script')
		sendpulseScript.setAttribute('src', '//web.webformscr.com/apps/fc3/build/loader.js')
		sendpulseScript.setAttribute('sp-form-id', 'edaded80bae19b5bfc714442c388d6ec4e098a2bbec22789c0e37022cbfb0055')
		document.head.appendChild(sendpulseScript)
		console.log('senpulse is mounted');
	},
	data () {
		return {}
	}
}
</script>

<style lang="postcss" scoped>
section.email-subscription {
	.limit {
		display: flex;
		justify-content: center;
		>* {
			width: 50%;
			padding: 50px 20px;
		}
		@media (max-width: 600px) {
			flex-direction: column;
			align-items: flex-start;
			padding: 30px;
			>* {
				width: 100%;
				padding: 10px;
			}
		}
		@media (max-width: 375px) {
			padding: 0 15px;
			>* {
				padding: 10px 0;
			}
		}
	}
	.title {
		text-transform: uppercase;
		font-size: 54px;
		text-align: right;
		font-family: var(--font-second);
		font-weight: 800;
		@media (max-width: 1024px) {
			font-size: 36px;
		}
		@media (max-width: 600px) {
			text-align: left;
		}
	}
	.sp-force-hide {
		/* display: none; */
	}

	.sp-form[sp-id="143202"] {
		display: block;
		background: #ffffff;
		width: 450px;
		padding: 0;
		max-width: 100%;
		font-family: Arial, "Helvetica Neue", sans-serif;
		background-repeat: no-repeat;
		background-position: center;
		background-size: auto;
	}

	.sp-form[sp-id="143202"] input[type="checkbox"] {
		display: inline-block;
		opacity: 1;
		visibility: visible;
	}

	.sp-form[sp-id="143202"] .sp-form-fields-wrapper {
		margin: 0;
		width: 420px;
	}

	.sp-form[sp-id="143202"] .sp-form-control {
		background: #ffffff;
		border-color: #cccccc;
		border-style: solid;
		border-width: 1px;
		font-size: 15px;
		padding-left: 8.75px;
		padding-right: 8.75px;
		border-radius: 4px;
		-moz-border-radius: 4px;
		-webkit-border-radius: 4px;
		height: 35px;
		width: 100%;
	}

	.sp-form[sp-id="143202"] .sp-field {
		padding: * 0;
	}

	.sp-form[sp-id="143202"] .sp-field label {
		color: #444444;
		font-size: 13px;
		font-style: normal;
		font-weight: bold;
	}

	.sp-form[sp-id="143202"] .sp-button {
		border-radius: 4px;
		-moz-border-radius: 4px;
		-webkit-border-radius: 4px;
		background-color: #0ab6a1;
		color: #ffffff;
		width: auto;
		font-weight: 700;
		font-style: normal;
		font-family: Arial, "Helvetica Neue", sans-serif;
		box-shadow: none;
		-moz-box-shadow: none;
		-webkit-box-shadow: none;
	}

	.sp-form[sp-id="143202"] .sp-button-container {
		text-align: left;
	}
}
</style>

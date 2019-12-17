<template lang='pug'>
	.sp-form-outer.sp-popup-outer.sp-force-hide
		#sp-form-139063.sp-form.sp-form-regular.sp-form-popup.sp-form-horizontal(sp-id='139063' sp-hash='125909c98319d1820ec0aaef4b68cea1a71d4093dfbd254fbe336b20c2ed9087' sp-lang='ru' sp-show-options='%7B%22satellite%22%3Afalse%2C%22maDomain%22%3A%22login.sendpulse.com%22%2C%22formsDomain%22%3A%22forms.sendpulse.com%22%2C%22condition%22%3A%22onButtonClick%22%2C%22scrollTo%22%3A25%2C%22delay%22%3A0%2C%22repeat%22%3A1%2C%22background%22%3A%22rgba(238%2C%20238%2C%20238%2C%201)%22%2C%22position%22%3A%22bottom-right%22%2C%22animation%22%3A%22%22%2C%22hideOnMobile%22%3Afalse%2C%22urlFilter%22%3Atrue%2C%22urlFilterConditions%22%3A%5B%7B%22force%22%3A%22hide%22%2C%22clause%22%3A%22equal%22%2C%22token%22%3A%22https%3A%2F%2Fsektaschool.ru%2Fonline%2Fenergyboost%22%7D%5D%2C%22analytics%22%3A%7B%22ga%22%3A%7B%22eventLabel%22%3A%22%D0%A4%D0%BE%D1%80%D0%BC%D0%B0_%D0%BF%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D0%BA%D0%B8_sektaschool_ru_%D0%91%D0%B0%D0%B7%D0%B0_%D1%80%D0%B5%D1%86%D0%B5%D0%BF%D1%82%D1%8B_%D1%81_%D1%81%D0%B0%D0%B9%D1%82%D0%B0%22%2C%22send%22%3Afalse%7D%2C%22ym%22%3A%7B%22counterId%22%3Anull%2C%22eventLabel%22%3Anull%2C%22targetId%22%3Anull%2C%22send%22%3Afalse%7D%7D%7D')
			.sp-form-fields-wrapper
				button.sp-btn-close
				.sp-message
					div
				form.sp-element-container.ui-sortable.ui-droppable.sp-sm(novalidate='')
					.sp-field.sp-field-full-width(sp-id='sp-9ac19451-640d-4175-9d09-a89c800475c8')
						div(style='font-family: Arial, "Helvetica Neue", sans-serif; line-height: 1.2;')
							p
								| Укажите почту, и мы пришлем вам новогоднее меню из здоровых и вкусных блюд. С удобным списком продуктов!
					.sp-field(sp-id='sp-cf2f2614-5d24-466f-b6f6-0f4fc891e472')
						label.sp-control-label
							span Email
							strong *
						input.sp-form-control(type='email' sp-type='email' name='sform[email]' placeholder='username@gmail.com' sp-tips='%7B%22required%22%3A%22%D0%9E%D0%B1%D1%8F%D0%B7%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5%20%D0%BF%D0%BE%D0%BB%D0%B5%22%2C%22wrong%22%3A%22%D0%9D%D0%B5%D0%B2%D0%B5%D1%80%D0%BD%D1%8B%D0%B9%20email-%D0%B0%D0%B4%D1%80%D0%B5%D1%81%22%7D' required='required')
					.sp-field.sp-button-container(sp-id='sp-de96a60a-298d-487c-9938-fef30d21cd0c')
						button#sp-de96a60a-298d-487c-9938-fef30d21cd0c.sp-button Присылайте!
				.sp-link-wrapper.sp-brandname__left

</template>
<script>
export default {
	name: 'EnboSendpulseForm',
	mounted() {
		let sendpulseScript = document.createElement('script')
		sendpulseScript.setAttribute('src', '//static-login.sendpulse.com/apps/fc3/build/default-handler.js?1574954079563')
		document.head.appendChild(sendpulseScript)
		console.log('EnBo senpulse is mounted');
	},
}

</script>
<style lang="postcss" scoped>
.sp-form[sp-id="139063"] {
	display: block;
	background: #ffffff;
	padding: 15px;
	width: 350px;
	max-width: 100%;
	border-radius: 8px;
	border-color: #dddddd;
	border-style: solid;
	border-width: 1px;
	font-family: Arial, "Helvetica Neue", sans-serif;
	background-repeat: no-repeat;
	background-position: center;
	background-size: auto;
	input[type="checkbox"] {
		display: inline-block;
		opacity: 1;
		visibility: visible;
	}
	.sp-form-fields-wrapper {
		margin: 0 auto;
		width: 320px;
	}
	.sp-form-control {
		background: #ffffff;
		border-color: #cccccc;
		border-style: solid;
		border-width: 1px;
		font-size: 15px;
		padding-left: 8.75px;
		padding-right: 8.75px;
		border-radius: 4px;
		height: 35px;
		width: 100%;
	}
	.sp-field {
		label {
			color: #444444;
			font-size: 13px;
			font-style: normal;
			font-weight: bold;
		}
	}
	.sp-button {
		border-radius: 4px;
		background-color: #0ab6a1;
		color: #ffffff;
		width: auto;
		font-weight: 700;
		font-style: normal;
		font-family: Arial, sans-serif;
		box-shadow: none;
	}
	.sp-button-container {
		text-align: left;
	}
}

.sp-force-hide {
	display: none !important;
}
.sp-popup-outer {
	background-color: rgba(0, 0, 0, 0.5) !important;
	z-index: 5;
}


</style>

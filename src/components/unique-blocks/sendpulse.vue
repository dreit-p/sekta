<template lang="pug">
	.sp-form-outer.sp-popup-outer.sp-force-hide(style='background: rgba(0, 0, 0, 0.5);')
		#sp-form-139886.sp-form.sp-form-regular.sp-form-popup(sp-id='139886' sp-hash='fcbc4da97e6464a0b5755f5e63cea6c798f44c04229eb646c72f697fe8a0c5bf' sp-lang='ru' sp-show-options='%7B%22satellite%22%3Afalse%2C%22maDomain%22%3A%22login.sendpulse.com%22%2C%22formsDomain%22%3A%22forms.sendpulse.com%22%2C%22condition%22%3A%22onButtonClick%22%2C%22scrollTo%22%3A25%2C%22delay%22%3A10%2C%22repeat%22%3A1%2C%22background%22%3A%22rgba(0%2C%200%2C%200%2C%200.5)%22%2C%22position%22%3A%22bottom-right%22%2C%22animation%22%3A%22%22%2C%22hideOnMobile%22%3Afalse%2C%22urlFilter%22%3Afalse%2C%22urlFilterConditions%22%3A%5B%7B%22force%22%3A%22hide%22%2C%22clause%22%3A%22contains%22%2C%22token%22%3A%22%22%7D%5D%2C%22analytics%22%3A%7B%22ga%22%3A%7B%22eventLabel%22%3A%22%D0%9F%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D0%BA%D0%B0_%D0%BD%D0%B0_%D0%B5%D0%B6%D0%B5%D0%BC%D0%B5%D1%81%D1%8F%D1%87%D0%BD%D1%83%D1%8E_%D1%80%D0%B0%D1%81%D1%81%D1%8B%D0%BB%D0%BA%D1%83%22%2C%22send%22%3Afalse%7D%2C%22ym%22%3A%7B%22counterId%22%3Anull%2C%22eventLabel%22%3Anull%2C%22targetId%22%3Anull%2C%22send%22%3Afalse%7D%7D%7D')
			.sp-form-fields-wrapper
				button.sp-btn-close
				.sp-message
					div
				form.sp-element-container.ui-sortable.ui-droppable(novalidate='')
					.sp-field.sp-field-full-width(sp-id='sp-156c9e4c-de50-4ffd-aac8-565bb236f8e9')
						div(style='font-family: inherit; line-height: 1.2;')
							p
								| Подпишись на нашу новую рассылку! Мы отправляем письма пару раз в месяц и рассказываем о наших статьях, подкастах, событиях и рекомендуем разное про ЗОЖ. Еще иногда (почти всегда) шутим. В общем, делаем, как для себя.
								br
								br
								| Смело можешь отвечать нам - мы все читаем! Надеемся, тебе понравится :)
								br
								br
								| Еще наш юрист попросил указать, что иногда мы будем присылать рекламу. Но это не точно. Если что, мы предупредили!
					.sp-field(sp-id='sp-9e9a0f50-b555-4c9b-b4e9-7bb25693b3ab')
						.sp-checkbox-option
							label
								input(type='checkbox' sp-type='gdprConfirm' name='sform[Z2RwckNvbmZpcm0=]' value='yes' sp-tips='%7B%22required%22%3A%22%D0%9E%D0%B1%D1%8F%D0%B7%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5%20%D0%BF%D0%BE%D0%BB%D0%B5%22%7D' required='required')
								span Поставьте тут галочку, если хотите получать такие письма
								span
									strong *
					.sp-field(sp-id='sp-1c0e4bcd-faaf-4dbd-9512-dd390f1e70b0')
						.sp-checkbox-option
							label
								input(type='checkbox' sp-type='gdprTerms' name='sform[Z2RwclRlcm1z]' value='yes' sp-tips='%7B%22required%22%3A%22%D0%9E%D0%B1%D1%8F%D0%B7%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5%20%D0%BF%D0%BE%D0%BB%D0%B5%22%7D' required='required')
								span
									| Подписываясь на рассылку, вы соглашаетесь с
									a(href='' target='_blank') Правилами пользования и Политикой конфиденциальности
									|  и даете согласие на использование файлов cookie и передачу своих персональных данных в
								span
									strong *
					.sp-field(sp-id='sp-dedd5edd-99b5-4bd1-8ad9-eefce543becd')
						label.sp-control-label
							span Email
							strong *
						input.sp-form-control(type='email' sp-type='email' name='sform[email]' placeholder='username@gmail.com' sp-tips='%7B%22required%22%3A%22%D0%9E%D0%B1%D1%8F%D0%B7%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5%20%D0%BF%D0%BE%D0%BB%D0%B5%22%2C%22wrong%22%3A%22%D0%9D%D0%B5%D0%B2%D0%B5%D1%80%D0%BD%D1%8B%D0%B9%20email-%D0%B0%D0%B4%D1%80%D0%B5%D1%81%22%7D' required='required')
					.sp-field.sp-button-container(sp-id='sp-86193b54-b592-49c5-9614-2f601a4c24ef')
						button#sp-86193b54-b592-49c5-9614-2f601a4c24ef.sp-button Подписаться
				.sp-link-wrapper.sp-brandname__left
</template>
<script>
export default {
	name: 'SendpulseForm',
	mounted() {
		let sendpulseScript = document.createElement('script')
		sendpulseScript.setAttribute('src', '//static-login.sendpulse.com/apps/fc3/build/default-handler.js?1574954079563')
		document.head.appendChild(sendpulseScript)
		console.log('Subscribe\'s senpulse is mounted');
	},
}

</script>
<style lang="postcss" scoped>
.sp-form[sp-id="139886"] {
	display: block;
	background: #ffffff;
	padding: 15px;
	width: 450px;
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
		width: 420px;
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
		-moz-border-radius: 4px;
		-webkit-border-radius: 4px;
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
	display: none;
}
.sp-popup-outer {
	background: rgba(0, 0, 0, 0.5);
}

</style>

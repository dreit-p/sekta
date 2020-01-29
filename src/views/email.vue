<template lang="pug">
section.email-subscription
	.limit
		.title Подпишись на нашу рассылку!
		.sp-form-outer.sp-force-hide
			#sp-form-143202.sp-form.sp-form-regular.sp-form-embed(sp-id="143202" sp-hash="edaded80bae19b5bfc714442c388d6ec4e098a2bbec22789c0e37022cbfb0055" sp-lang="ru" sp-show-options="%7B%22satellite%22%3Afalse%2C%22maDomain%22%3A%22login.sendpulse.com%22%2C%22formsDomain%22%3A%22forms.sendpulse.com%22%2C%22condition%22%3A%22onEnter%22%2C%22scrollTo%22%3A25%2C%22delay%22%3A10%2C%22repeat%22%3A3%2C%22background%22%3A%22rgba(0%2C%200%2C%200%2C%200.5)%22%2C%22position%22%3A%22bottom-right%22%2C%22animation%22%3A%22%22%2C%22hideOnMobile%22%3Afalse%2C%22urlFilter%22%3Afalse%2C%22urlFilterConditions%22%3A%5B%7B%22force%22%3A%22hide%22%2C%22clause%22%3A%22contains%22%2C%22token%22%3A%22%22%7D%5D%2C%22analytics%22%3A%7B%22ga%22%3A%7B%22eventLabel%22%3A%22%D0%A1%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D0%B0_%D0%BF%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D0%BA%D0%B8_%D0%BD%D0%B0_%D0%B5%D0%B6_%D1%80%D0%B0%D1%81%D1%81%D1%8B%D0%BB%D0%BA%D1%83%22%2C%22send%22%3Afalse%7D%2C%22ym%22%3A%7B%22counterId%22%3Anull%2C%22eventLabel%22%3Anull%2C%22targetId%22%3Anull%2C%22send%22%3Afalse%7D%7D%7D")
				.sp-form-fields-wrapper
					.sp-message
						div
					form.sp-element-container.ui-sortable.ui-droppable(novalidate="")
						.sp-field.sp-field-full-width(sp-id="sp-435929bc-d12c-4f20-ab8c-fa81d4425fe2")
							div(style='font-family: Arial, "Helvetica Neue", sans-serif; line-height: 1.2;')
								p
									| Мы отправляем письма не чаще двух раз в месяц, рассказываем о наших статьях, подкастах, событиях и рекомендуем разное про ЗОЖ. Еще иногда (почти всегда) шлем мемы с котами :)
								p Смело можете отвечать нам — мы всё читаем! Надеемся, вам понравится.
								p
									| P. S. Наш юрист попросил указать, что иногда мы будем присылать рекламу. Но это не точно. Если что, мы вас предупредили. ;)
						.sp-field(sp-id="sp-b1454ece-4890-401e-adce-92b7a4164a95")
							.sp-checkbox-option
								label
									input(type="checkbox" sp-type="gdprConfirm" name="sform[Z2RwckNvbmZpcm0=]" value="yes" sp-tips="%7B%22required%22%3A%22%D0%9E%D0%B1%D1%8F%D0%B7%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5%20%D0%BF%D0%BE%D0%BB%D0%B5%22%7D" required="required")
									span Поставьте галочку, если хотите получать наши письма.
									span
										strong *
						.sp-field(sp-id="sp-262d3bd3-fce4-414e-b6ab-0a646d8720d0")
							.sp-checkbox-option
								label
									input(type="checkbox" sp-type="gdprTerms" name="sform[Z2RwclRlcm1z]" value="yes" sp-tips="%7B%22required%22%3A%22%D0%9E%D0%B1%D1%8F%D0%B7%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5%20%D0%BF%D0%BE%D0%BB%D0%B5%22%7D" required="required")
									span
										| Подписываясь на рассылку, вы соглашаетесь с #[a(href='../docs/privacy_policy.pdf' target="_blank") Правилами пользования и Политикой конфиденциальности]
										|  и даете согласие на использование файлов cookie и передачу своих персональных данных.
									span
										strong *
						.sp-field(sp-id="sp-7295986c-b52c-4b8d-9d53-067b6c937909")
							label.sp-control-label
								span Email
								strong *
							input.sp-form-control(type="email" sp-type="email" name="sform[email]" placeholder="username@gmail.com" sp-tips="%7B%22required%22%3A%22%D0%9E%D0%B1%D1%8F%D0%B7%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5%20%D0%BF%D0%BE%D0%BB%D0%B5%22%2C%22wrong%22%3A%22%D0%9D%D0%B5%D0%B2%D0%B5%D1%80%D0%BD%D1%8B%D0%B9%20email-%D0%B0%D0%B4%D1%80%D0%B5%D1%81%22%7D" required="required")
						.sp-field.sp-button-container(sp-id="sp-37345fed-54f3-43f1-bbd4-72f50a25a815")
							button#sp-37345fed-54f3-43f1-bbd4-72f50a25a815.sp-button Подписаться
					.sp-link-wrapper.sp-brandname__left

</template>

<script>
export default {
	name: 'EmailSubscription',
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

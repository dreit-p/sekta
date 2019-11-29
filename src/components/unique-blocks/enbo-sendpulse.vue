<template>
	<div class="sp-form-outer sp-fixed-outer sp-force-hide">
		<div id="sp-form-138016" sp-id="138016" sp-hash="ae2e68bcf1cbd64f749e0cc672e2763f10afae52262301cb387db841450cd704" sp-lang="ru" class="sp-form sp-form-regular sp-form-fixed sp-form-fixed__bottom-right sp-form-horizontal sp-animation-slide-bottom" sp-show-options="%7B%22satellite%22%3Afalse%2C%22maDomain%22%3A%22login.sendpulse.com%22%2C%22formsDomain%22%3A%22forms.sendpulse.com%22%2C%22condition%22%3A%22onEnter%22%2C%22scrollTo%22%3A50%2C%22delay%22%3A50%2C%22repeat%22%3A2%2C%22background%22%3A%22rgba(0%2C%200%2C%200%2C%200.5)%22%2C%22position%22%3A%22bottom-right%22%2C%22animation%22%3A%22sp-animation-slide-bottom%22%2C%22hideOnMobile%22%3Afalse%2C%22urlFilter%22%3Atrue%2C%22urlFilterConditions%22%3A%5B%7B%22force%22%3A%22show%22%2C%22clause%22%3A%22equal%22%2C%22token%22%3A%22http%3A%2F%2Fsektaschool.ru%2Fonline%2Fenergyboost%22%7D%5D%2C%22analytics%22%3A%7B%22ga%22%3A%7B%22eventLabel%22%3A%22%D0%A4%D0%BE%D1%80%D0%BC%D0%B0_%D0%BF%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D0%BA%D0%B8_%D0%91%D0%B0%D0%B7%D0%B0_%D1%80%D0%B5%D1%86%D0%B5%D0%BF%D1%82%D1%8B_%D1%81_%D1%81%D0%B0%D0%B9%D1%82%D0%B0%22%2C%22send%22%3Afalse%7D%2C%22ym%22%3A%7B%22counterId%22%3Anull%2C%22eventLabel%22%3Anull%2C%22targetId%22%3Anull%2C%22send%22%3Afalse%7D%7D%7D">
			<div class="sp-form-fields-wrapper">
				<button class="sp-btn-close ">
					&nbsp;
				</button>
				<div class="sp-message">
					<div></div>
				</div>
				<form novalidate="" class="sp-element-container ui-sortable ui-droppable ">
					<div class="sp-field sp-field-full-width" sp-id="sp-3dce3eb7-f013-4d53-a732-94777db3ee36">
						<div style="font-family: Arial, &quot;Helvetica Neue&quot;, sans-serif; line-height: 1.2;">
							<p>Укажите почту, и мы пришлём вам новогоднее меню из здоровых и вкусных блюд. С удобным списком продуктов!</p>
						</div>
					</div>
					<div class="sp-field " sp-id="sp-ab6823b6-5cf7-4c71-8f12-f70f1447a27a">
						<label class="sp-control-label"><span>Email:</span><strong>*</strong></label><input type="email" sp-type="email" name="sform[email]" class="sp-form-control " placeholder="username@gmail.com" sp-tips="%7B%22required%22%3A%22%D0%9E%D0%B1%D1%8F%D0%B7%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5%20%D0%BF%D0%BE%D0%BB%D0%B5%22%2C%22wrong%22%3A%22%D0%9D%D0%B5%D0%B2%D0%B5%D1%80%D0%BD%D1%8B%D0%B9%20email-%D0%B0%D0%B4%D1%80%D0%B5%D1%81%22%7D" required="required">
					</div>
					<div class="sp-field sp-button-container " sp-id="sp-76234ed8-755d-4fb9-b454-7da6c7a8dfd9">
						<button id="sp-76234ed8-755d-4fb9-b454-7da6c7a8dfd9" class="sp-button">
							Подписаться
						</button>
					</div>
				</form>
				<div class="sp-link-wrapper sp-brandname__left"></div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	mounted() {
		let sendpulseScript = document.createElement('script')
		sendpulseScript.setAttribute('src', '//static-login.sendpulse.com/apps/fc3/build/loader.js')
		sendpulseScript.setAttribute('sp-form-id', 'ae2e68bcf1cbd64f749e0cc672e2763f10afae52262301cb387db841450cd704')
		document.head.appendChild(sendpulseScript)

		console.log('EnBo senpulse is mounted');

		sendpulseScript = document.createElement('script')
		sendpulseScript.setAttribute('src', '//static-login.sendpulse.com/apps/fc3/build/default-handler.js?1572957626209')
		document.head.appendChild(sendpulseScript)
	}
}

</script>
<style>
.sp-force-hide {
	display: none;
}

.sp-form[sp-id="138016"] {
	display: block;
	background: rgba(238, 238, 238, 1);
	padding: 15px;
	width: 460px;
	max-width: 100%;
	border-radius: 8px;
	-moz-border-radius: 8px;
	-webkit-border-radius: 8px;
	border-color: #0ab6a1;
	border-style: solid;
	border-width: 1px;
	font-family: Arial, "Helvetica Neue", sans-serif;
	background-repeat: no-repeat;
	background-position: center;
	background-size: auto;
}

.sp-form[sp-id="138016"] input[type="checkbox"] {
	display: inline-block;
	opacity: 1;
	visibility: visible;
}

.sp-form[sp-id="138016"] .sp-form-fields-wrapper {
	margin: 0 auto;
	width: 430px;
}

.sp-form[sp-id="138016"] .sp-form-control {
	background: #ffffff;
	border-color: #cccccc;
	border-style: solid;
	border-width: 1px;
	font-size: 15px;
	padding-left: 8.75px;
	padding-right: 8.75px;
	border-radius: 8px;
	-moz-border-radius: 8px;
	-webkit-border-radius: 8px;
	height: 35px;
	width: 100%;
}

.sp-form[sp-id="138016"] .sp-field label {
	color: #444444;
	font-size: 13px;
	font-style: normal;
	font-weight: bold;
}

.sp-form[sp-id="138016"] .sp-button {
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
	-moz-box-shadow: none;
	-webkit-box-shadow: none;
	border-width: 1px;
	border-color: #0ab6a1;
	border-style: solid;
}

.sp-form[sp-id="138016"] .sp-button-container {
	text-align: left;
}

</style>

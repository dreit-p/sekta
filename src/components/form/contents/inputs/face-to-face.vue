<template lang="pug">
.content.face-to-face

	form
		p.tiny-text.tiny-text_face Вы выбрали курс
		p.heavy-text.heavy-text_face Основное направление

		p.tiny-text.tiny-text_face Расположение зала
		p.heavy-text.heavy-text_face м. Кропоткинская

		p.tiny-text.tiny-text_face Количество тренировок в неделю
		p.heavy-text.heavy-text_face 6

		p.tiny-text.tiny-text_face Время тренировок
		p.heavy-text.heavy-text_face пн-пт 8:00<br>сб 10:30, 12:00, 13:30


		p.tiny-text.tiny-text.tiny-text_face Промокод (если есть)
		app-input(
			data-vv-as='Промокод'
			name='promocode'
			type='text')

		p.heavy-text.heavy-text_face.tiny-text_long Итого к оплате: 6500 руб. за месяц

		app-checkbox(
			name='termsAgree'
			data-vv-as='Согласие с публичной офертой'
			:required='true'
			:error='errors.first("termsAgree")'
		)
			| Ознакомлен и согласен с условиями
			a(href='#')  публичной оферты

		green-btn(@click.prevent)
			| Перейти к оплате
</template>
<script>

/*=====================================
=            define inputs            =
=====================================*/

let globalInputs = {
	names: [],
	list: {}
};

for (var i = 0; i < globalInputs.names.length; i++) {
	let name = globalInputs.names[i];
	globalInputs.list[name] = {
		get () {
			return this.$store.state.inputs[name]
		},
		set (value) {
			this.$store.commit('setInputData', {name: name, data: value})
		}
	};
}

/*=====  End of define inputs  ======*/

export default {
	name: 'FaceToFace',
	components: {
		AppInput: () => import('@/components/form/input.vue'),
		AppCheckbox: () => import('@/components/form/checkbox.vue'),
		GreenBtn: () => import('@/components/form/green-btn.vue'),
	},
	props: {
		formData: {
			type: Array,
			default: ()=>[]
		},
		courseName: {
			type: String
		}
	},
	computed: {
		...globalInputs.list
	},
	data () {
		return {
			termsAgree: false,
		}
	},
}
</script>

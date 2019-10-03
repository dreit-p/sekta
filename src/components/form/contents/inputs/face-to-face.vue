<template lang="pug">
.content.face-to-face

	form(@submit.prevent="onSubmit", novalidate="true")
		p.tiny-text.tiny-text_face Вы выбрали курс
		p.heavy-text.heavy-text_face(v-if='!formData.course') Нет данных
		p.heavy-text.heavy-text_face(v-if='formData.course') {{formData.course.name}}

		p.tiny-text.tiny-text_face Расположение зала
		p.heavy-text.heavy-text_face(v-if='!formData.location') Нет данных
		p.heavy-text.heavy-text_face(v-if='formData.location') {{formData.location.name}}

		p.tiny-text.tiny-text_face Количество тренировок в неделю
		p.heavy-text.heavy-text_face(v-if='!formData.practice') Нет данных
		p.heavy-text.heavy-text_face(v-if='formData.practice') {{formData.practice.schedules.length}}

		p.tiny-text.tiny-text_face Время тренировок
		p.heavy-text.heavy-text_face
			template(v-for='string in getTrainingTimes') {{string}}
				br

		app-input(
			placeholder='Введите ссылку на аккаунт Вконтакте'
			data-vv-as='Аккаунт'
			:value='social_page_url'
			@input='social_page_url = $event'
			:error='getInputError("social_page_url")'
			v-validate='"required"'
			:class="{'error': getInputError('social_page_url'),'success': social_page_url}"
			name='social_page_url')

		p.tiny-text.tiny-text.tiny-text_face Промокод (если есть)
		app-input(
			data-vv-as='Промокод'
			name='promocode'
			:caption='promoprice.promocode_name ? promoprice.promocode_name : ""'
			:class='{success: !!promoprice.promocode_name}'
			@change='promocode = $event'
			type='text')

		p.heavy-text.heavy-text_face.tiny-text_long(v-if='price') Итого к оплате: {{ !!promoprice.amount ? promoprice.amount : price.value }} руб. за месяц

		app-checkbox(
			name='termsAgree'
			data-vv-as='Согласие с публичной офертой'
			v-model.trim='termsAgree'
			v-validate='"required:true"'
			:required='true'
			:class="{ 'error': errors.first('termsAgree'), 'success': !errors.first('termsAgree')}"
			:error='errors.first("termsAgree")'
		)
			| Ознакомлен и согласен с условиями&nbsp;
			a(:href='"../docs/"+{1: "publicoffer_msk_new.pdf", 2: "publicoffer_spb_new.pdf", 3: "publicoffer_reg_new.pdf"}[formData.city.id]', target='_BLANK', rel='noopener noreferrer') публичной оферты

		green-btn(:disabled='!price || isFormLocked')
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
			type: Object,
			default: ()=>{}
		}
	},
	mounted() {

	},
	methods: {
		getDiscountedPrice (price_id, code, cb) {
			this.$store.dispatch('reqDiscountedPrice', {price_id, code}).then((resp)=>{
				cb(resp);
			}).catch(()=>{
				this.promoprice = Infinity
			});
		},
		unlockForm() {
			setTimeout(()=>{
				this.isFormLocked = false;
			}, 1000);
		},
		ifValid(cb) {
			this.$validator.validateAll().then((result) => {
				if (result) {
					cb();
					return;
				}
			});
		},
		getInputError(name) {
			if (this.errors.first(name)) {
				return this.errors.first(name)
			}
			if (this.receivedErrors[name]) {
				let errorString = '';
				if (Array.isArray(this.receivedErrors[name])) {
					this.receivedErrors[name].forEach((text)=>{
						errorString = errorString + " " + text;
					});
				}
				return errorString.trim();
			}
		},
		onSubmit() {
			if (this.isFormLocked) {
				return false;
			}
			this.ifValid(()=>{
				this.isFormLocked = true;

				let currentCityName = this.$route.params.city
				let cityId = this.$store.state.cities.find(city=>city.englishName === currentCityName).id

				this.$store.dispatch('sendGymOrder', {price_id:this.price.id, city_id:cityId, social_page_url: this.social_page_url})
					.then((resp)=>{
						this.unlockForm();
						this.$emit('submit', 'face-to-face');
						this.$store.dispatch('setFormModalState', {modalState: false});
						let gymOrderID = resp.data.order_id;
						this.$store.dispatch('reqGymPayment', {gymOrderId: gymOrderID, price_id: this.price.id, promocode: this.promocode}).then((resp)=>{
							window.location = resp.data.payment.approve_url;
						});
					})
					.catch((err)=>{
						alert(err.data.message);
						this.unlockForm();
					});
			});
		},
	},
	watch: {
		promocode() {
			this.getDiscountedPrice(this.price.id, this.promocode, (resp)=>{
				this.promoprice = resp;
			});
		},
	},
	computed: {
		...globalInputs.list,
		price() {
			if (this.formData.practice.prices.length < 1) {
				return false;
			}
			let minPrice = Math.min(...this.formData.practice.prices.map(price => price.value));
			return this.formData.practice.prices.find(price => price.value === minPrice);
		},
		getTrainingTimes() {

			let uniqByTime = {};
			this.formData.practice.schedules.forEach((practice)=>{
				if (! uniqByTime[practice.time]) {
					uniqByTime[practice.time] = [practice.week_day];
				} else {
					uniqByTime[practice.time].push(practice.week_day);
				}
			});

			let uniqByDays = {};
			for (let time in uniqByTime) {
				if (uniqByTime.hasOwnProperty(time)) {
					let keyName = "";
					let currentPairIndex = 0;

					for (var timeIdx = uniqByTime[time].length - 1; timeIdx > currentPairIndex; timeIdx--) {
						let consecutiveDays = [];
						let conDaysIdx = 0;
						uniqByTime[time].reduce((prev, current)=>{
							if (prev + 1 === current) {
								consecutiveDays[conDaysIdx]
									? consecutiveDays[conDaysIdx].push(current)
									: (consecutiveDays[conDaysIdx] =
											currentPairIndex === 0
												? [prev, current]
												: [current]);
							} else {
								consecutiveDays[conDaysIdx] =
									currentPairIndex === 0
										? [prev, current]
										: [current];
								conDaysIdx++;
							}
							currentPairIndex++;
							return current;
						});
						for (var i = 0; i < consecutiveDays.length; i++) {
							if (i>0) {keyName += ', '}
							if (consecutiveDays[i].length > 2) {
								keyName = keyName + this.daysNames[-1+ consecutiveDays[i][0]] +"-"+ this.daysNames[-1+ consecutiveDays[i][consecutiveDays[i].length-1]] + (i+1 < consecutiveDays.length ? ", " : "");
							} else {
								for (var j = 0; j < consecutiveDays[i].length; j++) {
									keyName = keyName + this.daysNames[-1+ consecutiveDays[i][j]] + (j+1 < consecutiveDays[i].length ? ", " : "");
								}
							}
						}
					}

					if (uniqByTime[time].length <=1) {
						keyName = this.daysNames[uniqByTime[time][0]-1]
					}

					let timeToInt = (t) => { let d = t.split(':'); return +d[0] * 60 + +d[1]; };

					if (!uniqByDays[keyName]) {
						uniqByDays[keyName] = [time]
					} else {
						let index = uniqByDays[keyName].findIndex(dayTime => timeToInt(dayTime) > timeToInt(time));
						if (index === -1) {
							uniqByDays[keyName].push(time);
						} else {
							uniqByDays[keyName].splice(index, 0, time);
						}
					}

				}
			}
			let strings = ()=>{
				let result = [];
				for (let day in uniqByDays) {
					if (uniqByDays.hasOwnProperty(day)) {
						let days = '';
						for (var i = 0; i < uniqByDays[day].length; i++) {
							days = days + uniqByDays[day][i] + (i+1 < uniqByDays[day].length ? ", " : "");
						}
						result.push(day +": "+ days);
					}
				}
				return result;
			}
			return strings();
		},
	},
	data () {
		return {
			isFormLocked: false,
			termsAgree: false,
			promocode: null,
			promoprice: Infinity,
			receivedErrors: {},
			social_page_url: '',
			daysNames: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
		}
	},
}
</script>

<template lang="pug">
.content.register
	h2.merch-title {{ isMerch ? '#Sektamerch' : '#Sektabullet'}}
	form(@submit.prevent.stop)
		app-dropdown(
			:placeholder="isMerch ? 'Выберите размер' : 'Выберите количество'"
			data-vv-as='Товар'
			v-model="priceId"
			:options="prices"
			:disabled="false"
			:class="{ 'error': myErrors.priceId, 'success': priceId}"
			name='prices'
			@change="pricesChangeHandler")
		app-dropdown(
			v-show="priceId && isMerch"
			placeholder='Выберите количество'
			data-vv-as='Количество'
			v-model="quantity"
			:options='quantityOptions'
            :disabled="false"
			v-validate='`required|numeric|max_value:${priceId ? prices.find(p => p.id === priceId).available_quantity : 0}`'
			:class="{ 'error': myErrors.quantity || errors.has('quantity'), 'success': quantity && !errors.has('quantity') }"
			@change="() => inputHandler('quantity')"
			name='quantity')
		app-dropdown(
			placeholder='Выберите способ получения заказа'
			data-vv-as='Способ получения'
			v-model="deliveryId"
			:options='deliveryOptions'
			:class="{ 'error': myErrors.deliveryId, 'success': deliveryId}"
			:caption="deliveryId === 'pickup' ? 'Забрать заказ можно по адресу: Невский пр., 11/2, офис 42 с понедельника по пятницу с 10:00 до 19:00.' : ''"
			name='delivery'
			@change="() => inputHandler('deliveryId')")
		.delivery(v-if="deliveryId === 'courier'")
			.delivery-city
				app-input(
					placeholder='Город'
					data-vv-as='Город'
					v-model="city.city_name"
					:class="{ 'error': myErrors.city, 'success': city.guid}"
					:error="myErrors.city ? myErrors.city[0] : ''"
					name='city'
					type='city'
					@input="cityInputHandler"
					@change="cityChangeHandler"
					)
				template(v-if="foxCities.length > 0")
					.fox-cities__close(@click="hideCities")
					.fox-cities__list
						.fox-cities__item(v-for="city in foxCities" @click="() => selectCity(city)") {{city.city_name}}

			app-input(
				placeholder='Индекс'
				data-vv-as='Индекс'
				v-model="index"
				v-validate='"required"'
				:class="{ 'error': myErrors.index || errors.has('index'), 'success': index && !errors.has('index')}"
				:error='errors.first("index")'
				@input="inputHandler('index')"
				name='index'
				type='index')

			app-input(
				placeholder='Адрес доставки'
				data-vv-as='Адрес доставки'
				v-model="address"
				v-validate='"required"'
				:class="{ 'error': myErrors.address || errors.has('address'), 'success': address && !errors.has('address')}"
				:error='errors.first("address")'
				@input="() => inputHandler('address')"
				name='address'
				type='address')

			green-btn.green-btn_center(inverted @click.prevent="calcDeliveryPrice()")
				| Рассчитать стоимость
			.delivery-block
				.delivery-calculating(v-if="isDeliveryCalc") Идет расчет стоимости доставки…
				.delivery-calcilated(v-if="isDeliveryDone")
					.delivery-price Примерная стоимость доставки:
						span {{` ${deliveryPrice} руб.`}}
					.delivery-info Оплата доставки производится курьеру при получении заказа

		app-input(
			placeholder='ФИО получателя'
			data-vv-as='ФИО'
			v-model="name"
			v-validate='"required"'
			:class="{ 'error': myErrors.name || errors.has('name'), 'success': name && !errors.has('name') }"
			:error="errors.first('name') || (myErrors.name ? myErrors.name[0] : '')"
			:prevent="true"
			@keydown.enter.prevent="makeOrder"
			@input="() => inputHandler('name')"
			name='name'
			type='name')

		app-input(
			placeholder='Телефон получателя'
			data-vv-as='Телефон'
			v-model="phone"
			v-validate='"required"'
			:class="{ 'error': myErrors.phone || errors.has('phone'), 'success': phone && !errors.has('phone') }"
			:error='errors.first("phone") || (myErrors.phone ? myErrors.phone[0] : "")'
			:prevent="true"
			@keydown.enter.prevent="makeOrder"
			@input="() => inputHandler('phone')"
			name='phone')
		app-input(
			placeholder='Промокод'
			data-vv-as='Промокод'
			v-model="promocode"
			:class="{ 'error': myErrors.promocode, 'success': promo.amount }"
			:error="myErrors.promocode ? myErrors.promocode[0] : ''"
			name='promocode'
			:prevent="true"
			@keydown.enter.prevent="makeOrder"
			@input="promoInputHandler"
			@blur="promoChangeHandler"
			:caption="promo.promocode_name"
		)
		.merch__total-price(v-if="priceId &&!errors.has('quantity') && (!isMerch || quantity)") Итого к оплате: {{promo.amount * (quantity ? quantity : 1) || prices.find(p => p.id === priceId).value * (quantity ? quantity : 1)  }} руб.

		app-checkbox(
			name='termsAgree'
			data-vv-as='Согласие с доставкой, правилами возврата и публичной офертой'
			v-model="termsAgree"
			:required='true'
			:class="{ 'error': myErrors.termsAgree, 'success': fields.termsAgree && fields.termsAgree.valid}"
			:error='errors.first("termsAgree")'
			@change="() => inputHandler('termsAgree')"
		)
			| Ознакомлен и согласен с условиями&nbsp;
			a(href='https://sektaschool.ru/site/docs/delivery_merch.pdf', target='_BLANK', rel='noopener noreferrer') доставки,
			|&nbsp;
			a(href='https://sektaschool.ru/site/docs/return_policy_merch.pdf', target='_BLANK', rel='noopener noreferrer') правилами возврата товара
			|  и
			a(href="/docs/publicoffer_msk_new.pdf", target='_BLANK', rel='noopener noreferrer') публичной офертой

		green-btn.green-btn_center(@click.prevent="makeOrder")
			| Перейти к оплате
</template>
<script>
/*=====================================
=            define inputs            =
=====================================*/

let globalInputs = {
	names: ["email", "password", "firstname", "lastname"],
	list: {}
};

for (var i = 0; i < globalInputs.names.length; i++) {
	let name = globalInputs.names[i];
	globalInputs.list[name] = {
		get() {
			return this.$store.state.inputs[name];
		},
		set(value) {
			this.$store.commit("setInputData", { name: name, data: value });
		}
	};
}

/*=====  End of define inputs  ======*/
import api from "../../../../assets/api/index.js";

export default {
	name: "FormOnline",
	components: {
		AppInput: () => import("@/components/form/input.vue"),
		AppCheckbox: () => import("@/components/form/checkbox.vue"),
		AppDropdown: () => import("@/components/form/dropdown.vue"),
		GreenBtn: () => import("@/components/form/green-btn.vue")
	},
	computed: {
		...globalInputs.list,
		userCity() {
			return this.$store.getters.getUserCity;
		},
		quantityOptions() {
			if (!this.priceId) return [];
			let num = this.prices.find(p => p.id === this.priceId).available_quantity;
			if (num > 10) num = 10;
			let options = [];
			for (let i = 1; i <= num; i++) {
				options.push({ id: i, name: i });
			}
			return options;
		}
	},
	data() {
		return {
			isMerch: false,
			priceId: null,
			prices: [],
			quantity: null,
			deliveryId: null,
			deliveryOptions: [
				{ id: "pickup", name: "Самовывоз из Санкт-Петербурга" },
				{ id: "courier", name: "Доставка курьером по России" }
			],
			foxCities: [],
			isCity: false,
			city: {
				city_name: "",
				guid: ""
			},
			index: "",
			address: "",
			name: "",
			phone: "",
			promocode: "",
			promo: {
				amount: null
			},
			termsAgree: false,
			hasError: false,
			myErrors: {
				priceId: null,
				quantity: null,
				deliveryId: null,
				city: null,
				index: null,
				address: null,
				name: null,
				phone: null,
				promocode: null,
				termsAgree: null
			},
			//Delivery
			timerId: null,
			isDeliveryCalc: false,
			isDeliveryDone: false,
			deliveryPrice: null,

            isOrderLoading: false,
		};
	},
	created() {
		this.isMerch = this.$route.name === "sektamerch";
		let product = this.isMerch ? "TSHIRT" : "BULLET";
		api.getProduct(product).then(res => {
			let newPrices = [] 
			res.data.data.forEach(product => product.prices.forEach(price => newPrices.push(price)))
			this.prices = newPrices;
		});
	},
	methods: {
		inputHandler(name) {
			this.myErrors[name] = null;
			if (name === "city" || name === "address" || name === "index") {
				this.isDeliveryDone = false;
			}
		},
		pricesChangeHandler() {
			if (this.promocode) {
				this.checkPromocode(this.promocode);
			}
			this.quantity = null;
			this.myErrors.priceId = null;
		},
		//Delivery
		getCities(input) {
			api.getFoxCities(input).then(res => {
				this.foxCities = res.data.data;
			});
		},
		selectCity(city) {
			this.city = city;
			this.isCity = true;
		},
		cityChangeHandler() {
			setTimeout(this.hideCities, 150);
		},
		hideCities() {
			this.foxCities = [];
			clearTimeout(this.timerId);
		},
		cityInputHandler(input) {
			if (this.timerId) {
				clearTimeout(this.timerId);
			}
			if (!input) return;
			this.inputHandler("city");
			this.timerId = setTimeout(() => this.getCities(input), 1000);
			if (this.isCity) {
				this.isCity = false;
				this.foxCities = [];
				clearTimeout(this.timerId);
			} else {
				this.city.guid = "";
			}
		},
		//Promocode
		promoInputHandler() {
			this.promo = { amount: null };
			this.inputHandler("promocode");
		},
		promoChangeHandler(input) {
			if (this.priceId) {
				this.checkPromocode(input);
			}
		},
		checkPromocode(code) {
			api.reqDiscountedPrice(this.priceId, code).then(
				res => {
					this.promo = res.data;
				},
				rej => {
					this.myErrors.promocode = [rej.response.data.message];
				}
			);
		},
		//Order
		calcDeliveryPrice() {
			this.checkDeliveryValid();
			if (!this.hasError) {
				this.isDeliveryDone = false;
				this.isDeliveryCalc = true;
				api.getFoxPrice(this.city.guid).then(res => {
					this.isDeliveryCalc = false;
					this.isDeliveryDone = true;
					this.deliveryPrice = res.data.data.price;
				});
			}
		},
		checkDeliveryValid() {
			this.hasError = false;
			if (!this.city.guid) {
				this.myErrors.city = ["Выберите город из списка"];
				this.hasError = true;
			} else {
				this.checkInput("city");
			}
			this.checkInput("index");
			this.checkInput("address");
		},
		checkOrderValid() {
			this.hasError = false;
			if (this.deliveryId === "courier") this.checkDeliveryValid();

			this.checkInput("priceId");
			if (this.isMerch) {
				this.checkInput("quantity");
				if (
					this.quantity >
          (this.priceId
          	? this.prices.find(p => p.id === this.priceId).available_quantity
          	: 0)
				) {
					this.hasError = true;
				}
			}
			this.checkInput("deliveryId");
			this.checkInput("name");
			this.checkInput("phone");
			this.checkInput("termsAgree");
		},
		checkInput(name) {
			if (!this[name]) {
				this.myErrors[name] = [""];
				this.hasError = true;
			}
		},
		makeOrder() {
			this.checkOrderValid();
			if (this.hasError || this.isOrderLoading) return;
            this.isOrderLoading = true;
			let order = {
				price_id: this.priceId,
				delivery_type: this.deliveryId,
				recipient_name: this.name,
				recipient_phone: this.phone,
				city_id: 1,
			};
			if (this.deliveryId === "courier") {
				order.delivery_city = this.city.city_name;
				order.delivery_index = this.index;
				order.delivery_address = this.address;
			}
			if (this.isDeliveryDone) order.delivery_price = this.deliveryPrice;
			api.makeProductOrder(order, this.$store.state.user.token).then(
				res => {
					this.makePayment(res.data.order_id);
				},
				rej => {
                    this.isOrderLoading = false;
					this.errorHandler(rej.response.data.errors);
				}
			);
		},
		makePayment(order_id) {
			let data = {
				order_id,
				price_id: this.priceId
			};
			if (this.promo.amount) data.promocode = this.promo.promocode_code;
			data.quantity = this.quantity ? this.quantity : 1;
			api
				.makeProductPayment(data, this.$store.state.user.token)
				.then(res => {
                    window.location = res.data.payment.approve_url;
                }, rej => {
                    this.isOrderLoading = false;
                });
		},
		errorHandler(errors) {
			for (let key in errors) {
				let newKey = key.replace("delivery_", "").replace("recipient_", "");
				this.myErrors[newKey] = errors[key];
			}
		}
	}
};
</script>

<style lang="postcss">
.content.register {
  max-width: calc(335px + 15px * 2) !important;
}
.merch-title {
  margin-top: 12px;
}
.green-btn_center.green-btn {
  margin-left: auto;
  margin-right: auto;
}
.merch__total-price {
  margin: 15px 0;
  font-weight: 900;
  font-family: "Montserrat", "Uni Sans", "Tahoma", "Segoe UI", arial, sans-serif;
}
.delivery-city {
  position: relative;
}
.fox-cities {
  &__list {
    position: absolute;
    top: 46px;
    left: 0;
    background-color: white;
    z-index: 3;
    width: 100%;
    max-height: 609px;
    overflow: auto;
  }
  &__item {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 30px;
    padding-left: 10px;
    font-size: 14px;
    border: 1px solid #808080;
    border-top: none;
    &:hover {
      color: white;
      background-color: #0078d7;
    }
  }
  &__close {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 2;
  }
}
.delivery-block {
  font-size: 14px;
  font-family: "Open Sans", "PT Sans", "Segoe UI", arial, sans-serif;
}
.delivery-calculating {
  margin: 15px 0;
  font-style: italic;
}
.delivery-price span {
  font-weight: bold;
  font-size: 16px;
}
.delivery-info {
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 12px;
  color: #808080;
}
.app-dropdown.success .caption {
  display: block !important;
  color: #808080 !important;
}
</style>

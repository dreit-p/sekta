<template lang="pug">
	.tile.course
		.main-content
			.top-content
				.img-side
					svg-icon(name='logo-sekta')
				.text-side
					.title {{ this.courseName }}
					.info(v-if="group")
						.line(v-if="group.curator")
							svg-icon(name='icon-user')
							| Куратор:&nbsp;
							span.green {{ this.group.curator.name }}
						.line(v-if="group.chat_number")
							svg-icon(name='icon-chat')
							| Номер чата:&nbsp;
							a(:href="this.group.chat_number") {{this.group.chat_number}}
						// .line(v-if="progress || progress === 0")
						// 	svg-icon(name='icon-graph')
						// 	| Прогресс:&nbsp;
						// 	span.green {{this.progress}}%
						.line(v-if="date")
							svg-icon(name='icon-calendar')
							| Старт: {{ this.date }}
			// .progress-bar(v-if="group && (progress || progress === 0)")
			// 	.border
			// 	.fill(v-bind:style="{ width: `${this.progress}%` }")
			.progress-caption {{this.payStatus}}
			.progress-caption(v-if="payment") {{this.payment.price_name}}
			.btns
				green-btn.btn.btn-green(v-if="payment" @click="payHandler") Оплатить курс
				.select-payment(v-else-if="prices && prices.length > 0")
					app-dropdown.select-payment__dropdown(
						placeholder='Сколько недель вы хотите оплатить?'
						data-vv-as='Количество недель'
						v-model="price"
						:options='prices'
						:disabled="false"
						:class="{ 'error': errors.has('weeks'), 'success': fields.weeks && fields.weeks.valid}"
						:error='errors.first("weeks")'
						name='weeks'
						@change="pricesChangeHandler")
					app-input(
						placeholder='Промокод(если есть)'
						data-vv-as='Промокод'
						v-model="promocode"
						:class="{ 'error': promocodeErrors, 'success': promo.amount }"
						:error="promocodeErrors ? promocodeErrors[0] : ''"
						name='promocode'
						:prevent="true"
						@keydown.enter.prevent="makeOrder"
						@input="promoInputHandler"
						@blur="promoChangeHandler"
						:caption="promo.promocode_name"
					)
					.order__total-price(v-if="price") Итого к оплате: {{promo.amount || prices.find(p => p.id === price).value}} руб.
					app-checkbox(
						name='termsAgree'
						data-vv-as='обработка персональных данных'
						v-model.trim='termsAgree'
						v-validate='"required:true"'
						:required='true'
						:class="{ 'error': errors.has('termsAgree'), 'success': fields.termsAgree && fields.termsAgree.valid}"
						:error='errors.first("termsAgree")'
					)
						| Ознакомлен и согласен с условиями&ensp;
						a(:href='"../docs/"+{1: "publicoffer_msk_new.pdf", 2: "publicoffer_spb_new.pdf", 3: "publicoffer_reg_new.pdf"}[cityId]', target='_BLANK', rel='noopener noreferrer') публичной оферты
					p.tiny-text Оплата производится на сайте&nbsp;
						a(href='https://kassa.yandex.ru/') Яндекс.Кассы
					p.tiny-text Оказание услуг осуществляется&nbsp;
						a(:href='requisitesLink', target='_BLANK', rel='noopener noreferrer')
							| ООО «ШКОЛА ИДЕАЛЬНОГО ТЕЛА {{  {1: 'Москва', 2: 'Санкт-Петербург', 3: 'Регионы'}[cityId]  }}»
					green-btn.btn.btn-green(:disabled="!price || !termsAgree" @click="payHandler") Перейти к оплате
				green-btn(inverted v-if="url" :href="url" target="_blank").btn Открыть курс
				green-btn(inverted v-if="demoUrl" :href="demoUrl" target="_blank").btn Демо
		.additional-content(
			v-if="this.additionalInfo"
			v-bind:class="{ dropdown_active: isDropDownActive }"
		)
			button.open-btn(
				@click='isDropDownActive = !isDropDownActive'
			) Подробнее о курсе
				svg-icon(name='down-arrow')
			.more-dropdown
				p {{ this.additionalInfo }}
</template>

<script>
import { formatDate } from "../../assets/misc";
import api from "@/assets/api/index.js";

export default {
	name: "ActiveCourse",
	components: {
		SvgIcon: () => import("@/components/SvgIcon.vue"),
		GreenBtn: () => import("@/components/form/green-btn.vue"),
		AppDropdown: () => import("@/components/form/dropdown.vue"),
		AppInput: () => import("@/components/form/input.vue"),
		AppCheckbox: () => import("@/components/form/checkbox.vue")
	},
	props: {
		orderId: {
			type: Number,
			default: null
		},
		courseName: {
			type: String,
			default: "NoName Course"
		},
		group: {
			type: Object,
			default: null
		},
		prices: {
			type: Array,
			default: null
		},
		additionalInfo: {
			type: String,
			default: null
		},
		progress: {
			type: Number,
			default: null
		},
		payStatus: {
			type: String,
			default: null
		},
		url: {
			type: String,
			default: null
		},
		demoUrl: {
			type: String,
			default: null
		},
		payment: {
			type: Object,
			default: null
		},
		cityId: {
			type: Number,
			default: 3
		}
	},
	data() {
		return {
			isDropDownActive: false,
			date: "",
			price: null,
			termsAgree: false,
			//Promocode
			promocode: "",
			promocodeErrors: null,
			promo: ""
		};
	},
	computed: {
		requisitesLink() {
			let city = this.$store.state.cities.find(city => city.id === this.cityId);
			if (!city || city === -1) return;

			return (
				window.location.protocol + "//" + city.code + "." + window.location.host
			);
		}
	},
	created() {
		this.date = this.group ? formatDate(this.group.start_date) : "";
	},
	methods: {
		payHandler() {
			if (this.payment && this.payment.approve_url) {
				this.$emit("pay", this.payment.approve_url);
			} else {
				let code = "";
				if (this.promo.amount) code = this.promo.promocode_code;
				this.$store
					.dispatch("reqOnlinePayment", {
						orderId: this.orderId,
						price_id: this.price,
						promocode: code
					})
					.then(res => {
						this.$emit("pay", res.data.payment.approve_url);
					});
			}
		},
		goToCourseHandler() {
			this.$emit("goToCourse");
		},
		pricesChangeHandler() {
			if (this.promocode) {
				this.checkPromocode(this.promocode);
			}
		},
		//Promocode
		promoInputHandler() {
			this.promo = { amount: null };
			this.promocodeErrors = null;
		},
		promoChangeHandler(input) {
			if (this.price) {
				this.checkPromocode(input);
			}
		},
		checkPromocode(code) {
			api.getPriceWithPromocode(this.price, code).then(
				res => {
					this.promo = res.data;
				},
				rej => {
					this.promocodeErrors = [rej.response.data.message];
				}
			);
		}
	}
};
</script>

<style lang="postcss">
article.main-body {
  .green {
    color: var(--accent_color);
  }
  .tile {
    min-width: 100%;
    background-color: white;
    margin-bottom: 30px;
    overflow: hidden;
    @media (max-width: 500px) {
      margin-bottom: 20px;
    }
    &:last-child {
      margin-bottom: auto;
    }
  }
  .course {
    overflow: hidden;
    @media (max-width: 1024px) {
      .main-content {
        padding-left: 0;
      }
      .img-side {
        position: relative;
        min-height: 90px;
      }
    }
    .top-content {
      display: flex;
      @media (max-width: 500px) {
        flex-direction: column;
      }
    }
    .main-content {
      margin: 20px 30px;
      position: relative;
      padding-left: 175px;
      padding-bottom: 15px;
      @media (max-width: 500px) {
        padding-bottom: 5px;
        margin: 10px var(--col-space);
      }
    }
    .img-side {
      min-height: 100%;
      max-width: 145px;
      margin-right: 30px;
      float: left;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      @media (max-width: 500px) {
        width: calc(50% - 30px);
        min-height: 70px !important;
      }
      img,
      svg {
        margin: 0;
        height: auto;
      }
    }
    .text-side {
      float: left;
      @media (max-width: 500px) {
        float: right;
      }
    }
    .title {
      font-size: 18px;
      font-weight: bold;
      text-transform: uppercase;
      @media (max-width: 500px) {
        font-size: 13px;
      }
    }
    .info {
      .line {
        margin: 15px 5px;
        font-size: 14px;
        font-weight: bold;
        @media (max-width: 500px) {
          margin: 10px 0;
          font-size: 12px;
        }
        .svg-icon {
          margin: 2px 3px;
          max-height: calc(1em - 2px);
          display: inline-block;
          float: left;
          width: 15px;
        }
      }
    }
    .progress-bar {
      height: 20px;
      width: calc(100% + 4px);
      margin: 0 -2px;
      overflow: hidden;
      position: relative;
      border-radius: 5px;
      z-index: 0;
      @media (max-width: 500px) {
        margin: 10px * 5px;
        height: 17px;
      }
      .border {
        z-index: 1;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: transparent;
        border-radius: 5px;
        border: 1px solid #cbcbcb;
        box-shadow: inset 0 0 0 2px white;
      }
      .fill {
        z-index: -1;
        position: relative;
        display: block;
        margin: 2px;
        opacity: 0.5;
        background-color: var(--accent_color);
        height: calc(100% - 4px);
        width: 0;
      }
    }
    .progress-caption {
      width: 100%;
      overflow: hidden;
      font-size: 11px;
      font-weight: bold;
      color: #6a6a6a;
      margin: 15px 0;
      @media (max-width: 500px) {
        margin: 5px 0 10px;
      }
    }
  }
  .btns {
    width: 100%;
    overflow: hidden;
    margin: -10px;
  }
  .btn {
    border-radius: 5px;
    border: 1px solid var(--accent_color);
    padding: 15px 18px;
    margin: 10px;
    font-weight: bold;
    &.btn-green:hover {
      border: 1px solid #078675;
    }
    @media (max-width: 500px) {
      padding: 10px 14px;
      font-size: 11px;
      min-width: 110px;
    }
  }
  .select-payment {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding-left: 10px;

    .btn {
      margin-left: 0;
    }

    .select-wrapper {
      max-width: 305px;
    }
    .input-wrapper {
      margin-top: 15px;
    }
    .order__total-price {
      margin-top: 10px;
      font-size: 20px;
      font-family: "Montserrat", "Uni Sans", "Tahoma", "Segoe UI", arial,
        sans-serif;
      font-weight: 700;
    }
    .app-checkbox {
      max-width: 100%;
      margin: 14px 0;
    }
    .tiny-text {
      font-size: 12px;
      font-family: "Open Sans", "PT Sans", "Segoe UI", arial, sans-serif;
      line-height: 1.33;
      margin-bottom: 14px;
      margin-top: 0;
      a {
        color: #0ab6a1;
      }
    }
  }

  .additional-content {
    border-top: 1px solid #cbcbcb;
    padding-bottom: 10px;
    .open-btn {
      display: block;
      position: relative;

      margin: 10px auto;
      padding-right: 15px;

      background-color: transparent;
      border: none;

      cursor: pointer;

      font-size: 11px;
      font-weight: bold;
      color: #6a6a6a;
      &:focus {
        outline: none;
      }
      &:hover {
        color: #0ab6a1;
      }
      .svg-icon--down-arrow {
        position: absolute;
        right: 0;
        color: inherit;
        margin-left: 5px;
        margin-top: 3px;
      }
      // @media (max-width: 500px) {
      //   padding: 10px;
      // }
    }
  }

  .additional-content {
    .more-dropdown {
      margin: 0 30px;

      max-height: 0;

      transition: all 0.5s ease;

      overflow: hidden;
      font-size: 16px;
    }
  }

  .dropdown_active {
    .more-dropdown {
      max-height: 200px;
    }
  }
}
</style>

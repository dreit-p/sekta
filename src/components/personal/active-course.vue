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
							| Номер чата: 
							a(:href="this.group.chat_number") {{this.group.chat_number}}
						.line(v-if="progress || progress === 0")
							svg-icon(name='icon-graph')
							| Прогресс:&nbsp;
							span.green {{this.progress}}%
						.line(v-if="date")
							svg-icon(name='icon-calendar')
							| Старт: {{ this.date }}
			.progress-bar(v-if="group && (progress || progress === 0)")
				.border
				.fill(v-bind:style="{ width: `${this.progress}%` }")
			.progress-caption {{this.payStatus}}

			.btns
				green-btn.btn.btn-green(v-if="payUrl" @click="payHandler") Оплатить курс
				.select-payment(v-else-if="prices")
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
						placeholder='Промокод'
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
					green-btn.btn.btn-green(:disabled="!price" @click="payHandler") Перейти к оплате
				green-btn(inverted v-if="url" @click="openCourseHandler").btn Открыть курс
		.additional-content(
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
import api from '@/assets/api/index.js'

export default {
	name: "ActiveCourse",
	components: {
		SvgIcon: () => import("@/components/SvgIcon.vue"),
		GreenBtn: () => import("@/components/form/green-btn.vue"),
		AppDropdown: () => import("@/components/form/dropdown.vue"),
		AppInput: () => import("@/components/form/input.vue"),
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
		payUrl: {
			type: String,
			default: null
		}
	},
	data() {
		return {
			isDropDownActive: false,
			date: "",
			price: null,
			//Promocode
			promocode: '',
			promocodeErrors: null,
			promo: '',
		};
	},
	created() {
		this.date = this.group ? formatDate(this.group.start_date) : "";
	},
	methods: {
		openCourseHandler() {
			this.$emit("openCourse", this.url);
		},
		payHandler() {
			if (this.payUrl) {
				this.$emit("pay", this.payUrl);
			} else {
				let code = ''
				if (this.promo.amount) code = this.promo.promocode_code;
				this.$store.dispatch('reqOnlinePayment', {orderId: this.orderId, price_id: this.price, promocode: code}).then(
					res => {
						this.$emit("pay", res.data.payment.approve_url);
					},
				)
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
			this.promocodeErrors = null
		},
		promoChangeHandler(input) {
			if (this.price) {
				this.checkPromocode(input);
			}
		},
		checkPromocode(code) {
			api.reqDiscountedPrice(this.price, code).then(
				res => {
					this.promo = res.data;
				},
				rej => {
					this.promocodeErrors = [rej.response.data.message];
				}
			);
		},
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
        width: 50%;
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

	.select-wrapper {
		margin-left: 10px;
		max-width: 305px;
	}
	.app-input {
		padding-left: 10px;
	}
	.input-wrapper {
		margin-top: 15px;
	}
	.order__total-price {
		margin-left: 10px;
		margin-top: 10px;
		font-size: 20px;
		font-family: 'Montserrat', 'Uni Sans', 'Tahoma', 'Segoe UI', arial, sans-serif;
		font-weight: 700;
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
      }
      @media (max-width: 500px) {
        padding: 10px;
      }
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

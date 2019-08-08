<template lang="pug">
	article.main-body
		.limit
			section.first-row
				.confirm-mail(v-if="!isMailSent && !user.is_email_verified") Адрес электронной почты не подтвержден.&nbsp;
					a(href="#" @click.prevent="sendMailConfirm").green Подтвердить сейчас
				.confirm-mail(v-else-if="isMailSent") Письмо отправлено на вашу почту
			section.column
				template(v-if="onlineCourses.length > 0")
					h2.section-title.first Заявки
					active-course(
						v-for="course in unPaidCourses"
						:courseName="course.course_name"
						:payStatus="course.pay_status"
						:progress="course.edu_progress"
						:group="course.group"
						:url="course.course_url"
						:payUrl="course.approve_payment_url"
						:additionalInfo='course.course_description'
						@openCourse="openCourse"
						@pay="yaKassaRedirect"
					)
				template(v-if="onlineCoursesActive.length > 0")
					h2.section-title.first Активные онлайн курсы
					active-course(
						v-for="course in onlineCoursesActive"
						:courseName="course.course_name"
						:payStatus="course.pay_status"
						:progress="course.edu_progress"
						:group="course.group"
						:url="course.course_url"
						:payUrl="course.approve_payment_url"
						:additionalInfo='course.course_description'
						@openCourse="openCourse"
						@pay="yaKassaRedirect"
					)
				template(v-if="gymCoursesActive.length > 0")
					h2.section-title Активные очные курсы
					active-course(
						v-for="course in gymCoursesActive"
						:courseName="course.course_name"
						:payStatus="course.pay_status"
						:progress="course.edu_progress"
						:group="course.group"
						:url="course.course_url"
						:payUrl="course.approve_payment_url"
						:additionalInfo='course.course_description'
						@openCourse="openCourse"
						@pay="yaKassaRedirect"
					)
				h2.section-title Сертфикаты
				.tile.goods
					.goods__image
					.text СЕРТИФИКАТ НА СУММУ 10 900руб.
				template(v-if="products.length > 0")
					h2.section-title Товары
					.tile.goods(v-for="course in products")
						.goods__image(:class="`goods__image_${course.product_name === 'Блокнот' ? 'bullet' : 'merch'}`")
						.text-block
							.text.title {{course.product_name}}
							.sub-text Количество: 1

				h2.section-title Рекомендуем
				.tile.simple(v-for="course in recommended")
					.main-content
						.img-side
							svg-icon(:name='course.svg')
						.text-side
							.title {{course.name}}
							.description {{course.description}}
							.btns
								a(:href="course.url" target="_blank").btn Демо
			section.column.sidebar
				h2.section-title.first Статистика
				.tile
					.content
						h2.title.green Курсы
						hr
						.text Завершенных курсов:&nbsp;
							span.green {{allCourses.filter(course => course.edu_progress === 100).length}}
						hr
						.text Активных курсов:&nbsp;
							span.green {{allCourses.filter(course => course.edu_progress && course.edu_progress < 100).length}}
						hr
						template(v-if="allCourses.length > 0")
							h2.title.green Прогресс
							hr
							template(v-for="course in allCoursesActive")
								.text.heavy {{course.course_name}}&nbsp;
									span.green {{course.edu_progress || '0%'}}
								hr

</template>

<script>
import api from "@/assets/api/index.js";

export default {
  name: "MainPersonal",
  components: {
    SvgIcon: () => import("@/components/SvgIcon.vue"),
    ActiveCourse: () => import("@/components/personal/active-course.vue")
  },
  data() {
    return {
      isMailSent: false,
      onlineCourses: [],
      onlineCoursesActive: [],
      gymCourses: [],
      gymCoursesActive: [],
      products: [],
      recommended: [
        {
          name: "#SEKTACARE",
          description:
            "В #SektaCare мы заботимся о тех, кому нужно плавно ввести тренировки в свою жизнь. Вас ждет разнообразная нагрузка, направленная на жиросжигание, развитие выносливости, силы, гибкости — такие тренировки помогут улучшить метаболизм, а куратор подберет идеальный режим питания",
          url: "https://account.sektaschool.ru//courses/care/demo.php",
          svg: "sekta-care"
        },
        {
          name: "#SEKTAEVO",
          description:
            "SektaEvolution — это комплексный, продуманный и сбалансированный курс. При его разработке мы учли всё: опыт команды и 120 тысяч выпускников #SEKTA, базовые и новые исследования о здоровье, питании, спорте и образе жизни. В основе курса — наши исследования о мотивации. Постарались сделать всё, чтобы вам всегда хотелось идти вперед.",
          url: "https://account.sektaschool.ru//courses/evolution_demo/",
          svg: "sekta-evo"
        }
      ]
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    allCourses() {
      return [...this.onlineCourses, ...this.gymCourses];
    },
    allCoursesActive() {
      return [...this.onlineCoursesActive, ...this.gymCoursesActive];
    },
    unPaidCourses() {
      return this.allCourses.filter(
        course => course.pay_status === "Не оплачен"
      );
    }
  },
  created() {
    this.getOnlineOrders();
    this.getGymOrders();
    this.getProducts();
  },
  methods: {
    getOnlineOrders() {
      api.getOnlineOrders(this.$store.state.user.token).then(
        res => {
          this.onlineCourses = res.data.data;
          this.onlineCoursesActive = res.data.data.filter(
            course => course.pay_status !== "Не оплачен"
          );
        },
        rej => {}
      );
    },
    getGymOrders() {
      api.getGymOrders(this.$store.state.user.token).then(
        res => {
          this.gymCourses = res.data.data;
          this.gymCoursesActive = res.data.data.filter(
            course => course.pay_status !== "Не оплачен"
          );
        },
        rej => {}
      );
    },
    getProducts() {
      api.getProducts(this.$store.state.user.token).then(
        res => {
          this.products = res.data.data;
        },
        rej => {}
      );
    },
    sendMailConfirm() {
      this.isMailSent = true;
    },
    yaKassaRedirect(url) {
      window.location = url;
    },
    openCourse(url) {
      console.log(url);
    }
  }
};
</script>

<style lang="postcss" scoped>
article.main-body {
  background-color: #e8e8e8;
  flex-grow: 1;
  padding-bottom: 60px;
  .limit {
    padding-top: 30px;
    display: grid;
    grid-auto-columns: auto 361px;
    grid-gap: 0 30px;
    @media (max-width: 850px) {
      grid-gap: 0;
    }
    @media (max-width: 500px) {
      padding: 0;
    }
  }
  .green {
    color: var(--accent_color);
  }
  section.first-row {
    grid-row: 1;
  }
  .confirm-mail {
    background-color: white;
    padding: 15px 0;
    text-align: center;
    font-weight: bold;
    font-size: 14px;
    a {
      cursor: pointer;
    }
  }
  section.column {
    grid-row: 2;
    &.sidebar {
      grid-column: 2;
      min-width: 361px;
      @media (max-width: 850px) {
        grid-column: 1;
        grid-row: 3;
      }
    }
  }
  .section-title {
    margin: 60px 0.125rem 24px;
    font-size: 22px;
    font-weight: 800;
    text-transform: uppercase;
    &.first {
      margin-top: 30px;
    }
    @media (max-width: 500px) {
      font-size: 16px;
      margin: 30px var(--col-space) 20px;
    }
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
  .btns {
    width: 100%;
    overflow: hidden;
    margin: -10px;
  }
  .btn {
    background-color: white;
    border-radius: 5px;
    display: inline-block;
    text-decoration: none;
    text-align: center;
    border: 1px solid var(--accent_color);
    padding: 15px 18px;
    min-width: 145px;
    margin: 10px;
    font-size: 15px;
    font-weight: bold;
    color: var(--accent_color);
    transition: background-color 0.3s, color 0.3s;
    @media (max-width: 500px) {
      padding: 10px 14px;
      font-size: 11px;
      min-width: 110px;
    }
    &:hover {
      transition-duration: 0.2s, 0.2s;
      background-color: var(--accent_color);
      color: white;
    }
  }

  .tile.goods {
    display: flex;
    align-items: center;
    .goods__image {
      background: url(~@/assets/images/aside-hero/certificates_bg.jpg) 100%
        center / cover;
      flex-basis: 47%;
      max-width: 310px;
      height: 30vw;
      max-height: 226px;
      margin-right: 58px;

      &_merch {
        background: url(~@/assets/images/merch_bg-sektamerch.jpg) 6% / cover;
      }
      &_bullet {
        background: url(~@/assets/images/bullet_bg-sektabullet.jpg) 19% / cover;
      }
    }
    .text {
      font-size: 18px;
      font-weight: bold;
      &.title {
        text-transform: uppercase;
      }
      @media (max-width: 500px) {
        font-size: 12px;
      }
    }
    .sub-text {
      font-size: 11px;
      font-weight: bold;
      color: #6a6a6a;
    }
  }

  .tile.simple {
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
      .title {
        font-size: 18px;
        font-weight: bold;
        text-transform: uppercase;
        @media (max-width: 500px) {
          font-size: 13px;
        }
      }
      .description {
        margin: 23px * 15px;
        line-height: 1.5;
        font-size: 14px;
        @media (max-width: 500px) {
          float: left;
          font-size: 13px;
          line-height: 1.38;
          margin: 18px * 10px;
        }
      }
    }
  }

  .sidebar {
    .content {
      margin: 27px 30px;
      @media (max-width: 500px) {
        margin: 20px 30px;
      }
    }
    .title {
      font-size: 18px;
      margin: 35px * 20px;
      font-weight: bold;
      text-transform: uppercase;
      @media (max-width: 500px) {
        font-size: 14px;
        margin: 18px * 15px;
      }
    }
    hr {
      height: 1px;
      width: 100%;
      margin: 20px *;
      border: none;
      background-color: #cbcbcb;
      @media (max-width: 500px) {
        margin: 15px *;
      }
    }
    .text {
      font-size: 14px;
      font-weight: bold;
      &.heavy {
        text-transform: uppercase;
        font-size: 15px;
        font-weight: 800;
      }
    }
  }
}
</style>

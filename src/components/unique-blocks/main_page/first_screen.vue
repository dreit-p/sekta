<template lang="pug">
section.first-screen.main(:style="{ backgroundImage: `url('${require('@/assets/images/first_screen-bg-girls.jpg')}')`, backgroundPosition: '80% 0' }")
	.limit.first-screen__container.clearfix
		.accordion2full__panel.accordion2full__panel_active(style='float: right; margin-top: 3vw;')
			.first-screen__header
				h1.first-screen__title
					p Постройте ваше идеальное тело со&nbsp;Школой #SEKTA
					p
			.first-screen__content
				ul
					li занимайтесь в удобное время и в удобном месте;
					li онлайн или с тренером в зале;
					li без голода и переедания;
					li под чутким контролем кураторов;
					li с поддержкой единомышленников.
				p
					router-link(to='/online')
						green-btn(style='color: #fff', target='_blank', rel='noopener noreferrer') Подробнее об онлайн-курсах
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'FirstScreen',
	data() {
		return {
		};
	},
	components: {
		GreenBtn: () => import('@/components/form/green-btn.vue'),
	},
	methods: {
		...mapActions(['setFormModalState'])
	},
}
</script>

<style lang="postcss" scoped>
	.first-screen {
		color: black;
		padding: 0;
		min-height: 0;
		background-size: auto 300px;
		background-position: 50% 0;
		background-repeat: no-repeat;
		&__title {
			font-size: 30px;
			text-transform: uppercase;
			font-family: var(--font-second);
			font-weight: 900;
			line-height: 1.33;
			letter-spacing: .3px;
			margin: 0;
		}
		&__container {
			position: relative;
			width: 100%;
		}
		&__header {
			margin: 300px 0 0;
			width: 435px;
		}
		&__content {
			margin: -15px auto 25px;
			width: auto;
			font-size: 15px;
			line-height: 20px;
			max-width: 670px;
			padding: 0;
			@media (min-width: 1010px) {
				width:450px;
				margin: 25px 0;
				padding: 0;
			}
			p+p {
				margin: 10px 0;
			}
			ul {
				padding-left: 1.2em;
			}
			a {
				color: #0ab69f;
				transition: all .3s;
				text-decoration: none;
			}
		}
		&__footer {
			max-width: 670px;
			margin: 0 auto 30px;
			padding: 0 15px;
			@media (min-width: 1010px) {
				padding:0;
				margin: 0;
			}
		}
	}

	@media (min-width: 1010px) {
		.info-block {
			padding:0;
		}

		.first-screen {
			min-height: 500px;
			padding: 30px 0;
			background-position: center center!important;
			background-size: cover;
		}

		.first-screen__container {
			width: 980px;
		}

		.first-screen__header {
			/* width: 600px; */
			margin: 25px 0 0;
		}
	}

	@media (min-width: 1400px) {
		.first-screen {
			min-height: 34vw;
		}
	}

	@media (max-width: 1024px) {
		.first-screen.main {
				background-size: cover;
			}

			/*.first-screen.main > .first-screen__container{position: absolute;bottom: 0;}*/
			.first-screen.main > .first-screen__container > .accordion2full__panel {
				overflow: visible;
				margin-top: -3vw !important;
				max-height: max-content;
				max-height: -moz-max-content;
				transform: scale(0.65);
			}

			.first-screen.main .first-screen__container .accordion2full__panel .first-screen__header {
				margin: 0 auto;
			}

			.first-screen.gym {
				background-size: cover;
			}

			.first-screen.gym .first-screen__container .accordion2full__panel {
				overflow: visible;
				margin-top: 23vw !important;
				max-height: max-content;
				max-height: -moz-max-content;
			}

			.first-screen.gym .first-screen__container .accordion2full__panel .first-screen__header {
				margin: 0 auto;
			}
	}

	@media (max-width: 650px) {
		.first-screen.main {
			background-image: url(~@/assets/images/first_screen-bg-girls_small.jpg) !important;
			height: 148vw !important;
			max-height: 700px;
			position: relative;
			& .first-screen__container {
				position: absolute;
				bottom: 0;
				& .accordion2full__panel {
					overflow: visible;
					margin-top: 0 !important;
					max-height: max-content;
					transform: scale(1);
				.first-screen__header {
						width: 100%;
						margin: 0 auto;
						color: #fff;
					.first-screen__title {
							line-height: 1;
							margin-bottom: 40px;
							font-size: 24px;
						}
					}
				.first-screen__content ul {
						color: #fff;
						line-height: 1.23 !important;
						font-size: 13px ;
						width: 90%;
					}
				}
			}
		}
	}

	@media (min-width: 1010px) {
		.info-block {
			padding: 0;
		}

		.first-screen {
			min-height: 500px;
			padding: 30px 0;
			background-position: center center!important;
			background-size: cover;
		}

		.first-screen__container {
			width: 980px;
		}

		.first-screen__content {
			width: 450px;
			margin: 25px 0;
			padding: 0;
			ul {
				font-size: 14px;
				li {
					margin: 10px *;
				}
			}
		}

		.first-screen__header {
			margin: 25px 0 0;
		}

		.accordion2full__tab {
			cursor: default;
		}

		.accordion2full__tab_active {
			background: 0 0;
		}

		.accordion2full_js .accordion2full__panel,.accordion2full_js .accordion2full__panel_active {
			max-height: none;
		}
	}

	.container {
		padding: * 0;
		margin: * auto;
	}

	.green-btn {
		margin: 20px 0;
		@media (max-width: 425px) {
			width: 100%;
			max-width: none;
			text-align: center;
		}
	}

</style>

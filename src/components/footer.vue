<template lang="pug">
div
	section.soc-networks
		.limit
			.caption Ещё больше полезного в наших аккаунтах:
			.icons
				a(v-for='network in networks', :href='network.link', target='_BLANK', rel='noopener noreferrer')
					svg-icon(:name='"network-" + network.name')
	footer.main-footer
		.limit
			section.organization
				p © 2019, ИП Доронина О. А.
				p ОГРНИП 314667933100032
			section.links
				router-link(class='link larger animated-underline', to='/jobs') Вакансии
				.icons
					a(v-for='network in networks', :href='network.link', target='_BLANK', rel='noopener noreferrer')
						svg-icon(:name='"network-" + network.name')
				router-link(class='link smaller animated-underline', to='/privacy_policy') Политика конфиденциальности
			section.contacts
				a.phone.animated-underline(href='callto: +78005006882') 8 (800) 500–68–82
				a.mail.animated-underline(href='mailto: info@sektaschool.ru') info@sektaschool.ru
			section.developer
				svg-icon(name='logo-immelman')
				p.smaller Поддержка сайта
				a.larger(href='https://immelman.ru/', target='_BLANK', rel='noopener noreferrer') «Бюро Иммельман»

</template>

<script>
export default {
	name: 'AppFooter',
	components: {
		SvgIcon: () => import('@/components/SvgIcon.vue'),
	},
	data () {
		return {
			networks: [
				{
					name: 'instagram',
					link: 'https://instagram.com/sektaschool'
				},
				{
					name: 'vkontakte',
					link: 'https://vk.com/sektaschool'
				},
				{
					name: 'facebook',
					link: 'https://www.facebook.com/sektaschool'
				},
				{
					name: 'youtube',
					link: 'https://www.youtube.com/user/sektaschool'
				},
			]
		}
	}
}
</script>

<style lang="postcss" scoped>
	.soc-networks {
		background-color: var(--bt-dark-gray_elems);
		padding: 15px *;
		@media (max-width: 801px) {
			display: none;
		}
		.caption {
			margin: 20px;
			font-family: var(--font-second);
			text-transform: uppercase;
			text-align: center;
			font-size: 20px;
			font-weight: bold;
			line-height: 1.35;
			letter-spacing: 0.2px;
			color: white;
		}
	}
	.soc-networks .icons,
	footer.main-footer .icons {
		margin: auto;
		margin-bottom: 20px;
		display: flex;
		max-width: 330px;
		width: 100%;
		align-content: center;
		justify-content: space-around;
		>a {
			width: 50px;
			height: 45px;
			margin: 10px 5px;
			display: inline-block;
			color: var(--accent_color);
			transition: color .3s;
			&:hover {
				transition-duration: .1s;
				color: color(var(--accent_color) l(+10%));
			}
			svg {
				width: 100%;
				height: 100%;
			}
		}
	}
	footer.main-footer {
		background-color: var(--bt-dark_elems);
		.limit {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20px * 30px;
		}
		p, a {
			font-family: var(--font-main);
			font-size: 13px;
			margin: 5px *;
			color: white;
		}
		.larger {
			font-size: 14px;
		}
		.smaller {
			font-size: 13px;
		}
		section {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-content: center;
			align-items: flex-start;
			padding: 5px 10px;
		}
		.organization {
			p {
				color: var(--bt-color_muted);
			}
		}
		.links {
			>a {
				color: white;
				display: inline;
			}
			.icons {
				display: none;
			}
		}
		.contacts {
			.phone {
				font-size: 20px;
			}
		}
		.developer {
			justify-content: center;
			align-items: center;
			position: relative;
			p, a {
				color: var(--bt-color_muted);
				text-align: center;
				margin: 4px *;
				text-decoration: none;
			}
			.svg-icon {
				position: absolute;
				top: calc(100% - 8px);
				left: 0;
				right: 0;
				margin: auto;
				width: 92px;
				height: 27px;
				color: var(--bt-color_muted);
			}
		}
	}

	@media (max-width: 800px) {
		footer.main-footer {
			.limit {
				flex-direction: column;
				padding: 15px *;
			}
			section {
				align-items: center;
				justify-content: center;
				padding: 0;
				margin: 0;
				p, a {
					margin: 15px *;
					font-size: 16px;
				}
				.larger {
					font-size: 18px;
				}
				.smaller {
					font-size: 15px;
				}
			}
			.contacts {
				order: 0;
			}
			.links {
				order: 1;
				.icons {
					display: flex;
					margin-bottom: 0;
					padding: * 20px;
				}
			}
			.organization {
				order: 2;
				p {
					margin: 5px *;
				}
			}
			.developer {
				order: 3;
				position: static;
				margin: 15px *;
				.svg-icon {
					position: static;
				}
			}
		}
	}
</style>

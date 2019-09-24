<template lang="pug">
.main-layout
	.mini-header
		cookie-notification
		.header-offset
		.content
			.limit
				.top
					a(href='https://sektaschool.ru', class='logo', title='Sekta school logo')
						svg-icon(name='logo-sekta')
					.main-links
					.contacts
						a.phone.animated-underline.left(href='tel:+78005006882') 8 (800) 500–68–82
						.caption пн-пт 10:00–19:00
	<slot></slot>
	section.soc-networks
		.limit
			.caption Ещё больше полезного в наших аккаунтах:
			.icons
				a(v-for='network in networks', :href='network.link', target='_BLANK', rel='noopener noreferrer')
					svg-icon(:name='"network-" + network.name')
	footer.main-footer
		.limit
			section.organization
				a.link.animated-underline Антикопционная политика
				a.link.animated-underline Оферта
			section.links
				a(class='link animated-underline', to='/vacancies') СОУД
				.icons
					a(v-for='network in networks', :href='network.link', target='_BLANK', rel='noopener noreferrer')
						svg-icon(:name='"network-" + network.name')
				a(class='link smaller animated-underline', href='../docs/privacy_policy.pdf', target='_BLANK', rel='noopener noreferrer') Политика конфиденциальности
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
	name: "HeaderSubDomain",
	components: {
		CookieNotification: () => import("@/components/cookie.vue"),
		SvgIcon: () => import("@/components/SvgIcon.vue")
	},
	data() {
		return {
			networks: [
				{
					name: "instagram",
					link: "https://instagram.com/sektaschool"
				},
				{
					name: "vkontakte",
					link: "https://vk.com/sektaschool"
				},
				{
					name: "facebook",
					link: "https://www.facebook.com/sektaschool"
				},
				{
					name: "youtube",
					link: "https://www.youtube.com/user/sektaschool"
				}
			]
		};
	}
};
</script>

<style lang="postcss">
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.mini-header {
  .header-offset {
    @media (max-width: 600px) {
      height: 65px;
    }
  }
  .content {
    background-color: var(--bt-dark_elems);
    padding-top: 8px;
    width: 100%;
    @media (max-width: 600px) {
      padding-top: 0;
      position: fixed;
      top: 0;
      z-index: 5;
    }
  }
  .top {
    display: flex;
    align-items: center;
    padding: 13px *;
    border-bottom: 1px solid color(var(--bt-color_muted) b(+50%));
    @media (max-width: 600px) {
      padding: 8px *;
      border-bottom: none;
    }
    /* .main-links,
			.contacts {
				@media (max-width: 600px) {
					display: none;
				}
			} */
  }
  .logo {
    display: inline-block;
    width: var(--col-width);
    height: 45px;
    color: white;
    flex-shrink: 0;
    svg {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .contacts {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    @media (max-width: 425px) {
      font-size: 14px;
    }
    .phone {
      color: white;
      font-size: 1.125em;
      letter-spacing: 0.2px;
      text-decoration: none;
      margin-bottom: 2px;
      white-space: nowrap;
    }
    .phone:hover + .caption {
      color: color(var(--bt-color_muted) w(+70%));
      transition-duration: 0.1s;
    }
    .caption {
      font-size: 0.8125em;
      color: var(--bt-color_muted);
      letter-spacing: 0.1px;
      transition: color 0.2s;
    }
  }
  .main-links {
    flex-grow: 1;
  }
}
.requisites {
  td {
    padding: 0.625rem 0.9375rem;
    @media (max-width: 500px) {
      font-size: 13px;
    }
  }
  img {
    margin: 30px 0;
  }
}
//Footer
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
  > a {
    width: 50px;
    height: 45px;
    margin: 10px 5px;
    display: inline-block;
    color: var(--accent_color);
    transition: color 0.3s;
    &:hover {
      transition-duration: 0.1s;
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
  p,
  a {
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
    > a {
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
    p,
    a {
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
      p,
      a {
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

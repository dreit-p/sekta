<template lang="pug">
header.main-header
	.header-offset
	.content
		.limit


			nav.top
				router-link(class='logo', title='Sekta school logo', to='/')
					svg-icon(name='logo-sekta')
				ul.main-links
					template(v-for='(link, index) in mainLinks')
						router-link(tag='li', class='link', v-bind:to='link.link')
							a.animated-underline {{ link.name }}
				.contacts
					a.phone.animated-underline.left(href='callto: +78005006882') 8 (800) 500–68–82
					.caption пн-пт 10:00–19:00
				.mobile-elems
					a.icon
						svg-icon(name='icon-phone')
					a.icon
						svg-icon(name='icon-login')
					a.icon.cross(:class='{active: isOpenedMenu}', href='#', @click.prevent='isOpenedMenu = !isOpenedMenu')
						.x


			nav.bottom
				ul.additional-links(v-if='additionalLinks.length > 0')
					router-link(
						tag='li', 
						class='link', 
						v-for='(link, index) in additionalLinks', 
						:key='link.id', 
						v-bind:to='link.link',
						@mouseenter.native='changeDropdownContent(!!link.subLinks ? `${link.name}-${index}` : showSubLinks, !!link.subLinks)'
						@mouseleave.native='setDropdownTimer'
					)
						a {{ link.name }}
				router-link(class='account', title='Личный кабинет', to='/account')
					.icon
						svg-icon(name='icon-login')
					.text Личный кабинет

		transition(
			@before-enter='dropdownBeforeEnter'
			@enter='dropdownEnter'
			@after-enter='setHeightForDropdown'
			@leave='dropdownLeave'
		)
			.sub-links.outside(v-if='showSubLinks', @mouseenter='clearDropdownTimer', @mouseleave='setDropdownTimer')
				.limit
					template(v-for='(link, index) in additionalLinks', v-if='link.subLinks')
						transition(name='links-fade', in-out, @enter="setHeightForDropdown")
							ul.category(v-if='showSubLinks==`${link.name}-${index}`')
								router-link(
									tag='li', 
									class='link sub-link', 
									v-for='(subLink, index) in link.subLinks', 
									:key='`${link.name}-${index}`', 
									:to='subLink.link',
									:data-index="index"
								)
									a.animated-underline {{ subLink.name }}


		transition(
			@before-enter='menuBeforeEnter'
			@enter='menuEnter'
			@leave='menuLeave'
		)
			nav.mobile-menu(v-if='isOpenedMenu')
				ul.additional-links(v-if='additionalLinks.length > 0')
					router-link(
						tag='li', 
						class='link', 
						v-for='(link, index, id) in additionalLinks', 
						:key='`addLink-${index}`', 
						:to='link.link',
						:data-index='index',
						@click.native='isOpenedMenu = false'
					)
						a.animated-underline {{ link.name }}
						ul.sub-links(v-if='link.subLinks')
							router-link(
								tag='li', 
								class='sub-link', 
								v-for='(subLink, index) in link.subLinks', 
								:key='`subLink-${index}`', 
								:to='subLink.link',
								:data-index='index',
								@click.native='isOpenedMenu = false'
							)
								a.animated-underline {{ subLink.name }}
				ul.main-links
					template(v-for='(link, index) in mainLinks')
							router-link(tag='li', class='link', :key='`mainLink-${index}`', v-bind:to='link.link', :data-index="index")
								a.animated-underline {{ link.name }}
</template>

<script>
	import Velocity from 'velocity-animate'

	export default {
		name: 'app-header',
		components: {
			SvgIcon: () => import('@/components/SvgIcon.vue'),
		},
		computed: {
		},
		data () {
			return {
				isOpenedMenu: false,
				showSubLinks: false,
				dropdownTimer: null,
				mainLinks: [
					{
						link: '/about-us',
						name: 'О проекте'
					},
					{
						link: '/articles',
						name: 'Наши статьи'
					},
					{
						link: '/results',
						name: 'Результаты'
					},
					{
						link: '/contacts',
						name: 'Контакты'
					},
				],
				additionalLinks: [
					{
						link: '/online-courses',
						name: 'Онлайн курсы',
						subLinks: [
							{
								link: '/s60days',
								name: 'Курс #s60days'
							},
							{
								link: '/for-mums',
								name: 'Курс для мам'
							},
							{
								link: '/sektalite',
								name: 'Курс #sektalite'
							},
							{
								link: '/vip-course',
								name: 'VIP программа'
							},
							{
								link: '/for-pregnant',
								name: 'Курсы для беременных'
							},
							{
								link: '/s60days-men',
								name: 'Курс #s60days для мужчин'
							},
						]
					},
					{
						link: '/gym',
						name: 'Тренировки в зале',
						subLinks: [
							{
								link: '/gym-moscow',
								name: 'Москва'
							},
							{
								link: '/gym-saint-petersburg',
								name: 'Санкт-Петербург'
							}
						]
					},
					{
						link: '/camp',
						name: 'Летний лагерь'
					},
					{
						link: '/gift-cert',
						name: 'Подарочный сертификат'
					}
				]
			}
		},
		methods: {
			openMenu: function () {
				this.isOpenedMenu = !this.isOpenedMenu
			},

			/*================================
			=            Dropdown            =
			================================*/

			clearDropdownTimer () {
				if (this.dropdownTimer) {
					clearTimeout(this.dropdownTimer);
					this.dropdownTimer = null;
				}
			},

			setDropdownTimer () {
				clearTimeout(this.dropdownTimer);
				this.dropdownTimer = setTimeout(()=>{
					this.showSubLinks = false;
				}, 400);
			},

			changeDropdownContent (type, clearTimer) {

				if (clearTimer) {
					this.clearDropdownTimer();
				}
				this.showSubLinks = type;
			},

			theHighestElement: function (elem) {
				let theBiggest = 0;
				document.querySelectorAll(elem).forEach(function(elem) {
					if (elem.offsetHeight > theBiggest) {
						theBiggest = elem.offsetHeight;
					}
				});
				return theBiggest;
			},
			setHeightForDropdown: function () {
				let elems = document.querySelectorAll('.sub-links.outside .category');
				let height = 0 + 'px';
				if (elems.length > 0) {
					if (elems.length > 1) {
						height = this.theHighestElement('.sub-links.outside .links-fade-enter-active') + 'px';
					} else {
						height = elems[0].offsetHeight + 'px';
					}
				}
				document.querySelector('.sub-links.outside .limit').style.height = height;
			},

			dropdownBeforeEnter: function (el) {
				this.clearDropdownTimer();
				el.style.opacity = 0;
				let links = el.querySelectorAll('.link');
				links.forEach(function(link) {
					Velocity(link, { opacity: 0}, {queue: false} )
				});
			},
			dropdownEnter: function (el, done) {
				this.setHeightForDropdown();
				Velocity(el, { opacity: 1}, { duration: 300 })
				el.querySelectorAll('.link').forEach(function(link) {
					Velocity(link, 
						{
							opacity: 1
						}, {
							duration: 300,
							delay: 200 + (link.dataset.index * 60),
							easing: 'ease-out',
							queue: false,
							complete: done
						} )
				});
			},
			dropdownLeave: function (el, done) {
				Velocity(el, { opacity: 0}, { duration: 300, complete: done});
				document.querySelector('.sub-links.outside .limit').style.height = '0px';
			},

			/*=====  End of Dropdown  ======*/


			/*======================================
			=            Menu animation            =
			======================================*/

			menuBeforeEnter: function (el) {
				el.style.opacity = 0;
				let links = el.querySelectorAll('.link');
				links.forEach(function(link) {
					Velocity(link, { opacity: 0}, {queue: false} )
				});
			},
			menuEnter: function (el, done) {
				Velocity(el, { opacity: 1}, { duration: 300 })
				el.querySelectorAll('.link').forEach(function(link) {
					Velocity(link, 
						{
							opacity: 1
						}, {
							duration: 300,
							delay: 200 + (link.dataset.index * 60),
							easing: 'ease-out',
							queue: false,
							complete: done
						} )
				});
			},
			menuLeave: function (el, done) {
				Velocity(el, { opacity: 0}, { duration: 300 })
				let links = el.querySelectorAll('.link');
				links.forEach(function(link) {
					Velocity(link, 
						{
							opacity: 0
						}, {
							duration: 300,
							delay: 0,
							easing: 'ease-in',
							queue: false,
							complete: done
						} )
				});
			}

			/*=====  End of Menu animation  ======*/

		}
	}
</script>

<style lang="postcss" scoped>
	.main-header {
		position: relative;
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
			.top {
				display: flex;
				align-items: center;
				padding: 13px *;
				border-bottom: 1px solid color(var(--bt-color_muted) b(+50%));
				@media (max-width: 600px) {
					padding: 8px *;
					border-bottom: none;
				}
				.main-links,
				.contacts {
					@media (max-width: 600px) {
						display: none;
					}
				}
			}
			.bottom {
				display: flex;
				justify-content: space-between;
				flex-wrap: nowrap;
				align-items: baseline;
				@media (max-width: 600px) {
					display: none;
				}
			}
		}
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



	.main-links {
		padding: 0;
		padding-bottom: 5px;
		margin: auto 15px;
		display: inline-block;
		display: flex;
		flex-grow: 1;
		flex-wrap: wrap;
		list-style: none;
		.link {
			padding: 0;
			margin: 3px *;
			display: inline-block;
			a {
				display: inline-block;
				margin: * 15px;
				font-family: var(--font-main);
				font-size: 15px;
				letter-spacing: .2px;
				text-decoration: none;
				color: var(--bt-color_muted);
				transition: color .2s;
				&:hover {
					transition-duration: .1s;
					color: white;
				}
			}
		}
	}



	.contacts {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		flex-direction: column;
		.phone {
			color: white;
			font-size: 18px;
			letter-spacing: 0.2px;
			text-decoration: none;
			margin-bottom: 2px;
			white-space: nowrap;
		}
		.phone:hover + .caption {
			color: color(var(--bt-color_muted) w(+70%));
			transition-duration: .1s;
		}
		.caption {
			font-size: 13px;
			color: var(--bt-color_muted);
			letter-spacing: 0.1px;
			transition: color .2s;
		}
	}


	.additional-links,
	.sub-links.outside {
		margin: 0;
		padding: 0;
		display: block;
		list-style: none;
		font-family: var(--font-second);
		font-size: 18px;
		display: flex;
		flex-wrap: wrap;
		margin-left: -15px;
		margin-right: 15px;
		.link,
		>.sub-link {
			display: inline-block;
			margin: 10px 15px;
			padding: 0;
			float: left;
			>a {
				letter-spacing: 0.2px;
				font-family: var(--font-second);
				font-weight: bold;
				color: white;
				transition: color .1s;
				text-decoration: none;
				&:hover {
					transition-duration: .1s;
					color: var(--accent_color);
				}
			}
		}
	}

	.sub-links.outside {
		position: absolute;
		margin: 0;
		top: calc(99% - 5px);
		width: 100%;
		z-index: 1;
		background-color: var(--bt-dark_elems);
		.limit {
			width: 100%;
			transition: height .3s;
		}
		.category {
			margin: 0;
			padding: 0;
			padding-bottom: 10px;
			margin-left: -15px;
			display: block;
			display: flex;
			flex-wrap: wrap;
			position: absolute;
			>.sub-link >a {
				font-weight: normal;
				color: var(--bt-color_muted);
				transition: color .2s;
				&:hover {
					transition-duration: .1s;
					color: white;
				}
			}
		}
	}

	.bottom {
		.additional-links {
			margin: 10px *;
		}
	}


	.account {
		color: var(--accent_color);
		display: inline-block;
		display: flex;
		align-items: baseline;
		text-decoration: none;
		white-space: nowrap;
		&:hover {
			color: color(var(--accent_color) l(+10%))
		}
		.icon {
			width: 10px;
			height: 12px;
			margin: * 2px;
			float: left;
			svg {
				height: 100%;
				width: 100%;
			}
		}
		.text {
			margin: * 8px;
			letter-spacing: -0.8px;
			font-size: 15px;
			font-weight: bold;
		}
	}



	.mobile-elems {
		@media (min-width: 601px) {
			display: none;
		}
		display: flex;
		color: white;
		flex-grow: 1;
		justify-content: flex-end;
		margin-right: -10px;
	}
	.icon {
		display: block;
		height: 25px;
		width: 25px;
		margin: 12px;
		&:hover {
			color: color(var(--accent_color) l(+10%));
		}
		svg {
			height: 100%;
			width: 100%;
		}
		&.cross {
			position: relative;
			z-index: 5;
			.x {
				width: 100%;
				height: 4px;
				background-color: currentColor;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				margin: auto 0;
				position: absolute;
				border-radius: 1px;
				transition: background-color .2s;
				&:before,
				&:after {
					border-radius: 1px;
					content: "";
					display: block;
					background-color: currentColor;
					height: 100%;
					width: 100%;
					position: absolute;
					left: 0;
					right: 0;
					transform-origin: center center;
					transition: transform .2s;
				}
				&:before {
					transform: translateY(-9px);
				}
				&:after {
					left: auto;
					transform: translateY(9px);
					width: 70%;
				}
			}
			&.active {
				.x {
					background-color: rgba(255, 255, 255, 0);
					&:before,
					&:after {
						transform: rotateZ(-225deg);
						top: 0;
						bottom: 0;
					}
					&:after {
						transform: rotateZ(225deg);
						width: 100%;
					}
				}
			}
		}
	}



	.mobile-menu {
		@media (min-width: 601px) {
			display: none;
		}
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: var(--bt-dark_elems);
		padding: 20px 15px;
		height: 120%;
		width: 100%;
		min-width: 320px;
		z-index: 2;
		.additional-links {
			margin: 0;
			padding: 10px 10px;
			padding-right: 40px;
			display: flex;
			flex-direction: column;
			border-bottom: 1px solid color(var(--bt-color_muted) b(+50%));
			.link {
				margin: 10px 0;
				display: block;
				float: none;
			}
			.sub-links {
				margin: 0;
				padding: 0;
				margin-bottom: 10px;
				display: block;
				.sub-link {
					margin: 10px 0;
					margin-left: 20px;
					padding: 0;
					display: block;
					font-size: 18px;
					font-family: var(--font-second);
					letter-spacing: 0.4px;
					color: var(--bt-color_muted);
				}
			}
		}
		.main-links {
			padding: 13px 10px;
			margin: 0;
			display: flex;
			.link {
				margin: 7px 0;
				flex-basis: 50%;
				a {
					margin: 0;
				}
			}
		}
	}

	.links-fade-enter-active, .links-fade-leave-active {
		transition: all .4s;
		transition-timing-function: ease-in;
	}
	.links-fade-leave-active {
		transition-duration: .2s;
		transition-timing-function: ease-out;
	}
	.links-fade-enter, .links-fade-leave-to {
		opacity: 0;
	}

</style>

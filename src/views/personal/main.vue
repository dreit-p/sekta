<template lang="pug">
div.personal-layout
	header.main-header
		.limit
			router-link(class='logo', title='Sekta school logo', to='/personal')
				svg-icon(name='logo-sekta')
			.dropdown-menu
				svg-icon(name='icon-login')
				.text Анастасия Фадеева
				.arrow-icon
	article.main-body
		.limit
			section.column
				h2.section-title Активные курсы
				.tile.course
					.main-content
						.img-side
							svg-icon(name='logo-sekta')


			section.column.sidebar
				h2.section-title Статистика
				.tile
					.main-content
						h2.title.green Курсы
						hr
						.text Завершенных курсов: 
							span.green 2
						hr
						.text Активных курсов: 
							span.green 3
						hr
						h2.title.green Прогресс
						hr
						.text.heavy #sekta bootcamp3 
							span.green 0%
						hr
						.text.heavy #sekta bootcamp3 vol.2 
							span.green 84%
						hr
						.text.heavy oldschool 
							span.green 0%
						hr

	footer
</template>

<script>
	export default {
		name: 'MainPersonal',
		components: {
			SvgIcon: () => import('@/components/SvgIcon.vue'),
		},
		data () {
			return {}
		}
	}
</script>

<style lang="postcss">
	.personal-layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.limit {
			max-width: 1170px;
		}
	}
	header.main-header {
		background-color: white;
		padding: 28px *;
		.limit {
			display: flex;
			justify-content: space-between;
		}
		.logo {
			display: block;
			height: 54px;
			width: 185px;
		}
		.dropdown-menu {
			border-radius: 5px;
			border: solid 1px #cbcbcb;
			padding: 19px 20px 18px;
			display: flex;
			align-items: center;
			cursor: pointer;
			user-select: none;
			&:hover {
				border-color: var(--accent_color);
			}
			.svg-icon--icon-login {
				/* color: transparent;
				stroke: var(--accent_color); */
				color: var(--accent_color);
				stroke-width: 5px;
				height: 14px;
				width: 12px;
			}
			.text {
				padding: * 13px;
				font-size: 14px;
				font-weight: bold;
			}
			.arrow-icon {
				position: relative;
				width: 10px;
				transform: translateY(-1px);
				&:before,
				&:after {
					content: "";
					position: absolute;
					display: block;
					right: 0px;
					top: 0;
					bottom: 0;
					margin: auto;
					height: 1px;
					width: 8px;
					border-radius: 1px;
					background-color: var(--accent_color);
					backface-visibility: hidden;
					transform: rotateZ(45deg) rotateY(45deg);
					transform-origin: center left;
					transition: transform .2s;
				}
				&:after {
					transform-origin: center right;
					transform: rotateZ(-45deg) rotateY(45deg);
				}
			}
		}
	}
	article.main-body {
		background-color: #e8e8e8;
		flex-grow: 1;
		.limit {
			display: grid;
			grid-auto-columns: auto 361px;
			grid-gap: 30px;
		}
		section.column {
			&.sidebar {
				grid-column: 2;
			}
		}
		.section-title {
			margin: 60px 0.125rem 24px;
			font-size: 22px;
			font-weight: 800;
			text-transform: uppercase;
		}
		.tile {
			min-width: 100%;
			background-color: white;
			margin-bottom: 30px;
			overflow: hidden;
			.main-content {
				margin: 20px 30px;
			}
		}
		.course {
			overflow: hidden;
			.img-side {
				height: 100%;
				max-width: 145px;
				margin-right: 30px;
				img,
				svg {
					margin: 0;
				}
			}
		}
		.sidebar {
			.title {
				font-size: 18px;
				margin: 35px * 20px;
				font-weight: bold;
				text-transform: uppercase;
			}
			.green {
				color: var(--accent_color);
			}
			hr {
				height: 1px;
				width: 100%;
				margin: 20px *;
				border: none;
				background-color: #cbcbcb;
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



	footer {
		height: 100px;
	}
</style>

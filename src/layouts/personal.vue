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
	slot
</template>

<script>
	export default {
		name: 'PersonalLayout',
		components: {
			SvgIcon: () => import('@/components/SvgIcon.vue'),
		},
	}
</script>

<style lang="postcss">
	.personal-layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		>*:nth-child(2) {
			flex-grow: 1;
		}
		.limit {
			max-width: 1170px;
		}
		
		header.main-header {
			background-color: white;
			padding: 28px *;
			@media (max-width: 500px) {
				padding: 10px * 6px;
			}
			.limit {
				display: flex;
				justify-content: space-between;
			}
			.logo {
				display: block;
				height: 54px;
				width: 185px;
				margin-right: 25px;
				@media (max-width: 500px) {
					height: 30px;
					width: auto;
					svg {
						width: auto;
					}
				}
			}
			.dropdown-menu {
				border-radius: 5px;
				border: solid 1px #cbcbcb;
				padding: 19px 20px 18px;
				display: flex;
				align-items: center;
				cursor: pointer;
				user-select: none;
				@media (max-width: 500px) {
					padding: 11px;
				}
				&:hover {
					border-color: var(--accent_color);
				}
				.svg-icon--icon-login {
					color: var(--accent_color);
					stroke-width: 5px;
					height: 14px;
					width: 12px;
					@media (max-width: 500px) {
						height: 9px;
					}
				}
				.text {
					padding: * 13px;
					font-size: 14px;
					font-weight: bold;
					white-space: nowrap;
					@media (max-width: 500px) {
						padding: * 5px;
						font-size: 11px;
					}
				}
				.arrow-icon {
					position: relative;
					width: 18px;
					color: var(--accent_color);
					@media (max-width: 500px) {
						width: 15px;
						margin-left: -5px;
					}
				}
			}
		}
	}


	.arrow-icon {
		position: relative;
		width: 20px;
		margin: 0;
		margin-left: -10px;
		height: 1em;
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
			height: 5%;
			width: 50%;
			border-radius: 1px;
			background-color: currentColor;
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





</style>
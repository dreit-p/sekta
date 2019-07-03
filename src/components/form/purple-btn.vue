
<script>
export default {
	name: 'PurpleBtn',
	render: function (createElement) {
		let typeOfElement = this.href ? 'a' : 'button';
		var self = this;
		return createElement(
			typeOfElement,
			{
				class: {
					'purple-btn': true,
				},
				attrs: {
					href: self.href
				},
				on: {
					click (e) {
						if (self.href == '#') {
							e.preventDefault();
						}
						self.$emit('click', e);
					},
					focus (e) {
						self.$emit('focus', e);
					},
					blur (e) {
						self.$emit('blur', e);
					},
					hover (e) {
						self.$emit('hover', e);
					}
				}
			},
			[
				createElement('div', {
					class: {border: true}
				}),
				createElement('div', {
					class: {btn: true}
				}, self.$slots.default),
			]
		)
	},
	computed: {
		type () {
			if (this.href) {
				return 'a'
			} else {
				return 'button'
			}
		}
	},
	props: {
		href: {
			type: String,
			default: '',
		}
	}
}
</script>

<style lang="postcss">
.purple-btn {
	padding: 0;
	border: 0;
	background: none;
	position: relative;
	z-index: 1;
	display: inline-block;
	margin: 10px;
	text-decoration: none;
	cursor: pointer;
	user-select: none;
	.border {
		position: absolute;
		transform: translate(-10px, -10px);
		transition: transform .1s ease-out;
		z-index: -1;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100%;
		width: 100%;
		border: 2px solid #9725d0;
		border-radius: 3px;
	}
	.btn {
		position: relative;
		transform: translate(0px, 0px);
		transition: transform .1s ease-out;
		white-space: nowrap;
		padding: 16px 50px 16px 45px;
		display: block;
		border-radius: 3px;
		font-family: var(--font-second);
		font-size: 21px;
		font-weight: 600;
		letter-spacing: 0.4px;
		text-decoration: none;
		color: white;
		overflow: hidden;
		background-color: #5f1ab3;
		&:before {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
			display: block;
			content: "";
			background-image: linear-gradient(201deg, #932b8e, #932b8e 30%, #5f1ab3 70%, #5f1ab3);
			z-index: -1;
			opacity: 0;
			transition: opacity .3s;
		}
	}
	@media (max-width: 425px) {
		display: block;
		text-align: center;
		.btn {
			font-size: 18px;
			padding: 17px 45px;
		}
	}
	&:hover {
		.btn {
			&:before {
				opacity: 1;
				transition-duration: .1s;
			}
		}
	}
	&:active {
		.border {
			transform: translate(-6px, -6px);
		}
	}
}
</style>

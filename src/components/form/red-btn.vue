
<script>
export default {
	name: 'RedBtn',
	render: function (h) {
		let typeOfElement = this.href ? 'a' : 'button';
		var self = this;
		return h(
			typeOfElement,
			{
				class: {
					'inverted': this.inverted,
					'green-btn': true,
				},
				attrs: {
					href: self.href,
					target: self.target,
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
			self.$slots.default
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
			default: ''
		},
		target: {
			type: String,
			default: ''
		},
		inverted: {
			type: Boolean
		}
	}
}
</script>

<style lang="postcss" scoped>
	.green-btn {
		text-decoration: none;
		font: 400 15px/1 var(--font-main);
		display: inline-block;
		padding: 12px 20px 13px;
		border: none;
		border-radius: 3px;
		color: white;
		text-align: center;
		max-width: 300px;
		margin: 25px 35px;
		background-color: #ca3c3b;
		transition: color .3s, background-color .3s;
		@media (max-width: 1024px) {
			margin: * auto;
			width: 100%;
		}
		&:not(:disabled) {
			cursor: pointer;
		}
		&:hover {
			background: #cf4f4f;
			transition-duration: .1s, .1s;
			color: white;
		}
		&:disabled {
			border-color: #ccc !important;
			background-color: #ccc !important;
			color: #b3b3b3 !important;
			cursor: default;
			pointer-events: none;
		}

		&.inverted {
			background-color: white;
			color: #ca3c3b;
			border: solid 1px #ca3c3b;
			&:hover {
				transition-duration: 0.2s, 0.2s;
				background-color: #ca3c3b;
				color: white;
			}
		}
	}
</style>

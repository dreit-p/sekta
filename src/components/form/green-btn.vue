
<script>
export default {
	name: 'GreenBtn',
	render: function (h) {
		let typeOfElement = this.href ? 'a' : 'button';
		var self = this;
		return h(
			typeOfElement,
			{
				class: {
					'green-btn': true,
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
			type: String
		}
	}
}
</script>

<style lang="postcss">
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
		background-color: var(--accent_color);
		transition: color .3s, background-color .3s;
		@media (max-width: 1024px) {
			margin: * auto;
			width: 100%;
		}
		&:not(:disabled) {
			cursor: pointer;
		}
		&:hover {
			background: #078675;
			transition-duration: .1s, .1s;
			color: white;
		}
	}
</style>

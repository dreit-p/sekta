<template lang="pug">
label.input-wrapper.app-input(:class='this.$options.name')
	.input-wrapper
		input(
			:placeholder='placeholder'
			:name='name'
			:ref='name'
			:type='type'
			@input="$emit('input', $event.target.value);"
			@change="$emit('change', $event.target.value);"
		)
		.icon.checked
			svg-icon(name='icon-success')
		.icon.error
			svg-icon(name='icon-error')
	.caption(v-if='computedCaption') {{computedCaption}}
</template>

<script>
	export default {
		name: 'app-input',
		props: {
			placeholder: String,
			caption: String,
			name: String,
			type: String,
			value: {
				type: null,
				default: null
			},
			error: {
				type: String,
				default: null
			}
		},
		computed: {
			computedCaption() {
				if (this.error) {
					console.log('error: ', this.error);
					return this.error
				} else {
					if (this.caption) {
						console.log('caption: ', this.caption);
						return this.caption
					}
				}
				return null;
			}
		},
		components: {
			SvgIcon: () => import('@/components/SvgIcon.vue'),
		},
		methods: {
			// updateData () {
			// 	this.$emit('input', {name: this.name, data: this.data});
			// }
		},
		$_veeValidate: {
			// value getter
			value() {
				return this.$el.value;
			},
			// name getter
			name() {
				return this.name;
			}
		},
		mounted: function () {
			// synbc the input to the initial value
			console.log(this.$refs[this.name]);
			this.$refs[this.name].value = this.value;
		}
	}
</script>

<style lang="postcss">
	.app-input {
		max-width: 305px;
		width: 100%;
		.input-wrapper {
			position: relative;
		}
		input {
			background-color: white;
			width: 100%;
			font-size: 12px;
			color: var(--middle_gray);
			font-family: var(--font-main);
			padding: 12px 10px 11px;
			border: 1px solid var(--middle_gray);
		}
		&.success {
			color: var(--accent_color);
			input {
				color: var(--accent_color);
				border-color: var(--accent_color);
			}
			.caption {
				color: var(--accent_color);
			}
			.icon.checked {
				display: block;
			}
		}
		&.error {
			color: red;
			input {
				color: red;
				border-color: red;
			}
			.caption {
				color: red;
			}
			.icon.error {
				display: block;
			}
		}
		.icon {
			/* display: none; */
			position: absolute;
			top: 0;
			bottom: 0;
			right: 26px;
			margin: auto;
			display: none;
			svg {
				height: 100%;
				width: 100%;
				display: block;
			}
			&.error {
				height: 12px;
				width: 12px;
			}
			&.checked {
				height: 10px;
				width: 14px;
			}
		}
		.caption {
			font-size: 12px;
			color: var(--middle_gray);
			margin: 3px 0;
		}
	}
</style>

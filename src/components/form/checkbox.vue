<template lang="pug">
label.app-checkbox(:class='this.$options.name')
	.checkbox-wrapper
		input(
			:name='name'
			:ref='name'
			:required='required'
			:checked='value'
			type='checkbox'
			@change='handleChange'
		)
		.icon
			svg-icon(name='icon-check')
		.text
			slot
			.caption(v-if='computedCaption') {{computedCaption}}
</template>

<script>
export default {
	name: 'AppCheckbox',
	props: {
		caption: {
			type: String,
			default: ''
		},
		name: {
			type: String,
			default: ''
		},
		required: Boolean,
		value: {
			type: Boolean,
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
				return this.error
			} else {
				if (this.caption) {
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
		handleChange() {
			if (!this.disabled) {
				this.$emit('input', this.value ? false : true);
				this.$emit('change', this.value ? false : true);
			}
		}
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
		this.$refs[this.name].value = this.value;
	}
}
</script>

<style lang="postcss">
	.app-checkbox {
		max-width: 305px;
		display: inline-block;
		cursor: pointer;
		margin: 7px *;
		.checkbox-wrapper {
			position: relative;
			padding-left: 25px;
		}
		.text >a {
			color: var(--accent_color);
			margin: 0;
			line-height: normal;
		}
		&.success {
			.caption,
			.icon {
				color: var(--accent_color);
			}
			.caption {
				display: none;
			}
		}
		&.error {
			.caption,
			.icon {
				color: red;
			}
		}
		.icon {
			position: absolute;
			top: 0;
			right: auto;
			left: 0;
			height: 16px;
			width: 16px;
			margin: auto;
			border-radius: 2px;
			user-select: none;
			color: #a7a7a7;
			border: solid 1px currentColor;
			svg {
				height: 100%;
				width: 100%;
				display: none;
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
		input {
			display: none;
			&:checked + .icon svg {
				display: block;
			}
			&:checked {
				+ .icon {
					color: var(--accent_color);
				}
			}
		}
		.text {
			font-size: 12px;
			font-family: var(--font-main);
			line-height: 1.33;
		}
	}
</style>

<template lang="pug">
label.app-input(:class='this.$options.name')
	.input-wrapper
		input(
			:placeholder='placeholder'
			:name='name'
			:ref='name'
			v-model='reactiveValue'
			:type='type'
			autocomplete="off"
			v-bind="$attrs"
			:disabled='disabled'
			@change="onChange($event.target.value)"
			@keydown.enter="onEnterKey"
			@blur="onBlurHandler($event.target.value)"
		)
		.icon.checked
			svg-icon(name='icon-check')
		.icon.error
			svg-icon(name='icon-cross')
	.caption(v-if='computedCaption') {{computedCaption}}
</template>

<script>
export default {
	name: 'AppInput',
	props: {
		placeholder: {
			type: String,
			default: ''
		},
		caption: {
			type: String,
			default: ''
		},
		name: {
			type: String,
			default: ''
		},
		type: {
			type: String,
			default: ''
		},
		value: {
			type: String,
			default: ''
		},
		error: {
			type: String,
			default: null
		},
		prevent: {
			default: false
		},
		disabled: {
			default: false
		},
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
		},
	},
	watch: {
		value () {
			this.reactiveValue = this.value
		},
		reactiveValue() {
			this.onInput(this.reactiveValue)
		}
	},
	components: {
		SvgIcon: () => import('@/components/SvgIcon.vue'),
	},
	methods: {
		onInput(data) {
			this.$emit('input', data);
			// this.reactiveValue = data;
		},
		onChange(data) {
			this.$emit('change', data);
			this.reactiveValue = data;
		},
		onBlurHandler(data) {
			this.$emit('blur', data);
			this.reactiveValue = data;
		},
		onEnterKey(e) {
			if (this.prevent) {
				e.preventDefault()
				this.$emit('enterKey');
			}
		}
	},
	$_veeValidate: {
		// value getter
		value() {
			return this.reactiveValue;
		},
		// name getter
		name() {
			return this.name;
		}
	},
	data() {
		return {
			reactiveValue: this.value  && this.value != 'null' ? this.value : '',
		}
	}
}
</script>

<style lang="postcss">
	.app-input {
		max-width: 305px;
		width: 100%;
		.input-wrapper {
			position: relative;
			/* min-width: 150px; */
		}
		input {
			background-color: white;
			width: 100%;
			font-size: 12px;
			color: var(--middle_gray);
			font-family: var(--font-main);
			padding: 12px 40px 11px 10px;
			border: 1px solid var(--middle_gray);
		}
		&.success {
			color: var(--accent_color);
			input {
				color: var(--accent_color);
				border-color: var(--accent_color);
			}
			/* .caption {
				color: var(--accent_color);
				display: none;
			} */
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
			position: absolute;
			top: 0;
			bottom: 0;
			right: 12px;
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

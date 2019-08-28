<template lang="pug">
label.app-dropdown(:class='this.$options.name')
	.select-wrapper
		select.medium(
			required
			:class='{opened: isOpenedSelect}'
			:name='name'
			:ref='name'
			v-model='reactiveValue'
			v-bind="$attrs"
			:disabled='preparedOptions.length === 1 || disabled'
			@click='isOpenedSelect = !isOpenedSelect'
			@blur='isOpenedSelect = false'
		)
			option(value="" v-if='placeholder != undefined' disabled :selected='!value') {{this.placeholder}}
			option(v-for='(point, index) in preparedOptions', :value="point.value", :selected='reactiveValue == point.value && preparedOptions.length === 1') {{point.text}}
		.dropdown-icon
			svg(viewBox='0 0 18 9')
				polygon.triangle(fill='currentColor' points='0,9 9,0 18,9')
	.caption(v-if='computedCaption') {{computedCaption}}
</template>

<script>
export default {
	name: 'AppDropdown',
	model: {
		event: 'change'
	},
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
		options: {
			type: Array,
			default: ()=>[],
		},
		value: {},
		disabled: {
			type: Boolean,
			default: false
		},
		error: {
			type: String,
			default: null
		}
	},
	methods: {
		onChange(data) {
			this.$emit('change', data);
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
		preparedOptions() {
			return this.options.map((point, index)=>{
				if (typeof point === 'object' && point.hasOwnProperty('id')) {
					return {
						value: point.id,
						text: point.name
					}
				} else {
					return {
						value: index,
						text: point
					}
				}
			})
		},
	},
	watch: {
		value() {
			this.reactiveValue = this.value && this.value != 'null' ? this.value : ''
		},
		reactiveValue() {
			this.onChange(this.reactiveValue);
		},
		options() {
			if (this.options.length === 1) this.reactiveValue = this.preparedOptions[0].value
		}
	},
	data (){
		return {
			isOpenedSelect: false,
			reactiveValue: this.value && this.value != 'null' ? this.value : ''
		};
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
	mounted: function () {
		// synbc the input to the initial value
		// this.$refs[this.name].value = this.value;
		if (this.options.length === 1) this.reactiveValue = this.preparedOptions[0].value
	}
}
</script>

<style lang="postcss">
	.app-dropdown {
		max-width: 305px;
		width: 100%;
		.select-wrapper {
			position: relative;
			min-width: 150px;
		}
		select {
			background-color: white;
			width: 100%;
			font-size: 12px;
			color: var(--middle_gray);
			font-family: var(--font-main);
			padding: 12px 40px 11px 10px;
			border: 1px solid var(--middle_gray);
			cursor: pointer;
			appearance: none;
			&::-ms-expand {
				display: none;
			}
			&[disabled] + .dropdown-icon {
				opacity: .3;
			}
		}
		&.success {
			color: var(--accent_color);
			select {
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
			select {
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
		.dropdown-icon {
			width: 18px;
			height: 9px;
			pointer-events: none;
			position: absolute;
			right: 10px;
			top: 0;
			bottom: 0;
			margin: auto;
			transform-origin: center-center;
			transform: rotateX(180deg);
			color: var(--accent_color);
			svg {
				height: 100%;
				width: 100%;
				display: block;
			}
		}
		@media (min-width: 425px) {
			select.opened + .dropdown-icon {
				transform: rotateX(0deg);
			}
		}
		.caption {
			font-size: 12px;
			color: var(--middle_gray);
			margin: 3px 0;
		}
		option {
			color: black;
			/* font-size: 16px; */
			cursor: pointer;
		}
		option[disabled] { display: none; }
	}
</style>

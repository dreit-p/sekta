<template lang="pug">
label.app-dropdown(:class='this.$options.name')
	.select-wrapper
		select.medium(
			required
			:class='{opened: isOpenedSelect}'
			:name='name'
			:ref='name'
			@change="$emit('change', $event.target.value);"
			@click='isOpenedSelect = !isOpenedSelect'
			@blur='isOpenedSelect = false'
		)
			option(value="" v-if='placeholder != undefined' disabled selected) {{this.placeholder}}
			option(v-for='(element, index) in options', :value="index") {{element}}
		.dropdown-icon
			svg(viewBox='0 0 18 9')
				polygon.triangle(fill='currentColor' points='0,9 9,0 18,9')
	.caption(v-if='computedCaption') {{computedCaption}}
</template>

<script>
	export default {
		name: 'app-input',
		model: {
			event: 'change'
		},
		props: {
			placeholder: String,
			caption: String,
			name: String,
			type: String,
			options: {
				type: Array,
				default: ()=>[],
			},
			value: {
				type: String,
				default: '',
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
		data (){
			return {
				isOpenedSelect: false,
			};
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
		}
		&.success {
			color: var(--accent_color);
			select {
				color: var(--accent_color);
				border-color: var(--accent_color);
			}
			.caption {
				color: var(--accent_color);
				display: none;
			}
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
			font-size: 16px;
			cursor: pointer;
		}
		option[disabled] { display: none; }
	}
</style>

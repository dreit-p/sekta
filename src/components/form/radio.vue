<template lang="pug">
.radio-buttons
	label(v-for='(option, index) in options')
		input(
			v-bind="$attrs"
			:name='name'
			type='radio'
			:selected='isSelected(option)'
			:value='option.id === "default" ? "" : option.id'
			v-model='reactiveSelected'
			)
		span {{option.text}}
</template>

<script>
export default {
	name: 'RadioButtons',
	model: {
		event: 'change'
	},
	props: {
		name: {
			type: String,
			default: ''
		},
		selected: {
			type: String,
			default: '',
		},
		options: {
			type: Array,
			default: ()=>[],
		},
		error: {
			type: String,
			default: null
		}
	},
	methods: {
		isSelected(option) {
			if (option.id == this.selected) {
				return true;
			}
			if (option.id == "default" && !this.selected) {
				return true;
			}
		}
	},
	computed: {
	},
	watch: {
		selected() {
			this.reactiveSelected = !this.selected ? '' : this.selected
		},
		reactiveSelected() {
			this.$emit('change', this.reactiveSelected);
		}
	},
	data (){
		return {
			reactiveSelected: !this.selected ? '' : this.selected,
		};
	},
	mounted: function () {
	}
}
</script>

<style lang="postcss">
	.radio-buttons {
		display: inline-block;
		margin-left: -30px;
		label {
			min-width: 20px;
			height: 15px;
			margin-left: 25px;
			display: inline-flex;
			align-items: center;
			margin-bottom: 0;
		}
		input {
			margin: 5px;
		}
	}
</style>

<template lang="pug">
div.radio-buttons
	.radio-button(v-for='(option, index) in options')
		input(
			v-bind="$attrs"
			:name='name'
			type='radio'
			:id="option.id"
			:selected='isSelected(option)'
			:value='option.id === "default" ? "" : option.id'
			v-model='reactiveSelected'
		)
		label(:for="option.id") {{option.text}}
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
			default: 'name'
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
.radio-button{
  display: inline-block;
  position: relative;
  padding: 0 10px 0 6px;
}

.radio-button input[type='radio'] {
  display: none;
}

.radio-button label:before {
  content: " ";
  display: inline-block;
  position: relative;
  top: 5px;
  margin: 0 5px 0 0;
  width: 18px;
  height: 18px;
  border-radius: 11px;
  border: 1px solid black;
  background-color: transparent;
}

.radio-button input[type=radio]:checked + label:after {
  border-radius: 11px;
  width: 12px;
  height: 12px;
  position: absolute;
  top: 9px;
  left: 10px;
  content: " ";
  display: block;
  background: #0ab6a1;
}
.radio-button input[type=radio]:checked + label:before {
  border-color: #0ab6a1;
}
</style>

<template lang="pug">
.training-quantity
	.group.limit(v-for='(group, index) in groups')
		.group-title {{group.name}}
		.tiles
			a.tile(
				href='#'
				v-for='(quantityType, index) in group.elements'
				:class='{checked: selectedID == quantityType.id}'
				@click.prevent='selectType(quantityType.id)'
			)
				.description
					.desc-title {{quantityType.type}}
					.desc-caption {{quantityType.caption}}
			.tile.fake
			.tile.fake
</template>

<script>
	export default {
		name: 'training-quantity',
		model: {
			event: 'change'
		},
		props: {
			value: {
				type: Number,
				default: 0
			},
			quantityTypes: {
				type: Array,
				default: ()=>[]
			},
		},
		created () {
			this.selectType(this.value);
		},
		computed: {
			groups () {
				let groups = {};

				this.quantityTypes.forEach(function(elem) {
					if (!groups[elem.group]) groups[elem.group] = []
					groups[elem.group].push(elem);
				});

				let results = Object.keys(groups).map(function(key){
					let obj = {
						name: key,
						elements: groups[key]
					};
					return obj;
				});
				return results;
			},
		},
		methods: {
			selectType(id) {
				this.$emit('change', parseInt(id));
				this.selectedID = id;
			},
		},
		data () {
			return {
				selectedID: null,
			}
		}
	}
</script>

<style lang="postcss">
	.training-quantity {
		.group {
			overflow: visible;
			margin-bottom: 40px;
			@media (max-width: 500px) {
				margin-bottom: 10px;
			}
			.group-title {
				font-size: 18px;
				margin-bottom: 5px;
				font-style: italic;
			}
		}
		.tiles {
			margin: * -7px;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
		}
		.tile {
			background-color: #e6e6e6;
			position: relative;
			max-width: 320px;
			width: calc(100% /3 - 7px*2);
			border-radius: 1px;
			overflow: hidden;
			display: inline-block;
			margin: 7px;
			box-shadow: 0px 0px 0px 0 rgba(0, 0, 0, 0);
			transition: box-shadow .3s;
			text-decoration: none;
			transition: background-color .2s, box-shadow .2s;
			box-shadow: inset 0 0 0 0 var(--accent_color);
			&:hover {
				box-shadow: inset 0 0 0 3px var(--accent_color);
			}
			&.checked {
				background-color: var(--accent_color);
				color: white;
			}
			@media (max-width: 768px) {
				width: calc(100% /2 - 7px*2);
			}
			@media (max-width: 500px) {
				width: calc(100% /2 - 5px*2) !important;
				margin: 5px;
			}
			&.fake {
				height: 0;
				min-height: 0;
				padding: 0;
				margin: 0 *;
			}
			.description {
				padding: 25px;
				.desc-title {
					font-size: 16px;
					letter-spacing: 0.0125rem;
				}
				.desc-caption {
					font-size: 16px;
					font-weight: bold;
				}
				@media (max-width: 500px) {
					padding: 20px;
					.desc-title {
						font-size: 13px;
					}
					.desc-caption {
						font-size: 13px;
						letter-spacing: 0.00625rem;
						font-weight: bold;
					}
				}
			}
		}
	}
</style>

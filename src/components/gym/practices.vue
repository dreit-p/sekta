<template lang="pug">
.practices
	.group.limit(v-for='currentGroup in groupedPractices')
		.group-title {{ {practice: 'Групповые занятия', ticket: 'Абонементы для выпусников'}[currentGroup.type] }}
		.tiles
			a.tile(
				href='#'
				v-for='(currentQty, qtyIndex) in currentGroup.quantities'
				:class='{checked: selectedQty == currentQty}'
				@click.prevent='selectQty(currentQty)'
			)
				.description
					.desc-title {{currentQty.quantity}} тренировки в неделю
					.desc-caption {{isFinite(currentQty.min_price) ? currentQty.min_price + ' руб.' : 'недостуно'}}
			.tile.fake
			.tile.fake
</template>

<script>
export default {
	name: 'Practices',
	model: {
		event: 'change'
	},
	props: {
		practices: {
			type: Array,
			default: ()=>[]
		},
	},
	mounted() {
		this.selectQty(this.groupedPractices[0].quantities[0]);
	},
	computed: {
		groupedPractices () {
			let groups = [];

			this.practices.forEach(function(practice) {
				let type = practice.is_ticket ? 'ticket' : 'practice';
				let quantity = practice.schedules.length;


				let currentType = groups.find(t => t.type === type);
				if (! currentType) {
					currentType = {
						type: type,
						quantities: []
					};
					groups.push(currentType);
				}


				let currentQty = currentType.quantities.find(t => t.quantity === quantity);
				if (! currentQty) {
					currentQty = {
						quantity: quantity,
						objects: [],
						min_price: Infinity,
					};
					currentType.quantities.push(currentQty);
				}

				currentQty.objects.push(practice);
				if (practice.prices.length) {
					currentQty.min_price = Math.min(currentQty.min_price, practice.prices[0].value);
				}
			});

			return groups;
		},
	},
	methods: {
		selectQty(qty) {
			this.$emit('change', qty.objects);
			this.selectedQty = qty;
		},
	},
	data () {
		return {
			selectedQty: null,
		}
	}
}
</script>

<style lang="postcss">
	.practices {
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
